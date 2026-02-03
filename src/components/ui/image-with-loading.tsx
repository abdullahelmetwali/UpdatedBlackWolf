import { useState } from "react";
import Image, { ImageProps } from "next/image";

export function ImageWithLoading({ ...props }: ImageProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <div className="relative w-full h-full">
            {isLoading && <div className="loader absolute top-0 left-0 w-full h-full" />}
            <Image
                {...props}
                onLoad={() => setIsLoading(false)}
                className={`${!isLoading ? 'opacity-100' : 'opacity-0'} w-full h-full transition-opacity duration-500 object-cover imgFilter`}
            />
        </div>
    )
}