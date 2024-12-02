"use client";
import { Product } from "@/interfaces/Types";
import React, { useMemo, useState } from "react";
import ProductBox from "../ProductComponents/ProductBox";

const TheLatest: React.FC<{ products: Product[] }> = ({ products }) => {
    const latest: string[] = ['NEW ARRIVALS', 'TOP SELLING', 'LIMITED EDITION', 'MOST POPULAR'];
    const [section, setSection] = useState<string>('new-arrivals');

    const filteredProducts = useMemo(() => {
        return products.filter((product: Product) => product.section === section)
    }, [products, section])
    return (
        <main className="my-8">
            <p className="text-2xl tracking-widest text-center my-6">THE LATEST</p>
            <div className="scrollbox my-3 gap-4 h-full px-1 justify-center tab:justify-start">
                {
                    latest.map((last: string, index: number) => (
                        <p
                            key={index}
                            className={`tracking-wider w-full cursor-pointer rounded-3xl px-4 py-2 hover:opacity-100 text-nowrap whitespace-nowrap text-center ${section === last.replace(' ', '-').toLowerCase() ? 'bg-[#3636366b] opacity-100' : 'opacity-60'}`}
                            onClick={() => setSection(last.replace(' ', '-').toLowerCase())}
                        >
                            {last}
                        </p>
                    ))
                }
            </div>
            <section className="scrollbox my-3 gap-4 h-full px-1">
                {
                    filteredProducts.map((pro: Product) => (
                        <div key={pro.id} className="relative h-full">
                            <ProductBox product={pro} easyAdd={true} key={pro.id} />
                        </div>
                    ))
                }
            </section>
        </main>
    )
}
export default TheLatest;