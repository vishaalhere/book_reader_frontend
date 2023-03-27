import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BooksProvider } from './context/booksContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </React.StrictMode>,
)
