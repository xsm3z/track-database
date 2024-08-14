const Vehicle = require('../models/vehicle')

const index = async (req, res) => {
  try {
    const foundVehicles = await Vehicle.find({})
    res.render('vehicles/index.ejs', {
      vehicles: foundVehicles
    })
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const newFunc = (req, res) => {
  res.render('vehicles/new.ejs')
}

const destroy = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findOneAndDelete({_id: req.params.id})
    deletedVehicle.posts.forEach((post) => {
      post.deleteOne()
    })
    deletedVehicle.comments.forEach((comment) => {
      comment.deleteOne()
    })
    res.redirect('/vehicles')
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const update = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    res.redirect(`/vehicles/${updatedVehicle._id}`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const create = async (req, res) => {
  try {
    const createdVehicle = await Vehicle.create(req.body)
    res.redirect(`/vehicles/${createdVehicle._id}`)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const edit = async (req, res) => {
  try {
      const foundVehicle = await Vehicle.findOne({ _id: req.params.id })
      res.render('vehicles/edit.ejs', {
          vehicle: foundVehicle
      })
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

const show = async (req, res) => {
  try {
      const foundVehicle = await Vehicle.findOne({ _id: req.params.id })
      res.render('vehicles/show.ejs', {
          vehicle: foundVehicle
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