import { GET } from "@/utils/get"
import { PageTypo } from "@/types";
import { ProductsTable } from "../_components/table";

export const metadata = {
    title: "Products"
};

export default async function AllProducts({ searchParams }: PageTypo) {
    const params = await searchParams;
    const data = await GET({
        url: "/products",
        context: "dashboard",
        searchParams: params
    });

    return (
        <ProductsTable data={data} type="all" />
    )
}