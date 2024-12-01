"use client";
import { Product } from "@/interfaces/Types";
import Image from "next/image";
import React, { useContext } from "react";
import ImgLoading from "../CustomComponents/ImgLoading";
import { CartState } from "@/store/CartProvider";


const ProductBox: React.FC<{ product: Product, easyAdd: boolean }> = ({ product, easyAdd }) => {
    const { toggle, state, setProductId, productId } = useContext(CartState);
    return (
        <>
            <div className="w-[15rem] h-[40rem] relative">
                <ImgLoading
                    src={product.img}
                    width={1000}
                    height={750}
                    alt={`${product.title}`}
                    title={`${product.title}`}
                    style={{ objectFit: 'cover', filter: 'brightness(.7) grayscale(1) contrast(.9)' }}

                />
                {
                    easyAdd &&
                    <>
                        <button className={`absolute right-3 w-fit rounded-md p-2 bg-[#080808e8] cursor-pointer ${(state && productId === product.id) ? 'bottom-6 opacity-0' : 'bottom-5 opacity-100'} transition-all duration-100 ease-out`}
                            onClick={() => {
                                toggle();
                                setProductId(product.id)
                            }}
                        >
                            <Image
                                src={`/icons/bag.svg`}
                                alt="Add to cart"
                                title="Add to cart"
                                width={20}
                                height={20}
                                className="cursor-pointer"
                            />
                        </button>
                        {
                            (state && product.id === productId) &&
                            <>
                                <div>
                                    <ul className={`absolute w-full p-1  right-0 bg-[#080808e8] flex items-center justify-center gap-6 ${(state && product.id === productId) ? 'bottom-4 opacity-100' : 'bottom-5 opacity-0'} transition-all duration-100 ease-out`}>
                                        {
                                            product?.sizes.map((size: string, sizeIndex: number) => (
                                                <li key={sizeIndex} className="cursor-pointer">
                                                    {size}
                                                </li>
                                            ))
                                        }
                                    </ul>

                                </div>
                            </>
                        }
                    </>
                }
            </div>
            <div className="text-center my-1">
                <p>{product.title}</p>
                <p>{product.price}$</p>
            </div>
        </>
    )
}
export default ProductBox;