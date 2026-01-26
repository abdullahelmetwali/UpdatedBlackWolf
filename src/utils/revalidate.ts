"use server"
import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidate({ url }: { url: string }) {
    revalidatePath(url, "page");
    revalidateTag(url, "max")
};