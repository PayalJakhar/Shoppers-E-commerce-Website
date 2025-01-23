import React , {useState} from 'react'
import './Navbar.css'
import logo from '../Assets/Frontend_Assets/logo.png'
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'

export default function Navbar() {
    const [menu,setMenu]= useState('shop');
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p> SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li>Shop<hr/></li>
                <li>Men<hr/></li>
                <li>Women<hr/></li>
                <li>Kids<hr/></li>
            </ul>
            <div className="nav-login-cart">
                <button>login</button>
                <img src={cart_icon} alt=""/>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}
