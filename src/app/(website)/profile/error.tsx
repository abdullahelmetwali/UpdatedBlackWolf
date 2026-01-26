"use client";

export default function Error({ error }: { error: Error }) {
    return (
        <div className="h-dvh fixed z-[100] top-0 end-0 w-dvw grid place-items-center px-8 text-center bg-background">
            <div className="space-y-2">
                <p className="text-xl font-semibold">
                    404 | {error?.message}
                </p>
            </div>
        </div>
    )
}