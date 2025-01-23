import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

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
            <hr />
            {all_product.map((product) => {
                if (cartItems[product.id] > 0) {
                    return (
                        <div key={product.id}>
                            <div className='cartitems-format'>
                                <img src={product.image} alt="" className='cartitems-product-icon'/>
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                                <p>${product.new_price * cartItems[product.id]}</p>
                                <img
                                    src={remove_icon} onClick={() => removeFromCart(product.id)} alt="Remove" className="cartitems-remove-icon"/>
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                    <div className="cartitems-total-item">
                        <p></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
