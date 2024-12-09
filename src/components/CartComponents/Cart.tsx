"use client";

import { Product } from "@/interfaces/Types";
import { CartState } from "@/store/CartProvider";
import Image from "next/image";
import React, { useContext } from "react";
import ProductCartBox from "./ProductCartBox";
import EmptyCart from "./EmptyCart";


const Cart: ({ isUsr }: { isUsr: boolean }) => JSX.Element = ({ isUsr }: { isUsr: boolean }) => {
    const { cart, setSeeCart } = useContext(CartState);
    return (
        <>
            <div className={`flex items-center justify-between px-3 py-4 z-30 w-full ${isUsr ? 'text-xl border-y border-y-white/20' : 'border-b border-b-white/20'}`}>
                <p>CART</p>
                {!isUsr &&
                    <button
                        className="transition-all duration-100 ease-in-out hover:rotate-180"
                        onClick={() => setSeeCart((prev: boolean) => !prev)}>
                        <Image
                            src={`/icons/close.svg`}
                            alt="Close cart"
                            width={20}
                            height={20}
                        />
                    </button>}
            </div>
            {
                cart.length <= 0
                    ?
                    <EmptyCart />
                    :
                    <div>
                        {cart.map((pro: Product, proIndx: number) => (
                            <div key={proIndx} className="flex gap-5 p-5 justify-between border-y  border-y-white/25">
                                <ProductCartBox product={pro} />
                            </div>
                        ))}
                    </div>
            }
        </>
    )
}
export default Cart;