import { GET } from "@/utils/get"
import { UsersTable } from "../_components/table";

export const metadata = {
    title: "Recently Deleted Users"
};

export default async function DeletedUsers() {
    const data = await GET({
        url: "/users/deleted",
        context: "dashboard",
    });

    return (
        <UsersTable type="deleted" data={data} />
    )
}