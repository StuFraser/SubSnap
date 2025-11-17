import './App.css'
import Header from '@/components/layout/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from '@/pages/Callback';
import Home from '@/pages/home/Home';
import Subreddit from "@/pages/subreddit/Subreddit";
import SubRedditListing from './pages/subredditlisting/SubRedditListing';

function App() {

  return (
    <div className='app'>
      <Router>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/subreddit/:name" element={<Subreddit name='Popular' />} />
            <Route path="/subscribed" element={<SubRedditListing />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App

