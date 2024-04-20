import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function defaultLayout() {

  const { token } = useStateContext()

  if(!token){
    return <Navigate to="/login" />
  }

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