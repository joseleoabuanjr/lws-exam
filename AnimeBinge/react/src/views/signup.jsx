
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";

export default function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password_confirmation = useRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const onSubmit =  (events) =>{
    events.preventDefault();

    //get inputed value from form
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmation.current.value,
    }

    //Post Data
    axiosClient.post('/signup', payload)
      .then(({data})=> {
        setUser(data.user);
        setToken(data.token);
        // Reset errors
        setErrors(null);
      })
      .catch((error) => {
        const response = error.response;
        if(response && response.status === 422){
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