const express = require('express')
const router = express.Router()
const modificationCtrl = require('../controllers modifications')

// index
router.get('/', modificationCtrl.index)
// new
router.get('/', modificationCtrl.newFunc)
// update
router.put('/:id', modificationCtrl.update)
// delete
router.delete('/:id', modificationCtrl.destory)
// create
router.post('/', modificationCtrl.create)
// edit
router.get('/:id/edit', modificationCtrl.edit)
// show
router.get('/:id', modificationCtrl.show)

module.exports = router