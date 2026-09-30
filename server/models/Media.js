const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: '',
    },
    mimeType: {
      type: String,
      default: 'image/png',
    },
    size: {
      type: Number,
      default: 0,
    },
    folder: {
      type: String,
      default: 'general',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', MediaSchema);
