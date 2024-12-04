// import GetProduct from "@/hooks/GetProduct";

import ImgLoading from "@/components/CustomComponents/ImgLoading";
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

const ProductPage = async ({ params }: { params: Promise<{ type: string, title: string }> }) => {
    const type = (await params).type;
    const title = (await params).title;
    const { product } = await GetProduct({ title: title, type: type })
    return (
        <main className="grid grid-cols-2 tab:flex tab:flex-col p-5 gap-8">
            <div className="w-full h-3/4 relative">
                <ImgLoading
                    src={product.img}
                    width={800}
                    height={800}
                    style={{ objectFit: 'cover', filter: 'brightness(.7) grayscale(1) contrast(.9)' }}
                    alt={product.title}
                    title={product.title}
                />
            </div>
            <div>
                <p className="text-2xl tracking-wider font-black uppercase">
                    {product.title}
                </p>
            </div>
        </main>
    )
}
export default ProductPage;