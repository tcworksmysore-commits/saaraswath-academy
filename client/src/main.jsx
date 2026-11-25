import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Self-hosted fonts (latin + Kannada subsets only; no Google Fonts request)
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-800.css';
import '@fontsource/fraunces/latin-600.css';
import '@fontsource/noto-sans-kannada/kannada-500.css';
import '@fontsource/noto-sans-kannada/kannada-600.css';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';
import './styles/site.css';
import './styles/polish.css';

const basename = import.meta.env.BASE_URL || '/';
const el = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Pages are pre-rendered to static HTML at build time; hydrate them, or render fresh in dev.
if (el.hasChildNodes()) ReactDOM.hydrateRoot(el, app);
else ReactDOM.createRoot(el).render(app);
