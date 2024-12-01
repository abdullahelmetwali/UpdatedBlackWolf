"use client";
import React, { createContext, ReactNode, useState } from "react";
import { CartContextTypes } from '@/interfaces/Types'
export const CartState = createContext<CartContextTypes | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<boolean>(false);
    const [productId, setProductId] = useState<number | null>(null);
    const toggle = () => {
        setState((prev: boolean) => !prev)
    }
    return (
        <CartState.Provider value={{ toggle, state, productId, setProductId }}>
            {children}
        </CartState.Provider>
    )
}