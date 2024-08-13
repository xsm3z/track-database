const Driver = require('../models/driver')

const index = async (req, res) => {
  try {
    const foundDrivers = await Driver.find({})
    res.render('Drivers/index.ejs', {
      Drivers: foundDrivers
    })
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const newFunc = (req, res) => {
  res.render('Drivers/new.ejs')
}

const destroy = async (req, res) => {
  try {
    const deletedDriver = await Driver.findOneAndDelete({_id: req.params.id})
    deletedDriver.posts.forEach((post) => {
      post.deleteOne()
    })
    deletedDriver.comments.forEach((comment) => {
      comment.deleteOne()
    })
    res.redirect('/drivers')
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const update = async (req, res) => {
  try {
    const updatedDriver = await Driver.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    res.redirect(`/drivers/${updatedDriver._id}`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const create = async (req, res) => {
  try {
    const createdDriver = await Driver.create(req.body)
    res.redirect(`/drivers/${createdDriver._id}`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const edit = async (req, res) => {
  try {
      const foundDriver = await Driver.findOne({ _id: req.params.id })
      res.render('Drivers/edit.ejs', {
          Driver: foundDriver
      })
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

const show = async (req, res) => {
  try {
      const foundDriver = await Driver.findOne({ _id: req.params.id }).populate('posts comments')
      res.render('Drivers/show.ejs', {
          Driver: foundDriver
      })
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

module.exports = {
  index,
  newFunc,
  destroy,
  update,
  create,
  edit,
  show
}