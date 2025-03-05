import React, { createContext, useState, useEffect, useCallback } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [userData, setUserData] = useState({ coins: 0, donationCount: 0 });

    const fetchUserData = useCallback(async () => {
        const token = localStorage.getItem("auth-token");
        if (!token) return;

        try {
            const response = await fetch("http://localhost:4000/getuser", {
                method: "GET",
                headers: { "auth-token": token, "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (data.success) {
                setUserData({ coins: data.coins, donationCount: data.donationCount });
            } else {
                console.error("Failed to fetch user data:", data.errors);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, []);

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));

        if (localStorage.getItem("auth-token")) {
            fetch("http://localhost:4000/getcart", {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            })
                .then((response) => response.json())
                .then((data) => setCartItems(data))
                .catch((error) => console.error("Error fetching cart:", error));
        }

        fetchUserData();
    }, [fetchUserData]);

    const updateCart = async (endpoint, itemId) => {
        if (!localStorage.getItem("auth-token")) return;
    
        try {
            const response = await fetch(`http://localhost:4000/${endpoint}`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            });
    
            const data = await response.json();
            if (!data.success) {
                console.error(`${endpoint} failed:`, data.error);
            } else {
                console.log("Cart Updated:", data.cartData);
            }
        } catch (error) {
            console.error(`Error in ${endpoint}:`, error);
        }
    };
    

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        updateCart("addtocart", itemId);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 0) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            }
            return prev;
        });
        updateCart("removefromcart", itemId);
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (!all_product.length) return totalAmount;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, count) => total + (count > 0 ? count : 0), 0);
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        userData,
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
