require('dotenv').config();
const { connectDB, disconnectDB } = require('../config/db');
const { Admin, Brand, SiteSettings, ActivityLog } = require('../models');
const { seedAdmin, seedSettings, seedBrands } = require('./seedData');

const seedAll = async (isStandalone = false) => {
  try {
    if (isStandalone) {
      await connectDB();
    }

    console.log('[Seed Engine] Checking existing ecosystem records...');

    // 1. Seed or Verify Superadmin
    const existingAdmin = await Admin.findOne({ email: seedAdmin.email.toLowerCase() });
    if (!existingAdmin) {
      console.log(`[Seed Engine] Creating default Superadmin: ${seedAdmin.email}`);
      await Admin.create(seedAdmin);
    } else {
      console.log(`[Seed Engine] Admin account [${seedAdmin.email}] already initialized.`);
    }

    // 2. Seed or Verify Site Settings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      console.log('[Seed Engine] Initializing official Webind Group site settings & metrics...');
      await SiteSettings.create(seedSettings);
    } else {
      console.log('[Seed Engine] Site settings already present.');
    }

    // 3. Seed initial Brands if brand count is 0
    const brandCount = await Brand.countDocuments();
    if (brandCount === 0) {
      console.log(`[Seed Engine] Seeding ${seedBrands.length} initial ecosystem brands (Weblets, Stack Adda, AI Ventures)...`);
      await Brand.insertMany(seedBrands);
      console.log('[Seed Engine] Initial brands seeded successfully.');

      // Log activity
      await ActivityLog.create({
        action: 'BRAND_CREATED',
        adminEmail: seedAdmin.email,
        adminName: 'System Seed',
        resource: 'Ecosystem',
        details: 'Initial ecosystem brands seeded (Weblets, Stack Adda, Neural Nexus, Cloud Forge)',
      });
    } else {
      console.log(`[Seed Engine] ${brandCount} brands already exist in database.`);
    }

    console.log('[Seed Engine] Ecosystem database check completed.');

    if (isStandalone) {
      await disconnectDB();
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seed Engine Error]:', error);
    if (isStandalone) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedAll(true);
}

module.exports = { seedAll };
