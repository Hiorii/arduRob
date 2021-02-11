const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router.get('/categories', CategoryController.getAll);

module.exports = router;