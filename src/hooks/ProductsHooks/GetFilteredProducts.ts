"server only";
import { Product } from "@/interfaces/Types";

const GetFilteredProducts: ({ sec }: { sec: string }) => Promise<{ products: Product[] }>
    = async ({ sec }: { sec: string }) => {
        const server = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL : process.env.NEXT_PUBLIC_SERVER;
        const res = await fetch(`${server}/api/category/${sec}/`, { method: 'GET' });
        if (!res.ok) throw new Error('Sorry , try again!')
        const products: Product[] = await res.json();
        return { products }
    }
export default GetFilteredProducts;