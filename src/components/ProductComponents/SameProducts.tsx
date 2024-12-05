"use server";
import { Product } from "@/interfaces/Types";
import React from "react";
import ProductBox from "./ProductBox";

const SameProducts: React.FC<{ products: Product[] }> = ({ products }: { products: Product[] }) => {
    return (
        <main>
            <p className="text-2xl tracking-widest text-center my-4">YOU MIGHT LIKE</p>
            <section className="scrollbox p-2 gap-3">
                {
                    products.map((pro: Product, proIndx: number) => (
                        <div key={proIndx}>
                            <ProductBox product={pro} easyAdd={true} boxClass={undefined} />
                        </div>
                    ))
                }
            </section>
        </main>
    )
}
export default SameProducts;