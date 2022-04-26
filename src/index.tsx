import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import GlobalStyles from 'styles/globalStyles'
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
