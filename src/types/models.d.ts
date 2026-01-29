export interface BaseEntity {
    _id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
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
