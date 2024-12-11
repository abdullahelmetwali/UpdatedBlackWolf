"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cart from "../CartComponents/Cart";
import { CartState } from "@/store/CartProvider";
import cookies from "js-cookie";
import Search from "./Search";

const Navbar: React.FC = () => {
    const { seeCart, setSeeCart } = useContext(CartState);
    const [seeUsr, setSeeUsr] = useState('/account/login');
    const [searchMenu, setSearchMenu] = useState<boolean>(false);

    useEffect(() => {
        const clientUser = cookies.get('u');
        setSeeUsr(clientUser ? `/account/u/${clientUser.replaceAll('"', '')}` : '/account/login');
    }, []);

    return (
        <>
            <header className="p-3 px-5 bg-transparent absolute top-0 z-20 w-full">
                <nav className="flex items-center justify-between">
                    <Link href={`/`} className="text-xl font-semibold hidden tab:block">
                        <span className="text-muted text-2xl">B</span>LACK <span className="text-muted text-2xl">W</span>OLF
                    </Link>
                    <ul className="gap-10 items-center flex tab:hidden">
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
                    <ul className="flex gap-5 items-start tab:gap-3">
                        <li>
                            <Link href={seeUsr}>
                                <Image
                                    src={'/icons/user.svg'}
                                    alt="Account"
                                    title="Account"
                                    width={24}
                                    height={24}
                                    className="tab:w-8"
                                />
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => setSearchMenu((prev: boolean) => !prev)}>
                                <Image
                                    src={'/icons/search.svg'}
                                    alt="Search"
                                    title="Search..."
                                    width={24}
                                    height={24}
                                    className="tab:w-8"
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
                                    className="tab:w-8"
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className={`fixed top-0 w-5/12 tab:w-10/12 bg-black ${seeCart ? 'right-0 opacity-100 z-30' : '-right-full opacity-0 z-0'} transition-all duration-150 ease-in-out h-full overflow-y-scroll`}>
                <Cart isUsr={false} />
            </main>
            {seeCart && <div className="fixed w-full min-h-screen top-0 bg-[#000] opacity-80 z-20 transition-all duration-300 ease-in-out" onClick={() => setSeeCart((prev: boolean) => !prev)}></div>}
            <main className={`fixed w-full bg-black ${searchMenu ? 'top-0 opacity-100 z-30' : '-top-full opacity-0 z-0'} transition-all duration-150 ease-in-out p-4`}>
                <Search setSearchMenu={setSearchMenu} searchMenu={searchMenu} />
            </main>
        </>
    )
}
export default Navbar;