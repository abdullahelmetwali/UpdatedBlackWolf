"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ImgLoadingProps } from "@/interfaces/Types";

const ImgLoading: React.FC<ImgLoadingProps> = ({ src, alt, width, height, title, style }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <div className="relative w-full h-full">
            {isLoading && <div className="loader absolute top-0 left-0 w-full h-full"></div>}
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                title={title}
                style={style}
                onLoad={() => setIsLoading(false)}
                unoptimized
                priority
                className={`${!isLoading ? 'opacity-100' : 'opacity-0'} w-full h-full transition-opacity duration-500 object-cover`}
            />
        </div>
    )
}
export default ImgLoading;