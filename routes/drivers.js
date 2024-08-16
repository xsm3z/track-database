const express = require('express');
const router = express.Router();
const driverCtrl = require('../controllers/drivers');
const isSignedIn = require('../middleware/is-signed-in');

// Index 
router.get('/', isSignedIn, driverCtrl.index);

// New 
router.get('/new', isSignedIn, driverCtrl.newFunc);

// Create 
router.post('/', isSignedIn, driverCtrl.create);

// Show
router.get('/:id', isSignedIn, driverCtrl.show);

// Edit
router.get('/:id/edit', isSignedIn, driverCtrl.edit);

// Update
router.put('/:id', isSignedIn, driverCtrl.update);

// Delete
router.delete('/:id', isSignedIn, driverCtrl.destroy);

// Nested routes for vehicles under a specific driver
router.use('/:driverId/vehicles', isSignedIn, require('./vehicles'));

module.exports = router;