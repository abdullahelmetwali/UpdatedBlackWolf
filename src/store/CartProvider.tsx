"use client";
import React, { createContext, ReactNode, useCallback, useEffect, useReducer, useState } from "react";
import { CartContextTypes, ChoosedItemState, Product, ChoosedItemsAction } from '@/interfaces/Types';
import CartMessages from "@/components/ui/CartMessages";
import { usePathname } from "next/navigation";

const initialState: ChoosedItemState = {
    show: false,
    title: '',
    price: 0,
    color: '',
    size: '',
    quantity: 1,
};
const choosedItemsReducer = (state: ChoosedItemState, action: ChoosedItemsAction) => {
    switch (action.type) {
        case 'UPDATE_SINGLE':
            return { ...state, [action.field]: action.value };
        case 'UPDATE_MULT':
            return { ...state, ...action.payload }
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const CartState = createContext<CartContextTypes>({
    choosedItems: {
        show: false,
        title: '',
        price: 0,
        size: '',
        color: '',
        quantity: 1,
    },
    dispatchChoosedItems: () => { },
    AddToCart: () => { },
    AddQuantity: () => { },
    RemoveQuantity: () => { },
    DeleteProduct: () => { },
    setSeeCart: () => { },
    cart: [],
    seeCart: false,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [addedToCartMsg, setAddedToCartMsg] = useState<string>('');
    const [choosedItems, dispatchChoosedItems] = useReducer(choosedItemsReducer, initialState);
    const [cart, setCart] = useState<Product[]>([]);
    const [seeCart, setSeeCart] = useState<boolean>(false);
    const pathname = usePathname();
    const DeleteProduct = useCallback((product: Product) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter((pro) => !(
                pro.selectedColor === product.selectedColor &&
                pro.selectedSize === product.selectedSize &&
                pro.quantity === product.quantity &&
                pro.title === product.title
            ));
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    }, [])

    const AddQuantity = useCallback((product: Product) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((pro) =>
                pro === product ? { ...pro, quantity: pro.quantity + 1 } : pro
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const RemoveQuantity = useCallback((product: Product) => {
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
    }, [DeleteProduct, cart]);

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

    useEffect(() => {
        // RESET WHEN ROUTE CHANGES
        dispatchChoosedItems({ type: 'RESET' })
    }, [pathname]);


    const AddToCart = (product: Product, color: string) => {
        // SET COLOR CAUSE ITS THE LAST CHOICE IN PRODUCT
        dispatchChoosedItems({
            type: 'UPDATE_MULT',
            payload: {
                price: product.price * choosedItems.quantity,
                title: product.title,
                color: color
            },
        })

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
        dispatchChoosedItems({ type: 'UPDATE_SINGLE', field: 'show', value: true });
        setTimeout(() => {
            dispatchChoosedItems({ type: 'UPDATE_SINGLE', field: 'show', value: false });
        }, 3000);
    };

    return (
        <CartState.Provider value={{ choosedItems, cart, seeCart, setSeeCart, dispatchChoosedItems, AddToCart, AddQuantity, DeleteProduct, RemoveQuantity }}>
            <CartMessages
                notifications={addedToCartMsg === '' ? [choosedItems.title, choosedItems.price.toString(), choosedItems.color, choosedItems.size] : [addedToCartMsg]} dispatchChoosedItems={dispatchChoosedItems} show={choosedItems.show} setSeeCart={setSeeCart} />
            {children}
        </CartState.Provider>
    )
}