import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const Submit = useRef();
 
  return (
    <>
      <div className="login-signup-form">
          <div className="form">
              <h1 className="title">
                  Login
              </h1>
              <form onSubmit={Submit}>
              <input ref={emailRef} type="email" placeholder="Email" />
                  <input ref={passwordRef} type="password" placeholder="Password" />
                  <button className="btn">Login</button>
                  <p className="message">
                      Not Registered? <Link to= '/guest/signup'>Create a new account</Link>
                  </p>
              </form>
          </div>
      </div>
    </>
  )
}