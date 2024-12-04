"use server";
import NotFoundCategory from "../not-found";
import CategoryContent from "@/components/CategoryComponents/CategoryContent";

export async function generateMetadata({ params }: { params: { type: string } }) {
    const type = (await params).type;
    return {
        title: `${type.toUpperCase()}`,
        description: `Shop top-quality ${type} products at unbeatable prices on Black wolf. Enjoy a seamless online shopping experience with fast shipping, secure payments, and 24/7 customer support. Find the latest trends, exclusive deals, and everything you need, all in one place. Start shopping today!`
    }
};

const CategoryPG: React.FC<{ params: { type: string } }> =
    async ({ params }: { params: { type: string } }) => {
        const { type } = await params;
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/category/${type}/`)
        if (!response.ok) throw new Error('Sorry , try again!')
        const products = await response.json();
        if (products.length <= 0) return <NotFoundCategory type={type} />
        return (
            <CategoryContent products={products} type={type} />
        )
    }
export default CategoryPG;