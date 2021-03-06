const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/users', UserController.getAll );
router.post('/signGoogle', UserController.signGoogle );
router.post('/signin', UserController.signIn );
router.post('/signup', UserController.signUp );
router.put('/user/data', UserController.updateUserData );

module.exports = router;

