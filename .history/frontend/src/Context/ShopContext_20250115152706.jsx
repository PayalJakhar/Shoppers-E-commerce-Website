import React ,{createContext} from "react";
import all_product from '../Components/Assets/Frontend_Assets/all_product';

export const ShopContext= createContext(null);

const shopContextProvider = (props) => {
    const contextValue= {all_product};
    
}