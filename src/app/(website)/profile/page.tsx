import { GET } from "@/utils/get";

export const dynamic = "force-dynamic";

export default async function Profile() {
    const data = await GET({ url: "/users/profile", revalidate: 0 });
    return (
        <main>
            profile
        </main>
    )
}