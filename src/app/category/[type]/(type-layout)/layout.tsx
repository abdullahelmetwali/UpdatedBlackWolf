import Link from "next/link";
import { ReactNode } from "react";

export default async function CategoryLayout({ children, params }: { children: ReactNode, params: Promise<{ type: string }> }) {
    const { type } = (await params);
    const sections = ['all products', 'winter edition', 'summer edition', 'fall edition', 'streetwear edition'];
    return (
        <>
            <main className="py-16 my-10 px-3">
                <div className="scrollbox gap-8 text-lg text-nowrap whitespace-nowrap justify-center tab:justify-start px-2 tracking-wider">
                    {
                        sections.map((section, secIndx) => (
                            <Link
                                href={`/category/${section === 'all products' ? 'all' : section.replace(' edition', '')}`}
                                key={secIndx}
                                className={`imp-btn ${(type === section.replace(' edition', '')) || (type === section.replace(' products', '')) ? 'bg-[#3636366b] opacity-100' : 'opacity-60'}`}>
                                {section}
                            </Link>
                        ))
                    }
                </div>
                {children}
            </main>
        </>
    )
}