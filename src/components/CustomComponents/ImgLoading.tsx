"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ImgLoadingProps } from "@/interfaces/Types";

const ImgLoading: React.FC<ImgLoadingProps> = ({ src, alt, width, height, title, style }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <>
            {isLoading && <div className="loader w-[20rem] h-full"></div>}

            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                title={title}
                onLoad={() => setIsLoading(false)}
                unoptimized
                priority
                className={`${isLoading ? 'hidden' : 'block'} w-full h-full`}
                style={style}
            />
        </>
    )
}
export default ImgLoading