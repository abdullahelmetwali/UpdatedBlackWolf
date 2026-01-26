import { GETFUNC } from "@/types";

import { TOKEN_SR } from "@/utils/token/server";
import { BASE_URL } from "@/utils/url";

export async function GET({
    url,
    context = "website",
    searchParams,
    revalidate = 3600, // 1hr
}: GETFUNC) {
    const token = context !== "website" && await TOKEN_SR();

    const URL_TO_FETCH = context === "special" ? url : `${BASE_URL}${url}`;
    const HEADERS: HeadersInit = context !== "website" ? { "Authorization": `Bearer ${token}`, } : {};

    const REVALIDATION_TIME = searchParams ? 0 : revalidate;

    const PARAMS_FROM_SEARCH = new URLSearchParams(searchParams).toString();
    const FULL_URL = `${URL_TO_FETCH}${PARAMS_FROM_SEARCH ? "?" + PARAMS_FROM_SEARCH : ""}`;

    try {
        const response = await fetch(FULL_URL, {
            method: "GET",
            headers: HEADERS,
            next: {
                tags: [URL_TO_FETCH],
                revalidate: REVALIDATION_TIME
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to get data from : ${FULL_URL}, with status : ${response.status}`);
        };

        const data = await response.json();
        return data;
    } catch (error: Error | any) {
        throw new Error(error?.message || `Failed to get data from : ${FULL_URL}, with status : ${error?.message}`);
    }
};