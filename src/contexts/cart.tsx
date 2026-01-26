import { create } from "zustand";

import { CartTypo } from "@/types";
import { GET } from "@/utils/get";
import { toast } from "@/hooks/use-toast";

export const useCart = create<CartTypo>((set, get) => ({
    cart: [],

    addingItemID: null,
    removingItemID: null,

    fetchingLoading: false,
    addingLoading: false,
    removingLoading: false,

    fetch: async () => {
        set({ fetchingLoading: true });
        try {
            const response = await GET({ url: "/cart" });
            set({ cart: response || [] });
        } catch (error) {
            toast({
                title: "Failed to get cart items",
                variant: "destructive",
            });
        } finally {
            set({ fetchingLoading: false });
        }
    },
    adding: async (id) => { },
    removing: async (id) => { },
}));