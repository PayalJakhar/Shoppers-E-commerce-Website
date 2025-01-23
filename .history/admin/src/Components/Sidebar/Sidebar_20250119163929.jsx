import React from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'

import add_product_icon from '../../assets/Admin_Assets/Product_Cart.svg'

const Sidebar = () => {

    return (

        <div className='sidebar'>

            <Link to={'/addproduct'} style={{textDecoration:"none"}}>

                <div className="sidebar-item">

                    <img src={add_product_icon} alt="" />
                    <p>Add</p>
                </div>

            </Link>

        </div>
  )
}

export default Sidebar
