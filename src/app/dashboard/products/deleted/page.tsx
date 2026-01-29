import { GET } from "@/utils/get"
import { ProductsTable } from "../_components/table";

export const metadata = {
    title: "Recently Deleted Products"
};

export default async function DeletedProducts() {
    const data = await GET({
        url: "/products/deleted",
        context: "dashboard",
    });

    return (
        <ProductsTable data={data} type="deleted" />
    )
}