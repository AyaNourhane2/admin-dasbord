import React, { useState } from 'react';
import '../styles/RoomManagement.css'; 
import r1 from '../assets/r1.webp';
import r2 from '../assets/r2.webp';
import r3 from '../assets/r3.webp';
import r4 from '../assets/r4.webp';
import r5 from '../assets/r5.webp';
import r6 from '../assets/r6.webp';
import r7 from '../assets/r7.webp';
import r8 from '../assets/r8.webp';
import r9 from '../assets/r9.webp';

function RoomManagement() {
  const [rooms, setRooms] = useState([
    {
      number: '1001',
      type: 'Chambre Standard',
      price: '100€',
      image: r1,
      description: 'Chambre confortable avec lit double et salle de bain privée.',
      equipment: [
        'Lit confortable (double)',
        'Table de chevet avec lampe de lecture',
        'Télévision avec chaînes nationales et internationales',
        'Wi-Fi gratuit',
      ],
      status: 'libre' // Ajout du statut
    },
    {
      number: '1002',
      type: 'Chambre Supérieure',
      price: '150€',
      image: r2,
      description: 'Chambre spacieuse avec vue sur la mer et balcon privé.',
      equipment: [
        'Lit king-size avec matelas premium',
        'Balcon privé avec vue',
        'Téléviseur grand écran avec Netflix',
        'Mini-bar rempli (payant)',
      ],
      status: 'occupé' // Ajout du statut
    },
    {
      number: '1003',
      type: 'Chambre Deluxe',
      price: '200€',
      image: r3,
      description: 'Suite luxueuse avec salon séparé et jacuzzi privé.',
      equipment: [
        'Machine à espresso (Nespresso)',
        'Plancher chauffant en salle de bain',
        'Douche à effet pluie',
        'Salle de bain en marbre avec double vasque'
      ],
      status: 'libre' // Ajout du statut
    },
    {
      number: '1004',
      type: 'Suite Junior',
      price: '250€',
      image: r4,
      description: 'Suite luxueuse avec salon séparé et jacuzzi privé.',
      equipment: [
        'Bureau avec imprimante/scanner',
        'Douche à effet pluie et produits de bain exclusifs',
        'Salle de bain en marbre avec double vasque',
        'Télévision dans la salle de bain',
      ],
      status: 'en-nettoyage' // Ajout du statut
    },
    {
      number: '1005',
      type: 'Chambre Deluxe',
      price: '200€',
      image: r5,
      description: 'Suite luxueuse avec salon séparé et jacuzzi privé.',
      equipment: [
        'Téléviseur grand écran avec Netflix',
        'Mini-bar rempli (payant)',
        'Machine à espresso (Nespresso)',
        'Plancher chauffant en salle de bain',
      ],
      status: 'occupé' // Ajout du statut
    },
    {
      number: '1006',
      type: 'Suite Junior',
      price: '250€',
      image: r6,
      description: 'Suite luxueuse avec salon séparé et jacuzzi privé.',
      equipment: [
        'Service de majordome',
        'Choix d\'oreillers (ferme, moelleux, mémoire de forme)',
        'Tablette de contrôle (lumière, climatisation, rideaux)',
        'Bureau avec imprimante/scanner',
      ],
      status: 'libre' // Ajout du statut
    },
    {
      number: '1007',
      type: 'Chambre Supérieure',
      price: '150€',
      image: r7,
      description: 'Chambre spacieuse avec vue sur la mer et balcon privé.',
      equipment: [
        'Machine à espresso (Nespresso)',
        'Plancher chauffant en salle de bain',
        'Douche à effet pluie',
        'Salle de bain en marbre avec double vasque'
      ],
      status: 'en-nettoyage' // Ajout du statut
    },
    {
      number: '1008',
      type: 'Chambre Standard',
      price: '100€',
      image: r8,
      description: 'Chambre confortable avec lit double et salle de bain privée.',
      equipment: [
        'Rideaux occultants',
        'Mini-réfrigérateur',
        'Bouilloire / Machine à café',
        'Prises électriques et ports USB'
      ],
      status: 'libre' // Ajout du statut
    },
    {
      number: '1009',
      type: 'Chambre Deluxe',
      price: '200€',
      image: r9,
      description: 'Suite luxueuse avec salon séparé et jacuzzi privé.',
      equipment: [
        'Mini-bar rempli (payant)',
        'Produits de toilette haut de gamme',
        'Enceinte Bluetooth',
        'Machine à espresso (Nespresso)',
      ],
      status: 'occupé' // Ajout du statut
    }
    // Ajoutez le statut pour les autres chambres...
  ]);

  

const [newRoom, setNewRoom] = useState({ 
  number: '', 
  type: '', 
  price: '', 
  image: null, 
  description: '', 
  equipment: [], 
  status: 'libre' // Statut par défaut
});

const [editingRoomIndex, setEditingRoomIndex] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewRoom({ ...newRoom, image: reader.result });
    };
    reader.readAsDataURL(file);
  }
};

const addRoom = () => {
  if (editingRoomIndex !== null) {
    const updatedRooms = [...rooms];
    updatedRooms[editingRoomIndex] = newRoom;
    setRooms(updatedRooms);
    setEditingRoomIndex(null);
  } else {
    setRooms([...rooms, newRoom]);
  }
  setNewRoom({ number: '', type: '', price: '', image: null, description: '', equipment: [], status: 'libre' });
};

const editRoom = (index) => {
  setNewRoom(rooms[index]);
  setEditingRoomIndex(index);
};

const deleteRoom = (index) => {
  // Afficher une boîte de dialogue de confirmation
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?");
  
  // Si l'utilisateur confirme, supprimer la chambre
  if (confirmDelete) {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  }
};


return (
  <div className="room-management">
    <h2>Gestion des Chambres</h2>
    <div className="room-form">
      <input
        type="text"
        placeholder="Numéro de chambre"
        value={newRoom.number}
        onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
        className="room-input"
      />
      <input
        type="text"
        placeholder="Type de chambre"
        value={newRoom.type}
        onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
        className="room-input"
      />
      <input
        type="text"
        placeholder="Prix"
        value={newRoom.price}
        onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
        className="room-input"
      />
      <input
        type="text"
        placeholder="Description"
        value={newRoom.description}
        onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
        className="room-input"
      />
      <select
        value={newRoom.status}
        onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
        className="room-input"
      >
        <option value="libre">Libre</option>
        <option value="occupé">Occupé</option>
        <option value="en-nettoyage">En nettoyage</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="room-input"
      />
      <button onClick={addRoom} className="add-room-button">
        {editingRoomIndex !== null ? 'Modifier Chambre' : 'Ajouter Chambre'}
      </button>
    </div>
    <div className="room-grid">
      {rooms.map((room, index) => (
        <div key={index} className="room-card">
          {room.image && <img src={room.image} alt={`Chambre ${room.number}`} className="room-image" />}
          <div className="room-info">
            <h3>Chambre {room.number}</h3>
            <p><strong>Type:</strong> {room.type}</p>
            <p><strong>Prix:</strong> {room.price}</p>
            <p><strong>Description:</strong> {room.description}</p>
            <div className="room-equipment">
              <h4>Équipements :</h4>
              <ul>
                {room.equipment.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="room-actions">
              <button onClick={() => editRoom(index)} className="edit-button">
                Modifier
              </button>
              <button onClick={() => deleteRoom(index)} className="delete-button">
                Supprimer
              </button>
            </div>
            <div className={`status ${room.status}`}>
              {room.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default RoomManagement;