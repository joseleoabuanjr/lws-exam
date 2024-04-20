import { Link, Outlet } from "react-router-dom";

export default function defaultLayout() {

    return (
      <>
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
                      <Link to="/guest/login">Logout</Link>
                  </li>
              </ul>
          </nav>
        </div>
        <Outlet/>
      </>
    )
}