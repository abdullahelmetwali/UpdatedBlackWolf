import { Product } from "@/interfaces/Types";

const GetFilteredProducts: ({ type }: { type: string }) => Promise<{ data: Product[] }>
    = async ({ type }: { type: string }) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/category/${type}/`, { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch')
        const data: Product[] = await res.json();
        return { data }
    }
export default GetFilteredProducts;