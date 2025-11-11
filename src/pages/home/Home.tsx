import LoginButton from "@/features/auth/LoginButton";
import { useAuthContext } from "@/shared/context/AuthContext";
import Spinner from "@/features/ui/spinner/Spinner";
import "./Home.css"

const Home = () => {

    const { user, isLoading } = useAuthContext();
    const isAuthenticated = !!user;

    if (isLoading) {
        return (<Spinner />);
    }
    if (isAuthenticated && user) {
        return (
            <div>
                <h1>Welcome back, {user?.username}!</h1>
                <p>You're now logged in to SubSnap.</p>
                <div className="snoo-container">
                    <img src="/snoo-thumbsup.png" alt="Thumbs Up" />
                </div>
            </div>

        );
    } else {
        return (
            <div>
                <h1>Welcome SubSnap</h1>
                <p>Your Reddit companion</p>
                <p>SubSnap requires you to log into Reddit to continue</p>
                <LoginButton />
                <div className="snoo-container">
                    <img src="/snoo-point.png" alt="Login Required" />
                </div>
            </div>
        );
    }
};

export default Home;