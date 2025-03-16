import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaTrash, FaEdit, FaEnvelope, FaSearch, FaEye, FaEyeSlash, FaSort } from 'react-icons/fa';
import '../styles/MessagesAndEmails.css';

const MESSAGE_TYPES = {
  RECEIVED: 'reçu',
  SENT: 'envoyé',
};

const INITIAL_MESSAGES = [
  { id: 1, type: MESSAGE_TYPES.RECEIVED, from: 'Employé 1', content: 'Bonjour, voici le rapport...', date: '2023-10-01', read: false, category: 'Travail' },
  { id: 2, type: MESSAGE_TYPES.SENT, to: 'Employé 2', content: 'Merci pour votre travail...', date: '2023-10-02', read: true, category: 'Travail' },
  { id: 3, type: MESSAGE_TYPES.RECEIVED, from: 'Employé 3', content: 'Pouvez-vous vérifier ceci ?', date: '2023-10-03', read: false, category: 'Personnel' },
];

const INITIAL_NEW_MESSAGE = {
  to: '',
  subject: '',
  content: '',
  category: 'Travail',
};

function MessagesAndEmails() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState(INITIAL_NEW_MESSAGE);
  const [editingMessage, setEditingMessage] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'received', 'sent'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date'); // 'date', 'from', 'to', 'category'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage({
      ...newMessage,
      [name]: value,
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (editingMessage) {
      const updatedMessages = messages.map((message) =>
        message.id === editingMessage.id
          ? { ...message, to: newMessage.to, content: newMessage.content, category: newMessage.category }
          : message
      );
      setMessages(updatedMessages);
      setEditingMessage(null);
    } else {
      const message = {
        id: messages.length + 1,
        type: MESSAGE_TYPES.SENT,
        to: newMessage.to,
        content: newMessage.content,
        date: new Date().toISOString().split('T')[0],
        read: true,
        category: newMessage.category,
      };
      setMessages([...messages, message]);
    }

    setNewMessage(INITIAL_NEW_MESSAGE);
    alert(editingMessage ? 'Message modifié avec succès !' : 'Message envoyé avec succès !');
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setNewMessage({
      to: message.to,
      subject: message.subject || '',
      content: message.content,
      category: message.category,
    });
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
    alert('Message supprimé avec succès !');
  };

  const handleMarkAsRead = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
  };

  const handleMarkAsUnread = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, read: false } : message
    );
    setMessages(updatedMessages);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredMessages = messages
    .filter((message) => {
      const matchesType =
        filterType === 'all' ||
        (filterType === 'received' && message.type === MESSAGE_TYPES.RECEIVED) ||
        (filterType === 'sent' && message.type === MESSAGE_TYPES.SENT);

      const matchesSearch =
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (message.type === MESSAGE_TYPES.RECEIVED && message.from.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (message.type === MESSAGE_TYPES.SENT && message.to.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="messages-container">
      <h2><FaEnvelope /> Messages et Emails</h2>

      <div className="filters">
        <label>
          Filtrer par type :
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Tous</option>
            <option value="received">Reçus</option>
            <option value="sent">Envoyés</option>
          </select>
        </label>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Rechercher un message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="compose-message">
        <h3>{editingMessage ? 'Modifier le message' : 'Écrire un nouveau message'}</h3>
        <form onSubmit={handleSendMessage}>
          <div>
            <label>À :</label>
            <input type="text" name="to" value={newMessage.to} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Sujet :</label>
            <input type="text" name="subject" value={newMessage.subject} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Catégorie :</label>
            <select name="category" value={newMessage.category} onChange={handleInputChange}>
              <option value="Travail">Travail</option>
              <option value="Personnel">Personnel</option>
            </select>
          </div>
          <div>
            <label>Message :</label>
            <textarea name="content" value={newMessage.content} onChange={handleInputChange} required />
          </div>
          <div className="buttons">
            <button className="send-btn" type="submit"><FaPaperPlane /> {editingMessage ? 'Modifier' : 'Envoyer'}</button>
            {editingMessage && <button className="cancel-btn" type="button" onClick={() => setEditingMessage(null)}>Annuler</button>}
          </div>
        </form>
      </div>

      <table className="messages-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('type')}>Type <FaSort /></th>
            <th onClick={() => handleSort('from')}>De/À <FaSort /></th>
            <th>Contenu</th>
            <th onClick={() => handleSort('date')}>Date <FaSort /></th>
            <th onClick={() => handleSort('category')}>Catégorie <FaSort /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMessages.map((message) => (
            <tr key={message.id} className={message.read ? 'read' : 'unread'}>
              <td>{message.type}</td>
              <td>{message.type === MESSAGE_TYPES.RECEIVED ? message.from : message.to}</td>
              <td>{message.content}</td>
              <td>{message.date}</td>
              <td>{message.category}</td>
              <td>
                {message.type === MESSAGE_TYPES.RECEIVED && (
                  <button className="read-btn" onClick={() => handleMarkAsRead(message.id)}>
                    {message.read ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
                <button className="edit-btn" onClick={() => handleEditMessage(message)}><FaEdit /> Modifier</button>
                <button className="delete-btn" onClick={() => handleDeleteMessage(message.id)}><FaTrash /> Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredMessages.length / messagesPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MessagesAndEmails;