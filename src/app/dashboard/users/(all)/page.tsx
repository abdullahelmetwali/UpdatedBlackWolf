import { GET } from "@/utils/get"
import { PageTypo } from "@/types";
import { UsersTable } from "../_components/table";

export const metadata = {
    title: "Users"
};

export default async function AllUsers({ searchParams }: PageTypo) {
    const params = await searchParams;
    const data = await GET({
        url: "/users",
        context: "dashboard",
        searchParams: params
    });

    return (
        <UsersTable type="all" data={data} />
    )
}