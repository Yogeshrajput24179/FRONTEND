import { createContext, useEffect } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (id) => {
        if (!cartItems[id]) {
            setCartItems((prev) => ({ ...prev, [id]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }))

        }
    }

    const removeFromCart = (id) => {
        setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }))
    }
      
    const getTotalCartAmount = () => {
        let totalAmount =0; 
        for(const item in cartItems){
            if(cartItems[item]>0){
           let itemInfo = food_list.find((product)=>product.id ===item);
           totalAmount += itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider