const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 32,
    unique: true,
  },
});

module.exports = mongoose.model("Category", Category);
