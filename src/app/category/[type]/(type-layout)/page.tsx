"use server";
import NotFoundCategory from "../not-found";
import CategoryContent from "@/components/CategoryComponents/CategoryContent";

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }) {
    const resolved = await params;
    return {
        title: `${resolved?.type?.toUpperCase()}`,
        description: `Shop top-quality ${resolved.type} products at unbeatable prices on Black wolf. Enjoy a seamless online shopping experience with fast shipping, secure payments, and 24/7 customer support. Find the latest trends, exclusive deals, and everything you need, all in one place. Start shopping today!`
    }
};

const CategoryPG: React.FC<{ params: Promise<{ type: string }> }> =
    async ({ params }: { params: Promise<{ type: string }> }) => {
        const { type } = await params;
        const server = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCAL : process.env.NEXT_PUBLIC_SERVER;
        const response = await fetch(`${server}/api/category/${type}/`)
        if (!response.ok) throw new Error('Sorry , try again!')
        const products = await response.json();
        if (products?.length <= 0) return <NotFoundCategory type={type} />
        return (
            <CategoryContent products={products} type={type} />
        )
    }
export default CategoryPG;