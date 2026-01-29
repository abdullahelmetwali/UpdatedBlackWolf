import { GET } from "@/utils/get"
import { CategoriesTable } from "../_components/table";

export const metadata = {
    title: "Recently Deleted Categories"
};

export default async function DeletedCategories() {
    const data = await GET({
        url: "/categories/deleted",
        context: "dashboard",
    });

    return (
        <CategoriesTable type="deleted" data={data} />
    )
}