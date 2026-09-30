const { ActivityLog } = require('../models');

const logActivity = async ({ action, admin, resource = '', details = '', req = null }) => {
  try {
    const ipAddress = req
      ? req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
      : '';

    await ActivityLog.create({
      action,
      adminEmail: admin ? admin.email : 'system@webindgroup.com',
      adminName: admin ? admin.name : 'System',
      resource,
      details,
      ipAddress: String(ipAddress),
    });
  } catch (err) {
    console.error('[ActivityLog Error]: Failed to persist activity:', err.message);
  }
};

module.exports = { logActivity };
