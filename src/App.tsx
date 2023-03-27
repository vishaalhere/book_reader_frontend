import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import AddBook from './pages/AddBookPage'
import Header from './components/Header'

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<BookDetails />} />
        <Route path='/add' element={<AddBook />} />
        <Route path='/favourites' element={<AddBook />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
