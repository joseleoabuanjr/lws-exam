
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";
export default function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password_confirmation = useRef();

  const {setUser, setToken} = useStateContext();

  const onSubmit =  (events) =>{
    events.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmation.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({data})=> {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
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
                  <input ref={emailRef} type="email" placeholder="Email" id="email"/>
                  <input ref={passwordRef} type="password" placeholder="Password" id="password"/>
                  <input ref={password_confirmation} type="password" placeholder="Confirm Password" id="password_confirmation"/>
                  <button className="btn">Sign Up</button>
                  <p className="message">
                      Already Have An Account? <Link to= '/login'>Login</Link>
                  </p>
              </form>
          </div>
      </div>
    </>
  )
}