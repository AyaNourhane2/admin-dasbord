import React, { useState } from 'react';
import '../styles/Navbar.css';
import profileImage from '../assets/profile.webp';
import { FaTachometerAlt, FaBed, FaCalendarAlt, FaUsers, FaEnvelope, FaChartLine, FaCog, FaSignOutAlt, FaConciergeBell, FaBars, FaCheckCircle, FaBroom } from 'react-icons/fa';

function Navbar({ setActiveTab, adminName }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTabState] = useState('dashboard'); // État pour suivre l'onglet actif

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleTabClick = (tab) => {
    setActiveTabState(tab); // Mettre à jour l'onglet actif
    setActiveTab(tab); // Appeler la fonction parente
  };

  return (
    <nav className={isCollapsed ? 'collapsed' : ''}>
      {/* Bouton de bascule pour replier/déplier la barre */}
      <button className="toggle-button" onClick={toggleNavbar}>
        <FaBars />
      </button>

      {/* Section du profil */}
      <div className="profile-section">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h3 className="profile-name">{adminName}</h3>
        <p className="profile-role">Admin</p>
      </div>

      {/* Boutons de navigation */}
      <button
        className={activeTab === 'dashboard' ? 'active' : ''}
        onClick={() => handleTabClick('dashboard')}
      >
        <FaTachometerAlt /> <span>Tableau de bord</span>
      </button>
      <button
        className={activeTab === 'rooms' ? 'active' : ''}
        onClick={() => handleTabClick('rooms')}
      >
        <FaBed /> <span>Chambres</span>
      </button>
      <button
        className={activeTab === 'reservations' ? 'active' : ''}
        onClick={() => handleTabClick('reservations')}
      >
        <FaCalendarAlt /> <span>Réservations</span>
      </button>
      <button
        className={activeTab === 'users' ? 'active' : ''}
        onClick={() => handleTabClick('users')}
      >
        <FaUsers /> <span>Comptes Utilisateurs</span>
      </button>
      <button
        className={activeTab === 'messages' ? 'active' : ''}
        onClick={() => handleTabClick('messages')}
      >
        <FaEnvelope /> <span>Messages et Emails</span>
      </button>
      <button
        className={activeTab === 'reports' ? 'active' : ''}
        onClick={() => handleTabClick('reports')}
      >
        <FaChartLine /> <span>Rapports</span>
      </button>
      <button
        className={activeTab === 'services' ? 'active' : ''}
        onClick={() => handleTabClick('services')}
      >
        <FaConciergeBell /> <span>Services</span>
      </button>
      <button
        className={activeTab === 'compatible' ? 'active' : ''}
        onClick={() => handleTabClick('compatible')}
      >
        <FaCheckCircle /> <span>Service Compatible</span>
      </button>
      <button
        className={activeTab === 'cleaning' ? 'active' : ''}
        onClick={() => handleTabClick('cleaning')}
      >
        <FaBroom /> <span>Service de ménage</span>
      </button>
      <button
        className={activeTab === 'logout' ? 'active' : ''}
        onClick={() => handleTabClick('logout')}
      >
        <FaSignOutAlt /> <span>Déconnexion</span>
      </button>
    </nav>
  );
}

export default Navbar;