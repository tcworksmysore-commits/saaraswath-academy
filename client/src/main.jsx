import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';
import './styles/site.css';

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
