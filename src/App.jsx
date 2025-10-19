import { useSelector } from 'react-redux';
import './App.css'
import AuthButton from "./features/auth/AuthButton"
import { selectIsAuthenticated } from "./features/auth/RedditAuthSlice"
import UserProfile from './features/user/UserProfile';
import Banner from "./layout/banner/banner";

function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
        <Banner />
      <h1> Subsnap</h1>
      {/*{isAuthenticated ? <UserProfile /> : <AuthButton />}
      <RedditPosts subreddit="javascript" limit={10} />*/}
    </>
  )
}

export default App
