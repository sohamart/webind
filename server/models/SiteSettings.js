const mongoose = require('mongoose');

const MetricSubSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Globe' },
  },
  { _id: true }
);

const SiteSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'WEBIND GROUP',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'We bind ideas.',
      trim: true,
    },
    heroTitle: {
      type: String,
      default: 'WE BIND IDEAS.',
      trim: true,
    },
    heroSubtitle: {
      type: String,
      default: 'A technology group building brands, products and ventures for what’s next.',
      trim: true,
    },
    heroCtaText: {
      type: String,
      default: 'EXPLORE BRANDS',
      trim: true,
    },
    symbolUrl: {
      type: String,
      default: '/assets/webind-symbol.png',
    },
    logoUrl: {
      type: String,
      default: '/assets/webind-full-logo.png',
    },
    faviconUrl: {
      type: String,
      default: '/assets/webind-symbol.png',
    },
    defaultTheme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark',
    },
    metrics: [MetricSubSchema],
    aboutHeadline: {
      type: String,
      default: 'A unified architecture for technology creation.',
    },
    aboutBody: {
      type: String,
      default: 'WEBIND GROUP operates at the intersection of technological ambition, relentless craftsmanship, and ecosystem design. We conceptualize, build, scale, and nurture independent brands that push the boundaries of digital experiences, developer platforms, and future intelligent software.',
    },
    ecosystemPhilosophy: {
      type: String,
      default: 'Every brand in our ecosystem retains independent autonomy while leveraging unified engineering standards, shared intelligence, and an uncompromising obsession with quality.',
    },
    announcement: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: 'WEBIND 2.0 Ecosystem Architecture is now live.' },
      link: { type: String, default: '/brands' },
    },
    contact: {
      email: { type: String, default: 'contact@webindgroup.com' },
      partnerships: { type: String, default: 'ventures@webindgroup.com' },
      location: { type: String, default: 'Global Digital HQ' },
    },
    socials: {
      twitter: { type: String, default: 'https://twitter.com/webindgroup' },
      linkedin: { type: String, default: 'https://linkedin.com/company/webindgroup' },
      github: { type: String, default: 'https://github.com/webindgroup' },
      discord: { type: String, default: '' },
    },
    footerText: {
      type: String,
      default: 'Architecting digital paradigms, high-velocity developer systems, and sovereign intelligent software.',
    },
    copyright: {
      type: String,
      default: '© 2026 WEBIND GROUP. All rights reserved.',
    },
    seo: {
      title: { type: String, default: 'WEBIND GROUP — We Bind Ideas' },
      description: {
        type: String,
        default: 'WEBIND GROUP is a parent technology company operating an ecosystem of independent brands, digital ventures, and next-generation software platforms.',
      },
      ogImage: { type: String, default: '/assets/webind-full-logo.png' },
      robotsText: {
        type: String,
        default: 'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://webindgroup.com/sitemap.xml',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
