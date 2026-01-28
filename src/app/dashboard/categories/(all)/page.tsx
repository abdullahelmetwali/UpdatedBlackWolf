import { GET } from "@/utils/get"
import { PageTypo } from "@/types";
import { CategoriesTable } from "../_components/table";

export const metadata = {
    title: "Categories"
};

export default async function AllCategories({ searchParams }: PageTypo) {
    const params = await searchParams;
    const data = await GET({
        url: "/categories",
        context: "dashboard",
        searchParams: params
    });

    return (
        <CategoriesTable data={data} />
    )
}