import React, { useState } from 'react';
import { FaChartLine, FaFileInvoice, FaCoins, FaHandHoldingUsd, FaBalanceScale, FaUsers, FaReceipt, FaClock, FaMoneyCheckAlt, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../styles/CompatibleService.css';

const CompatibleService = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [showPaiements, setShowPaiements] = useState(false);
  const [showTaxes, setShowTaxes] = useState(false);
  const [showInvoicesModal, setShowInvoicesModal] = useState(false); // Nouvel état pour afficher les factures

  // Utilisation de useState pour gérer la liste des responsabilités
  const [responsibilities, setResponsibilities] = useState([
    {
      icon: <FaReceipt />,
      title: "Génération de factures et reçus",
      description: "Créer et émettre des factures et des reçus pour les clients et les partenaires.",
      details: "La génération de factures et reçus inclut la création de documents professionnels, l'envoi aux clients, et l'archivage pour référence future."
    },
    {
      icon: <FaClock />,
      title: "Suivi des paiements en attente",
      description: "Surveiller les paiements en attente et prendre les mesures nécessaires pour leur règlement.",
      details: "Le suivi des paiements en attente implique l'identification des retards, la communication avec les clients, et la mise en place de rappels."
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [newResponsibility, setNewResponsibility] = useState({ icon: '', title: '', description: '', details: '' });
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const icons = [
    { component: <FaReceipt />, name: "FaReceipt" },
    { component: <FaClock />, name: "FaClock" },
    { component: <FaMoneyCheckAlt />, name: "FaMoneyCheckAlt" },
    { component: <FaChartLine />, name: "FaChartLine" },
    { component: <FaFileInvoice />, name: "FaFileInvoice" },
    { component: <FaCoins />, name: "FaCoins" },
    { component: <FaHandHoldingUsd />, name: "FaHandHoldingUsd" },
    { component: <FaBalanceScale />, name: "FaBalanceScale" },
    { component: <FaUsers />, name: "FaUsers" }
  ];

  // Données factices pour les paiements
  const dummyPaymentData = [
    { id: 1, type: "Financial", amount: 1000, paid: true },
    { id: 2, type: "Paiements", amount: 500, paid: false },
    { id: 3, type: "Payroll", amount: 2000, paid: true },
    { id: 4, type: "Audit et Taxes", amount: 1500, paid: false },
  ];

  // Données factices pour les paiements des clients
  const dummyCustomerPayments = [
    { id: 1, customerName: "Client A", paymentDate: "2023-10-01", amount: 300, paymentType: "Carte bancaire" },
    { id: 2, customerName: "Client B", paymentDate: "2023-10-05", amount: 150, paymentType: "Espèce" },
    { id: 3, customerName: "Client C", paymentDate: "2023-10-10", amount: 500, paymentType: "Virement bancaire" },
    { id: 4, customerName: "Client D", paymentDate: "2023-10-15", amount: 200, paymentType: "Portefeuille électronique" },
  ];

  // Données factices pour les taxes
  const dummyTaxes = [
    { id: 1, taxType: "TVA", amount: 500, dueDate: "2023-11-01", status: "Payé" },
    { id: 2, taxType: "Impôt sur les sociétés", amount: 1500, dueDate: "2023-12-15", status: "En attente" },
    { id: 3, taxType: "Taxe de séjour", amount: 300, dueDate: "2023-10-20", status: "Payé" },
    { id: 4, taxType: "Taxe foncière", amount: 1000, dueDate: "2024-01-10", status: "En attente" },
  ];

  // Données factices pour les factures
  const dummyInvoices = [
    { id: 1, invoiceNumber: "INV001", customerName: "Client A", amount: 1000, date: "2023-10-01", status: "Payé" },
    { id: 2, invoiceNumber: "INV002", customerName: "Client B", amount: 500, date: "2023-10-05", status: "En attente" },
    { id: 3, invoiceNumber: "INV003", customerName: "Client C", amount: 2000, date: "2023-10-10", status: "Payé" },
    { id: 4, invoiceNumber: "INV004", customerName: "Client D", amount: 1500, date: "2023-10-15", status: "En attente" },
  ];

  const handleLearnMoreClick = (index) => {
    setSelectedCard(selectedCard === index ? null : index);

    if (responsibilities[index].title === "Suivi des paiements en attente") {
      setPaymentDetails(dummyPaymentData);
      setShowPaymentModal(true);
    } else if (responsibilities[index].title === "Génération de factures et reçus") {
      setShowInvoicesModal(true); // Afficher la modal des factures
    }
  };

  const handleAddResponsibility = () => {
    if (!newResponsibility.title || !newResponsibility.description || !newResponsibility.details || !selectedIcon) {
      alert("Veuillez remplir tous les champs et sélectionner une icône.");
      return;
    }
    const responsibilityWithIcon = { ...newResponsibility, icon: selectedIcon.component };
    setResponsibilities([...responsibilities, responsibilityWithIcon]);
    setNewResponsibility({ icon: '', title: '', description: '', details: '' });
    setSelectedIcon(null);
    alert("Responsabilité ajoutée avec succès !");
  };

  const handleEditResponsibility = (index) => {
    setIsEditing(index);
    setNewResponsibility(responsibilities[index]);
    setSelectedIcon(icons.find(icon => icon.component === responsibilities[index].icon));
  };

  const handleUpdateResponsibility = () => {
    if (!newResponsibility.title || !newResponsibility.description || !newResponsibility.details || !selectedIcon) {
      alert("Veuillez remplir tous les champs et sélectionner une icône.");
      return;
    }
    const updatedResponsibilities = [...responsibilities];
    updatedResponsibilities[isEditing] = { ...newResponsibility, icon: selectedIcon.component };
    setResponsibilities(updatedResponsibilities);
    setIsEditing(null);
    setNewResponsibility({ icon: '', title: '', description: '', details: '' });
    setSelectedIcon(null);
    alert("Responsabilité mise à jour avec succès !");
  };

  const handleDeleteResponsibility = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette responsabilité ?")) {
      const updatedResponsibilities = responsibilities.filter((_, i) => i !== index);
      setResponsibilities(updatedResponsibilities);
      alert("Responsabilité supprimée avec succès !");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResponsibility({ ...newResponsibility, [name]: value });
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setShowIconPicker(false);
  };

  return (
    <div className="compatible-service-container">
      <h1>Responsabilités du Directeur Général dans le Service Comptable</h1>
      <div className="responsibilities-list">
        {responsibilities.map((responsibility, index) => (
          <div key={index} className="responsibility-card">
            <div className="icon">{responsibility.icon}</div>
            <h3>{responsibility.title}</h3>
            <p>{responsibility.description}</p>
            <button className="learn-more-button" onClick={() => handleLearnMoreClick(index)}>
              {selectedCard === index ? "Moins" : "En savoir plus"}
            </button>
            {selectedCard === index && (
              <div className="details">
                <p>{responsibility.details}</p>
              </div>
            )}
            <div className="admin-actions">
              <button onClick={() => handleEditResponsibility(index)}><FaEdit /></button>
              <button onClick={() => handleDeleteResponsibility(index)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour les paiements */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h2>Suivi des paiements</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => { setShowPaiements(true); setShowTaxes(false); }}>Paiements</button>
              <button onClick={() => { setShowTaxes(true); setShowPaiements(false); }}>Taxes</button>
            </div>
            {showPaiements && (
              <table>
                <thead>
                  <tr>
                    <th>Nom du client</th>
                    <th>Date de paiement</th>
                    <th>Montant</th>
                    <th>Type de paiement</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyCustomerPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.customerName}</td>
                      <td>{payment.paymentDate}</td>
                      <td>{payment.amount} €</td>
                      <td>{payment.paymentType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {showTaxes && (
              <table>
                <thead>
                  <tr>
                    <th>Type de taxe</th>
                    <th>Montant</th>
                    <th>Date d'échéance</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyTaxes.map((tax) => (
                    <tr key={tax.id}>
                      <td>{tax.taxType}</td>
                      <td>{tax.amount} €</td>
                      <td>{tax.dueDate}</td>
                      <td>{tax.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button onClick={() => setShowPaymentModal(false)}>Fermer</button>
          </div>
        </div>
      )}

      {/* Modal pour les factures */}
      {showInvoicesModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h2>Factures</h2>
            <table>
              <thead>
                <tr>
                  <th>Numéro de facture</th>
                  <th>Nom du client</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {dummyInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.customerName}</td>
                    <td>{invoice.amount} €</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowInvoicesModal(false)}>Fermer</button>
          </div>
        </div>
      )}

      <div className="admin-form">
        <h2>{isEditing !== null ? "Modifier une responsabilité" : "Ajouter une nouvelle responsabilité"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={newResponsibility.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newResponsibility.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="details"
          placeholder="Détails"
          value={newResponsibility.details}
          onChange={handleInputChange}
        />
        <div className="icon-picker">
          <button onClick={() => setShowIconPicker(!showIconPicker)}>
            {selectedIcon ? selectedIcon.component : "Sélectionner une icône"}
          </button>
          {showIconPicker && (
            <div className="icon-list">
              {icons.map((icon, index) => (
                <span key={index} onClick={() => handleIconSelect(icon)}>
                  {icon.component}
                </span>
              ))}
            </div>
          )}
        </div>
        <button onClick={isEditing !== null ? handleUpdateResponsibility : handleAddResponsibility}>
          {isEditing !== null ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>
    </div>
  );
};

export default CompatibleService;