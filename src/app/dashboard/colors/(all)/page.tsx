import { GET } from "@/utils/get"
import { PageTypo } from "@/types";
import { ColorsTable } from "../_components/table";

export const metadata = {
    title: "Colors"
};

export default async function AllColors({ searchParams }: PageTypo) {
    const params = await searchParams;
    const data = await GET({
        url: "/colors",
        context: "dashboard",
        searchParams: params
    });

    return (
        <ColorsTable type="all" data={data} />
    )
}