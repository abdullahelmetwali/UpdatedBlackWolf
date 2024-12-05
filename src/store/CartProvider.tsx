"use client";
import React, { createContext, ReactNode, useState } from "react";
import { CartContextTypes, ChoosedItemState, Product } from '@/interfaces/Types';
import CartMessages from "@/components/CustomComponents/CartMessages";


export const CartState = createContext<CartContextTypes>({
    choosedItems: {
        show: false,
        title: '',
        price: 0,
        size: '',
        color: '',
        quantity: 1,
    },
    setChoosedItems: () => { },
    AddToCart: function (product: Product, color: string): void {
        throw new Error("Function not implemented.");
    }
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [choosedItems, setChoosedItems] = useState({
        show: false,
        title: '',
        price: 0,
        color: '',
        size: '',
        quantity: 1,
    });
    const [cart, setCart] = useState<Product[]>([]);


    const AddToCart = (product: Product, color: string) => {
        // SET COLOR CAUSE ITS THE LAST CHOICE IN PRODUCT
        setChoosedItems((prev: ChoosedItemState) => ({
            ...prev,
            price: product.price * prev.quantity,
            title: product.title,
            color: color
        }));

        // ADD TO CART
        product.selectedColor = color;
        product.selectedSize = choosedItems.size;
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        // NOTIFICATION TIMER
        setChoosedItems((prev) => ({ ...prev, show: true }));
        setTimeout(() => {
            setChoosedItems((prev) => ({ ...prev, show: false }));
        }, 3000)
    };

    return (
        <CartState.Provider value={{ choosedItems, setChoosedItems, AddToCart }}>
            {
                choosedItems.show &&
                <CartMessages notifications={[choosedItems.title, choosedItems.price.toString(), choosedItems.color, choosedItems.size]} setChoosedItems={setChoosedItems} show={choosedItems.show} />
            }
            {children}
        </CartState.Provider>
    )
}