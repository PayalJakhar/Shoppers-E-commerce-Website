import { createContext, useState, useEffect } from "react";

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
    const [donationCount, setDonationCount] = useState(0);

    useEffect(() => {
        const count = localStorage.getItem("donationCount") || 0;
        setDonationCount(parseInt(count, 10));
    }, []);

    const updateDonationCount = (count) => {
        setDonationCount(count);
        localStorage.setItem("donationCount", count);
    };

    return (
        <DonationContext.Provider value={{ donationCount, updateDonationCount }}>
            {children}
        </DonationContext.Provider>
    );
};
