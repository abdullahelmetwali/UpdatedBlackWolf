"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
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
    AddToCart: () => { },
    AddQuantity: () => { },
    RemoveQuantity: () => { },
    DeleteProduct: () => { },
    setSeeCart: () => { },
    cart: [],
    seeCart: false,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [addedToCartMsg, setAddedToCartMsg] = useState('');
    const [choosedItems, setChoosedItems] = useState({
        show: false,
        title: '',
        price: 0,
        color: '',
        size: '',
        quantity: 1,
    });
    const [cart, setCart] = useState<Product[]>([]);
    const [seeCart, setSeeCart] = useState<boolean>(false);

    const DeleteProduct = (product: Product) => {
        const newCart = cart.filter(
            (pro: Product) =>
                !(
                    pro.selectedColor === product.selectedColor &&
                    pro.selectedSize === product.selectedSize &&
                    pro.quantity === product.quantity &&
                    pro.title === product.title
                )
        );
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const AddQuantity = (product: Product) => {
        const productIndex = cart.indexOf(product);
        if (productIndex !== -1) {
            product.quantity++;
            cart[productIndex] = product;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    const RemoveQuantity = (product: Product) => {
        const productIndex = cart.indexOf(product);
        if (productIndex !== -1) {
            if (product.quantity !== 1) {
                product.quantity--;
                cart[productIndex] = product;
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                DeleteProduct(product)
            }
        }
    };

    useEffect(() => {
        const seeLocalCart = () => {
            try {
                const guestCart = localStorage.getItem('cart');
                if (guestCart) {
                    const parsedGuestCart = JSON.parse(guestCart);
                    setCart(parsedGuestCart);
                }
            } catch (err) {
                console.error('Error processing local storage changes:', err);
            }
        };
        seeLocalCart();
        window.addEventListener('storage', seeLocalCart);
        return () => {
            window.removeEventListener('storage', seeLocalCart);
        };
    }, []);


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
        product.quantity = choosedItems.quantity;

        const sameProduct = cart.some((pro: Product) =>
            pro.selectedColor === product.selectedColor &&
            pro.selectedSize === product.selectedSize &&
            pro.quantity === product.quantity &&
            pro.title === product.title)
        if (sameProduct) {
            setAddedToCartMsg('ALREADY ADDED TO CART');
        } else {
            setAddedToCartMsg('');
            const updatedCart = [...cart, product];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        const seeLocalCart = () => {
            const guestCart = localStorage.getItem('cart');
            if (guestCart) {
                setCart(JSON.parse(guestCart));
            }
        };
        seeLocalCart();

        // NOTIFICATION TIMER
        setChoosedItems((prev) => ({ ...prev, show: true }));
        setTimeout(() => {
            setChoosedItems((prev) => ({ ...prev, show: false }));
        }, 3000);
        console.log(cart)
    };

    return (
        <CartState.Provider value={{ choosedItems, cart, seeCart, setSeeCart, setChoosedItems, AddToCart, AddQuantity, DeleteProduct, RemoveQuantity }}>
            <CartMessages notifications={addedToCartMsg === '' ? [choosedItems.title, choosedItems.price.toString(), choosedItems.color, choosedItems.size] : [addedToCartMsg]} setChoosedItems={setChoosedItems} show={choosedItems.show} setSeeCart={setSeeCart} />
            {children}
        </CartState.Provider>
    )
}