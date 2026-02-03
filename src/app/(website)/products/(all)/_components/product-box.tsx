"use client";
import { Product } from "@/types/models";
import { useCart } from "@/store/cart";

import { ShoppingBag } from "lucide-react";
import { ImageWithLoading } from "@/components/ui/image-with-loading";
import { useState } from "react";

interface ProductBoxTypo extends React.HTMLAttributes<HTMLDivElement> {
    product: Product,
    easyAdd?: boolean
};

export function ProductBox({ product, easyAdd, ...props }: ProductBoxTypo) {
    const { addToCart, addingId } = useCart();

    const [active, setActive] = useState("");

    return (
        <div className="w-[22rem] h-[40rem] relative" {...props}>
            <ImageWithLoading
                src={product.image as string || ""}
                alt={product.name}
                title={product.name}
                width={750}
                height={1000}
                className="w-full h-full object-cover"
            />
            {/* {
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
            } */}
        </div>
    );
};