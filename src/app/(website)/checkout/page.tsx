import { GET } from "@/utils/get";
import { Container } from "./_components/container";

export const metadata = {
    title: "Checkout"
};

export default async function CheckoutPage() {
    const [cart, user] = await Promise.all([
        GET({ url: "/cart" }),
        GET({ url: "/users/profile" })
    ]);
    return (
        <main className="p-5">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                Checkout
            </h1>
            <Container user={user} cart={cart} />
        </main>
    )
}
