const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: "restaurant", required: true },
    text: { type: String, required: true },
    score: { type: Number, required: true, min: 1, max: 5 }

}, {
    collection: "reviews",
    timestamps: true
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;