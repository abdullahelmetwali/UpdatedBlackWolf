"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cart from "./Cart";
import cookies from "js-cookie";
import { CartState } from "@/store/CartProvider";
const Navbar: React.FC = () => {
    const [menu, setMenu] = useState<boolean>(false);
    const { cart, seeCart, setSeeCart } = useContext(CartState);
    return (
        <>
            <header className="p-3 px-5 bg-transparent absolute top-0 z-20 w-full">
                <nav className="flex items-center justify-between">
                    <button onClick={() => setMenu((prev: boolean) => !prev)} className="hidden tab:bloc">
                        <div className={`bars ${menu ? 'before:rotate-45 before:translate-y-3 after:-rotate-45' : ''} `}></div>
                    </button>
                    <ul className="flex gap-10 items-center">
                        <li>
                            <Link href={`/`}>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href={`/category/all`}>
                                CATEGORY
                            </Link>
                        </li>
                        <li>
                            <Link href={`/about`}>
                                ABOUT
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex gap-5 items-start">
                        <li>
                            <Link href={`${cookies.get('u') ? `/account/u/${cookies.get('u')?.replaceAll('"', '')}` : '/account/login'}`}>
                                <Image
                                    src={'/icons/user.svg'}
                                    alt="Account"
                                    title="Account"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </li>
                        <li>
                            <button>
                                <Image
                                    src={'/icons/search.svg'}
                                    alt="Search"
                                    title="Search..."
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSeeCart((prev: boolean) => !prev)}>
                                <Image
                                    src={'/icons/cart.svg'}
                                    alt="Cart"
                                    title="Cart"
                                    width={24}
                                    height={24}
                                />
                                {/* ({cart.length}) */}
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className={`fixed top-0 w-5/12 tab:w-10/12 z-30 bg-black ${seeCart ? 'right-0 opacity-100' : '-right-full opacity-0'} transition-all duration-150 ease-in-out h-full overflow-y-scroll`}>
                <Cart isUsr={false} />
            </main>
            {seeCart && <div className="fixed w-full min-h-screen top-0 bg-[#000] opacity-80 z-20 transition-all duration-300 ease-in-out" onClick={() => setSeeCart((prev: boolean) => !prev)}></div>}
        </>
    )
}
export default Navbar;