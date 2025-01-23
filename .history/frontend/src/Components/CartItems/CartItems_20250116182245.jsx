import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
const CartItems = () => {
    const {all_product,cartItems,removeFromCart}= useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        
    </div>
  )
}

export default CartItems
