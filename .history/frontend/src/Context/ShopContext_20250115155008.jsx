import React ,{createContext} from "react";
import all_product from '../Components/Assets/Frontend_Assets/all_product';

const ShopContext= createContext(null);

export default ShopContext;

const ShopContextProvider = (props) => {
    const contextValue= {all_product};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;