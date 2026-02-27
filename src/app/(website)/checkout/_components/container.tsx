"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartBox, User } from "@/types/models";
import { useForm } from "react-hook-form";

import { ShippingInfo } from "./info";
import { Payment } from "./payment";
import { OrderSummary } from "./summary";

export function Container({ user, cart }: { user: User, cart: CartBox[] }) {
    const form = useForm();
    const paypalOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID!,
        currency: "USD",
    };
    return (
        <PayPalScriptProvider options={paypalOptions}>
            <section className="grid md:grid-cols-2 gap-2 md:gap-10 mt-8 px-2">
                <section>
                    {/* information */}
                    <div>
                        <h2 className="text-3xl font-bold">Information</h2>
                        <ShippingInfo user={user} form={form} />
                    </div>

                    {/* payment */}
                    <div>
                        <h2 className="text-3xl font-bold">Payment</h2>
                        <Payment form={form} />
                    </div>
                </section>

                <section>
                    {/* order summary */}
                    <div>
                        <h2 className="text-3xl font-bold">Order Summary</h2>
                        <OrderSummary cart={cart} form={form} />
                    </div>
                </section>
            </section>
        </PayPalScriptProvider>
    )
};