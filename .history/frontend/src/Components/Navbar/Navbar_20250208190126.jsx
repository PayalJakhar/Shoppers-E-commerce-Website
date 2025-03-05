import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import coin_icon from '../Assets/Frontend_Assets/coin_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { DonationContext } from '../../Context/DonationContext';  // Import context
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png' 

export default function Navbar() {
    const [menu, setMenu] = useState('shop');
    const { getTotalCartItems } = useContext(ShopContext);
    const { donationCount } = useContext(DonationContext);  // Use context
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p> SHOPPER</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt=""/>
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu('shop') }}><Link to='/'>Shop</Link>{menu === 'shop' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('mens') }}><Link to='/mens'>Men</Link>{menu === 'mens' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('women') }}><Link to='/women'>Women</Link>{menu === 'women' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('kids') }}><Link to='/kids'>Kids</Link>{menu === 'kids' ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
            <div className="nav-coin-count">{donationCount * 100}</div>
            <div className="nav-login-coin">
                <img src={coin_icon} alt="" />
            </div>
        </div>
    );
}
