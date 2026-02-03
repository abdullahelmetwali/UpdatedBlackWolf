import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { TOKEN_CL } from "@/utils/token/client";
import Link from "next/link";
import { create } from "zustand";

type CartState = {
    cart: any[];

    addingId: string,
    removingId: string,

    addToCart: (item: any) => void;
    removeFromCart: (id: string) => void;
    clearAllCart: () => void;
};

export const useCart = create<CartState>((set, get) => ({
    cart: [],
    addingId: "",
    removingId: "",

    addToCart: async (item: any) => {
        const token = TOKEN_CL();
        try {
            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Please login first",
                    action: (
                        <Button variant={"outline"} asChild>
                            <Link href={"/login"}>
                                Login
                            </Link>
                        </Button>
                    )
                })
                return;
            }
            const response = await fetch("/cart", {
                method: "POST",
                body: JSON.stringify({}),
                headers: {

                }
            })
        } catch (error) {

        }
        set((state) => ({
            cart: [...state.cart, item],
        }));
    },
    removeFromCart: (id: string) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        }));
    },
    clearAllCart: () => {
        set((state) => ({
            cart: [],
        }));
    },
}));