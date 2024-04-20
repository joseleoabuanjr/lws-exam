import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function guestLayout(){

  const { token } = useStateContext()

  if(token){
    return <Navigate to="/home" />
  }

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
                    <Link to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup">Sign Up</Link>
                </li>
            </ul>
        </nav>
      </div>
      <Outlet/>
    </>
  )
}