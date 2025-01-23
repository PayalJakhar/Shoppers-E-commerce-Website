import React, { useState } from 'react'
import './Css/LoginSignup.css'
export default function LoginSignup() {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState();

  const login = async ()=>{
    console.log("Login Function Executed");
  }
  const signup = async ()=>{
    console.log("signup Function Executed");
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sing Up"?<input type='text' placeholder='Your Name'/>:<></>}
          <input type='email' placeholder='Email Address'/>
          <input type='password' placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} >Continue</button>
        {state=== "Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>:<></>}
        {state=== "Login"?<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>:<></>}
        
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}
