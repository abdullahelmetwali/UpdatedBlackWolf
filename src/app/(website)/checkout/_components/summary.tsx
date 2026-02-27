import { CartBox } from "@/types/models";
import { UseFormReturn } from "react-hook-form";

export function OrderSummary({ cart, form }: { cart: CartBox[], form: UseFormReturn }) {
    return (
        <div>
            <h2>Order Summary</h2>
        </div>
    )
}