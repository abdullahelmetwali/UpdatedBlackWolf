import { GETFUNC } from "@/types";

import { TOKEN_SR } from "@/utils/token/server";
import { BASE_URL } from "@/utils/url";

export async function GET({
    url,
    context = "website",
    searchParams,
    revalidate = 3600, // 1hr
}: GETFUNC) {
    const token = await TOKEN_SR();

    const URL_TO_FETCH = context === "special" ? url : `${BASE_URL}${url}`;
    const HEADERS: HeadersInit = token ? { "Authorization": `Bearer ${token}`, } : {};

    const REVALIDATION_TIME = searchParams ? 0 : revalidate;

    const PARAMS_FROM_SEARCH = new URLSearchParams(searchParams).toString();
    const FULL_URL = `${URL_TO_FETCH}${PARAMS_FROM_SEARCH ? "?" + PARAMS_FROM_SEARCH : ""}`;

    try {
        const response = await fetch(FULL_URL, {
            method: "GET",
            headers: HEADERS,
            next: {
                tags: [url],
                revalidate: REVALIDATION_TIME
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
                ...result,
            }
        };
        return result?.data;
    } catch (error: Error | any) {
        throw new Error(error?.message || error?.error);
    }
};