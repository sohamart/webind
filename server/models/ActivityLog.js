const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        'ADMIN_LOGIN',
        'ADMIN_LOGOUT',
        'BRAND_CREATED',
        'BRAND_EDITED',
        'BRAND_DELETED',
        'BRAND_PUBLISHED',
        'BRAND_ARCHIVED',
        'BRAND_ORDER_UPDATED',
        'HOMEPAGE_UPDATED',
        'SETTINGS_UPDATED',
        'MEDIA_UPLOADED',
        'MEDIA_DELETED',
      ],
    },
    adminEmail: {
      type: String,
      required: true,
    },
    adminName: {
      type: String,
      default: 'Admin',
    },
    resource: {
      type: String,
      default: '',
    },
    details: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

ActivityLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
