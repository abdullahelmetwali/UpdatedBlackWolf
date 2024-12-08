"use client";
import { Product } from "@/interfaces/Types";
import ImgLoading from "../CustomComponents/ImgLoading";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartState } from "@/store/CartProvider";

const ProductCartBox = ({ product }: { product: Product }) => {
    const { AddQuantity, RemoveQuantity, DeleteProduct } = useContext(CartState);
    const [quantity, setQuantity] = useState<number>(product.quantity);
    return (
        <>
            <div className="flex gap-5 justify-start">
                <div className="w-24 h-32 relative">
                    <ImgLoading
                        src={product.img}
                        width={400}
                        height={200}
                        alt={`${product.title}`}
                        title={`${product.title}`}
                        style={{ objectFit: 'cover', filter: 'brightness(.7) grayscale(1) contrast(.9)' }}
                    />
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
                        >
                            <Image
                                src={`/icons/minus.svg`}
                                width={24}
                                height={24}
                                alt="Remove 1 Item"
                                title="Remove 1 Item"
                            />
                        </button>
                        <p>{quantity}</p>
                        <button className="w-5"
                            onClick={() => {
                                AddQuantity(product);
                                setQuantity(product.quantity)
                            }}
                        >
                            <Image
                                src={`/icons/plus.svg`}
                                width={24}
                                height={24}
                                alt="Add 1 Item"
                                title="Add 1 Item"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => DeleteProduct(product)}
            >
                <Image
                    src={`/icons/trash.svg`}
                    width={24}
                    height={24}
                    alt="Remove product"
                    title="Remove product"
                />
            </button>
        </>
    )
}
export default ProductCartBox;