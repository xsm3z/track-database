const express = require('express')
const router = express.Router()
const driverCtrl = require('../controllers/drivers')

// index
router.get('/', driverCtrl.index)
// new
router.get('/', driverCtrl.newFunc)
// update
router.put('/:id', driverCtrl.update)
// delete
router.delete('/:id', driverCtrl.destroy)
// create
router.post('/', driverCtrl.create)
// edit
router.get('/:id/edit', driverCtrl.edit)
// show
router.get('/:id', driverCtrl.show)

module.exports = router