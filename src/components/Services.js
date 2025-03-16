// Services.js
import React from 'react';
import '../styles/Services.css';
import restaurantImage from '../assets/restaurant1.webp';
import spaImage from '../assets/spa1.webp';
import emergencyImage from '../assets/urgence1.webp';
import gymImage from '../assets/gym1.webp';
import roomServiceImage from '../assets/roomservice1.webp';
import { FaUtensils, FaSpa, FaMedkit, FaDumbbell, FaConciergeBell } from 'react-icons/fa';

function Services() {
  const services = [
    {
      name: 'Restauration',
      description: 'Profitez de nos délicieux plats préparés par nos chefs étoilés. Cuisine locale et internationale à votre disposition.',
      image: restaurantImage,
      icon: <FaUtensils className="service-icon" />,
    },
    {
      name: 'Spa',
      description: 'Détendez-vous avec nos soins spa de luxe. Massages, soins du visage et bains relaxants vous attendent.',
      image: spaImage,
      icon: <FaSpa className="service-icon" />,
    },
    {
      name: 'Service d\'urgence',
      description: 'Notre service d\'urgence est disponible 24/7 pour assurer votre sécurité et votre bien-être.',
      image: emergencyImage,
      icon: <FaMedkit className="service-icon" />,
    },
    {
      name: 'Gym',
      description: 'Maintenez votre routine sportive dans notre salle de sport entièrement équipée, ouverte 24h/24.',
      image: gymImage,
      icon: <FaDumbbell className="service-icon" />,
    },
    {
      name: 'Room Service',
      description: 'Commandez des plats et boissons directement dans votre chambre. Disponible 24h/24 pour votre confort.',
      image: roomServiceImage,
      icon: <FaConciergeBell className="service-icon" />,
    },
  ];

  return (
    <div className="services">
      <h2>Nos Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="icon-container">{service.icon}</div>
            <img src={service.image} alt={service.name} className="service-image" />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
