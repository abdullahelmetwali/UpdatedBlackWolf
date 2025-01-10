"use client";

import Link from "next/link";

const ProductErr = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
    return (
        <div className="h-dvh w-full flex gap-4 justify-center items-center flex-col">
            <p className="text-muted text-2xl">404 | Sorry, something went wrong!</p>
            <button onClick={(() => reset())} className="border border-white/55 py-1 px-12 rounded-3xl">
                TRY AGAIN
            </button>
            <Link href={`/`} className="underline underline-offset-4 text-muted hover:text-white">
                Go to home &rarr;
            </Link>
        </div>
    )
}
export default ProductErr;