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
                <li onClick={()=>{setMenu('shop')}}><Link to='/'>Shop</Link>{menu==='shop'?<hr/>:<></>}</li >
                <li onClick={()=>{setMenu('mens')}}><Link to='/mens'>Men</Link>{menu==='mens'?<hr/>:<></>}</li >
                <li onClick={()=>{setMenu('women')}}><Link to='/women'>Women</Link>{menu==='women'?<hr/>:<></>}</li >
                <li onClick={()=>{setMenu('kids')}}><Link to='/kids'>Kids</Link>{menu==='kids'?<hr/>:<></>}</li >
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    )
}
