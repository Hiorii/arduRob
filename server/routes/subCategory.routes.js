const express = require('express');
const router = express.Router();
const SubCategoryController = require('../controllers/subCategory.controller');

router.get('/subCategories', SubCategoryController.getAll);

module.exports = router;