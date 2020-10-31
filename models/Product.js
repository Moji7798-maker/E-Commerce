const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const imageSchema = new mongoose.Schema({
  name: String,
  photo: {
    data: Buffer,
    contentType: String,
  },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 32,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photos: [imageSchema],
    description: {
      type: String,
      trim: true,
      max: 250,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in Stock", "Out of Stuck"],
      default: "in Stock",
      required: true,
    },
    rating: {
      type: String,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
const Image = mongoose.model("Image", imageSchema);

module.exports = { Product, Image };
