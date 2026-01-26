import { GET } from "@/utils/get";

export default async function ProductsPG({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    const params = await searchParams;
    const [products, categories] = await Promise.all([
        await GET({ url: "/products", searchParams: params }),
        await GET({ url: "/categories" }),
    ]);
    console.log(categories)
    console.log(products)
    return (
        <main>
            prodicts
        </main>
    )
}   