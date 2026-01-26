"use client";

import { SpecificTable } from "@/types";
import { Column, Row } from "@tanstack/react-table";
import { useMemo } from "react";

import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { ActionsBox } from "@/components/dashboard/table/actions-box";
import { Status } from "@/components/states/status";
import { DataTable } from "@/components/dashboard/table";
import { CreateProduct } from "./create";

export function ProductsTable({ type, data }: SpecificTable) {
    const role = "products";

    const allowedTo = {
        index: true,
        show: true,
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
                id: "id",
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
                        <ChevronsUpDown size={16} />  Name
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
                id: "price",
                accessorFn: (row: any) => (row?.price || "N/A"),
                header: "Price",
                cell: ({ row }: { row: Row<any> }) => (
                    <p>
                        {row.original?.price || "N/A"} LE
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
                        type={type}
                        role={role}
                        row={row}
                    />,
                enableHiding: false,
            }
        ]
    }, [allowedTo]);

    const isAll = type === "all";
    const PRODUCTS_DATA = data?.data;

    return (
        <DataTable
            data={PRODUCTS_DATA}
            columns={columns}
            role={role}
            allowedTo={allowedTo}
            createButton={<CreateProduct />}
        />
    );
};