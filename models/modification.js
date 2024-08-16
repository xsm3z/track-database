const mongoose = require('mongoose');

const modficationSchema = new mongoose.Schema({
  engine: { type: String, required: true },
  suspension: { type: String, required: true },
  chassis: { type: String, required: true },
  tires: { type: String, required: true }
})

const Modification = mongoose.model('Modification', modficationSchema)

module.exports = Modification 