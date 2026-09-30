const path = require('path');
const fs = require('fs');
const { Media } = require('../models');
const { logActivity } = require('../utils/logger');
let cloudinary = null;

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  try {
    cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (err) {
    console.warn('Cloudinary config error:', err.message);
  }
}

// @desc    Get all media assets
// @route   GET /api/admin/media
// @access  Private
const getMedia = async (req, res, next) => {
  try {
    const { search, folder } = req.query;
    const query = {};

    if (search && search.trim() !== '') {
      query.originalName = new RegExp(search.trim(), 'i');
    }

    if (folder) {
      query.folder = folder;
    }

    const media = await Media.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      media,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload media asset
// @route   POST /api/admin/media
// @access  Private
const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select an image file.',
      });
    }

    let fileUrl = `/uploads/${req.file.filename}`;
    let publicId = '';

    // If Cloudinary credentials are provided, upload to Cloudinary
    if (cloudinary) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'webind_assets',
        });
        fileUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } catch (cloudErr) {
        console.warn('Cloudinary upload fallback to local:', cloudErr.message);
      }
    }

    const mediaDoc = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      publicId,
      mimeType: req.file.mimetype,
      size: req.file.size,
      folder: req.body.folder || 'general',
      uploadedBy: req.admin ? req.admin._id : null,
    });

    await logActivity({
      action: 'MEDIA_UPLOADED',
      admin: req.admin,
      resource: req.file.originalname,
      details: `Uploaded media asset: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)`,
      req,
    });

    res.status(201).json({
      success: true,
      message: 'Media uploaded successfully.',
      media: mediaDoc,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media asset
// @route   DELETE /api/admin/media/:id
// @access  Private
const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media asset not found.',
      });
    }

    // Attempt to remove local file if it exists
    if (media.url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', media.url);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Failed to delete local file:', e.message);
        }
      }
    }

    // Cloudinary delete if applicable
    if (cloudinary && media.publicId) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (cloudErr) {
        console.warn('Cloudinary destroy error:', cloudErr.message);
      }
    }

    const originalName = media.originalName;
    await Media.findByIdAndDelete(req.params.id);

    await logActivity({
      action: 'MEDIA_DELETED',
      admin: req.admin,
      resource: originalName,
      details: `Removed media asset: ${originalName}`,
      req,
    });

    res.status(200).json({
      success: true,
      message: 'Media asset deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMedia, uploadMedia, deleteMedia };
