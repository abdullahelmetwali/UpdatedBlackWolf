import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, } from "lucide-react";

export function TableSkeleton() {
    return (
        <section className="px-6 md:px-4 space-y-4">
            <div className="flex items-center justify-between max-md:flex-col gap-2">
                <div className="flex items-center max-md:w-full gap-2 *:h-9 *:rounded-md *:bg-border *:animate-pulse">
                    <div className="w-60" />
                    <div className="w-24" />
                    <div className="w-14" />
                    <div className="w-14" />
                </div>
                <div className="flex items-center flex-wrap max-md:w-full gap-2 *:h-9 *:rounded-md *:bg-border *:animate-pulse">
                    <div className="w-[32%] md:w-24" />
                    <div className="w-[32%] md:w-24" />
                    <div className="w-[32%] md:w-24" />
                    <div className="w-[49%] md:w-14" />
                    <div className="w-[49%] md:w-14" />
                </div>
            </div>
            <div>
                <div className="flex items-center w-full bg-border rounded-t-md h-12" />
                <div className="h-80 bg-muted animate-pulse border-2 border-transparent border-t-primary-foreground rounded-b-md">
                </div>
            </div>
            <div className="flex justify-center md:justify-end gap-1 ">
                <Button
                    type="button"
                    variant="outline"
                    className="invisible md:visible"
                    size="sm"
                    disabled
                >
                    <ChevronsLeft className="rtl:rotate-180" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled
                >
                    <ChevronLeft className="size-4" />
                </Button>
                <div className="!w-10 bg-border animate-pulse rounded-md" />
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled
                >
                    <ChevronRight className="size-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="invisible md:visible"
                    disabled
                >
                    <ChevronsRight className="rtl:rotate-180" />
                </Button>
            </div>
        </section>
    )
}