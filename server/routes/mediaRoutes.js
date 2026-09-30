const express = require('express');
const router = express.Router();
const { getMedia, uploadMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect);

router.get('/', getMedia);
router.post('/', upload.single('file'), uploadMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
