// CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  side?: string;
  vendor_id: string;
  ingredients?: string;
}

export interface AdditionalInfo {
  origin: string;
  destination: string;
  distance: number;
  additionalInfo: string;
}
export interface CartState {
  foods: CartItem[];
  origin: string;
  destination: string;
  distance: number;
  additional_info: string;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | { type: "CLEAR_CART" }
  | { type: "CLEAR_DELIVERY_INFO" }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "INCREMENT_ITEM"; payload: { id: string } }
  | { type: "DECREMENT_ITEM"; payload: { id: string } }
  | { type: "SET_DELIVERY_INFO"; payload: Omit<CartState, "foods"> };

export interface CartContextType {
  cart: CartState;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (item: { id: string }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  getTotalPrice: () => number;
  setDeliveryInfo: (info: Omit<CartState, "foods">) => void;
  clearCart: () => void;
  clearDeliveryInfo: () => void;
}

export interface OrderData {
  foods: CartItem[];
  origin: string;
  destination: string;
  distance: number;
  additional_info: string;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.foods.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          foods: state.foods.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        foods: [...state.foods, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        foods: state.foods.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        foods: state.foods.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        foods: state.foods.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        foods: state.foods.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };
    case "SET_DELIVERY_INFO":
      return { ...state, ...action.payload };

    case "CLEAR_CART":
      return {
        foods: [],
        origin: "",
        destination: "",
        distance: 0,
        additional_info: "",
      };

    case "CLEAR_DELIVERY_INFO":
      return {
        ...state,
        origin: "",
        destination: "",
        distance: 0,
        additional_info: "",
      };
    default:
      return state;
  }
};
