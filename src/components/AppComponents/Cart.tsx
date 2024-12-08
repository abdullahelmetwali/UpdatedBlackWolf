"use client";

import { Product } from "@/interfaces/Types";
import { CartState } from "@/store/CartProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import ProductCartBox from "../ProductComponents/ProductCartBox";


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
                    <div className="relative flex justify-center items-center w-full flex-col">
                        <div className="bg-[#0f0f0f] h-32 w-full text-center text-xl py-5">
                            <p className="text-xl">Your cart is empty.</p>
                        </div>
                        <div className="bg-black absolute top-20 h-28 w-28 p-6 rounded-full flex justify-center items-center">
                            <Image
                                className="w-16"
                                src={`/icons/cart.svg`}
                                alt="Empty Cart"
                                width={24}
                                height={24}
                            />
                        </div>
                        <div className="py-28 tracking-widest text-center">
                            <Link href={`/category/all`} className="opacity-50 hover:opacity-100">CONTINUE BROWSING</Link>
                        </div>
                    </div>
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