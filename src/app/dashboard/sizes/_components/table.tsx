"use client";

import { SpecificTable } from "@/types";
import { Column, Row } from "@tanstack/react-table";
import { useMemo } from "react";
import { format } from "date-fns";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { DataTable } from "@/components/dashboard/table";
import { ActionsBox } from "@/components/dashboard/table/actions-box";
import { FormattedDate } from "@/components/states/formatted-date";
import { Status } from "@/components/states/status";

import { CreateSize } from "./create";
import { UpdateSize } from "./update";

export function SizesTable({ data, type }: SpecificTable) {
    const role = "sizes";

    const allowedTo = {
        index: true,
        show: false,
        add: true,
        multiActions: true,
        delete: true,
        forceDelete: true,
        update: true,
        restore: true,
    };

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "id",
                header: "ID",
                cell: ({ row }: { row: Row<any> }) => (row?.index + 1),
                enableHiding: true,
            },
            {
                id: "name",
                accessorFn: (row: any) => (row.name || 'N/A'),
                header: ({ column }: { column: Column<any> }) => (
                    <Button variant="ghost" className="text-base font-meduim !px-0 hover:bg-transparent"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Name <ArrowUpDown className="!size-3.5" />
                    </Button>
                ),
                cell: ({ row }: { row: Row<any> }) => (
                    <Tooltip>
                        <TooltipTrigger>
                            <p className="max-w-80 max-md:max-w-32 truncate text-start">
                                {row.original?.name || 'N/A'}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.original?.name || 'N/A'}
                        </TooltipContent>
                    </Tooltip>
                ),
                enableHiding: true,
            },
            {
                id: "created-by",
                accessorFn: (row: any) => (row?.createdBy || "0"),
                header: "Created By",
                cell: ({ row }: { row: Row<any> }) => (
                    <p>
                        {row.original?.createdBy || "N/A"}
                    </p>
                )
            },
            {
                id: "created-at",
                accessorFn: (row: any) => (format(row.createdAt, "yyyy-MM-dd") || "N/A"),
                header: "Created At",
                cell: ({ row }: { row: Row<any> }) => (
                    <p className="w-28">
                        <FormattedDate date={row.original?.createdAt} format="do MMMM yyyy" />
                    </p>
                )
            },
            {
                id: "status",
                accessorFn: (row: any) => (
                    Number(row?.status) === 1 ? "Active" : "Unactive"
                ),
                header: "Status",
                cell: ({ row }) => (Number(row.original?.status) === 1 ? <Status status={1} /> : <Status status={0} />),
                enableHiding: true,
            },
            {
                accessorKey: 'actions',
                header: "Actions",
                cell: ({ row }: { row: Row<any> }) =>
                    <ActionsBox
                        allowedTo={allowedTo}
                        role={role}
                        row={row}
                    />,
                enableHiding: false,
            }
        ]
    }, [allowedTo]);

    return (
        <>
            <UpdateSize />
            <DataTable
                data={data || []}
                columns={columns}
                role={role}
                allowedTo={allowedTo}
                createButton={<CreateSize disabled={{ add: type === "deleted" }} />}
            />
        </>
    );
};