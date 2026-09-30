const express = require('express');
const router = express.Router();
const {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
  getDashboardOverview,
} = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

// Public settings endpoint
router.get('/', getPublicSettings);

module.exports = {
  publicSettingsRouter: router,
  adminSettingsRouter: (() => {
    const adminRouter = express.Router();
    adminRouter.use(protect);
    adminRouter.get('/dashboard', getDashboardOverview);
    adminRouter.get('/settings', getAdminSettings);
    adminRouter.put('/settings', updateSettings);
    return adminRouter;
  })(),
};
