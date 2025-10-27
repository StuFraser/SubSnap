import './App.css'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Banner from "./layout/banner/banner";
import PostFeed from './features/PostFeed/PostFeed';
import Home from "./features/home/Home";
import ProtectedRoute from './layout/protectedroute/ProtectedRoute';
import SubRedditListing from "./features/subredditlisting/SubRedditListing";
import { selectIsAuthenticated } from './features/auth/RedditAuthSlice';
import { fetchSubredditsBySearch } from './features/subredditlisting/SubRedditListingSlice';

function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (!isAuthenticated) { return }
    //console.log(searchTerm);
    dispatch(fetchSubredditsBySearch(searchTerm))
    navigate("/search")
  }

  return (
    <>
      <div className='AppLayout'>
        <Banner onSearch={handleSearch} />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/r/:subredditName" element={<PostFeed />} />
            <Route path="*" element={<div>Page not found</div>} />
            <Route path="/callback" element={<Navigate to="/" replace />} />
            <Route path="/search" element={<ProtectedRoute><SubRedditListing /></ProtectedRoute>} />
          </Routes>
        </div >
      </div >
    </>
  )
}

export default App
