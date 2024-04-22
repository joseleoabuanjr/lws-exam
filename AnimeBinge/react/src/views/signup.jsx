
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";

export default function Signup() {

  // Refs to hold the references to the input fields
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password_confirmation = useRef(); // Ref for password confirmation, should be named consistently

  // State to hold validation errors
  const [errors, setErrors] = useState(null);

  // Destructuring setUser and setToken functions from useStateContext
  const { setUser, setToken } = useStateContext();

  // Function to handle form submission
  const onSubmit = (events) => {
    events.preventDefault();

    // Get input values from form using refs
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmation.current.value,
    };

    // Post Data to signup endpoint
    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        // Set user and token in the context
        setUser(data.user);
        setToken(data.token);
        // Reset errors
        setErrors(null);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          // Log the error response and set errors state
          console.log(response);
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <div className="login-signup-form">
          <div className="form">
              <h1 className="title">
                  Sign Up
              </h1>
              
              <form onSubmit={onSubmit}>
                  <input ref={nameRef} type="name" placeholder="Name" id="name"/>
                  {errors && errors.name && <span className="error">{errors.name[0]}</span>}
                  <input ref={emailRef} type="email" placeholder="Email" id="email"/>
                  {errors && errors.email && <span className="error">{errors.email[0]}</span>}
                  <input ref={passwordRef} type="password" placeholder="Password" id="password"/>
                  {errors && errors.password && <span className="error">{errors.password[0]}</span>}
                  <input ref={password_confirmation} type="password" placeholder="Confirm Password" id="password_confirmation"/>
                  <button className="btn">Sign Up</button>
                  <p className="message">
                      Already have an Account? <Link to= '/login'>Login</Link>
                  </p>
              </form>
          </div>
      </div>
    </>
  )
}