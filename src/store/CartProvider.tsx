"use client";
import React, { createContext, ReactNode, useState } from "react";
import { CartContextTypes, MessageState, Product } from '@/interfaces/Types';
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
    AddToCart: () => { }
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState({
        show: false,
        title: '',
        price: 0,
        color: '',
        size: '',
    });
    const [cart, setCart] = useState<Product[]>([]);


    const AddToCart = (product: Product, color: string) => {
        // SET COLOR CAUSE ITS THE LAST CHOICE IN PRODUCT
        setMessage((prev: MessageState) => ({
            ...prev,
            color: color
        }));

        // ADD TO CART
        product.selectedColor = color;
        product.selectedSize = message.size;
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        // NOTIFICATION TIMER
        setMessage((prev) => ({ ...prev, show: true }));
        setTimeout(() => {
            setMessage((prev) => ({ ...prev, show: false }));
        }, 3000)
    };

    return (
        <CartState.Provider value={{ message, setMessage, AddToCart }}>
            {
                message.show &&
                <CartMessages notifications={[message.title, message.price.toString(), message.color, message.size]} setMessage={setMessage} show={message.show} />
            }
            {children}
        </CartState.Provider>
    )
}