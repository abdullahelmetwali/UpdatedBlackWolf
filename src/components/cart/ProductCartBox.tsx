"use client";
import { Product } from "@/interfaces/Types";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CartState } from "@/store/CartProvider";
import { Minus, Plus, Trash2 } from "lucide-react";

const ProductCartBox = React.memo(({ product }: { product: Product }) => {
    const { AddQuantity, RemoveQuantity, DeleteProduct } = useContext(CartState);
    const [quantity, setQuantity] = useState<number>(product.quantity);
    useEffect(() => {
        setQuantity(product.quantity)
    }, [product.quantity]);

    const ProductImage = useMemo(() => (
        <Image
            src={product.img}
            width={400}
            height={200}
            alt={`${product.title}`}
            title={`${product.title}`}
            className="object-cover w-full h-full imgFilter"
            loading="lazy"
        />
    ), [product.img, product.title]);

    return (
        <>
            <div className="flex gap-5 justify-start">
                <div className="w-24 h-32 relative">
                    {ProductImage}
                </div>
                <div>
                    <p className="text-base font-semibold">{product.title}</p>
                    <p className="text-muted">
                        {product.selectedSize} - {product.selectedColor}
                    </p>
                    <p>{product.price * product.quantity}$</p>
                    <div className="flex items-center justify-between p-2 my-3 w-3/4 border border-white/25">
                        <button className="w-5"
                            onClick={() => {
                                RemoveQuantity(product);
                                setQuantity(product.quantity)
                            }}
                            title="Remove 1 Item"
                        >
                            <Minus width={25} height={25} />
                        </button>
                        <p>{quantity}</p>
                        <button className="w-5"
                            onClick={() => {
                                AddQuantity(product);
                                setQuantity(product.quantity)
                            }}
                            title="Add 1 Item"
                        >
                            <Plus width={25} height={25} />
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => DeleteProduct(product)}
                title="Remove product"
            >
                <Trash2 width={25} height={25} color="#a1a1a1" />
            </button>
        </>
    )
})
ProductCartBox.displayName = 'ProductCartBox';
export default ProductCartBox;