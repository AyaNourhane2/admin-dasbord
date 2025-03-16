import React, { useState } from 'react';
import '../styles/ReservationManagement.css'; // Importez le fichier CSS
import hotelImage from '../assets/hotel.webp'; // Importez une image pour le fond

function ReservationManagement() {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({ roomNumber: '', guestName: '', date: '' });

  const addReservation = () => {
    setReservations([...reservations, newReservation]);
    setNewReservation({ roomNumber: '', guestName: '', date: '' });
  };

  return (
    <div className="reservation-management" style={{ backgroundImage: `url(${hotelImage})` }}>
      <h2>Gestion des Réservations</h2>
      <div className="reservation-form">
        <input
          type="text"
          placeholder="Numéro de chambre"
          value={newReservation.roomNumber}
          onChange={(e) => setNewReservation({ ...newReservation, roomNumber: e.target.value })}
          className="reservation-input"
        />
        <input
          type="text"
          placeholder="Nom du client"
          value={newReservation.guestName}
          onChange={(e) => setNewReservation({ ...newReservation, guestName: e.target.value })}
          className="reservation-input"
        />
        <input
          type="date"
          value={newReservation.date}
          onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
          className="reservation-input"
        />
        <button onClick={addReservation} className="add-reservation-button">
          Ajouter Réservation
        </button>
      </div>
      <ul className="reservation-list">
        {reservations.map((reservation, index) => (
          <li key={index} className="reservation-item">
            <span>Chambre {reservation.roomNumber}</span>
            <span>{reservation.guestName}</span>
            <span>{reservation.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationManagement;