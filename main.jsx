import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <-- Importação crucial para o Tailwind funcionar
import { InventoryProvider } from './context/InventoryContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </React.StrictMode>,
)
