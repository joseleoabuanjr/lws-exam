import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function Navigation() {

    const { user, token, setUser, setToken, } = useStateContext();

    if(!token){
        return <Navigate to="/login"/>
    }

    const onLogout = events => {
        events.preventDefault();
    
        axiosClient.post('/logout')
          .then(() => {
            setUser({});
            setToken(null);
          })
      }

      useEffect(() => {
        axiosClient.get('/home')
          .then(({data}) => {
             setUser(data);
          })
      }, [])

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