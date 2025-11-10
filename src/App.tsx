import './App.css'
import Header from '@/components/layout/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from '@/features/auth/Callback';

function App() {



  return (
    <>
      <Header />
      <div className="app-content">
        <h1>SubSnap</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/auth/callback" element={<Callback />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
