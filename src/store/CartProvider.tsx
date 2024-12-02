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
    setMessage: () => { },
    msgTimer: () => { }
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState({
        show: false,
        title: '',
        price: 0,
        color: '',
        size: '',
    });

    const msgTimer = () => {
        setMessage((prev) => ({ ...prev, show: true }));
        // setTimeout(() => {
        //     setMessage((prev) => ({ ...prev, show: false }));
        // }, 3000)
    };

    return (
        <CartState.Provider value={{ message, setMessage, msgTimer }}>
            {message.show && <CartMessages notifications={[message.title, message.price.toString(), message.color, message.size]} setMessage={setMessage} />}
            {children}
        </CartState.Provider>
    )
}