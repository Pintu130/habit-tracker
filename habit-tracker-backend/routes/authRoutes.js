// authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, forgotPassword, resetPassword } = require('../controllers/authController');

//Authentication
router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
