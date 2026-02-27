"use client";
import Link from "next/link";
import { Product } from "@/types/models";
import { useForm } from "react-hook-form";
import { useCart } from "@/store/cart";

import { cn } from "@/lib/cn";
import { Loader2, ShoppingBag } from "lucide-react";
import { ImageWithLoading } from "@/components/ui/image-with-loading";
import { Button } from "@/components/ui/button";

interface ProductBoxTypo extends React.HTMLAttributes<HTMLDivElement> {
    product: Product,
    easyAdd?: boolean,
    children?: React.ReactNode
};

export function ProductBox({ product, easyAdd, children, ...props }: ProductBoxTypo) {
    const { addToCart, addingId } = useCart();

    const {
        watch,
        setValue,
    } = useForm();

    const nextContent = watch("next-content") || "";
    const selectedSize = watch("size");
    return (
        <>
            <div className="w-[22rem] h-[40rem] relative" {...props}>
                <div className="bg-muted w-full h-full rounded absolute inset-0 animate-pulse" />
                <ImageWithLoading
                    src={product.image as string || ""}
                    alt={product.name}
                    title={product.name}
                    width={750}
                    height={1000}
                    className="w-full h-full object-cover"
                />
                {
                    easyAdd &&
                    <>
                        <Button
                            disabled={!!addingId}
                            variant={"outline"}
                            size={"sm"}
                            onClick={() => setValue("next-content", "sizes")}
                            className={cn("absolute right-3 bg-[#080808e8] transition-all",
                                nextContent === "" ? "bottom-6 opacity-100 z-10" : "bottom-5 opacity-0 z-0"
                            )}
                        >
                            {
                                addingId === product._id ?
                                    <Loader2 className="animate-spin" />
                                    :
                                    <ShoppingBag />
                            }
                        </Button>

                        {/* sizes */}
                        <ul
                            className={cn("absolute w-full end-0 flex items-center justify-center gap-4 bg-black/80 transition-all",
                                nextContent === "sizes" ? "bottom-6 opacity-100 z-10" : "bottom-5 opacity-0 z-0"
                            )}
                        >
                            {product?.sizes?.map((size) => (
                                <li
                                    key={size?._id}
                                    className="cursor-pointer hover:bg-muted p-1"
                                    onClick={() => {
                                        setValue("size", size._id);
                                        setValue("next-content", "colors");
                                    }}
                                >
                                    {size.name}
                                </li>
                            ))}
                        </ul>

                        {/* colors */}
                        <ul
                            className={cn("absolute w-full end-0 flex items-center justify-center gap-4 bg-black/80 transition-all",
                                nextContent === "colors" ? "bottom-6 opacity-100 z-10" : "bottom-5 opacity-0 z-0"
                            )}
                        >
                            {product?.colors?.map((color) => (
                                <li
                                    key={color?._id}
                                    className="cursor-pointer hover:bg-muted p-1"
                                    onClick={() => {
                                        setValue("color", color._id);
                                        setValue("next-content", "");
                                        addToCart({
                                            product: product._id,
                                            size: selectedSize,
                                            color: color._id,
                                            quantity: 1
                                        })
                                    }}
                                >
                                    {color.name}
                                </li>
                            ))}
                        </ul>
                    </>
                }
            </div>
            <Link href={`/products/${product.slug}`} className="text-center my-1">
                <p>{product.name}</p>
                <div className="flex items-center gap-2 justify-center">
                    <p>{product.price}$</p>
                    {Number(product.oldPrice) > 0 && <del>{product.oldPrice}$</del>}
                </div>
            </Link>
        </>
    );
};