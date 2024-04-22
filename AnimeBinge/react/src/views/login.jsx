import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";

export default function Login() {
  // Destructure token from useStateContext
  const { token } = useStateContext();

  // Refs for email and password inputs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Destructure setUser and setToken from useStateContext
  const { setUser, setToken } = useStateContext();

  // State for message and errors
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  // Function to handle form submission
  const onSubmit = (events) => {
    events.preventDefault();

    // Get values from input refs
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // Send POST request to login endpoint
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        // Set user data and token in context
        setUser(data.user);
        setToken(data.token);
        // Reset message and errors
        setMessage(null);
        setErrors(null);
      })
      .catch((error) => {
        const response = error.response;
        console.log(response);
        if (response && response.status === 422) {
          // Set errors and message from the response
          setErrors(response.data.errors);
          setMessage(response.data.message);
        }
      });
  };
 
  return (
    <>
      <div className="login-signup-form">
          <div className="form">
              <h1 className="title">
                  Login
              </h1>
              <form onSubmit={onSubmit}>
                {message == "Provided email or password is incorrect" &&
                  <div className="alert">
                    <p>{message}</p>
                  </div>
                }
                <input ref={emailRef} type="email" placeholder="Email" id="email"/>
                {errors && errors.email && <span className="error">{errors.email[0]}</span>}
                <input ref={passwordRef} type="password" placeholder="Password" id="pass"/>
                {errors && errors.password && <span className="error">{errors.password[0]}</span>}
                <button className="btn">Login</button>
                <p className="message">
                    Don't have an account? <Link to= '/signup'>Sign Up</Link>
                </p>
              </form>
          </div>
      </div>
    </>
  )
}