const Vehicle = require('../models/vehicle');
const Driver = require('../models/driver');

const index = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}).populate('driver');
    res.render('vehicles/index.ejs', { vehicles });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const newFunc = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.driverId);
    if (!driver) {
      return res.status(404).send('Driver not found');
    }
    res.render('vehicles/new', { driver });
  } catch (error) {
    console.log(error);
    res.status(404).send('Server Error');
  }
};

const create = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.driverId);
    if (!driver) {
      return res.status(404).json({ msg: 'Driver not found' });
    }

    const newVehicle = new Vehicle(req.body);
    newVehicle.driver = driver._id;
    await newVehicle.save();

    driver.vehicles.push(newVehicle._id);
    await driver.save();

    res.redirect(`/drivers/${driver._id}/vehicles`);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const show = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('driver');
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    res.render('vehicles/show.ejs', { vehicle });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('driver');
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    const drivers = await Driver.find({});
    res.render('vehicles/edit.ejs', { vehicle, drivers });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const update = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.redirect(`/drivers/${vehicle.driver}/vehicles`);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }

    const driver = await Driver.findById(vehicle.driver);
    if (driver) {
      driver.vehicles.pull(vehicle._id);
      await driver.save();
    }

    res.redirect(`/drivers/${driver._id}/vehicles`);
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
