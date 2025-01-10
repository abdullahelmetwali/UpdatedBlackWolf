"use server";
import { Product } from "@/interfaces/Types";
import React from "react";
import ProductBox from "./ProductBox";
import Link from "next/link";

const SameProducts: React.FC<{ products: Product[] }> = ({ products }: { products: Product[] }) => {
    return (
        <main>
            <p className="text-2xl tracking-widest text-center my-4">YOU MIGHT LIKE</p>
            <section className="scrollbox p-2 gap-3">
                {
                    products?.map((pro: Product, proIndx: number) => (
                        <div key={proIndx}>
                            <ProductBox product={pro} easyAdd={true} boxClass={undefined}>
                                <Link href={`/category/${pro.type ? pro.type : 'all'}/${pro.title.replaceAll(' ', '-').toLowerCase()}`} className="text-center my-1">
                                    <p>{pro.title}</p>
                                    <p>{pro.price}$</p>
                                </Link>
                            </ProductBox>
                        </div>
                    ))
                }
            </section>
        </main>
    )
}
export default SameProducts;