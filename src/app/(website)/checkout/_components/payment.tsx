import Image from "next/image";

import { UseFormReturn } from "react-hook-form";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";

function Paypal() {
    return (
        <Button
            title="Paypal"
            className="flex items-center justify-between mt-4 w-full bg-transparent text-primary relative"
        >
            <p className="text-base">
                PayPal
            </p>
            <Image
                src={'/imgs/paypal-logo.jpg'}
                alt="PayPal"
                className="size-7"
                width={100}
                height={100}
            />
            <PayPalButtons
                className="mt-4 text-sm absolute opacity-0 -top-6 size-full"
                style={{
                    layout: "horizontal",
                    color: "black",
                    shape: "pill"
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: "50.00" // "49.99"
                            }
                        }]
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    console.log("Payment successful", order);
                    // redirect or update order status
                }}
                onError={(err) => {
                    console.error("PayPal error", err);
                }}
                onCancel={() => {
                    console.log("Payment cancelled");
                }}
            />
        </Button>
    );
};

export function Payment({ form }: { form: UseFormReturn }) {
    return (
        <div>
            <Paypal />
        </div>
    );
};