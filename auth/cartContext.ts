// CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  side?: string;
  restaurant_id: string;
  laundry_id: string;
  ingredients?: string;
}

export interface AdditionalInfo {
  origin: string;
  destination: string;
  distance: number;
  additionalInfo: string;
}
export interface CartState {
  // foods?: CartItem[];
  // laundries?: CartItem[];
  items: CartItem[];
  origin: string;
  destination: string;
  distance: number;
  additional_info: string;
  orderType: "food" | "laundry" | null;
}

export const initialState: CartState = {
  items: [],
  origin: "",
  destination: "",
  distance: 0,
  additional_info: "",
  orderType: null,
};

export interface ServerOrderData {
  items: CartItem[];
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
  | { type: "SET_DELIVERY_INFO"; payload: Omit<CartState, "food" | "laundry"> }
  | { type: "SET_ORDER_TYPE"; payload: "food" | "laundry" };

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
  setOrderType: (type: "food" | "laundry") => void;
  getServerOrderData: () => ServerOrderData;
}

export interface OrderData {
  items: CartItem[];
  origin: string;
  destination: string;
  distance: number;
  additional_info: string;
}
export interface LaundryOrderData {
  laundries: CartItem[];
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
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };
    case "SET_DELIVERY_INFO":
      return { ...state, ...action.payload };

    case "CLEAR_CART":
      return initialState;

    case "CLEAR_DELIVERY_INFO":
      return {
        ...state,
        origin: "",
        destination: "",
        distance: 0,
        additional_info: "",
      };
    case "SET_ORDER_TYPE":
      return { ...state, orderType: action.payload };
    default:
      return state;
  }
};
