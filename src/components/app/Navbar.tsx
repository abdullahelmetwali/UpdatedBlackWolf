"use client";

import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { TOKEN_CL } from "@/utils/token/client";

import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

import Cart from "@/components/cart/Cart";
import { CartState } from "@/store/CartProvider";
import { ShoppingCart, User, Search } from 'lucide-react';
import SearchBox from "./Search";


export function AppNavbar() {
    const token = TOKEN_CL();
    const roleIsAdmin = isAdmin(token);

    const pathname = usePathname();
    const { seeCart, setSeeCart } = useContext(CartState);
    const [searchMenu, setSearchMenu] = useState<boolean>(false);

    if (pathname.includes("login") || pathname.includes("signup")) return null;
    return (
        <>
            <header className="p-3 px-5 w-full">
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
                            <Link href={`/products`}>
                                PRODUCTS
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
                            <Link
                                title="Account"
                                href={!token ? '/login' :
                                    (roleIsAdmin) ? '/dashboard' : '/profile'}
                            >
                                <User color="#a1a1a1" width={30} height={30} />
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => setSearchMenu((prev: boolean) => !prev)} title="Search...">
                                <Search color="#a1a1a1" width={30} height={30} />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setSeeCart((prev: boolean) => !prev)} title="Cart">
                                <ShoppingCart color="#a1a1a1" width={30} height={30} />
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
                <SearchBox setSearchMenu={setSearchMenu} searchMenu={searchMenu} />
            </main>
        </>
    )
}