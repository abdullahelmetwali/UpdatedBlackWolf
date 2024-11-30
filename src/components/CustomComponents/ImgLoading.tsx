"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ImgLoadingProps } from "@/interfaces/Types";

const ImgLoading: React.FC<ImgLoadingProps> = ({ src, alt, width, height, title, style }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <>
            {isLoading && <div className="loader w-full h-[15rem]"></div>}
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                title={title}
                onLoad={() => setIsLoading(false)}
                priority
                unoptimized
                className={`${isLoading ? 'hidden' : 'block'} rounded-xl`}
                style={style}
            />
        </>
    )
}
export default ImgLoading