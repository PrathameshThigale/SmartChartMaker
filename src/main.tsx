import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import fonts
import '@fontsource/inter';
import '@fontsource/roboto';
import '@fontsource/poppins';
import '@fontsource/lato';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);