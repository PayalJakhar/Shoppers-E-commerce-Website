import { createContext, useState, useEffect } from "react";

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donationCount, setDonationCount] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

    useEffect(() => {
        if (userEmail) {
            fetchDonationCount(userEmail);
            fetchPaymentCount(userEmail);
            localStorage.setItem("userEmail", userEmail);
        }
    }, [userEmail]);

    const fetchDonationCount = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/donation/count/${email}`);
            const data = await response.json();
            if (data.success) setDonationCount(data.count);
            else console.error("Error fetching donation count:", data.error);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchPaymentCount = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/payment/counts/${email}`);
            const data = await response.json();
            if (data.success) setPaymentCount(data.count);
            else console.error("Error fetching payment count:", data.error);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <DonationContext.Provider value={{ 
            donationCount, 
            paymentCount, 
            setDonationCount, 
            setPaymentCount, 
            userEmail, 
            setUserEmail 
        }}>
            {children}
        </DonationContext.Provider>
    );
};
