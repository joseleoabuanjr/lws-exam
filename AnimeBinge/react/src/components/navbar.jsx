import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"

export default function NavBar() {
    const location = useLocation();

    const isLoggedIn = location.pathname !== "/guest" ? true : false

    console.log (location);
    
    return (
      <div className="navbar">
        <nav className="Nav">
          <h2>AnimeBinge</h2>
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/*">Discover</Link>
                </li>
                <li className="nav-item">
                    <Link to="/*">About Us</Link>
                </li>
                {isLoggedIn ? (
                <>
                    <li className="nav-item">
                        <Link to="/guest/login">Logout</Link>
                    </li>
                </>
                ) : (
                <>
                    <li className="nav-item">
                        <Link to="/guest/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/guest/signup">Sign Up</Link>
                    </li>
                </>
                )}
            </ul>
        </nav>
      </div>
    )
}