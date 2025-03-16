// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import RoomManagement from './components/RoomManagement';
import ReservationManagement from './components/ReservationManagement';
import MessagesAndEmails from './components/MessagesAndEmails';
import Reports from './components/Reports';
import Services from './components/Services';
import CompatibleService from './components/CompatibleService';
import CleaningService from './components/CleaningService'; // Importez le nouveau composant
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // Onglet actif par défaut

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'rooms':
        return <RoomManagement />;
      case 'reservations':
        return <ReservationManagement />;
      case 'messages':
        return <MessagesAndEmails />;
      case 'reports':
        return <Reports />;
      case 'services':
        return <Services />;
      case 'compatible':
        return <CompatibleService />;
      case 'cleaning': // Ajoutez le cas pour le service de ménage
        return <CleaningService />;
      default:
        return <Dashboard />; // Par défaut, afficher le tableau de bord
    }
  };

  return (
    <div className="App">
      <Navbar setActiveTab={setActiveTab} adminName="John Doe" />
      <div className="content">
        {renderActiveTab()}
      </div>
    </div>
  );
}

export default App;