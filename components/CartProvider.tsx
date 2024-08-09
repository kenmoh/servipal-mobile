import React, { ReactNode, useContext, useReducer, useState } from "react";
import { cartReducer, CartContext, CartContextType, OrderData, CartItem, CartState } from "@/auth/cartContext";
import items from "@/app/(tabs)/buySell/items";


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
    const [state, dispatch] = useReducer(cartReducer, {
        foods: [],
        origin: "",
        destination: "",
        distance: 0,
        additional_info: "",
    });


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
        return state.foods.reduce(
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
        clearDeliveryInfo



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