export interface ProductTypo {
    id: string,
    slug: string;
    name: string;
    description: string,
    image: string,
    colors: string[];
    categories: string[];
    sizes: string[];
    price: number;
    oldPrice?: number,
    discount?: number,
    status: "0" | "1"
};