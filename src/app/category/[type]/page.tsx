import GetFilteredProducts from "@/hooks/GetFilteredProducts";
const CategoryPG: React.FC<{ params: { type: string } }> =
    async ({ params }: { params: { type: string } }) => {
        const { type } = params;
        const { data } = await GetFilteredProducts({ type: type });
        return (
            <>

            </>
        )
    }
export default CategoryPG;