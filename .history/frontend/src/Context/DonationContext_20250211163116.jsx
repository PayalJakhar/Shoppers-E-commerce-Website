// import { createContext, useState, useEffect } from "react";

// export const DonationContext = createContext();

// export const DonationProvider = ({ children }) => {
//     const [donationCount, setDonationCount] = useState(0);

//     useEffect(() => {
//         const count = localStorage.getItem("donationCount") || 0;
//         setDonationCount(parseInt(count, 10));
//     }, []);

//     const updateDonationCount = (count) => {
//         setDonationCount(count);
//         localStorage.setItem("donationCount", count);
//     };

//     return (
//         <DonationContext.Provider value={{ donationCount, updateDonationCount }}>
//             {children}
//         </DonationContext.Provider>
//     );
// };


import { createContext, useState, useEffect } from "react";

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donationCount, setDonationCount] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

    useEffect(() => {
        if (userEmail) {
            fetchDonationCount(userEmail);
        }
    }, [userEmail]);

    const fetchDonationCount = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/donation/count/${email}`);
            const data = await response.json();
            if (data.success) {
                setDonationCount(data.count);
            } else {
                console.error("Error fetching donation count:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateDonationCount = (newCount) => {
        setDonationCount(newCount);
    };

    useEffect(() => {
        if (userEmail) {
            fetchPaymentCount(userEmail);
        }
    }, [userEmail]);

    const fetchPaymentCount = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/payment/counts/${email}`);
            const data = await response.json();
            if (data.success) {
                setPaymentCount(data.count);
            } else {
                console.error("Error fetching payment count:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updatePaymentCount = (newCount) => {
        setPaymentCount(newCount);
    };

    return (
        <DonationContext.Provider value={{ donationCount, updateDonationCount, setUserEmail }}>
            {children}
        </DonationContext.Provider>
    );
};
