
import { useRef } from "react";
import { Link } from "react-router-dom";
export default function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const Submit = useRef();

  return (
    <>
      <div className="login-signup-form">
          <div className="form">
              <h1 className="title">
                  Sign Up
              </h1>
              <form onSubmit={Submit}>
                  <input ref={nameRef} type="username" placeholder="Username" />
                  <input ref={emailRef} type="email" placeholder="Email" />
                  <input ref={passwordRef} type="password" placeholder="Password" />
                  <button className="btn">Sign Up</button>
                  <p className="message">
                      Already Have An Account? <Link to= '/guest/login'>Login</Link>
                  </p>
              </form>
          </div>
      </div>
    </>
  )
}