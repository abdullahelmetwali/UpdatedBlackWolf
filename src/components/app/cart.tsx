import Link from "next/link";
import Image from "next/image";
import { CartBox } from "@/types/models";
import { useCart } from "@/store/cart";
import { useEffect } from "react";

import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";

function EmptyCart() {
    return (
        <div className="relative flex justify-center items-center w-full flex-col">
            <div className="bg-[#0f0f0f] h-32 w-full text-center text-xl py-8">
                <p className="text-xl">Your cart is empty.</p>
            </div>
            <div className="bg-black absolute top-20 h-28 w-28 p-6 rounded-full flex justify-center items-center">
                <ShoppingCart className="size-8 text-muted-foreground" />
            </div>
            <div className="py-28 tracking-widest text-center">
                <Link href={`/category/all`} className="opacity-50 hover:opacity-100">CONTINUE BROWSING</Link>
            </div>
        </div>
    )
};

function CartItem({ item }: { item: CartBox }) {
    const { removeFromCart, removingId } = useCart();
    return (
        <div className="flex items-start gap-4 relative">

            {/* delete */}
            <Button
                disabled={removingId === item._id}
                type="button"
                variant={"destructive"}
                size={"sm"}
                className="absolute top-2 end-2 size-8"
                onClick={() => removeFromCart(item._id)}
            >
                {
                    removingId === item._id
                        ?
                        <Loader2 className="animate-spin" />
                        :
                        <Trash2 />
                }
            </Button>

            {/* image */}
            <div className="size-36 rounded-md">
                {
                    // item.product.image ?
                    //     <Image
                    //         src={item.product.image as string}
                    //         alt={item.product.name}
                    //         width={100}
                    //         height={100}
                    //     />
                    //     :
                    <div className="size-full bg-muted-foreground rounded-md" />
                }
            </div>

            {/* name - price - discount */}
            <div className="font-semibold">
                <Link href={`/products/${item.product.slug}`} className="text-lg">
                    {item.product.name}
                </Link>

                <div className="flex items-center gap-1 mt-3">
                    <p>{item.product.price} LE</p>
                    {
                        item.product.oldPrice && Number(item.product.oldPrice) > 0 ? (
                            <del> - {item.product.oldPrice} LE</del>
                        ) : null
                    }
                </div>
                {
                    item.product.discount && Number(item.product.discount) > 0 ? (
                        <p className="text-red-500">{item.product.discount}% Discount</p>
                    ) : null
                }

                <div className="flex items-center gap-1">
                    <p>{item.color} - </p>
                    <p>{item.size}</p>
                </div>

                <p>
                    x{item.quantity} item added
                </p>
            </div>
        </div>
    );
};

export function Cart() {
    const { cart, cartLoading, getCart } = useCart();
    useEffect(() => { getCart(); }, []);
    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingCart className="size-6 text-muted-foreground" />
            </SheetTrigger>
            <SheetContent className="md:!w-[35dvw] !max-w-[80dvw] overflow-y-scroll pt-12 min-h-screen px-0">
                {
                    cartLoading ?
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3 my-2 px-3">
                                <div className="size-36 bg-muted-foreground animate-pulse rounded-md" />
                                <div className="flex-1 space-y-2 mt-1 *:w-36 *:h-4 *:bg-muted-foreground *:animate-pulse *:rounded-md">
                                    <div />
                                    <div />
                                    <div />
                                </div>
                            </div>
                        ))
                        :
                        !cart.length
                            ?
                            <EmptyCart />
                            :
                            <div className="space-y-2 px-3">
                                {cart.map((item: CartBox) => (
                                    <CartItem item={item} key={item._id} />
                                ))}
                                <SheetFooter>
                                    <div className="absolute bottom-2 start-0 w-full px-4 z-40">
                                        <SheetClose className="w-full flex justify-center items-center bg-primary text-primary-foreground rounded-md h-9 font-semibold" asChild>
                                            <Link href={"/checkout"}>
                                                Checkout
                                            </Link>
                                        </SheetClose>
                                    </div>
                                </SheetFooter>
                            </div>
                }
            </SheetContent>
        </Sheet>
    )
};