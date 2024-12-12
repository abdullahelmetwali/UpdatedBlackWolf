import { Product } from "@/interfaces/Types";
const GetProducts: () => Promise<{ products: Product[] }>
    = async () => {
        const server = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL : process.env.NEXT_PUBLIC_SERVER;
        const response = await fetch(`${server}/api/`,
            {
                method: 'GET',
                headers: { accept: 'application/json' }
            })
        if (!response.ok) {
            throw new Error('Please , Make sure of your Network!')
        };
        const data = await response.json();
        const products: Product[] = data?.products?.map((pro: Product, index: number) => ({ ...pro, id: index }))
        return { products }
    };
export default GetProducts;