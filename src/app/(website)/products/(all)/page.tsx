import { GET } from "@/utils/get";
import { Filter } from "./_components/filter";

export default async function ProductsPG({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    const params = await searchParams;
    const [products, categories, colors, sizes] = await Promise.allSettled([
        GET({ url: "/products", searchParams: params }),
        GET({ url: "/categories" }),
        GET({ url: "/colors" }),
        GET({ url: "/sizes" }),
    ]);

    const allProducts = products.status === "fulfilled" ? products?.value : [];
    const allCategories = categories.status === "fulfilled" ? categories?.value : [];
    const allColors = colors.status === "fulfilled" ? colors?.value : [];
    const allSizes = sizes.status === "fulfilled" ? sizes?.value : [];

    return (
        <main className="p-5 grid gap-1 md:grid-cols-6">
            <section className="md:columns-2">
                <Filter categories={allCategories} colors={allColors} sizes={allSizes} />
            </section>
            <section className="md:col-span-4">
                main
            </section>
        </main>
    )
}   