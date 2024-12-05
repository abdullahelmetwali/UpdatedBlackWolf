import ImgLoading from "@/components/CustomComponents/ImgLoading";
import ProductDetails from "@/components/ProductComponents/ProductDetails";
import ReviewFAQ from "@/components/ProductComponents/ReviewFAQ";
import SameProducts from "@/components/ProductComponents/SameProducts";
import GetFilteredProducts from "@/hooks/GetFilteredProducts";
import { Product } from "@/interfaces/Types";

const GetProduct: ({ title, type }: { title: string, type: string }) =>
    Promise<{ product: Product }> =
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
    const { product } = await GetProduct({ title: title, type: type });
    const { products } = await GetFilteredProducts({ sec: product.type ? product.type : 'all' });
    if (!product.type && type === 'all') return products.slice(0, 11)
    return (
        <>
            <ProductDetails product={product} />
            <ReviewFAQ />
            <SameProducts products={products} />
        </>
    )
}
export default ProductPage;