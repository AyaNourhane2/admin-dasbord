import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('Admin');
  const [email, setEmail] = useState('admin@example.com');

  const handleSave = () => {
    // Logique pour sauvegarder les modifications
    alert('Informations sauvegardées avec succès!');
  };

  const handleDelete = () => {
    // Logique pour supprimer le compte
    alert('Compte supprimé avec succès!');
    navigate('/login'); // Redirige vers la page de connexion après suppression
  };

  return (
    <div className="profile">
      <h1>Profil Administrateur</h1>
      <div className="profile-form">
        <label>
          Nom:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button onClick={handleSave}>Sauvegarder</button>
        <button onClick={handleDelete} className="delete-button">
          Supprimer le Compte
        </button>
      </div>
    </div>
  );
};

export default Profile;