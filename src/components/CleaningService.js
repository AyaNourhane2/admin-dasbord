import React, { useState } from 'react';
import { FaUser, FaTshirt, FaBell, FaTrash, FaSearch, FaFilter, FaPlus, FaArrowLeft, FaArrowRight, FaEdit } from 'react-icons/fa';
import '../styles/CleaningService.css';

function CleaningService() {
  // État pour le suivi du personnel
  const [staff, setStaff] = useState([
    { id: 1, name: 'Jean Dupont', status: 'présent', performance: 'excellent' },
    { id: 2, name: 'Marie Curie', status: 'absent', performance: 'bon' },
  ]);

  // État pour la gestion des stocks
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Serviettes', quantity: 50, needsRestock: false },
    { id: 2, item: 'Détergent', quantity: 10, needsRestock: true },
  ]);

  // État pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Nombre d'employés par page

  // État pour l'édition d'un employé
  const [editingStaff, setEditingStaff] = useState(null);
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editPerformance, setEditPerformance] = useState('');

  // Fonction pour mettre à jour les stocks
  const updateInventory = (itemId, newQuantity) => {
    setInventory(inventory.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Fonction pour supprimer un employé
  const removeStaff = (staffId) => {
    setStaff(staff.filter(employee => employee.id !== staffId));
  };

  // Fonction pour ajouter un nouvel employé
  const addStaff = () => {
    const newStaff = {
      id: staff.length + 1,
      name: 'Nouvel Employé',
      status: 'présent',
      performance: 'moyen',
    };
    setStaff([...staff, newStaff]);
  };

  // Fonction pour éditer un employé
  const editStaff = (employee) => {
    setEditingStaff(employee.id);
    setEditName(employee.name);
    setEditStatus(employee.status);
    setEditPerformance(employee.performance);
  };

  // Fonction pour sauvegarder les modifications d'un employé
  const saveStaff = () => {
    setStaff(staff.map(employee =>
      employee.id === editingStaff ? { ...employee, name: editName, status: editStatus, performance: editPerformance } : employee
    ));
    setEditingStaff(null);
  };

  // Filtrer les employés en fonction du terme de recherche et du statut
  const filteredStaff = staff.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="cleaning-service">
      <h1>Gestion du Service de Ménage</h1>

      {/* Section 1 : Suivi du personnel */}
      <section className="staff-section">
        <h2><FaUser /> Suivi du Personnel</h2>
        
        {/* Barre de recherche et filtres */}
        <div className="search-filter-bar">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-bar">
            <FaFilter />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Tous</option>
              <option value="présent">Présent</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>

        {/* Liste des employés */}
        <div className="staff-list">
          {currentStaff.map((employee) => (
            <div key={employee.id} className="staff-card">
              <div className="staff-info">
                {editingStaff === employee.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="présent">Présent</option>
                      <option value="absent">Absent</option>
                    </select>
                    <select
                      value={editPerformance}
                      onChange={(e) => setEditPerformance(e.target.value)}
                    >
                      <option value="excellent">Excellent</option>
                      <option value="bon">Bon</option>
                      <option value="moyen">Moyen</option>
                    </select>
                    <button className="save-button" onClick={saveStaff}>
                      Sauvegarder
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{employee.name}</h3>
                    <p>Statut: {employee.status}</p>
                    <p>Performance: {employee.performance}</p>
                  </>
                )}
              </div>
              <div className="staff-actions">
                <button className="edit-button" onClick={() => editStaff(employee)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => removeStaff(employee.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredStaff.length}
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Bouton pour ajouter un nouvel employé */}
        <button className="add-button" onClick={addStaff}>
          <FaPlus /> Ajouter un employé
        </button>
      </section>

      {/* Section 2 : Gestion des stocks */}
      <section className="inventory-section">
        <h2><FaTshirt /> Gestion des Stocks</h2>
        <div className="inventory-list">
          {inventory.map((item) => (
            <div key={item.id} className="inventory-card">
              <h3>{item.item}</h3>
              <p>Quantité: {item.quantity}</p>
              {item.needsRestock && (
                <button className="restock-button" onClick={() => updateInventory(item.id, item.quantity + 10)}>
                  Commander <FaBell />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CleaningService;