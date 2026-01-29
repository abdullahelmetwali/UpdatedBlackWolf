import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
    title: {
        default: "Dashboard",
        template: "%s | Dashboard"
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    );
};