const bcrypt = require('bcrypt');
const Restaurant = require('../models/restaurant.model');

// Función para autenticar un restaurante
const authRestaurant = async (req, res) => {
    try {
        const {
            name,
            address,
            picture,
            category,
            password
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newRestaurant = new Restaurant({
            name,
            address,
            picture,
            category,
            password: passwordHash
        });

        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Función para obtener todos los restaurantes
const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.query;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }
        res.status(200).json({ restaurant });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRestaurantByName = async (req, res) => {
    try {
        const { name } = req.query;
        const restaurant = await Restaurant.find({ name: new RegExp(name, "i") });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }
        res.status(200).json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRestaurantsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const restaurants = await Restaurant.find({ category: category });
        if (restaurants.length === 0) {
            return res.status(200).json({ message: "No hay restaurantes todavía para esta categoría" });
        }
        res.status(200).json(restaurants);  // Devuelve directamente la lista de restaurantes
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    authRestaurant,
    getRestaurantById,
    getRestaurantByName,
    getRestaurantsByCategory,
    getAllRestaurants
};