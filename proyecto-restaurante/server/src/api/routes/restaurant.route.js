const express = require('express');
const router = express.Router();
const { authRestaurant, getAllRestaurants, getRestaurantById, getRestaurantByName, getRestaurantsByCategory } = require('../controllers/restaurant.controller');
const { verifyToken }  = require ('../../middleware/auth')

// Ruta para crear un restaurante
router.post('/register', authRestaurant);

// Ruta para obtener todos los restaurantes
router.get('/all', getAllRestaurants);

// Ruta para obtener un restaurante por id
router.get('/', getRestaurantById);

// Ruta para obtener un restaurante por nombre
router.get('/search', getRestaurantByName);

// Ruta para obtener restaurantes por categoría
router.get('/category', getRestaurantsByCategory);

module.exports = router;