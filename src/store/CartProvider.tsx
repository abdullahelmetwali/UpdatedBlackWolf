"use client";
import React, { createContext, ReactNode, useState } from "react";
import { CartContextTypes } from '@/interfaces/Types';
import CartMessages from "@/components/CustomComponents/CartMessages";

export const CartState = createContext<CartContextTypes>({
    message: {
        show: false,
        title: '',
        price: 0,
        size: '',
        color: '',
    },
    setMessage: () => { }
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState({
        show: false,
        title: '',
        price: 0,
        color: '',
        size: '',
    });

    // SET INTERVAL FOR SHOWING THE PRODUCT MSG
    const showMsg = () => {

    }
    return (
        <CartState.Provider value={{ message, setMessage }}>
            {children}
        </CartState.Provider>
    )
}