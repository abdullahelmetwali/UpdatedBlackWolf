import { CSSProperties, Dispatch, SetStateAction } from "react";

export interface Product {
    id: number,
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

export interface CartContextTypes {
    toggle: () => void,
    state: boolean,
    productId: number | null,
    setProductId: Dispatch<SetStateAction<number | null>>
}