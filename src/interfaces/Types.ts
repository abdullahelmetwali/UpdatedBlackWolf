import { CSSProperties, SetStateAction } from "react";
export interface Product {
    id: number,
    section: string,
    img: string,
    title: string,
    price: number,
    selectedColor: string | null,
    selectedSize: string | null,
    quantity: number,
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
    style: CSSProperties | undefined,
}

export interface EasyAddState {
    cartBox: boolean,
    nextContent: string | "",
}

export interface MessageState {
    show: boolean,
    title: string | '',
    price: number,
    color: string | '',
    size: string | '',
}

export interface CartContextTypes {
    message: MessageState,
    setMessage: React.Dispatch<SetStateAction<MessageState>>,
    AddToCart: (product: Product, color: string) => void
}

export interface ProductBoxCartProps {
    easyAddState: EasyAddState,
    setEasyAddState: React.Dispatch<SetStateAction<EasyAddState>>,
    product: Product
}

export interface RoomObj {
    id: number,
    img: string,
    title: string,
    desc: string
}