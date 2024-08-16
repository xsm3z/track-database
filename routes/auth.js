const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Sign-Up Routes
router.get('/sign-up', authController.renderSignUpForm);
router.post('/sign-up', authController.signUp);

// Sign-In Routes
router.get('/sign-in', authController.renderSignInForm);
router.post('/sign-in', authController.signIn);

// Sign-Out Route
router.get('/sign-out', authController.signOut);

module.exports = router;