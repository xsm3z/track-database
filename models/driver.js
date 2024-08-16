const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;