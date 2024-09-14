const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users', 
      required: true
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'restaurant', 
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    numberOfGuests: {
      type: Number,
      required: true
    },

    menuItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
      required: true
    }],
    

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },
    contactInfo: {
      phone: {
        type: String,
        required: true
      },
      guestName: {
        type: String,
        required: true
      },
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);

const Reservation = mongoose.model("reservations", reservationSchema);

module.exports = Reservation;