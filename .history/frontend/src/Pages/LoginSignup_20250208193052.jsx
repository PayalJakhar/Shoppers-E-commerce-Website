// import React, { useState, useEffect, useContext } from 'react';
// import { DonationContext } from '../Context/DonationContext';
// import './Css/LoginSignup.css';

// export default function LoginSignup() {
//   const [state, setState] = useState("Login");
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: "",
//   });
//   const { updateDonationCount } = useContext(DonationContext);

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const fetchDonationCount = async (email) => {
//     try {
//         const response = await fetch(`http://localhost:4000/donation/count/${email}`);
//         const data = await response.json();
//         if (data.success) {
//             updateDonationCount(data.count);  // Update context
//         } else {
//             console.error("Error fetching donation count:", data.error);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// };

//   const login = async () => {
//     console.log("Login Function Executed", formData);
//     let responseData;
//     await fetch('http://localhost:4000/login', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => (responseData = data));

//     if (responseData.success) {
//       localStorage.setItem('auth-token', responseData.token);
//       localStorage.setItem('userEmail', formData.email);
//       fetchDonationCount(formData.email); // ✅ Fetch donation count AFTER login
//       window.location.replace("/");
//     } else {
//       alert(responseData.errors);
//     }
//   };

//   const signup = async () => {
//     console.log("Signup Function Executed", formData);
//     let responseData;
//     await fetch('http://localhost:4000/signup', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => (responseData = data));

//     if (responseData.success) {
//       localStorage.setItem('auth-token', responseData.token);
//       localStorage.setItem('userEmail', formData.email);
//       fetchDonationCount(formData.email); // ✅ Fetch donation count AFTER signup
//       window.location.replace("/");
//     } else {
//       alert(responseData.errors);
//     }
//   };

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("userEmail");
//     if (storedEmail) {
//       fetchDonationCount(storedEmail);
//     }
//   }, []);

//   return (
//     <div className='loginsignup'>
//       <div className="loginsignup-container">
//         <h1>{state}</h1>
//         <div className="loginsignup-fields">
//           {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />}
//           <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
//           <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
//         </div>
//         <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
//         {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => setState("Login")}>Login Here</span></p> : <p className='loginsignup-login'>Create an account? <span onClick={() => setState("Sign Up")}>Click Here</span></p>}
//         <div className="loginsignup-agree">
//           <input type='checkbox' />
//           <p>By continuing, I agree to the terms of use & privacy policy</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useContext } from 'react';
import { DonationContext } from '../Context/DonationContext';  // Import context
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
            const response = await fetch(http://localhost:4000/donation/count/${email});
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