import React, { useState } from 'react';
import '../styles/Navbar2.css';

const Navbar2 = () => {
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'Employé 1', 
      content: 'Bonjour, je voudrais réserver une chambre.', 
      replies: [] 
    },
    { 
      id: 2, 
      sender: 'Employé 2', 
      content: 'Avez-vous des chambres disponibles ce week-end ?', 
      replies: [] 
    },
  ]);
  const [reply, setReply] = useState('');

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const handleReply = (messageId) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId 
        ? { ...msg, replies: [...msg.replies, { sender: 'Admin', content: reply }] } 
        : msg
    );
    setMessages(updatedMessages);
    setReply('');
  };

  return (
    <div className="navbar2">
      <div className="navbar2-left">
        <h1>Tableau de Bord Administrateur</h1>
      </div>
      <div className="navbar2-right">
        <div className="navbar2-message" onClick={toggleMessages}>
          <span className="message-icon">✉️</span>
          <span className="message-count">{messages.length}</span>
        </div>

        {showMessages && (
          <div className="message-box">
            {/* Bouton pour fermer la boîte des messages avec une icône X */}
            <div className="message-box-header">
              <h3>Messages Reçus</h3>
              <button className="close-button" onClick={toggleMessages}>
                × {/* Icône X */}
              </button>
            </div>
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className="message-item">
                  <p><strong>{msg.sender}</strong>: {msg.content}</p>
                  {msg.replies.map((reply, index) => (
                    <p key={index}><strong>{reply.sender}</strong>: {reply.content}</p>
                  ))}
                  <textarea
                    placeholder="Répondre..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button onClick={() => handleReply(msg.id)}>Envoyer</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar2;