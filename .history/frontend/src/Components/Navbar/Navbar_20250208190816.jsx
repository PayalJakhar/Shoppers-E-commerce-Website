import React, { useContext, useState, useRef } from 'react';
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
    const { donationCount } = useContext(DonationContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.currentTarget.classList.toggle('open');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        window.location.replace('/');
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>SHOPPER</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown Menu" />
            <ul ref={menuRef} className="nav-menu">
                {['shop', 'mens', 'women', 'kids'].map((category) => (
                    <li key={category} onClick={() => setMenu(category)}>
                        <Link to={`/${category === 'shop' ? '' : category}`} style={{ textDecoration: 'none' }}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Link>
                        {menu === category && <hr />}
                    </li>
                ))}
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button>Login</button>
                    </Link>
                )}
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <img src={cart_icon} alt="Cart" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
            <div className="nav-donation">
                <div className="nav-coin-count">{donationCount * 100}</div>
                <img src={coin_icon} alt="Donation Coins" className="nav-login-coin" />
            </div>
        </div>
    );
}
