const Driver = require('../models/driver');

const index = async (req, res) => {
  try {
    const foundDrivers = await Driver.find({});
    res.render('drivers/index.ejs', {
      drivers: foundDrivers
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const newFunc = (req, res) => {
  res.render('drivers/new.ejs');
};

const destroy = async (req, res) => {
  try {
    const deletedDriver = await Driver.findOneAndDelete({ _id: req.params.id });
    if (!deletedDriver) {
      return res.status(404).json({ msg: 'Driver not found.' });
    }
    res.redirect('/drivers');
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const create = async (req, res) => {
  try {
    const existingDriver = await Driver.findOne({ email: req.body.email });
    if (existingDriver) {
      return res.status(400).json({ msg: 'Email already exists.' });
    }
    const createdDriver = await Driver.create(req.body);
    res.redirect(`/drivers/${createdDriver._id}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const update = async (req, res) => {
  try {
    const existingDriver = await Driver.findOne({ email: req.body.email });
    if (existingDriver && existingDriver._id.toString() !== req.params.id) {
      return res.status(400).json({ msg: 'Email already exists.' });
    }
    const updatedDriver = await Driver.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.redirect(`/drivers/${updatedDriver._id}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const foundDriver = await Driver.findOne({ _id: req.params.id });
    if (!foundDriver) {
      return res.status(404).json({ msg: 'Driver not found.' });
    }
    res.render('drivers/edit.ejs', {
      driver: foundDriver 
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const show = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('vehicles');
    if (!driver) {
      return res.status(404).send('Driver not found');
    }
    res.render('drivers/show.ejs', { driver });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  index,
  newFunc,
  destroy,
  update,
  create,
  edit,
  show
};
