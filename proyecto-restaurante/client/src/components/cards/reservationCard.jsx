import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const restaurantReservationCards = (reservation) => {
  const {
    contactInfo: { guestName, phone },
    date,
    numberOfGuests,
    status,
  } = reservation;
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Reserva de {guestName}</h5>
        <p className="card-text">
          <strong>Fecha:</strong> {new Date(date).toLocaleDateString()}
        </p>
        <p className="card-text">
          <strong>Número de Invitados:</strong> {numberOfGuests}
        </p>
        
        <p className="card-text">
          <strong>Estado:</strong>{" "}
          <span className={`badge bg-${getStatusColor(status)}`}>{status}</span>
        </p>
        <p className="card-text">
          <strong>Teléfono de Contacto:</strong> {phone}
        </p>
      </div>
    </div>
  );
};

// Función para asignar color según el estado
const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

export default restaurantReservationCards;
