"use client";
import { Product } from "@/interfaces/Types";
import React, { useEffect, useState } from "react";
import ProductBox from "../ProductComponents/ProductBox";
import Link from "next/link";

const CategoryContent: React.FC<{ products: Product[], type: string }> =
    ({ products, type }: { products: Product[], type: string }) => {
        const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
        const [currPG, setCurrPG] = useState<number>(1);
        const productsPerPG = 9;
        const totalPages = Math.ceil(products.length / productsPerPG);
        useEffect(() => {
            setDisplayedProducts(products.slice((currPG - 1) * productsPerPG, currPG * productsPerPG))
        }, [currPG, products]);

        return (
            <>
                <main className="grid grid-cols-3 gap-5 my-6 tab:grid-cols-2 h-[117rem] tab:h-full">
                    {
                        displayedProducts?.map((pro: Product, index: number) => (
                            <Link href={`/category/${type}/${pro.title.replaceAll(' ', '-').toLowerCase()}`} key={index} className="relative h-[35rem] tab:h-[27rem]">
                                <ProductBox product={pro} easyAdd={false} boxClass="w-full h-[35rem] tab:h-[23rem]">
                                    <div className="text-center my-1">
                                        <p>{pro.title}</p>
                                        <p>{pro.price}$</p>
                                    </div>
                                </ProductBox>
                            </Link>
                        ))
                    }
                </main>
                <div className="flex items-center justify-center gap-6 w-full">
                    <button
                        onClick={() => {
                            setCurrPG(currPG - 1);
                            window.scroll({
                                top: 0,
                                behavior: 'smooth'
                            });
                        }}
                        disabled={currPG === 1}
                        className={`bg-[#3636366b] imp-btn ${currPG === 1 ? 'cursor-not-allowed opacity-20 hover:opacity-20' : 'cursor-pointer opacity-100'}`}
                    >
                        Prev
                    </button>
                    <div className="scrollbox items-start gap-4">
                        {
                            [...Array(totalPages)].map((_, index) => (
                                <button key={index}
                                    className={`rounded-full h-8 px-7 ${currPG === index + 1 ? 'bg-[#efececb1] text-black' : ''}`}
                                    onClick={() => {
                                        setCurrPG(index + 1);
                                        window.scroll({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }}
                                >
                                    {index + 1}
                                </button>
                            ))
                        }
                    </div>
                    <button
                        onClick={() => {
                            window.scroll({
                                top: 0,
                                behavior: 'smooth'
                            });
                            setCurrPG(currPG + 1);
                        }}
                        disabled={currPG === totalPages}
                        className={`bg-[#3636366b] imp-btn ${currPG === totalPages ? 'cursor-not-allowed opacity-20 hover:opacity-20' : 'cursor-pointer opacity-100'}`}
                    >
                        Next
                    </button>
                </div>
            </>
        )
    }
export default CategoryContent;