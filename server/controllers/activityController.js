const { ActivityLog } = require('../models');

// @desc    Get admin activity audit trail
// @route   GET /api/admin/activity
// @access  Private
const getActivityLogs = async (req, res, next) => {
  try {
    const { action, limit = 50, page = 1 } = req.query;
    const query = {};

    if (action && action !== 'ALL') {
      query.action = action;
    }

    const parsedLimit = parseInt(limit, 10) || 50;
    const parsedPage = parseInt(page, 10) || 1;
    const skip = (parsedPage - 1) * parsedLimit;

    const total = await ActivityLog.countDocuments(query);
    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    res.status(200).json({
      success: true,
      total,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit),
      logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getActivityLogs };
