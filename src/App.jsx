import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Banner from "./layout/banner/banner";
import PostFeed from './features/PostFeed/PostFeed';
import { selectIsAuthenticated } from './features/auth/RedditAuthSlice';
import { useSelector } from 'react-redux';
import Home from "./features/home/Home";
import NavBar from './layout/navigation/navbar';


function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <Router>
        <div className='AppLayout'>
          <Banner />
          <div className='main-content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/default" element={<PostFeed type="default" />} />
              <Route path="/favorites" element={<PostFeed type="favorites" />} />
              <Route path="/popular" element={<PostFeed type="popular" />} />
              <Route path="/new" element={<PostFeed type="new" />} />
            </Routes>
          </div >
        </div >
      </Router>

    </>
  )
}

export default App
