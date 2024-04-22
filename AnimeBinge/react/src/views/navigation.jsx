import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function Navigation() {

  // Destructuring user, token, setUser, and setToken from useStateContext
  const { user, token, setUser, setToken } = useStateContext();

  // If no token is present, navigate to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Function to handle logout
  const onLogout = (events) => {
    events.preventDefault();

    // Send POST request to logout endpoint
    axiosClient.post('/logout')
      .then(() => {
        // Clear user and token from context
        setUser({});
        setToken(null);
      });
  };

  // useEffect to fetch user data when component mounts
  useEffect(() => {
    axiosClient.get('/home')
      .then(({ data }) => {
        // Set user data in context
        setUser(data);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once when component mounts

    return(
    <div className="navbar">
        <nav className="Nav">
            <h2>AnimeBinge</h2>
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/discover">Discover</Link>
                </li>
                <li className="nav-item">
                    <Link to="/">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/">{user.name}</Link>
                </li>
                <li className="nav-item">
                    <Link to="/logout" onClick={onLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    </div>
    )
}