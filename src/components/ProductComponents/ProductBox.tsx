"use client";
import Image from "next/image";
import { Product, ChoosedItemState, EasyAddState } from "@/interfaces/Types";
import React, { useContext, useState } from "react";
import { CartState } from "@/store/CartProvider";
import ImgLoading from "../CustomComponents/ImgLoading";

const ProductBox: React.FC<{ product: Product, easyAdd: boolean, boxClass: string | undefined }> = ({ product, easyAdd, boxClass }) => {
    const { setChoosedItems, AddToCart } = useContext(CartState)
    const [easyAddState, setEasyAddState] = useState<EasyAddState>({
        cartBox: true,
        nextContent: ''
    })

    return (
        <>
            <div className={`${boxClass ? boxClass : 'w-[22rem] h-[40rem]'} relative`}>
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
                        <button className={`absolute right-3 w-fit rounded-md p-2 bg-[#080808e8] cursor-pointer ${easyAddState.cartBox ? 'bottom-5 opacity-100 z-10' : 'bottom-6 opacity-0 z-0'} transition-all duration-100 ease-out`}
                            onClick={() => {
                                setEasyAddState((prev: EasyAddState) => ({ ...prev, nextContent: 'sizes', cartBox: false }));
                                setChoosedItems((prev: ChoosedItemState) => ({
                                    ...prev,
                                    title: product.title,
                                    price: product.price
                                }))
                            }
                            }
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
                        <ul className={`productBoxItems ${easyAddState.nextContent === 'sizes' ? 'bottom-6 opacity-100 z-10' : 'bottom-5 opacity-0 z-0'}`}
                        >
                            {
                                product?.sizes?.map((size: string, sizeIndex: number) => (
                                    <li
                                        key={sizeIndex}
                                        className="cursor-pointer hover:bg-[#a1a1a1] p-1"
                                        onClick={() => {
                                            setEasyAddState((prev: EasyAddState) => ({
                                                ...prev,
                                                nextContent: 'colors',
                                            }));
                                            setChoosedItems((prev: ChoosedItemState) => ({
                                                ...prev,
                                                size: size
                                            }))
                                        }
                                        }
                                    >
                                        {size}
                                    </li>
                                ))
                            }
                        </ul>
                        <ul
                            className={`productBoxItems ${(easyAddState.nextContent === 'colors' && !easyAddState.cartBox) ? 'bottom-6 opacity-100 z-10' : 'bottom-5 opacity-0 z-0'}`}
                        >
                            {product?.colors?.map((color: string, clrIndex: number) => (
                                <li
                                    key={clrIndex}
                                    className="cursor-pointer hover:bg-[#a1a1a1] p-1"
                                    onClick={() => {
                                        setEasyAddState((prev: EasyAddState) => ({
                                            ...prev,
                                            cartBox: true,
                                        }));
                                        AddToCart(product, color);
                                    }
                                    }
                                >
                                    {color}
                                </li>
                            ))}
                        </ul>
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