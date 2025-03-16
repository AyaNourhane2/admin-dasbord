import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import '../styles/Reports.css';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Importez les images
import gymImage from '../assets/gym.webp';
import spaImage from '../assets/spa.webp';
import roomServiceImage from '../assets/roomservice.webp';
import restaurantImage from '../assets/restaurant.webp';
import emergencyImage from '../assets/emergency.webp'; // Importez l'image pour le service d'urgence

Chart.register(...registerables);

function Reports() {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [hotelPerformance, setHotelPerformance] = useState({
    occupancyRate: 85,
    averageRating: 4.5,
    totalBookings: 1200,
    revenue: 250000,
  });

  const [servicePerformance, setServicePerformance] = useState([
    { service: 'Restaurant', satisfaction: 90, usage: 800 },
    { service: 'Spa', satisfaction: 85, usage: 300 },
    { service: 'Room Service', satisfaction: 88, usage: 600 },
    { service: 'Gym', satisfaction: 92, usage: 400 },
    { service: 'Urgence', satisfaction: 95, usage: 100 }, // Ajout du service d'urgence
  ]);

  const [selectedService, setSelectedService] = useState(null); // Pour la modale

  // Références pour les graphiques
  const occupancyChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const satisfactionChartRef = useRef(null);

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simule un chargement de 2 secondes

    return () => clearTimeout(timer);
  }, []);

  // Effet pour initialiser les graphiques
  useEffect(() => {
    if (loading) return;

    // Graphique pour le taux d'occupation mensuel
    const occupancyCtx = occupancyChartRef.current.getContext('2d');
    const occupancyChart = new Chart(occupancyCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [
          {
            label: 'Taux d\'occupation (%)',
            data: [70, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70, 65],
            borderColor: '#6c5ce7',
            backgroundColor: 'rgba(108, 92, 231, 0.2)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    // Graphique pour le revenu par service
    const revenueCtx = revenueChartRef.current.getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: servicePerformance.map((service) => service.service),
        datasets: [
          {
            label: 'Revenu (€)',
            data: [50000, 30000, 40000, 20000, 15000], // Ajout du revenu pour le service d'urgence
            backgroundColor: ['#6c5ce7', '#00b894', '#ff7675', '#fdcb6e', '#74b9ff'], // Ajout d'une nouvelle couleur
            borderColor: ['#5a4abf', '#00a383', '#d63031', '#e17055', '#0984e3'], // Ajout d'une nouvelle couleur
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    // Graphique en camembert pour la satisfaction des services
    const satisfactionCtx = satisfactionChartRef.current.getContext('2d');
    const satisfactionChart = new Chart(satisfactionCtx, {
      type: 'pie',
      data: {
        labels: servicePerformance.map((service) => service.service),
        datasets: [
          {
            label: 'Satisfaction (%)',
            data: servicePerformance.map((service) => service.satisfaction),
            backgroundColor: ['#6c5ce7', '#00b894', '#ff7675', '#fdcb6e', '#74b9ff'], // Ajout d'une nouvelle couleur
            borderColor: ['#5a4abf', '#00a383', '#d63031', '#e17055', '#0984e3'], // Ajout d'une nouvelle couleur
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    // Nettoyer les graphiques lors du démontage du composant
    return () => {
      occupancyChart.destroy();
      revenueChart.destroy();
      satisfactionChart.destroy();
    };
  }, [loading, selectedPeriod]);

  // Fonction pour exporter les données au format CSV
  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Service,Satisfaction (%),Usage\n' +
      servicePerformance
        .map((service) => `${service.service},${service.satisfaction},${service.usage}`)
        .join('\n') +
      '\n\n' +
      'Performance de l\'hôtel\n' +
      `Taux d'occupation,${hotelPerformance.occupancyRate}%\n` +
      `Note moyenne,${hotelPerformance.averageRating}/5\n` +
      `Réservations totales,${hotelPerformance.totalBookings}\n` +
      `Revenu total,${hotelPerformance.revenue.toLocaleString()} €`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'rapport_performance.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction pour exporter les données au format PDF
  const exportToPDF = () => {
    const input = document.getElementById('reports-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('rapport_performance.pdf');
    });
  };

  // Fonction pour gérer le changement de période
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
    setLoading(true); // Simuler un rechargement des données
    setTimeout(() => setLoading(false), 1000); // Simuler un chargement de 1 seconde
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSelectedPeriod('month');
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Fonction pour ouvrir la modale avec les détails du service
  const openServiceModal = (service) => {
    setSelectedService(service);
  };

  // Fonction pour fermer la modale
  const closeServiceModal = () => {
    setSelectedService(null);
  };

  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="reports" id="reports-content">
      <h2>Rapports Analytiques</h2>
      <p>Cette page contient les rapports sur les performances de l'hôtel et des services.</p>

      {/* Filtre de période */}
      <div className="period-filter">
        <label htmlFor="period">Période :</label>
        <select id="period" value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="month">Mois</option>
          <option value="quarter">Trimestre</option>
          <option value="year">Année</option>
        </select>
        <button onClick={resetFilters} className="reset-button">
          Réinitialiser
        </button>
      </div>

      {/* Indicateur de chargement */}
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Chargement des données...</p>
        </div>
      ) : (
        <>
          {/* Section des performances de l'hôtel */}
          <div className="hotel-performance">
            <h3>Performances de l'Hôtel</h3>
            <div className="stats">
              <div className="stat-item">
                <img
                  src={restaurantImage}
                  alt="Restaurant"
                  className="stat-image"
                />
                <span className="stat-label">Taux d'occupation</span>
                <span className="stat-value">{hotelPerformance.occupancyRate}%</span>
              </div>
              <div className="stat-item">
                <img
                  src={spaImage}
                  alt="Spa"
                  className="stat-image"
                />
                <span className="stat-label">Note moyenne</span>
                <span className="stat-value">{hotelPerformance.averageRating}/5</span>
              </div>
              <div className="stat-item">
                <img
                  src={roomServiceImage}
                  alt="Room Service"
                  className="stat-image"
                />
                <span className="stat-label">Réservations totales</span>
                <span className="stat-value">{hotelPerformance.totalBookings}</span>
              </div>
              <div className="stat-item">
                <img
                  src={gymImage}
                  alt="Gym"
                  className="stat-image"
                />
                <span className="stat-label">Revenu total</span>
                <span className="stat-value">{hotelPerformance.revenue.toLocaleString()} €</span>
              </div>
            </div>
          </div>

          {/* Section des performances des services */}
          <div className="service-performance">
            <h3>Performances des Services</h3>
            <div className="export-buttons">
              <button onClick={exportToCSV} className="export-button">
                Exporter en CSV
              </button>
              <button onClick={exportToPDF} className="export-button">
                Exporter en PDF
              </button>
            </div>
            <table className="service-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Taux de satisfaction (%)</th>
                  <th>Utilisation</th>
                </tr>
              </thead>
              <tbody>
                {servicePerformance.map((service, index) => (
                  <tr key={index} onClick={() => openServiceModal(service)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={
                            service.service === 'Restaurant'
                              ? restaurantImage
                              : service.service === 'Spa'
                              ? spaImage
                              : service.service === 'Room Service'
                              ? roomServiceImage
                              : service.service === 'Gym'
                              ? gymImage
                              : emergencyImage // Ajout du service d'urgence
                          }
                          alt={service.service}
                          className="service-image"
                        />
                        {service.service}
                      </div>
                    </td>
                    <td>{service.satisfaction}%</td>
                    <td>{service.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section des graphiques */}
          <div className="charts">
  <h3>Graphiques des Performances</h3>
  <div className="chart-container">
    {/* Colonne de gauche pour Satisfaction par service */}
    <div className="chart-small">
      <h4>Satisfaction par service</h4>
      <canvas ref={satisfactionChartRef}></canvas>
    </div>

    {/* Colonne de droite pour les autres graphiques */}
    <div className="chart-large">
      <div className="chart">
        <h4>Taux d'occupation mensuel</h4>
        <canvas ref={occupancyChartRef}></canvas>
      </div>
      <div className="chart">
        <h4>Revenu par service</h4>
        <canvas ref={revenueChartRef}></canvas>
      </div>
    </div>
  </div>
</div>

          {/* Section des analyses */}
          <div className="analysis">
            <h3>Analyses</h3>
            <p>
              Le taux d'occupation de l'hôtel est de <strong>{hotelPerformance.occupancyRate}%</strong>, ce qui indique une forte demande.
              La note moyenne de <strong>{hotelPerformance.averageRating}/5</strong> montre que les clients sont satisfaits des services proposés.
            </p>
            <p>
              Parmi les services, le <strong>Restaurant</strong> est le plus utilisé avec <strong>{servicePerformance[0].usage}</strong> utilisations,
              tandis que le <strong>Spa</strong> a un taux de satisfaction de <strong>{servicePerformance[1].satisfaction}%</strong>.
            </p>
          </div>
        </>
      )}

      {/* Modale pour afficher les détails du service */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeServiceModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Détails du Service : {selectedService.service}</h3>
            <p><strong>Taux de satisfaction :</strong> {selectedService.satisfaction}%</p>
            <p><strong>Utilisation :</strong> {selectedService.usage}</p>
            <button onClick={closeServiceModal} className="close-modal-button">
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Bouton pour revenir en haut de la page */}
      <button onClick={scrollToTop} className="scroll-to-top">
        ↑
      </button>
    </div>
  );
}

export default Reports;