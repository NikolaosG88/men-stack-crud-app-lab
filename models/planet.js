
const mongoose = require("mongoose")

const planetSchema = new mongoose.Schema({
  name: String,
  description: String,
  satelites: Number,
  spin: Boolean,
  image: String,
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;
