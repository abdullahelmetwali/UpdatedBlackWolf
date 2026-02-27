import Link from "next/link";
import { create } from "zustand";

import { Button } from "@/components/ui/button";
import { TOKEN_CL } from "@/utils/token/client";
import { toast } from "@/hooks/use-toast";
import { BASE_URL } from "@/utils/url";

type CartState = {
    cart: any[];

    addingId: string,
    removingId: string,
    cartLoading: boolean,

    getCart: () => void;
    addToCart: (item: any) => void;
    removeFromCart: (id: string) => void;
    clearAllCart: () => void;
};

export const useCart = create<CartState>((set, get) => ({
    cart: [],
    addingId: "",
    removingId: "",
    cartLoading: false,

    getCart: async () => {
        const token = TOKEN_CL();
        try {
            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Please login first",
                    action: (
                        <Button variant={"secondary"} asChild>
                            <Link href={"/login"} className="bg-transparent">
                                Login
                            </Link>
                        </Button>
                    )
                })
                return;
            };

            set({ cartLoading: true });
            const response = await fetch(`${BASE_URL}/cart`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: data?.message || "Failed to get cart",
                })
                return;
            };

            set({ cart: data?.data });
        } catch (error) {
            console.log(error?.message);
            toast({
                variant: "destructive",
                title: "Failed to get cart",
            })
        } finally {
            set({ cartLoading: false })
        }
    },
    addToCart: async (item: Record<string, string>) => {
        const token = TOKEN_CL();
        try {
            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Please login first",
                    action: (
                        <Button variant={"secondary"} asChild>
                            <Link href={"/login"} className="bg-transparent">
                                Login
                            </Link>
                        </Button>
                    )
                })
                return;
            };

            set({ addingId: item.product });
            const response = await fetch(`${BASE_URL}/cart`, {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: data?.message || "Failed to add to cart",
                })
                return;
            };

            toast({
                variant: "success",
                title: `${data?.data?.product?.name} added to cart`,
            });

            set((state) => ({
                cart: [...state.cart, data?.data],
            }));
        } catch (error) {
            console.log(error?.message);
            toast({
                variant: "destructive",
                title: "Failed to add to cart",
            })
        } finally {
            set({ addingId: "" })
        }
    },
    removeFromCart: async (id: string) => {
        const token = TOKEN_CL();
        try {
            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Please login first",
                    action: (
                        <Button variant={"secondary"} asChild>
                            <Link href={"/login"} className="bg-transparent">
                                Login
                            </Link>
                        </Button>
                    )
                })
                return;
            };

            set({ removingId: id });
            const response = await fetch(`${BASE_URL}/cart/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: data?.message || "Failed to remove from cart",
                })
                return;
            };

            toast({
                variant: "success",
                title: "Item removed from cart",
            });

            set({ cart: data?.data });
        } catch (error) {
            console.log(error?.message);
            toast({
                variant: "destructive",
                title: "Failed to remove from cart",
            })
        } finally {
            set({ removingId: "" })
        }
    },
    clearAllCart: () => {
        set((state) => ({
            cart: [],
        }));
    },
}));