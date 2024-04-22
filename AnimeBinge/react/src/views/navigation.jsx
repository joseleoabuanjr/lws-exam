import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

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
        <>
            <Navbar className="bg-body-tertiary" style={{height : 100,}}>
                <Container>
                    <Navbar.Brand href="/" >
                        <h2 style={{fontSize: 30}}>AnimeBinge</h2>
                    </Navbar.Brand>   
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item >
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/discover">Discover</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">About Us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">{user.name}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/logout" onClick={onLogout}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>

   
    )
}