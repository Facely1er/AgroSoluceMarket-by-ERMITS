/**
 * AgroSoluce Intelligence Mobile App - PWA Entry Point
 * 
 * Separate PWA application for mobile devices
 * Completely independent from the main web app
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

