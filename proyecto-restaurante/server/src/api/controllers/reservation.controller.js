const Reservation = require("../models/reservation.model");
const User = require("../models/user.model");
const Restaurant = require("../models/restaurant.model");

// Crear una nueva reserva
const createReservation = async (req, res) => {
    try {
        
        const { userId, restaurantId, date, numberOfGuests, menuItems, contactInfo } = req.body;

        const user = await User.findById(userId);
        const restaurant = await Restaurant.findById(restaurantId);

        if (!user || !restaurant) {
            return res.status(404).json({ message: "Usuario o restaurante no encontrado" });
        }

        const newReservation = new Reservation({
            userId,
            restaurantId,
            date,
            numberOfGuests,
            menuItems,
            contactInfo
        });

        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        console.log('XXXXXXXXX');
        res.status(409).json({ message: err.message });
    }
};

const editReservation = async (req, res) => {
    try {
        const reservation = req.body;
        console.log(reservation);
        const updated = await Reservation.findByIdAndUpdate(reservation.id, reservation,  { new: true });
        if(!updated) {
            res.status(404).json({ message: "No se ha podido modificar la reserva"});
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getUserReservations = async (req, res) => {
    try {
        const { userId } = req.query;
        const reservations = await Reservation.find({ userId });
        if(!reservations){
            res.status(404).json({ message: "No hay reservas para este usuario"});
        }
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserRestaurantReservations = async (req, res) => {
    try {
        const { userId, restaurantId } = req.query;
        const reservations = await Reservation.find({ userId, restaurantId });
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};


const getRestaurantReservations = async (req, res) => {
    try {
        const { restaurantId } = req.query;
        const reservations = await Reservation.find({ restaurantId });
        if(!reservations){
            res.status(404).json({ message: "No hay reservas para este restaurante"});
        }
        res.status(200).json(reservations);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


const deleteReservation = async (req, res) => {
    try {
        const { id } = req.query;
        const deleted = await Reservation.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json({ message: "Reserva eliminada con éxito", deleted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Exportar las funciones
module.exports = {
    createReservation,
    getUserReservations,
    getRestaurantReservations,
    deleteReservation,
    getUserRestaurantReservations,
    editReservation
};

