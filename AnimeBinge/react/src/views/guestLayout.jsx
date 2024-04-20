import { Link, Outlet } from "react-router-dom";
export default function guestLayout(){

    return (
      <>
        <div className="navbar">
          <nav className="Nav">
            <h2>AnimeBinge</h2>
              <ul className="nav-menu">
                  <li className="nav-item">
                      <Link to="/guest">Home</Link>
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
                  <li className="nav-item">
                      <Link to="/guest/signup">Sign Up</Link>
                  </li>
              </ul>
          </nav>
        </div>
        <Outlet/>
      </>
    )
}