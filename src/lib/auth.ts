import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId?: string,
    id?: string,
    role: string,
    iat?: number,
    exp?: number
};

export const isAdmin = (token: string | undefined) => {
    if (!token) return null;

    const decode = jwtDecode<DecodedToken>(token);
    return decode.role === "admin"
};