import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import coin_icon from '../Assets/Frontend_Assets/coin_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png';
import { DonationContext } from '../../Context/DonationContext';

export default function Navbar() {
    const [menu, setMenu] = useState('shop');
    const { getTotalCartItems } = useContext(ShopContext);
    // const { donationCount} = useContext(DonationContext);  
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            console.log("User is not authenticated.");
            return;
        }
  
        try {
            const response = await fetch("http://localhost:4000/getuser", {
                method: "GET",
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
            });
  
            const data = await response.json();
            console.log("API Response:", data); // Debugging
  
            if (data.success) {
                setUserData({
                    coins: data.coins || 0,
                    donationCount: data.donationCount || 0,
                });
            } else {
                console.error("Failed to fetch user data:", data.errors);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
  
    // Fetch user data when Navbar loads
    useEffect(() => {
      fetchUserData();
  }, []);

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => setMenu('shop')}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === 'shop' && <hr />}</li>
                <li onClick={() => setMenu('mens')}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === 'mens' && <hr />}</li>
                <li onClick={() => setMenu('women')}><Link style={{ textDecoration: 'none' }} to='/women'>Women</Link>{menu === 'women' && <hr />}</li>
                <li onClick={() => setMenu('kids')}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === 'kids' && <hr />}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => { 
                        localStorage.removeItem('auth-token'); 
                        window.location.replace('/');
                    }}>
                        Logout
                    </button>
                ) : (
                    <Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>
                )}
                <Link style={{ textDecoration: 'none' }} to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
            <div className="nav-coin-count">{userData.coins}</div>
            <div className="nav-login-coin">
                <img src={coin_icon} alt="" />
            </div>
        </div>
    );
}
