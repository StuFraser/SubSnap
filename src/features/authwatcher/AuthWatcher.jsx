import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectExpiry, selectInitialized } from "../auth/RedditAuthSlice"

const AuthWatcher = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const expiresAt = useSelector(selectExpiry);
    const initialized = useSelector(selectInitialized);

    useEffect(() => {
        console.log("Is Authenticated: ", isAuthenticated);
        console.log("Initialized: ", initialized);
        if (initialized && !isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, initialized, navigate]);

    useEffect(() => {
        console.log("Expires At: ", expiresAt);
        if (expiresAt) {
            const timeout = expiresAt - Date.now();
            if (timeout > 0) {
                const timer = setTimeout(() => dispatch(clearToken()), timeout);
                return () => clearTimeout(timer);
            }
        }
    }, [expiresAt]);

    return null; // doesn’t render anything
}

export default AuthWatcher;