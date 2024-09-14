const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants", required: true },
    name: { type: String },
    picture: { type: String },
    ingredients: { type: String },
    price: { type: Number },
  },
  {
    collection: "menu",
    timestamps: true,
  }
);

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;