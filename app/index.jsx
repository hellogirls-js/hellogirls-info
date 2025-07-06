import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './root'; // Assuming App.js is in the same directory

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
