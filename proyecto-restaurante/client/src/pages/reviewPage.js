import React from "react";
import ReviewCard from "../components/cards/reviewCard"; // Asegúrate de que la ruta sea correcta

// Simulación de los datos de una reseña
const review = {
  userId: { name: "Juan Pérez" }, // Simulando el nombre del usuario
  text: "La comida estuvo excelente, pero el servicio podría mejorar.",
  score: 4, // Puntuación de 1 a 5
  createdAt: "2023-08-25T12:34:56.789Z", // Fecha de la reseña
};

const ReviewFront = () => {
  return (
    <div className="container mt-4">
      <h1>Reseña</h1>
      <ReviewCard review={review} /> {/* Muestra una tarjeta de reseña */}
    </div>
  );
};

export default ReviewFront;
