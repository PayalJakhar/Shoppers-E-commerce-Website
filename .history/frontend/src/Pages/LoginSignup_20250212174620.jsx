
import React, { useState, useEffect, useContext } from 'react';
import './Css/LoginSignup.css';

export default function LoginSignup() {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({ username: "", password: "", email: "" });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchDonationCount = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/donation/count/${email}`);
            const data = await response.json();
            if (data.success) {
                updateDonationCount(data.count);
            } else {
                console.error("Error fetching donation count:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleAuth = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                localStorage.setItem('userEmail', formData.email);
                setUserEmail(formData.email);
                await fetchDonationCount(formData.email);
                window.location.replace("/");
            } else {
                alert(responseData.errors);
            }
        } catch (error) {
            console.error("Authentication Error:", error);
        }
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setUserEmail(storedEmail);
            fetchDonationCount(storedEmail);
        }
    }, []);

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />}
                    <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
                </div>
                <button onClick={() => handleAuth(state === "Login" ? 'http://localhost:4000/login' : 'http://localhost:4000/signup')}>Continue</button>
                {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => setState("Login")}>Login Here</span></p> : <p className='loginsignup-login'>Create an account? <span onClick={() => setState("Sign Up")}>Click Here</span></p>}
                <div className="loginsignup-agree">
                    <input type='checkbox' />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    );
}
