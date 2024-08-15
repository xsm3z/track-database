const express = require('express')
const router = express.Router()
const vehicleCtrl = require('../controllers/vehicles')
const modificationCtrl = require('../controllers/modifications')

// index
router.get('/', vehicleCtrl.index)

// new
router.get('/', vehicleCtrl.newFunc)

// update
router.put('/:id', vehicleCtrl.update)

// delete
router.delete('/:id', vehicleCtrl.destroy)

// create
router.post('/', vehicleCtrl.create)

// edit
router.get('/:id/edit', vehicleCtrl.edit)

// show
router.get('/:id', vehicleCtrl.show)

// edit modification
router.get('/:vehicleId/modifications/:modificationId/edit', modificationCtrl.edit);

// update modification
router.put('/:vehicleId/modifications/:modificationId', modificationCtrl.update);

// delete modification
router.delete('/:vehicleId/modifications/:modificationId', modificationCtrl.destroy);

module.exports = router