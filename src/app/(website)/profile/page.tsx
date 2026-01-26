import { GET } from "@/utils/get";

export default async function Profile() {
    const data = await GET({ url: "/users/profile", revalidate: 0 });
    console.log(data)
    return (
        <main>
            profile
        </main>
    )
}