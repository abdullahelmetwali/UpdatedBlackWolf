import { Product } from "@/interfaces/Types";

const GetProduct: ({ title, type }: { title: string, type: string }) => Promise<{ product: Product }> =
    async ({ title, type }: { title: string, type: string }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/category/${type}/${title}/`, { method: 'GET' });
            if (!response.ok) throw new Error('Sorry , try again!')
            const product: Product = await response.json();
            return { product }
        } catch (error) {
            throw new Error('Failed to get product data!')
        }
    }
export default GetProduct;