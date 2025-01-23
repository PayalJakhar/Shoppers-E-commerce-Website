import React , {useState,Link} from 'react'
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
                <li onClick={()=>{setMenu('shop')}}><link to='/'>Shop</link>{menu==='shop'?<hr/>:<></>}</li >
                <li onClick={()=>{setMenu('mens')}}><link to='/mens'>Men</link>{menu==='mens'?<hr/>:<></>}</li >
                <li onClick={()=>{setMenu('women')}}><link to='/women'>Women</link>{menu==='women'?<hr/>:<></>}</li >
                <li onClick={()=>{setMenu('kids')}}><link to='/kids'>Kids</link>{menu==='kids'?<hr/>:<></>}</li >
            </ul>
            <div className="nav-login-cart">
                <button>login</button>
                <img src={cart_icon} alt=""/>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}
