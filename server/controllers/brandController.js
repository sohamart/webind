const { Brand } = require('../models');
const { logActivity } = require('../utils/logger');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// ==========================================
// PUBLIC CONTROLLER METHODS
// ==========================================

// @desc    Get all public brands (Active / Coming Soon, Published, excluding Archived)
// @route   GET /api/brands
// @access  Public
const getPublicBrands = async (req, res, next) => {
  try {
    const { category, status, search, featured } = req.query;

    const query = {
      isPublished: true,
      status: { $ne: 'ARCHIVED' },
    };

    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (status && ['ACTIVE', 'COMING_SOON'].includes(status.toUpperCase())) {
      query.status = status.toUpperCase();
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { tagline: searchRegex },
        { shortDescription: searchRegex },
        { category: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    const brands = await Brand.find(query).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: brands.length,
      brands,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single public brand by slug
// @route   GET /api/brands/:slug
// @access  Public
const getPublicBrandBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const brand = await Brand.findOne({
      slug: slug.toLowerCase(),
      isPublished: true,
      status: { $ne: 'ARCHIVED' },
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: `Brand with slug '${slug}' was not found or is currently unavailable.`,
      });
    }

    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN CONTROLLER METHODS
// ==========================================

// @desc    Get all brands for Admin CMS
// @route   GET /api/admin/brands
// @access  Private
const getAllBrandsAdmin = async (req, res, next) => {
  try {
    const { status, category, search, sort } = req.query;
    const query = {};

    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (category && category !== 'ALL') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { tagline: searchRegex },
        { category: searchRegex },
        { slug: searchRegex },
      ];
    }

    let sortOption = { displayOrder: 1, createdAt: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'name') sortOption = { name: 1 };

    const brands = await Brand.find(query).sort(sortOption);

    // Compute admin aggregate statistics
    const totalCount = await Brand.countDocuments();
    const activeCount = await Brand.countDocuments({ status: 'ACTIVE' });
    const comingSoonCount = await Brand.countDocuments({ status: 'COMING_SOON' });
    const archivedCount = await Brand.countDocuments({ status: 'ARCHIVED' });
    const featuredCount = await Brand.countDocuments({ isFeatured: true });

    res.status(200).json({
      success: true,
      count: brands.length,
      stats: {
        total: totalCount,
        active: activeCount,
        comingSoon: comingSoonCount,
        archived: archivedCount,
        featured: featuredCount,
      },
      brands,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single brand by ID for Admin CMS
// @route   GET /api/admin/brands/:id
// @access  Private
const getBrandByIdAdmin = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found',
      });
    }

    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new Brand
// @route   POST /api/admin/brands
// @access  Private
const createBrand = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (!data.name) {
      return res.status(400).json({
        success: false,
        message: 'Brand name is required.',
      });
    }

    if (!data.slug || data.slug.trim() === '') {
      data.slug = slugify(data.name);
    } else {
      data.slug = slugify(data.slug);
    }

    // Ensure slug uniqueness
    const existing = await Brand.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;
    }

    // Determine default display order if not specified
    if (data.displayOrder === undefined || data.displayOrder === null) {
      const highest = await Brand.findOne().sort({ displayOrder: -1 });
      data.displayOrder = highest ? highest.displayOrder + 1 : 1;
    }

    const brand = await Brand.create(data);

    await logActivity({
      action: 'BRAND_CREATED',
      admin: req.admin,
      resource: brand.name,
      details: `Created new brand "${brand.name}" with status [${brand.status}]`,
      req,
    });

    res.status(201).json({
      success: true,
      message: `Brand "${brand.name}" created successfully.`,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Brand
// @route   PUT /api/admin/brands/:id
// @access  Private
const updateBrand = async (req, res, next) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found.',
      });
    }

    const data = { ...req.body };
    if (data.slug && data.slug !== brand.slug) {
      data.slug = slugify(data.slug);
      const existing = await Brand.findOne({
        slug: data.slug,
        _id: { $ne: brand._id },
      });
      if (existing) {
        data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    brand = await Brand.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    await logActivity({
      action: 'BRAND_EDITED',
      admin: req.admin,
      resource: brand.name,
      details: `Updated details for brand "${brand.name}"`,
      req,
    });

    res.status(200).json({
      success: true,
      message: `Brand "${brand.name}" updated successfully.`,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Brand
// @route   DELETE /api/admin/brands/:id
// @access  Private
const deleteBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found.',
      });
    }

    const brandName = brand.name;
    await Brand.findByIdAndDelete(req.params.id);

    await logActivity({
      action: 'BRAND_DELETED',
      admin: req.admin,
      resource: brandName,
      details: `Permanently removed brand "${brandName}" from ecosystem`,
      req,
    });

    res.status(200).json({
      success: true,
      message: `Brand "${brandName}" deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Brand Status (ACTIVE / COMING_SOON / ARCHIVED)
// @route   PATCH /api/admin/brands/:id/status
// @access  Private
const updateBrandStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['ACTIVE', 'COMING_SOON', 'ARCHIVED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be ACTIVE, COMING_SOON, or ARCHIVED.',
      });
    }

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found.',
      });
    }

    const action = status === 'ARCHIVED' ? 'BRAND_ARCHIVED' : 'BRAND_PUBLISHED';
    await logActivity({
      action,
      admin: req.admin,
      resource: brand.name,
      details: `Changed status of brand "${brand.name}" to ${status}`,
      req,
    });

    res.status(200).json({
      success: true,
      message: `Brand "${brand.name}" status updated to ${status}.`,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle Brand Featured status
// @route   PATCH /api/admin/brands/:id/featured
// @access  Private
const toggleBrandFeatured = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found.',
      });
    }

    brand.isFeatured = !brand.isFeatured;
    await brand.save();

    await logActivity({
      action: 'BRAND_EDITED',
      admin: req.admin,
      resource: brand.name,
      details: `${brand.isFeatured ? 'Featured' : 'Unfeatured'} brand "${brand.name}"`,
      req,
    });

    res.status(200).json({
      success: true,
      message: `Brand "${brand.name}" is now ${brand.isFeatured ? 'featured' : 'unfeatured'}.`,
      isFeatured: brand.isFeatured,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Batch reorder brands (Drag & Drop)
// @route   PATCH /api/admin/brands/order
// @access  Private
const reorderBrands = async (req, res, next) => {
  try {
    const { items } = req.body; // Expects array of { id, displayOrder }

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array of { id, displayOrder }',
      });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { displayOrder: item.displayOrder } },
      },
    }));

    if (bulkOps.length > 0) {
      await Brand.bulkWrite(bulkOps);
    }

    await logActivity({
      action: 'BRAND_ORDER_UPDATED',
      admin: req.admin,
      resource: 'Brand Ecosystem',
      details: `Reordered ${items.length} brands in the ecosystem`,
      req,
    });

    res.status(200).json({
      success: true,
      message: 'Brand order updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicBrands,
  getPublicBrandBySlug,
  getAllBrandsAdmin,
  getBrandByIdAdmin,
  createBrand,
  updateBrand,
  deleteBrand,
  updateBrandStatus,
  toggleBrandFeatured,
  reorderBrands,
};
