"use client";

import { CartState } from "@/store/CartProvider";
import React, { useContext } from "react";


const Cart: React.FC = () => {
    const { cart } = useContext(CartState);
    return (
        <p>cart</p>
    )
}
export default Cart;