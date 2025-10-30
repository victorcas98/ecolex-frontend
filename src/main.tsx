import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routes'
import { AppProvider } from './contexts/AppProvider'
import { AccessibilityProvider } from './contexts'

// Configuração do react-axe em desenvolvimento
// Descomente após instalar: npm install react-axe --save-dev
/*
if (import.meta.env.MODE === 'development') {
  import('react-axe').then((axe) => {
    const React = require('react');
    const ReactDOM = require('react-dom/client');
    axe.default(React, ReactDOM, 1000);
  }).catch(console.error);
}
*/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessibilityProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AccessibilityProvider>
  </StrictMode>,
)
