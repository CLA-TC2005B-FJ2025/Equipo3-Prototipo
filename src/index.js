import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tus estilos globales
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="430294053962-dbati47mg98airn8jjeifr9jgt83birc.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
