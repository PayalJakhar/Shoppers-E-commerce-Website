import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
const CartItems = () => {
    const {all_product,cartItems,removeFromCart}= useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </div>
      
    </div>
  )
}

export default CartItems
