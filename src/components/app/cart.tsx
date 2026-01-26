import { ShoppingBag } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart";

export function Cart() {
    const { cart, fetchingLoading } = useCart();
    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingBag />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription />
                </SheetHeader>
                <div className="py-8">

                </div>
            </SheetContent>
        </Sheet>
    )
};