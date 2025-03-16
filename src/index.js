import React from 'react';
import { createRoot } from 'react-dom/client'; // Importation correcte pour React 18+
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Crée une racine React
root.render(<App />); // Rend l'application