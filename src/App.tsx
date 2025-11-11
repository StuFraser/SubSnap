import './App.css'
import Header from '@/components/layout/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from '@/pages/Callback';
import Home from '@/pages/home/Home';

function App() {

  return (
    <>
      <Router>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App

