const express = require('express');
const router = express.Router({ mergeParams: true }); 
const vehicleCtrl = require('../controllers/vehicles');

// Index 
router.get('/', vehicleCtrl.index);

// New 
router.get('/new', vehicleCtrl.newFunc);

// Create 
router.post('/', vehicleCtrl.create);

// Show 
router.get('/:id', vehicleCtrl.show);

// Edit 
router.get('/:id/edit', vehicleCtrl.edit);

// Update 
router.put('/:id', vehicleCtrl.update);

// Delete 
router.delete('/:id', vehicleCtrl.destroy);

module.exports = router;
