import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="py-16 my-10 px-3">
            {children}
        </main>
    )
};