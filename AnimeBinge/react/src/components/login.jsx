import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit =  (events) =>{
      events.preventDefault();
    };
 
  return (
    <>
      <div className="login-signup-form">
          <div className="form">
              <h1 className="title">
                  Login
              </h1>
              <form onSubmit={onSubmit}>
              <input ref={emailRef} type="email" placeholder="Email" id="email"/>
                  <input ref={passwordRef} type="password" placeholder="Password" id="pass"/>
                  <button className="btn">Login</button>
                  <p className="message">
                      Don't have an account? <Link to= '/guest/signup'>Sign Up</Link>
                  </p>
              </form>
          </div>
      </div>
    </>
  )
}