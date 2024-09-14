const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true, unique: true },
    picture: { type: String, required: true },
    address: { type: String, required: true },
    category: { type: String, required: true },
    password: { type: String, required: true },
}, {
    collection: "restaurants",
});

const Restaurant = mongoose.model('restaurants', restaurantSchema);


module.exports = Restaurant;