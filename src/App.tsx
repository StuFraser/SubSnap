import './App.css'
import Header from '@/components/layout/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from '@/pages/Callback';
import Home from '@/pages/home/Home';
import Subreddit from "@/pages/subreddit/Subreddit";

function App() {

  return (
    <div className='App'>
      <Router>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/subreddit/:name" element={<Subreddit name='Popular' />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App

