const Vehicle = require('../models/vehicle');
const Modification = require('../models/modification');

// edit
const edit = async (req, res) => {
  try {
    const modification = await Modification.findById(req.params.modificationId);
    res.render('modifications/edit.ejs', { modification });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// update
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

// delete
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

module.exports = {
  edit,
  update,
  destroy,
};