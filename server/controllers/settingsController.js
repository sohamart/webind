const { SiteSettings, Brand, Media, ActivityLog } = require('../models');
const { logActivity } = require('../utils/logger');

// Ensure a default SiteSettings document exists
const getOrCreateSettings = async () => {
  let settings = null;
  try {
    settings = await SiteSettings.findOne();
  } catch (err) {
    console.warn('[SiteSettings Notice]: Falling back to local store:', err.message);
    const { store } = require('../config/mockStore');
    return store.data.siteSettings;
  }

  if (!settings) {
    try {
      settings = await SiteSettings.create({
        siteName: 'WEBIND GROUP',
        tagline: 'We bind ideas.',
        heroTitle: 'WE BIND IDEAS.',
        heroSubtitle: 'A technology group building brands, products and ventures for what’s next.',
        heroCtaText: 'EXPLORE BRANDS',
        metrics: [
          { label: 'Active Brands', value: '4+', description: 'Specialized technology entities', icon: 'Layers' },
          { label: 'Ventures Built', value: '8+', description: 'Across AI, Web, SaaS & Tools', icon: 'Rocket' },
          { label: 'Products Deployed', value: '25+', description: 'High-availability software', icon: 'Cpu' },
          { label: 'Global Footprint', value: '18+', description: 'Countries impacted', icon: 'Globe' },
        ],
        aboutHeadline: 'A unified architecture for technology creation.',
        aboutBody:
          'WEBIND GROUP operates at the intersection of technological ambition, relentless craftsmanship, and ecosystem design. We conceptualize, build, scale, and nurture independent brands that push the boundaries of digital experiences, developer platforms, and future intelligent software.',
        ecosystemPhilosophy:
          'Every brand in our ecosystem retains sovereign autonomy while leveraging unified engineering standards, shared intelligence, and an uncompromising obsession with quality.',
        announcement: {
          enabled: true,
          text: 'WEBIND 2.0 Digital Operating Ecosystem is now live.',
          link: '/brands',
        },
        contact: {
          email: 'hello@webindgroup.com',
          partnerships: 'ventures@webindgroup.com',
          location: 'Global Digital Architecture',
        },
        socials: {
          twitter: 'https://twitter.com/webindgroup',
          linkedin: 'https://linkedin.com/company/webindgroup',
          github: 'https://github.com/webindgroup',
          discord: '',
        },
      });
    } catch (createErr) {
      const { store } = require('../config/mockStore');
      return store.data.siteSettings;
    }
  }
  return settings;
};

// @desc    Get public site configuration & homepage CMS data
// @route   GET /api/settings
// @access  Public
const getPublicSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin site settings
// @route   GET /api/admin/settings
// @access  Private
const getAdminSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings & homepage CMS
// @route   PUT /api/admin/settings
// @access  Private
const updateSettings = async (req, res, next) => {
  try {
    let settings = await getOrCreateSettings();
    const updated = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });

    await logActivity({
      action: 'SETTINGS_UPDATED',
      admin: req.admin,
      resource: 'SiteSettings & Homepage CMS',
      details: 'Updated global site settings and homepage configurations',
      req,
    });

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully.',
      settings: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Admin Dashboard aggregate statistics
// @route   GET /api/admin/dashboard
// @access  Private
const getDashboardOverview = async (req, res, next) => {
  try {
    const totalBrands = await Brand.countDocuments();
    const activeBrands = await Brand.countDocuments({ status: 'ACTIVE' });
    const comingSoonBrands = await Brand.countDocuments({ status: 'COMING_SOON' });
    const archivedBrands = await Brand.countDocuments({ status: 'ARCHIVED' });
    const featuredBrands = await Brand.countDocuments({ isFeatured: true });
    const totalMedia = await Media.countDocuments();

    const recentActivity = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(8);

    const latestBrands = await Brand.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalBrands,
        activeBrands,
        comingSoonBrands,
        archivedBrands,
        featuredBrands,
        totalMedia,
      },
      recentActivity,
      latestBrands,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
  getDashboardOverview,
  getOrCreateSettings,
};
