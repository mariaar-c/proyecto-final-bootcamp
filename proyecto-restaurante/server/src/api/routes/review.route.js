const express = require('express');
const router = express.Router();
const {
    createReview,
    getRestaurantReviews,
    deleteReview
} = require('../controllers/review.controller');

// Ruta para crear una nueva reseña
router.post('/', createReview);


// Ruta para obtener las reseñas de un restaurante
router.get('/restaurant/', getRestaurantReviews);



// Ruta para eliminar una reseña
router.delete('/delete', deleteReview);

module.exports = router;