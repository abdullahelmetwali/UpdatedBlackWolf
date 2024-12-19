"use client";
import Image from "next/image";
import { Product, EasyAddState } from "@/interfaces/Types";
import React, { useContext, useMemo, useState } from "react";
import { CartState } from "@/store/CartProvider";
import { ShoppingBag } from 'lucide-react';

const ProductBox: React.FC<{ product: Product, easyAdd: boolean, boxClass: string | undefined, children: React.ReactNode | undefined }>
    = React.memo(({ product, easyAdd, boxClass, children }) => {
        const { dispatchChoosedItems, AddToCart } = useContext(CartState)
        const [easyAddState, setEasyAddState] = useState<EasyAddState>({
            cartBox: true,
            nextContent: ''
        });

        const memoImg = useMemo(() => (
            <Image
                decoding="auto"
                src={product.img}
                width={1000}
                height={750}
                alt={`${product.title}`}
                title={`${product.title}`}
                className="object-cover imgFilter w-full h-full"
            />
        ), [product.img, product.title]);

        return (
            <>
                <div className={`${boxClass ? boxClass : 'w-[22rem] h-[40rem]'} relative`}>
                    {memoImg}
                    {
                        easyAdd &&
                        <>
                            <button className={`absolute right-3 w-fit rounded-md p-2 bg-[#080808e8] cursor-pointer ${easyAddState.cartBox ? 'bottom-5 opacity-100 z-10' : 'bottom-6 opacity-0 z-0'} transition-all duration-100 ease-out`}
                                onClick={() => {
                                    setEasyAddState((prev: EasyAddState) => ({ ...prev, nextContent: 'sizes', cartBox: false }));
                                    dispatchChoosedItems({
                                        type: 'UPDATE_MULT',
                                        payload: {
                                            title: product.title,
                                            price: product.price,
                                            quantity: 1
                                        }
                                    })
                                }
                                }
                                title="Add to cart"
                            >
                                <ShoppingBag width={24} height={24} />
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
                                                dispatchChoosedItems({ type: 'UPDATE_SINGLE', field: 'size', value: size })
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
                {children}
            </>
        )
    });

ProductBox.displayName = 'ProductBox';
export default ProductBox;