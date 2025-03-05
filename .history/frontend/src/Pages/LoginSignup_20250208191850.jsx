import React, { useState, useEffect, useContext } from 'react';
import { DonationContext } from '../../Context/DonationContext';  // Import context
import './Css/LoginSignup.css';

export default function LoginSignup() {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const { updateDonationCount } = useContext(DonationContext);  // Use context

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            fetchDonationCount(formData.email);  // Fetch donation count after login
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    };

    const fetchDonationCount = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/donation/count/${email}`);
            const data = await response.json();
            if (data.success) {
                updateDonationCount(data.count);  // Update context
            } else {
                console.error("Error fetching donation count:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const donate = async () => {
        let responseData;
        await fetch('http://localhost:4000/donation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email, /* other fields */ }),
        })
        .then((response) => response.json())
        .then((data) => responseData = data);

        if (responseData.success) {
            updateDonationCount(responseData.count);  // Update context immediately
        } else {
            alert(responseData.error);
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
                </div>
                <button onClick={() => { state === "Login" ? login() : donate() }} >Continue</button>
            </div>
        </div>
    );
}
