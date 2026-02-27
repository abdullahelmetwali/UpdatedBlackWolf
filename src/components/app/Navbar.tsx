"use client";

import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { TOKEN_CL } from "@/utils/token/client";
import { Cart } from "./cart";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { User, Search } from 'lucide-react';
import SearchBox from "./Search";


export function AppNavbar() {
    const token = TOKEN_CL();
    const roleIsAdmin = isAdmin(token);

    const pathname = usePathname();
    const [searchMenu, setSearchMenu] = useState<boolean>(false);

    if (pathname.includes("login") || pathname.includes("signup")) return null;
    return (
        <>
            <header className="p-3 px-5 w-full">
                <nav className="flex items-center justify-between">
                    <Link href={`/`} className="text-xl font-semibold hidden tab:block">
                        <span className="text-muted text-2xl">B</span>LACK <span className="text-muted text-2xl">W</span>OLF
                    </Link>
                    <ul className="gap-10 items-center flex">
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
                    <ul className="flex gap-5 items-start">
                        <li>
                            <Link
                                title="Account"
                                href={!token ? '/login' :
                                    (roleIsAdmin) ? '/dashboard' : '/profile'}
                            >
                                <User color="#a1a1a1" className="size-6" />
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => setSearchMenu((prev: boolean) => !prev)} title="Search...">
                                <Search color="#a1a1a1" className="size-6" />
                            </button>
                        </li>
                        <li>
                            <Cart />
                        </li>
                    </ul>
                </nav>
            </header>
            <main className={`fixed w-full bg-black ${searchMenu ? 'top-0 opacity-100 z-30' : '-top-full opacity-0 z-0'} transition-all duration-150 ease-in-out p-4`}>
                <SearchBox setSearchMenu={setSearchMenu} searchMenu={searchMenu} />
            </main>
        </>
    )
}