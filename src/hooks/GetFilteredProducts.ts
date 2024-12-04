"server only";
import { Product } from "@/interfaces/Types";

const GetFilteredProducts: ({ sec }: { sec: string }) => Promise<{ products: Product[] }>
    = async ({ sec }: { sec: string }) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/category/${sec}/`, { method: 'GET' });
        if (!res.ok) throw new Error('Sorry , try again!')
        const products: Product[] = await res.json();
        return { products }
    }
export default GetFilteredProducts;