"use client";
export default function CategoryErr({ error }: { error: Error }) {
    return (
        <div className="min-h-dvh grid place-items-center w-dvw">
            <div className="text-center px-8 space-y-2">
                <p>
                    404 | Error
                </p>
                <p className="text-destructive">
                    {error.message || 'Sorry something went wrong'}
                </p>
            </div>
        </div>
    )
};