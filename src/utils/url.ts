const LOCAL = process.env.LOCAL_BASE_URL || "http://localhost:5501/api/v1";
const PRODUCTION = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

export const BASE_URL = process.env.NODE_ENV === "development" ? LOCAL : PRODUCTION;