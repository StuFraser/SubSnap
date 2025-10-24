import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Banner from "./layout/banner/banner";
import PostFeed from './features/PostFeed/PostFeed';
import Home from "./features/home/Home";
import ProtectedRoute from './layout/protectedroute/ProtectedRoute';

function App() {

  return (
    <>
      <Router>
        <div className='AppLayout'>
          <Banner />
          <div className='main-content'>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/default" element={<ProtectedRoute><PostFeed type="default" /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><PostFeed type="favorites" /></ProtectedRoute>} />
              <Route path="/popular" element={<ProtectedRoute><PostFeed type="popular" /></ProtectedRoute>} />
              <Route path="/new" element={<ProtectedRoute><PostFeed type="new" /></ProtectedRoute>} />
              <Route path="/callback" element={<Navigate to="/" replace/>} />
            </Routes>
          </div >
        </div >
      </Router>

    </>
  )
}

export default App
