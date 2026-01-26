// here url treated as a cache key , so i must add it => /grades
"use client";

import { UseGet } from "@/types";
import { TOKEN_CL } from "@/utils/token/client";
import { BASE_URL } from "@/utils/url";
import { useQuery } from "@tanstack/react-query";

export const useGet = ({ url, headers, context = "website", props, }: UseGet) => {
    const token = TOKEN_CL();

    const TAG_NAME = url?.split('?')[0] ?? ""; // /grades?status=1 => /grades
    const URL_TO_FETCH = `${BASE_URL}${url}`;

    const HEADERS = context === "dashboard"
        ? { Authorization: `Bearer ${token}`, ...headers }
        : {};

    const query = useQuery({
        queryKey: [TAG_NAME, context],
        queryFn: async () => {
            try {
                const response = await fetch(URL_TO_FETCH, {
                    method: "GET",
                    headers: HEADERS,
                    next: { tags: [TAG_NAME] }
                });
                if (!response.ok) throw new Error(response.statusText);
                const data = await response.json();
                return data?.data;
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error('Something went wrong');
            }
        },
        ...props
    });
    return { ...query }
};