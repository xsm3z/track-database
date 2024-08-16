const express = require('express')
const router = express.Router()
const modificationCtrl = require('../controllers/modifications')

// show 
router.get('/:vehicleId/modifications/:modificationId', modificationCtrl.show);

// edit
router.get('/:vehicleId/modifications/:modificationId/edit', modificationCtrl.edit);

// update
router.put('/:vehicleId/modifications/:modificationId', modificationCtrl.update);

// delete
router.delete('/:vehicleId/modifications/:modificationId', modificationCtrl.destroy);

// create
router.post('/:vehicleId/modifications', modificationCtrl.create);

module.exports = router