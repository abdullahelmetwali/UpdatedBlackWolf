"use client";
import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";
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
    },
    cart: []
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

    const seeLocalCart = useCallback(() => {
        try {
            const usrCart = localStorage.getItem('u');
            const guestCart = localStorage.getItem('cart');
            if (usrCart) {
                const parsedCart = JSON.parse(usrCart);
                setCart(parsedCart?.cart);
            }
            if (guestCart && !usrCart) {
                const parsedCart = JSON.parse(guestCart);
                setCart(parsedCart);
            }
            if (usrCart && guestCart) {
                const parsedUsrCart = JSON.parse(usrCart);
                const parsedGuestCart = JSON.parse(guestCart);
                // making ARRAY from SET , by converting obj to string, to be filtered by SET and then map them and make the obj again
                const filteredCart = Array.from(new Set([...parsedGuestCart, ...parsedUsrCart?.cart].map((pro: Product) => JSON.stringify(pro)))).map((filteredPro: string) => JSON.parse(filteredPro))
                setCart(filteredCart);
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    useEffect(() => {
        seeLocalCart();
        window.addEventListener('storage', seeLocalCart)
        return () => {
            window.removeEventListener('storage', seeLocalCart)
        }
    }, [seeLocalCart])

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
        console.log(cart)
    };

    return (
        <CartState.Provider value={{ choosedItems, setChoosedItems, AddToCart, cart }}>
            {
                choosedItems.show &&
                <CartMessages notifications={[choosedItems.title, choosedItems.price.toString(), choosedItems.color, choosedItems.size]} setChoosedItems={setChoosedItems} show={choosedItems.show} />
            }
            {children}
        </CartState.Provider>
    )
}