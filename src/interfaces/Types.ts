import React, { CSSProperties, SetStateAction } from "react";
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
    decoding: string | null
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

export interface ChoosedItemState {
    show: boolean,
    title: string | '',
    price: number,
    color: string | '',
    size: string | '',
    quantity: number
}

export type ChoosedItemsAction =
    | { type: 'UPDATE_SINGLE', field: keyof ChoosedItemState, value: string | number | boolean }
    | { type: 'UPDATE_MULT', payload: Partial<ChoosedItemState> }
    | { type: 'RESET' }

export interface CartContextTypes {
    choosedItems: ChoosedItemState,
    dispatchChoosedItems: React.Dispatch<ChoosedItemsAction>,
    AddToCart: (product: Product, color: string) => void,
    cart: Product[],
    AddQuantity: (product: Product) => void,
    RemoveQuantity: (product: Product) => void,
    DeleteProduct: (product: Product) => void,
    seeCart: boolean,
    setSeeCart: React.Dispatch<SetStateAction<boolean>>
}


export interface RoomObj {
    id: number,
    img: string,
    title: string,
    desc: string
}

export interface Review {
    customerName: string,
    customerComment: string
}

export interface CartMsgsType {
    notifications: string[] | string,
    show: boolean,
    dispatchChoosedItems: React.Dispatch<ChoosedItemsAction>,
    setSeeCart: React.Dispatch<SetStateAction<boolean>>
}