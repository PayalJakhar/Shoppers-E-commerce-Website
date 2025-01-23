import React from 'react'
import './Navbar.css'
import logo from '../Assets/Frontend_logo.png'
import cart_icon from '../Assets/cart_icon.png'

export default function Navbar() {
  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p> SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li>Shop</li>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
        </ul>
        <div className="nav-login-cart">
            <button>login</button>
            <img src={cart_icon} alt=""/>
        </div>
    </div>
  )
}
