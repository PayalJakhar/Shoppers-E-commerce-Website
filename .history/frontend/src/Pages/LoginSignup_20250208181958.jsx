import React, { useState } from 'react'
import './Css/LoginSignup.css'
export default function LoginSignup() {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
  });
  const [donationCount, setDonationCount] = useState(0);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',//post is to send data to the server
      headers:{
        Accept:'application/form-data',//client needs the data in form-data format
        'content-Type':'application/json',//Indicates that the data being sent in the body of the request is in JSON format. 
      },
      body: JSON.stringify(formData),//Example Input: { username: 'John', email: 'john@example.com', password: '1234' }
                                            //Output: {"username":"John","email":"john@example.com","password":"1234"}
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      //in local storage we are saving our generated token in the key name auth-token
      window.location.replace("/");
      //here we are sending our user to the home page
    }
    else{
      alert(responseData.errors);
    }
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
      body: JSON.stringify(formData),//Example Input: { username: 'John', email: 'john@example.com', password: '1234' }
                                            //Output: {"username":"John","email":"john@example.com","password":"1234"}
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      //in local storage we are saving our generated token in the key name auth-token
      window.location.replace("/");
      //here we are sending our user to the home page
    }
    else{
      alert(responseData.errors);
    }
  }


  const fetchDonationCount =  async(email) =>{
    try{
        const response = await fetch(`http://localhost:4000/donation/count/${email}`);
        const data = await response.json();
        if(data.success){
            setDonationCount(data.count);
        }
        else{
            console.error("Error fetching donation count:", data.error)
        }
        
    }catch (error) {
        console.error("Error:", error);
      }
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
