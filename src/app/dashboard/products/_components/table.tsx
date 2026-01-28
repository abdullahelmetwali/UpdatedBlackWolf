"use client";

import { SpecificTable } from "@/types";
import { Column, Row } from "@tanstack/react-table";
import { useMemo } from "react";
import { format } from "date-fns";
import { useModals } from "@/contexts/modals";

import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { DataTable } from "@/components/dashboard/table";
import { ActionsBox } from "@/components/dashboard/table/actions-box";
import { FormattedDate } from "@/components/states/formatted-date";
import { DialogImage } from "@/components/states/dialog-image";
import { Status } from "@/components/states/status";

import { CreateProduct } from "./create";
import { UpdateProduct } from "./update";
import { ProductsFilter } from "./filter";
import { Description } from "./description";

export function ProductsTable({ data }: SpecificTable) {
    const role = "products";
    const { openModal } = useModals();

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
                id: "descrption",
                accessorFn: (row: any) => (row?.descrption || "N/A"),
                header: "Description",
                cell: ({ row }: { row: Row<any> }) => (
                    <Button
                        type="button"
                        variant={"outline"}
                        size={"sm"}
                        className="h-6"
                        onClick={() => openModal("description-products", row.original)}
                    >
                        <Eye /> Description
                    </Button>
                )
            },
            {
                id: "price",
                accessorFn: (row: any) => (row?.price || "0"),
                header: "Price",
                cell: ({ row }: { row: Row<any> }) => (
                    <p>
                        {row.original?.price || "N/A"} LE
                    </p>
                )
            },
            {
                id: "dicount",
                accessorFn: (row: any) => (row?.discount || "0"),
                header: "Discount",
                cell: ({ row }: { row: Row<any> }) => (
                    <p>
                        {row.original?.discount || "0"} %
                    </p>
                )
            },
            {
                id: "before-discount",
                accessorFn: (row: any) => (row?.oldPrice || "0"),
                header: "Before Discount",
                cell: ({ row }: { row: Row<any> }) => (
                    <p>
                        {row.original?.oldPrice || "0"} LE
                    </p>
                )
            },
            {
                id: "sizes",
                accessorFn: (row: any) => (row?.sizes?.map(s => s.name).join(", ") || "N/A"),
                header: "Sizes",
                cell: ({ row }: { row: Row<any> }) => (
                    <Tooltip>
                        <TooltipTrigger>
                            <p className="max-w-32 truncate">
                                {row.original?.sizes?.length
                                    ? row.original.sizes.map(s => s.name).join(", ")
                                    : "N/A"}

                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {row.original?.sizes?.length
                                    ? row.original.sizes.map(s => s.name).join(", ")
                                    : "N/A"}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                )
            },
            {
                id: "colors",
                accessorFn: (row: any) => (row?.colors?.map(s => s.name).join(", ") || "N/A"),
                header: "Colors",
                cell: ({ row }: { row: Row<any> }) => (
                    <Tooltip>
                        <TooltipTrigger>
                            <p className="max-w-32 truncate">
                                {row.original?.colors?.length
                                    ? row.original.colors.map(s => s.name).join(", ")
                                    : "N/A"}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {row.original?.colors?.length
                                    ? row.original.colors.map(s => s.name).join(", ")
                                    : "N/A"}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                )
            },
            {
                id: "categories",
                accessorFn: (row: any) => (row?.categories?.map(s => s.name).join(", ") || "N/A"),
                header: "Categories",
                cell: ({ row }: { row: Row<any> }) => (
                    <Tooltip>
                        <TooltipTrigger>
                            <p className="max-w-32 truncate">
                                {row.original?.categories?.length
                                    ? row.original.categories.map(s => s.name).join(", ")
                                    : "N/A"}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {row.original?.categories?.length
                                    ? row.original.categories.map(s => s.name).join(", ")
                                    : "N/A"}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                )
            },
            {
                id: "inStock",
                accessorFn: (row: any) => (row?.inStock || "0"),
                header: "In Stock",
                cell: ({ row }: { row: Row<any> }) => (
                    <p>
                        {row.original?.inStock || "0"} Pieces
                    </p>
                )
            },
            {
                accessorKey: "image",
                header: "Image",
                cell: ({ row }: { row: Row<any> }) => (
                    <DialogImage
                        src={row.original?.image}
                        alt={row.original?.name}
                        width={200}
                        height={200}
                        unoptimized
                    />
                )
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
                        links={{
                            show: `/products/${row.original.slug}`,
                        }}
                    />,
                enableHiding: false,
            }
        ]
    }, [allowedTo]);

    return (
        <>
            <UpdateProduct />
            <Description />
            <DataTable
                data={data || []}
                columns={columns}
                role={role}
                allowedTo={allowedTo}
                createButton={<CreateProduct />}
                filter={<ProductsFilter />}
            />
        </>
    );
};