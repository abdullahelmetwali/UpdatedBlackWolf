"use server";
import { cookies } from "next/headers";

export async function TOKEN_SR() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BW_TOKEN")?.value;
        return token;
    } catch (error) {
        return null;
    }
};