import { GET } from "@/utils/get";
import { Suspense } from "react";

export async function UlitimateDesigns() {
    const ulimate = await GET({ url: "/products?category=ulimate" });
    return (
        <Suspense fallback={<p>Loading...</p>}>

        </Suspense>
    )
};