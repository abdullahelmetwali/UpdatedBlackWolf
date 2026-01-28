"use client";
import Link from "next/link";
import type { Row } from "@tanstack/react-table";
import type { DataTableTypo } from "@/types";
import { useModals } from "@/contexts/modals";
import { usePathname } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    RefreshCcw,
    ClipboardPen,
    Eye,
    Trash,
    Ellipsis,
} from "lucide-react";

type ActionBoxTypo = {
    allowedTo: DataTableTypo["allowedTo"],
    row: Row<any>,
    role: string,
    links?: {
        show?: string,
        update?: string
    }
    updateIsLink?: boolean,
    hidden?: {
        show?: boolean,
        add?: boolean,
        update?: boolean,
        restore?: boolean,
        delete?: boolean,
        forceDelete?: boolean,
    }
};

export function ActionsBox({ allowedTo, row, role, links, updateIsLink = false, hidden }: ActionBoxTypo) {
    const pathname = usePathname();
    const type = pathname.includes("deleted") ? "deleted" : "all";
    const { openModal } = useModals();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border rounded w-16 grid place-items-center disabled:opacity-50"
                disabled={
                    !allowedTo.show &&
                    !allowedTo.delete &&
                    !allowedTo.update &&
                    !allowedTo.restore &&
                    !allowedTo.forceDelete
                }
            >
                <Ellipsis className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-sm *:flex *:items-center *:justify-between *:h-7 *:w-full">
                <DropdownMenuLabel className="text-xs text-muted-foreground px-1">Actions</DropdownMenuLabel>
                {
                    (type === "all") && (allowedTo.show) && (!hidden?.show) &&
                        links?.show
                        ?
                        <DropdownMenuItem asChild>
                            <Link href={links.show} target="_blank">
                                <span>Show</span>
                                <span>
                                    <Eye className="size-3.5" />
                                </span>
                            </Link>
                        </DropdownMenuItem>
                        :
                        <DropdownMenuItem onClick={() => openModal(`update-${role}`, row.original)}>
                            <span>Show</span>
                            <span>
                                <Eye className="size-3.5" />
                            </span>
                        </DropdownMenuItem>
                }
                {
                    type === "deleted" ?
                        (allowedTo.restore) && (!hidden?.restore) && (
                            <DropdownMenuItem onClick={() => openModal(`restore-${role}`, row.original)}>
                                <span>Restore</span>
                                <span>
                                    <RefreshCcw className="size-3.5" />
                                </span>
                            </DropdownMenuItem>
                        )
                        :
                        (allowedTo.update) && (!hidden?.update) && (
                            links?.update
                                ?
                                <DropdownMenuItem asChild>
                                    <Link href={links.update} target="_blank">
                                        <span>Update</span>
                                        <span>
                                            <ClipboardPen className="size-3.5" />
                                        </span>
                                    </Link>
                                </DropdownMenuItem>
                                :
                                <DropdownMenuItem onClick={() => openModal(`update-${role}`, row.original)}>
                                    <span>Update</span>
                                    <span>
                                        <ClipboardPen className="size-3.5" />
                                    </span>
                                </DropdownMenuItem>
                        )
                }
                {
                    type === "deleted" ?
                        (allowedTo.forceDelete) && (!hidden?.forceDelete) && (
                            <DropdownMenuItem onClick={() => openModal(`force-delete-${role}`, row.original)}>
                                <span>Force Delete</span>
                                <span>
                                    <Trash className="size-3.5" />
                                </span>
                            </DropdownMenuItem>
                        )
                        :
                        (allowedTo.delete) && (!hidden?.delete) && (
                            <DropdownMenuItem onClick={() => openModal(`delete-${role}`, row.original)}>
                                <span>Delete</span>
                                <span>
                                    <Trash className="size-3.5" />
                                </span>
                            </DropdownMenuItem>
                        )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}