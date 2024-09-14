const express = require('express');
const router = express.Router();
const { getMenu, getMenuByRestaurantId } = require('../controllers/menu.controller');

// Ruta para obtener el menú del restaurante
router.get('/menu', getMenu);
router.get('/restaurant', getMenuByRestaurantId);





module.exports = router;