import { GET } from "@/utils/get"
import { SizesTable } from "../_components/table";

export const metadata = {
    title: "Recently Deleted Sizes"
};

export default async function DeletedSizes() {
    const data = await GET({
        url: "/sizes/deleted",
        context: "dashboard",
    });

    return (
        <SizesTable type="deleted" data={data} />
    )
}