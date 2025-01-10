"use client";

import GetProducts from "@/hooks/GetProducts";
import { Product } from "@/interfaces/Types";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import ProductBox from "../product/ProductBox";
import Link from "next/link";
import { X } from 'lucide-react';

const Search: React.FC<{ setSearchMenu: React.Dispatch<SetStateAction<boolean>>, searchMenu: boolean }> =
    React.memo(({ setSearchMenu, searchMenu }: { setSearchMenu: React.Dispatch<SetStateAction<boolean>>, searchMenu: boolean }) => {
        const [search, setSearch] = useState<string>(""); // FOR USR
        const [debouncedSearch, setDebouncedSearch] = useState<string>(""); // FOR DEBOUNCING
        const [products, setProducts] = useState<Product[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);

        useEffect(() => {
            const getProducts = async () => {
                const { products } = await GetProducts();
                setProducts(products);
            };
            getProducts();
        }, []);

        useEffect(() => {
            setIsLoading(true);
            const debounce = setTimeout(() => {
                setDebouncedSearch(search);
                setIsLoading(false);
            }, 300);
            return () => clearTimeout(debounce);
        }, [search]);

        const filteredProducts = useMemo(() => {
            return products.filter((pro: Product) => {
                if (debouncedSearch !== '') {
                    return pro.title.toLowerCase().includes(debouncedSearch.toLowerCase())
                }
            }
            );
        }, [debouncedSearch, products]);

        return (
            <section className={`${searchMenu ? 'z-30' : 'z-0'}`}>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="box"
                        style={{ border: "none", outline: "none" }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={() => {
                        setSearchMenu((prev: boolean) => !prev);
                        setDebouncedSearch('');
                        setSearch('');
                    }}
                        title="Clear"
                    >
                        <X width={26} height={26} color="#a1a1a1" />
                    </button>
                </div>
                <main>
                    {isLoading &&
                        <div className="grid grid-cols-3 gap-4 tab:grid-cols-1">
                            {[...Array(9)].map((_, indx: number) => (
                                <div key={indx} className="flex gap-3 items-start">
                                    <div className="loader w-44 h-44 rounded-md"></div>
                                    <div>
                                        <div className="loader w-48 h-7 rounded-md"></div> <br />
                                        <div className="loader w-20 h-6 rounded-md"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <ul role="list" aria-live="polite" className={`${filteredProducts.length > 1 ? 'h-screen overflow-y-scroll' : ''} grid grid-cols-3 gap-4 tab:grid-cols-1`}>
                        {filteredProducts.map((pro: Product, index: number) => (
                            <li key={index}>
                                <Link
                                    href={`/category/${pro.type ? pro.type : 'all'}/${pro.title.replaceAll(' ', '-').toLowerCase()}`}
                                    className="flex gap-4"
                                    onClick={() => setSearchMenu((prev: boolean) => !prev)}
                                >
                                    <ProductBox product={pro} easyAdd={false} boxClass="w-44 h-44">
                                        <div className="text-lg">
                                            <p>{pro.title}</p>
                                            <p>{pro.price}$</p>
                                        </div>
                                    </ProductBox>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {(filteredProducts.length <= 0 && debouncedSearch !== '') && <div className="text-2xl my-4">Sorry, no products for <i className="text-muted">{debouncedSearch}</i></div>}
                </main>
            </section>
        );
    });

Search.displayName = "Search";
export default Search;
