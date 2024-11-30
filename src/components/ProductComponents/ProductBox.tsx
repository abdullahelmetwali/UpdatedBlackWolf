"use client";
import { Product } from "@/interfaces/Types";
import Image from "next/image";
import React from "react";
import ImgLoading from "../CustomComponents/ImgLoading";

const ProductBox: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <>
            <div>
                <ImgLoading
                    src={product.img}
                    width={500}
                    height={500}
                    alt={`${product.title}`}
                    title={`${product.title}`}
                    style={undefined}
                />
            </div>
        </>
    )
}
export default ProductBox;