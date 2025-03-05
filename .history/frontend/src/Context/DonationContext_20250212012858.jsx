// import { createContext, useState, useEffect } from "react";

// export const DonationContext = createContext();

// export const DonationProvider = ({ children }) => {
//     const [donationCount, setDonationCount] = useState(0);
//     const [paymentCount, setPaymentCount] = useState(0);
//     const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

//     useEffect(() => {
//         if (userEmail) {
//             fetchDonationCount(userEmail);
//             fetchPaymentCount(userEmail);
//             localStorage.setItem("userEmail", userEmail);
//         }
//     }, [userEmail]);

//     const fetchDonationCount = async (email) => {
//         try {
//             const response = await fetch(`http://localhost:4000/donation/count/${email}`);
//             const data = await response.json();
//             if (data.success && !isNaN(data.count)) setDonationCount(data.count);
//             else setDonationCount(0);
//         } catch (error) {
//             console.error("Error:", error);
//             setDonationCount(0);
//         }
//     };

//     const fetchPaymentCount = async (email) => {
//         try {
//             const response = await fetch(`http://localhost:4000/payment/counts/${email}`);
//             const data = await response.json();
//             if (data.success && !isNaN(data.count)) setPaymentCount(data.count);
//             else setPaymentCount(0);
//         } catch (error) {
//             console.error("Error:", error);
//             setPaymentCount(0);
//         }
//     };

//     return (
//         <DonationContext.Provider value={{ 
//             donationCount, 
//             paymentCount, 
//             setDonationCount, 
//             setPaymentCount, 
//             userEmail, 
//             setUserEmail 
//         }}>
//             {children}
//         </DonationContext.Provider>
//     );
// };
import { createContext, useState, useEffect } from "react";

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donationCount, setDonationCount] = useState(0);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

    useEffect(() => {
        if (userEmail) {
            fetchDonationCount(userEmail);
            localStorage.setItem("userEmail", userEmail);
        }
    }, [userEmail]);

    const fetchDonationCount = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/donation/count/${email}`);
            const data = await response.json();
            if (data.success && !isNaN(data.count)) setDonationCount(data.count);
            else setDonationCount(0);
        } catch (error) {
            console.error("Error:", error);
            setDonationCount(0);
        }
    };

    const verifyPayment = async (paymentData) => {
        try {
            const response = await fetch("http://localhost:4000/api/payment/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();

            if (data.success) {
                setDonationCount(data.updatedDonationCount); // Use updated count from backend
            } else {
                console.error("Payment verification failed:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 🔥 **Trigger payment verification automatically when payment is successful**
    useEffect(() => {
        const checkPayments = async () => {
            if (userEmail) {
                await fetchDonationCount(userEmail);
            }
        };
        checkPayments();
    }, [userEmail]); // Runs only when `userEmail` changes, avoiding unnecessary calls

    return (
        <DonationContext.Provider value={{ 
            donationCount, 
            setDonationCount, 
            userEmail, 
            setUserEmail,
            verifyPayment 
        }}>
            {children}
        </DonationContext.Provider>
    );
};
