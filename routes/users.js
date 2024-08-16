const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const isSignedIn = require('../middleware/is-signed-in');

// Index and Show 
router.get('/', isSignedIn, usersController.index);
router.get('/:userId', isSignedIn, usersController.show);

module.exports = router;
