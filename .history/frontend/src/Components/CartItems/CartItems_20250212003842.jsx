import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { DonationContext } from '../../Context/DonationContext';
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png';
import toast from "react-hot-toast";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const { donationCount, paymentCount } = useContext(DonationContext);

    // const getRemainingCoins = (donationCount, paymentCount) => {
    //     let remainingCoins = donationCount ;
    //     let usedPayments = 0;
    
    //     while (remainingCoins >= 5 && usedPayments < paymentCount) {
    //         remainingCoins -= 5;
    //         usedPayments++;
    //     }

    //     return Math.max(remainingCoins, 0);

    // };

    const totalAmount = (donationC) >= 5 
    ? parseFloat(getTotalCartAmount() * 0.7).toFixed(2) 
    : getTotalCartAmount();

    const handlePayment = async () => {
        try {
            const emailId = localStorage.getItem("userEmail"); // Keep naming consistent
            if (!emailId) {
                toast.error("User email not found!");
                return;
            }
    
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount, emailId }) // Use correct key
            });
    
            const data = await res.json();
            if (!data || !data.order) throw new Error("Payment order failed!");
    
            handlePaymentVerify(data.order, emailId); // Pass emailId
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Payment initialization failed!");
        }
    };
    
    const handlePaymentVerify = async (data, emailId) => {
        if (!window.Razorpay) {
            toast.error("Razorpay SDK not loaded!");
            return;
        }
    
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Your Store",
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    response.emailId = emailId; // Ensure emailId is included
    
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response)
                    });
    
                    const verifyData = await res.json();
                    if (verifyData.success) {
                        toast.success(verifyData.message);
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
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => cartItems[e.id] > 0 && (
                <div key={e.id}>
                    <div className="cartiitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price * cartItems[e.id]}</p>
                        <img 
                            className='cartitems-remove-icon' 
                            src={remove_icon} 
                            onClick={() => removeFromCart(e.id)} 
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
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Shipping Fee</h3>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3 style={{color:'green'}}>Total Offer</h3>
                            <p style={{color:'green'}}>{(getRemainingCoins()) >= 5 ? '30%' : '0%'}</p>
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
                    {getRemainingCoins() >= 5 && (
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
