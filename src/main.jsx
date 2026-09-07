import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css' // <--- Make sure this matches your CSS filename (e.g., './style.css')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)