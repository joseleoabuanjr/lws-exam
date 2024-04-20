import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"

export default function NavBar() { 
    
    const token = 1;

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
                <li className="nav-item">
                    <Link to="/guest/login">Login</Link>
                </li>
                <li {...token == 1 ? className="nav-item" : className="nav-item--hidden"}>
                    <Link to="/guest/signup">Sign Up</Link>
                </li>
                <li {...token == 1 ? className="nav-item--hidden" : className="nav-item"}>
                <Link to="">Logout</Link>
                </li>
            </ul>
        </nav>
      </div>
    )
}