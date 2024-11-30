import { CSSProperties } from "react";

export interface Product {
    section: string,
    img: string,
    title: string,
    price: number,
    selectedColor: string | null,
    selectedSize: string | null,
    saledPrice: string | null,
    salePercentage: number,
    desc: string,
    type: string,
    style: string,
    colors: string[],
    sizes: string[]
}
export interface ImgLoadingProps {
    src: string,
    width: number,
    height: number,
    alt: string,
    title: string,
    style: CSSProperties | undefined
}