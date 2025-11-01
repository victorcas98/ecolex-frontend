import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routes'
import { AppProvider } from './contexts/AppProvider'
import { AccessibilityProvider } from './contexts'
import React from 'react'

// Configuração do react-axe em desenvolvimento
// if (import.meta.env.MODE === 'development') {
//   import('react-axe').then((axe) => {
//     axe.default(React, createRoot, 1000);
//   }).catch(() => {
//     // react-axe não instalado, ignorar silenciosamente
//   });
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessibilityProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AccessibilityProvider>
  </StrictMode>,
)
