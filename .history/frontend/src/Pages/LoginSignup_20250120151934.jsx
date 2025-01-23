import React, { useState } from 'react'
import './Css/LoginSignup.css'
export default function LoginSignup() {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    console.log("Login Function Executed",formData);
  }
  const signup = async () => {
    console.log("Signup Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',//post is to send data to the server
      headers:{
        Accept:'application/form-data',//client needs the data in form-data format
        'content-Type':'application/json',//Indicates that the data being sent in the body of the request is in JSON format. 
      },
      body: JSON.stingify(formData),//Example Input: { username: 'John', email: 'john@example.com', password: '1234' }
                                            //Output: {"username":"John","email":"john@example.com","password":"1234"}
    }).then((response)=>response.json()).then((data)=>responseData=data)
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }} >Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p> : <></>}
        {state === "Login" ? <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p> : <></>}

        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}
