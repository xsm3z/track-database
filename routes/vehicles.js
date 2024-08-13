const express = require('express')
const router = express.Router()
const vehicleCtrl = require('../controllers/vehicles')

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

module.exports = router