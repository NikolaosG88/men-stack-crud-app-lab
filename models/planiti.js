
const mongoose = require("mongoose")

const planitiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  satelites: { type: Number, required: true },
  spin: { type: Boolean, required: true },
  image: String,
});

const Planiti = mongoose.model("Planiti", planitiSchema);

module.exports = Planiti;
