import { cn } from "@/lib/cn";

export function Status({ status, labels }: { status: number | boolean | string, labels?: { true?: string, false?: string } }) {
    return (
        <div className={cn("flex items-center gap-2 w-fit px-2 rounded-md",
            Number(status) === 1 ? "bg-lime-600/30" : "bg-red-600/30"
        )}>
            <div className={cn("rounded-full relative size-2 before:size-2 before:rounded-full before:absolute before:end-0", Number(status) === 1 ? "before:animate-ping before:bg-lime-600 bg-lime-600" : "before:bg-destructive"
            )}></div>
            {Number(status) === 1 ? (labels?.true ?? "Active") : (labels?.false ?? "Unactive")}
        </div>
    )
};