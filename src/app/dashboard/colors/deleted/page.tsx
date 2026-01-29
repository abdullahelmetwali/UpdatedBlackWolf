import { GET } from "@/utils/get"
import { ColorsTable } from "../_components/table";

export const metadata = {
    title: "Recently Deleted colors"
};

export default async function DeletedColors() {
    const data = await GET({
        url: "/colors/deleted",
        context: "dashboard",
    });

    return (
        <ColorsTable type="deleted" data={data} />
    )
}