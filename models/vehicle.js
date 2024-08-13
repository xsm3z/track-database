const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vin: { type: String, required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  class: { type: String, required: true },
  number: { type: Number, required: true },
  modifications: { type: mongoose.Schema.Types.ObjectId, ref: 'Modification'}
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle