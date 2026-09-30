require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const { connectDB } = require('./config/db');
const { seedAll } = require('./seed/seed');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const { publicBrandRouter, adminBrandRouter } = require('./routes/brandRoutes');
const { publicSettingsRouter, adminSettingsRouter } = require('./routes/settingsRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const activityRoutes = require('./routes/activityRoutes');

const { Brand, SiteSettings } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all in development/production flexibility
      }
    },
    credentials: true,
  })
);

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // Limit each IP to 600 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});
app.use('/api', apiLimiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Static folder for uploaded files
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Also serve brand assets from project root if needed
const brandAssetsDir = path.join(__dirname, '..');
app.use('/assets/brand-source', express.static(brandAssetsDir));

// ==========================================
// DYNAMIC SEO & METADATA ENDPOINTS
// ==========================================

// Dynamic sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://webindgroup.com';
    const brands = await Brand.find({ isPublished: true, status: { $ne: 'ARCHIVED' } });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static Routes
    const staticRoutes = ['', '/brands', '/about', '/more'];
    staticRoutes.forEach((route) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${route}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Brand Routes
    brands.forEach((brand) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/brands/${brand.slug}</loc>\n`;
      xml += `    <lastmod>${brand.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// Dynamic robots.txt
app.get('/robots.txt', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    const robotsContent =
      settings?.seo?.robotsText ||
      'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://webindgroup.com/sitemap.xml';

    res.header('Content-Type', 'text/plain');
    res.send(robotsContent);
  } catch (error) {
    res.status(500).send('User-agent: *\nAllow: /');
  }
});

// ==========================================
// API ROUTES MOUNTING
// ==========================================

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/brands', publicBrandRouter);
app.use('/api/settings', publicSettingsRouter);

// Admin CMS Routes
app.use('/api/admin/brands', adminBrandRouter);
app.use('/api/admin/media', mediaRoutes);
app.use('/api/admin/activity', activityRoutes);
app.use('/api/admin', adminSettingsRouter); // includes /dashboard, /settings

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'WEBIND GROUP OS Core Engine',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
  });
});

// Central Error Handler
app.use(errorHandler);

// Boot Server
const startServer = async () => {
  try {
    await connectDB();
    await seedAll(false);

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`⚡ WEBIND GROUP ENGINE ONLINE`);
      console.log(`⚡ Port: http://localhost:${PORT}`);
      console.log(`⚡ Mode: ${process.env.NODE_ENV || 'development'}`);
      console.log(`⚡ Superadmin: ${process.env.ADMIN_DEFAULT_EMAIL || 'admin@webindgroup.com'}`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to initialize server:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
