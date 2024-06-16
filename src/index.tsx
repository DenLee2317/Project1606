import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';

// Найти контейнер root
const container = document.getElementById('root');
if (container) {
  // Создать корень и рендерить приложение
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root container not found");
}