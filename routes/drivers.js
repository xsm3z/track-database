const express = require('express');
const router = express.Router();
const driverCtrl = require('../controllers/drivers');

// new
router.get('/new', driverCtrl.newFunc);

// index
router.get('/', driverCtrl.index);

// create
router.post('/', driverCtrl.create);

// edit
router.get('/:id/edit', driverCtrl.edit);

// show
router.get('/:id', driverCtrl.show);

// update
router.put('/:id', driverCtrl.update);

// delete
router.delete('/:id', driverCtrl.destroy);

module.exports = router;
