import React, { useState, useEffect } from 'react';
import '../styles/UserManagement.css';
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaEdit, FaTrash, FaUserPlus, FaMoon, FaSun } from 'react-icons/fa';
import img from '../assets/img.webp';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch users from the backend on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usersmanag');
      const data = await response.json();
      setUsers(data); // Pas besoin de formater les données si le backend renvoie déjà le bon format
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Add a new user
  const addUser = async () => {
    if (newUser.username && newUser.role) {
      try {
        const response = await fetch('http://localhost:3000/api/usersmanag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newUser.username, userType: newUser.role }),
        });
        const data = await response.json();
        setUsers([...users, data]); // Ajoute le nouvel utilisateur à la liste
        setNewUser({ username: '', role: '' }); // Réinitialise le formulaire
        showNotification("Utilisateur ajouté avec succès !");
      } catch (error) {
        console.error('Error adding user:', error);
      }
    } else {
      showNotification("Veuillez remplir tous les champs.", true);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/api/usersmanag/${id}`, {
          method: 'DELETE',
        });
        setUsers(users.filter(user => user.id !== id)); // Met à jour l'état local
        showNotification("Utilisateur supprimé avec succès !");
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Update a user
  const updateUser = async (id) => {
    const userToUpdate = users.find(user => user.id === id);
    const updatedUsername = prompt("Nouveau nom d'utilisateur", userToUpdate.name);
    const updatedRole = prompt("Nouveau rôle", userToUpdate.userType);

    if (updatedUsername && updatedRole) {
      try {
        const response = await fetch(`http://localhost:3000/api/usersmanag/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: updatedUsername, userType: updatedRole }),
        });
        const data = await response.json();
        const updatedUsers = users.map(user => (user.id === id ? data : user));
        setUsers(updatedUsers); // Met à jour l'état local
        showNotification("Utilisateur modifié avec succès !");
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination on search
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Show notification
  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification disappears after 3 seconds
  };

  // Filter and sort users
  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.userType && user.userType.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark mode toggle button */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.isError ? 'error' : 'success'}`}>
          {notification.message}
        </div>
      )}

      <div className="user-management">
        {/* Header with image */}
        <div className="header-with-image">
          <img src={img} alt="Gestion des utilisateurs" className="header-image" />
          <h2 className="title">Gestion des Utilisateurs</h2>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Sort button */}
        <button onClick={toggleSortOrder} className="sort-button">
          {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          Trier par nom ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>

        {/* User form */}
        <div className="user-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="user-input"
          />
          <input
            type="text"
            placeholder="Rôle"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="user-input"
          />
          <button onClick={addUser} className="add-user-button">
            <FaUserPlus /> Ajouter
          </button>
        </div>

        {/* User list */}
        <ul className="user-list">
          {currentUsers.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.userType}</span>
              <div className="user-actions">
                <button onClick={() => updateUser(user.id)} className="edit-button">
                  <FaEdit /> Modifier
                </button>
                <button onClick={() => deleteUser(user.id)} className="delete-button">
                  <FaTrash /> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;