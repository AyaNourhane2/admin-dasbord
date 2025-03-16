import React, { useState } from 'react';
import '../styles/Dashboard.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter
} from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import hotelImage from '../assets/i1.webp';
import Navbar2 from './Navbar2';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
    phone: '123-456-7890',
  });

  const handleSaveProfile = (updatedInfo) => {
    // Confirmation avant d'enregistrer
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir enregistrer les modifications ?");
    if (isConfirmed) {
      setAdminInfo(updatedInfo);
      setShowProfileForm(false);
      alert("Les informations ont été mises à jour avec succès !");
    }
  };

  const barChartData = [
    { name: 'Jan', Réservations: 40, Revenus: 12000 },
    { name: 'Fév', Réservations: 30, Revenus: 9000 },
    { name: 'Mar', Réservations: 20, Revenus: 6000 },
    { name: 'Avr', Réservations: 27, Revenus: 8100 },
    { name: 'Mai', Réservations: 18, Revenus: 5400 },
    { name: 'Juin', Réservations: 23, Revenus: 6900 },
    { name: 'Juil', Réservations: 34, Revenus: 10200 },
  ];

  const pieChartData = [
    { name: 'Chambres Occupées', value: 12 },
    { name: 'Chambres Disponibles', value: 25 },
  ];

  const scatterChartData = [
    { x: 10, y: 20, z: 200 },
    { x: 12, y: 25, z: 210 },
    { x: 15, y: 30, z: 220 },
    { x: 18, y: 35, z: 230 },
    { x: 20, y: 40, z: 240 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  const ProfileForm = ({ adminInfo, onSave, onClose }) => {
    const [formData, setFormData] = useState(adminInfo);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData); // Appel de la fonction handleSaveProfile
    };

    return (
      <div className="profile-form-overlay">
        <div className="profile-form">
          <h2>Modifier le Profil</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Téléphone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={onClose}>Annuler</button>
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Navbar2 />

      <div className="dashboard-header">
        <h1>Bienvenue sur le tableau de bord de gestion</h1>
        <div className="profile-section">
          <h2>Profil Administrateur</h2>
          <button className="profile-button" onClick={() => setShowProfileForm(true)}>
            Profil
          </button>
        </div>
      </div>

      {showProfileForm && (
        <ProfileForm
          adminInfo={adminInfo}
          onSave={handleSaveProfile}
          onClose={() => setShowProfileForm(false)}
        />
      )}

      <div className="dashboard-content">
        <div className="dashboard-left">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="dashboard-stats">
            <div className="stat-card"><h2>Chambres Disponibles</h2><p>25</p></div>
            <div className="stat-card"><h2>Réservations Actives</h2><p>12</p></div>
            <div className="stat-card"><h2>Utilisateurs Inscrits</h2><p>50</p></div>
          </div>
          <div className="chart-container">
            <h2>Réservations et Revenus par Mois</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Réservations" fill="#8884d8" />
                <Bar dataKey="Revenus" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h2>Taux d'Occupation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-right">
          <div className="hotel-image-container">
            <img src={hotelImage} alt="Hôtel" className="hotel-image" />
          </div>
          <div className="calendar-section">
            <h2>Calendrier des Réservations</h2>
            <Calendar onChange={setDate} value={date} />
          </div>
          <div className="chart-container">
            <h2>Performances du Personnel</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Heures travaillées" unit="h" />
                <YAxis type="number" dataKey="y" name="Tâches accomplies" unit="tâches" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Performance" data={scatterChartData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;