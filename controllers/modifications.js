const Modification = require('../models/modification');


const edit = async (req, res) => {
  try {
    const modification = await Modification.findById(req.params.modificationId);
    res.render('modifications/edit.ejs', { modification });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedModification = await Modification.findByIdAndUpdate(
      req.params.modificationId,
      req.body,
      { new: true }
    );
    res.redirect(`/vehicles/${req.params.vehicleId}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    await Modification.findByIdAndDelete(req.params.modificationId);
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    vehicle.modifications.pull(req.params.modificationId);
    await vehicle.save();
    res.redirect(`/vehicles/${vehicle._id}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const show = async (req, res) => {
  try {
    const modification = await Modification.findById(req.params.modificationId);
    if (!modification) {
      return res.status(404).json({ msg: 'Modification not found.' });
    }
    res.render('modifications/show.ejs', { modification });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const create = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found.' });
    }

    const newModification = await Modification.create(req.body);

    vehicle.modifications.push(newModification._id);
    await vehicle.save();

    res.redirect(`/vehicles/${vehicle._id}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  edit,
  update,
  destroy,
  create,
  show
};