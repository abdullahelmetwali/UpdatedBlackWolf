import { GET } from "@/utils/get"
import { PageTypo } from "@/types";
import { SizesTable } from "../_components/table";

export const metadata = {
    title: "Sizes"
};

export default async function AllSizes({ searchParams }: PageTypo) {
    const params = await searchParams;
    const data = await GET({
        url: "/sizes",
        context: "dashboard",
        searchParams: params
    });

    return (
        <SizesTable type="all" data={data} />
    )
}