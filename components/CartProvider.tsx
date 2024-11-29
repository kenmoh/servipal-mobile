import React, { ReactNode, useContext, useReducer } from "react";
import { cartReducer, CartContext, CartContextType, OrderData, CartItem, CartState, initialState, ServerOrderData } from "@/auth/cartContext";
import items from "@/app/(drawer)/(tabs)/buySell/product";


// export interface CartItem {
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     image_url?: string;
//     side?: string;
//     vendor_id: string;
//     ingredients?: string;
// }


const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);


    const addToCart = (item: Omit<CartItem, "quantity">) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
    };

    const removeFromCart = (item: { id: string }) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const getTotalPrice = () => {
        return (state.items || []).reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const incrementItem = (id: string) => {
        dispatch({ type: "INCREMENT_ITEM", payload: { id } });
    };

    const decrementItem = (id: string) => {
        dispatch({ type: "DECREMENT_ITEM", payload: { id } });
    };

    const setDeliveryInfo = (info: Omit<CartState, "foods">) => {
        dispatch({ type: "SET_DELIVERY_INFO", payload: info });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const clearDeliveryInfo = () => dispatch({ type: "CLEAR_DELIVERY_INFO" });


    const setOrderType = (type: 'food' | 'laundry') => {
        dispatch({ type: "SET_ORDER_TYPE", payload: type });
    };

    const getServerOrderData = (): ServerOrderData => {
        const { orderType, items = [], ...serverData } = state;
        return { ...serverData, items };

        // const { orderType, ...serverData } = state;
        // return serverData;
    };

    const contextValue: CartContextType = {
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        incrementItem,
        decrementItem,
        setDeliveryInfo,
        clearCart,
        clearDeliveryInfo,
        setOrderType,
        getServerOrderData
    };

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )

};

export default CartProvider

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};