"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const Navbar: React.FC = () => {
    const [menu, setMenu] = useState<boolean>(false);
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
                            <Link href={`/category`}>
                                CATEGORY
                            </Link>
                        </li>
                        <li>
                            <Link href={`/about`}>
                                ABOUT
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex gap-5 items-center">
                        <li>
                            <Link href={`/account`}>
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
                            <button>
                                <Image
                                    src={'/icons/cart.svg'}
                                    alt="Cart"
                                    title="Cart"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

        </>
    )
}
export default Navbar;