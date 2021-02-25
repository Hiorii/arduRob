const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/cart', cartController.addOrder);

module.exports = router;