const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/brandController');
const { protect } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/', getPublicBrands);
router.get('/:slug', getPublicBrandBySlug);

// Export router with helper for admin router mounting
module.exports = {
  publicBrandRouter: router,
  adminBrandRouter: (() => {
    const adminRouter = express.Router();
    adminRouter.use(protect);
    adminRouter.get('/', getAllBrandsAdmin);
    adminRouter.post('/', createBrand);
    adminRouter.patch('/order', reorderBrands);
    adminRouter.get('/:id', getBrandByIdAdmin);
    adminRouter.put('/:id', updateBrand);
    adminRouter.delete('/:id', deleteBrand);
    adminRouter.patch('/:id/status', updateBrandStatus);
    adminRouter.patch('/:id/featured', toggleBrandFeatured);
    return adminRouter;
  })(),
};
