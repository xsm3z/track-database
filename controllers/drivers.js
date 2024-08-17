const Driver = require('../models/driver');
const Vehicle = require('../models/vehicle');

const index = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.render('drivers/index.ejs', { drivers });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const newFunc = (req, res) => {
  res.render('drivers/new.ejs');
};

const create = async (req, res) => {
  try {
    await Driver.create(req.body);
    res.redirect('/drivers');
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const show = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('vehicles');
    res.render('drivers/show.ejs', { driver });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.render('drivers/edit.ejs', { driver });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const update = async (req, res) => {
  try {
    const driver = await Driver.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.redirect(`/drivers/${driver._id}`);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ msg: 'Driver not found' });
    }
    await Vehicle.deleteMany({ driver: driver._id });
    await Driver.findByIdAndDelete(req.params.id);
    res.redirect('/drivers');
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

module.exports = {
  index,
  newFunc,
  create,
  show,
  edit,
  update,
  destroy
};
