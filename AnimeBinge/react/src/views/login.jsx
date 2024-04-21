import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";

export default function Login() {
  const { token } = useStateContext()
  if(token){
    
  }

    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState(null);

    const onSubmit = events => {
      events.preventDefault()
  
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }

      axiosClient.post('/login', payload)
        .then(({data}) => {
          setUser(data.user);
          setToken(data.token);
          // Reset errors
          setErrors(null);
        })
        .catch((error) => {
          const response = error.response;
          console.log(response);
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            setMessage(response.data.message);
          }
        })
    }
 
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