
const mongoose = require("mongoose")

const planitesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Planites = mongoose.model("Planites", planitesSchema)

module.exports = Planites;
