import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown 

export default function Navbar() {
    const [menu, setMenu] = useState('shop');
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p> SHOPPER</p>
            </div>
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu('shop') }}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu === 'shop' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('mens') }}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu === 'mens' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('women') }}><Link style={{textDecoration:'none'}} to='/women'>Women</Link>{menu === 'women' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('kids') }}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu === 'kids' ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link style={{textDecoration:'none'}} to='/login'><button>login</button></Link>
                <Link style={{textDecoration:'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}
