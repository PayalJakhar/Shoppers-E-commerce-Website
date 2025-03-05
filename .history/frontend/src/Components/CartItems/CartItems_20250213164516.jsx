import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png';
import toast from "react-hot-toast";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, userData = {} } = useContext(ShopContext);
    const userCoins = userData?.coins || 0;
    const baseTotalAmount = parseFloat(getTotalCartAmount()) || 0;
    const discount = userCoins >= 500 ? 0.3 : 0;
    const totalAmount = (baseTotalAmount * (1 - discount)).toFixed(2);

    const handlePayment = async () => {
        try {
            const emailId = localStorage.getItem("userEmail");
            const token = localStorage.getItem("auth-token"); // ✅ Fetch token from localStorage
    
            if (!emailId) {
                toast.error("User email not found!");
                return;
            }
            if (!token) {
                toast.error("User not authenticated!");
                return;
            }
    
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "auth-token": token // ✅ Add auth-token
                },
                body: JSON.stringify({ amount: totalAmount, emailId })
            });
    
            if (!res.ok) throw new Error("Payment request failed");
    
            const data = await res.json();
            if (!data?.order) throw new Error("Payment order creation failed!");
    
            handlePaymentVerify(data.order, emailId);
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Payment initialization failed!");
        }
    };
    const handlePaymentVerify = async (order, emailId) => {
        if (!window.Razorpay) {
            toast.error("Razorpay SDK not loaded!");
            return;
        }
    
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Your Store",
            description: "Test Transaction",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const token = localStorage.getItem("auth-token"); // ✅ Fetch token
                    if (!token) {
                        toast.error("User not authenticated!");
                        return;
                    }
    
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            "auth-token": token // ✅ Include auth-token
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            emailId
                        })
                    });
    
                    const verifyData = await res.json();
                    if (verifyData.success) {
                        toast.success("Payment verified successfully!");
                    } else {
                        toast.error("Payment verification failed!");
                    }
                } catch (error) {
                    console.error("Verification Error:", error);
                    toast.error("Payment verification failed!");
                }
            },
            theme: { color: "#5f63b8" }
        };
    
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p style={{ paddingRight: '20px' }}>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((product) => cartItems[product.id] > 0 && (
                <div key={product.id}>
                    <div className="cartiitems-format cartitems-format-main">
                        <img src={product.image} alt="" className='carticon-product-icon' />
                        <p>{product.name}</p>
                        <p>${product.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                        <p>${(product.new_price * cartItems[product.id]).toFixed(2)}</p>
                        <img 
                            className='cartitems-remove-icon' 
                            src={remove_icon} 
                            onClick={() => removeFromCart(product.id)} 
                            alt="Remove" 
                        />
                    </div>
                    <hr />
                </div>
            ))}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <h3>Subtotal</h3>
                            <p>${baseTotalAmount.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Shipping Fee</h3>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3 style={{color:'green'}}>Total Offer</h3>
                            <p style={{color:'green'}}>{discount > 0 ? '30%' : '0%'}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3 style={{color:'red'}}>Total</h3>
                            <h3 style={{color:'red'}}>${totalAmount}</h3>
                        </div>
                    </div>
                    <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
                </div>
                <div>
                    <div className="cartitems-promocode">
                        <p>If you have a promo code, enter it here:</p>
                        <div className="cartitems-promobox">
                            <input type="text" placeholder='Promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                    {userCoins >= 500 && (
                        <div className="animated-box">
                            🎉 Earned 500 coins? Enjoy an exclusive <strong>30% OFF</strong> on your order – because loyalty pays off! 🛍️💰
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItems;
