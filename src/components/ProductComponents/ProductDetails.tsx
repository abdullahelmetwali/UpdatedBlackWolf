"use client";
import { Product, ChoosedItemState } from "@/interfaces/Types";
import ImgLoading from "../CustomComponents/ImgLoading";
import { useContext } from "react";
import { CartState } from "@/store/CartProvider";
import Image from "next/image";
import React from "react";

const ProductDetails: React.FC<{ product: Product }> =
    React.memo(({ product }: { product: Product }) => {
        const { choosedItems, setChoosedItems, AddToCart, AddQuantity } = useContext(CartState);
        return (
            <main className="min-h-screen">
                <main className="grid grid-cols-2 tab:flex tab:flex-col p-5 gap-8" style={{ gridTemplateRows: 'repeat(1, 42rem)' }}>
                    <div className="w-full h-full relative">
                        <ImgLoading
                            src={product.img}
                            width={800}
                            height={800}
                            style={{ objectFit: 'cover', filter: 'brightness(.7) grayscale(1) contrast(.9)', objectPosition: 'bottom' }}
                            alt={product.title}
                            title={product.title}
                        />
                    </div>
                    <div className="py-2 tracking-wider">
                        <p className="text-3xl font-black uppercase mb-3">{product.title}</p>
                        <p className="text-xl">{product.price * choosedItems.quantity}$</p>
                        <p className="text-xl font-black mt-8">SIZES</p>
                        <div className="flex items-center gap-2 my-4">
                            {
                                product.sizes.map((size: string, szIndx: number) => (
                                    <button key={szIndx} className={`px-8 py-1 border-white/40 border text-center font-semibold ${choosedItems.size === size ? 'bg-[#2f2e2e]' : ''}`}
                                        onClick={() => setChoosedItems((prev: ChoosedItemState) => ({
                                            ...prev,
                                            size: size
                                        }))}
                                    >
                                        {size}
                                    </button>
                                ))
                            }
                        </div>
                        <p className="text-xl font-black mt-8">COLORS</p>
                        <div className="flex items-center gap-2 my-4">
                            {
                                product.colors.map((color: string, colIndx: number) => (
                                    <button key={colIndx} className={`px-8 py-1 border-white/40 border text-center font-semibold ${choosedItems.color === color ? 'bg-[#2f2e2e]' : ''}`}
                                        onClick={() => setChoosedItems((prev: ChoosedItemState) => ({
                                            ...prev,
                                            color: color
                                        }))}
                                    >
                                        {color}
                                    </button>
                                ))
                            }
                        </div>
                        <div className="my-10">
                            <p className="text-xl font-black my-2">DESCRIPTION</p>
                            <div className="border-y-white/40 border-y py-4 text-lg">
                                <article>{product.desc}</article>
                            </div>
                        </div>
                        <div className="my-10 flex items-center justify-between">
                            <div className="flex items-center gap-5 text-2xl w-2/5">
                                <button
                                    disabled={choosedItems.quantity === 1}
                                    onClick={() => setChoosedItems((prev: ChoosedItemState) => ({
                                        ...prev,
                                        quantity: prev.quantity - 1
                                    }))}
                                    className={`${choosedItems.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <Image
                                        src={`/icons/minus.svg`}
                                        alt="Remove product"
                                        width={24}
                                        height={24}
                                        title="Remove product"
                                    />
                                </button>
                                <p>{choosedItems.quantity}</p>
                                <button
                                    onClick={() => setChoosedItems((prev: ChoosedItemState) => ({
                                        ...prev,
                                        quantity: prev.quantity + 1
                                    }))}>
                                    <Image
                                        src={`/icons/plus.svg`}
                                        alt="Add product"
                                        width={24}
                                        height={24}
                                        title="Add product"
                                    />
                                </button>
                            </div>
                            <button className={`border border-white/60 py-3 font-semibold w-full ${(choosedItems.color && choosedItems.size) === '' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}`}
                                disabled={(choosedItems.color && choosedItems.size) === '' ? true : false}
                                onClick={() => AddToCart(product, choosedItems.color)}>
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </main>
            </main >
        )
    });

ProductDetails.displayName = 'ProductDetails';
export default ProductDetails;