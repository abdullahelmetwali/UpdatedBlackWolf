import { Product } from "@/interfaces/Types";
const GetProducts: () => Promise<{ products: Product[] }>
    = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/`,
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