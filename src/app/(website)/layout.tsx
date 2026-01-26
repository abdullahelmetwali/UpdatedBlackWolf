import { AppFooter } from "@/components/app/footer";
import { AppNavbar } from "@/components/app/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "BLACK WOLF",
        template: "%s | BLACK WOLF"
    },
    description: "Discover the ultimate online shopping experience at Black wolf store. Explore a wide range of high-quality for all products at unbeatable prices. Enjoy fast shipping, secure payment options, and excellent customer support. Shop now and find everything you need in one place!",
    icons: {
        icon: [
            {
                url: "/favicon.ico",
                sizes: "32x32",
                type: "image/x-icon"
            }
        ]
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppNavbar />
            {children}
            <AppFooter />
        </>
    )
}