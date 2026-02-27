export interface BaseEntity {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string | null;
    deletedAt?: string | null;
    deletedBy?: string | null;
    isDeleted?: boolean;
};

export interface IdAndName {
    _id: string;
    name: string;
};

export interface Product extends BaseEntity {
    name: string;
    slug: string;
    description: string;

    price: number | string;
    oldPrice: number | string;
    discount: number | string;
    inStock: number | string;

    image: string | File | null;
    status: "0" | "1";

    categories: IdAndName[];
    colors: IdAndName[];
    sizes: IdAndName[];
    reviews: any[];
};

export interface Category extends BaseEntity {
    name: string;
    slug: string;
    status: "0" | "1";
};

export interface Color extends BaseEntity {
    name: string;
    value: string
    slug: string;
    status: "0" | "1";
};

export interface CartBox extends BaseEntity {
    product: Product;
    quantity: number;
    size: string;
    color: string;
};

export interface User {
    _id: string
    slug: string,
    firstName: string,
    lastName: string,
    fullName: string,
    phone: string,
    email: string,
    password: string;
    address: string;
    country: string,
    city: string,
    zipCode: string | number,
    gender: "male" | "female";
    role: "admin" | "customer",
    cart: CartBox[]
};
