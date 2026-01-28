import Link from "next/link";
import { useTableConfig } from "../context";

import { cn } from "@/lib/cn";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { TableSearch } from "./search";
import { TableReset } from "./reset";
import { TableRefresh } from "./refresh";
import { TableDownload } from "./download";
import { TableMultiAction } from "./multi-actions";
import { TableColumns } from "./columns";
import { TableRows } from "./rows";

export function TableHeader() {
    const { role, allowedTo, refreshTable, isDeletedRoute, createButton, filter, } = useTableConfig();
    return (
        <div
            className="flex flex-col md:flex-row lg:items-center justify-between gap-1"
            aria-disabled={refreshTable.isPending}
        >
            {/* refresh - download - search */}
            <div className="flex items-center gap-1">

                <TableSearch />
                <TableReset />
                <TableRefresh />

                {(!isDeletedRoute) && <TableDownload />}
            </div>

            {/* multi select - columns - add new - filter*/}
            <div className={cn("grid md:flex items-center gap-1",
                isDeletedRoute ? 'grid-cols-2' : 'grid-cols-3'
            )}>

                <TableMultiAction />
                <TableColumns />
                <TableRows />

                {/* filter and adding a new item */}
                <div className={cn(
                    (createButton === null && filter === null) ? "hidden" : "flex items-center gap-1 w-full md:*:w-16 col-span-4"
                )}>
                    {/* filter */}
                    <div className={cn(filter ? "w-full *:w-full" : "hidden")}>
                        {filter}
                    </div>

                    {/* add new item */}
                    <div className={cn(allowedTo.add ? "!w-full *:!w-full" : "hidden")}>
                        {
                            (allowedTo.add) &&
                            (createButton ?
                                createButton :
                                <Link href={`/dashboard/${role}/new`}>
                                    <Button variant="outline" className="w-full min-w-16">
                                        <Plus />
                                        <span className="sr-only">add new item</span>
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}