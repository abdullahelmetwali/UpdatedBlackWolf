"use client";
import { Product } from "@/interfaces/Types";
import React from "react";
import ProductBox from "../ProductComponents/ProductBox";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryContent: React.FC<{ products: Product[], type: string }> =
    ({ products, type }: { products: Product[], type: string }) => {
        return (
            <main className="grid grid-cols-3 gap-5 my-6 tab:grid-cols-2">
                {
                    products?.map((pro: Product, index: number) => (
                        <Link href={`/category/${type}/${pro.title.replaceAll(' ', '-').toLowerCase()}`} key={index} className="relative h-full">
                            <ProductBox product={pro} easyAdd={false} boxClass="w-full h-[35rem]" />
                        </Link>
                    ))
                }
            </main>
        )
    }
export default CategoryContent;