import React from "react";
import ReservationCard from "../components/cards/reservationCard"; // Asegúrate de que la ruta sea correcta

const reservation = {
  contactInfo: { guestName: "Juan Pérez", phone: "123-456-7890" }, // Datos de contacto
  date: "2023-09-15T19:00:00.000Z", // Fecha de la reserva
  numberOfGuests: 4, // Número de invitados
  totalAmount: 120.5, // Total a pagar
  status: "confirmed", // Estado de la reserva
};

const App = () => {
  return (
    <div className="container mt-4">
      <h1>Detalles de la Reserva</h1>
      <ReservationCard reservation={reservation} />{" "}
      {/* Muestra la tarjeta de la reserva */}
    </div>
  );
};

export default App;
