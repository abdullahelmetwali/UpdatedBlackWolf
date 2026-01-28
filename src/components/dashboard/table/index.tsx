"use client";
import Cookies from "js-cookie";

import type { Config, DataTableTypo, States } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";

import { CardContent } from "@/components/ui/card";

import { TableConfigProvider, TableStateProvider } from "./context";
import { TableHeader } from "./header";
import { TableContent } from "./content";
import { TablePagination } from "./pagination";
import { TablePDF } from "./pdf";

export function DataTable({
    data,
    columns,
    role,

    tableOptions,
    allowedTo,

    disabled,
    hidden,
    replace,

    createButton,
    filter,
    contextMenuAdditions
}: DataTableTypo) {
    const [dataState, setDataState] = useState(data);

    useEffect(() => {
        setDataState(data);
    }, [data]);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const isDeletedRoute: boolean = pathname.split('/').pop() === "deleted";

    // table settings
    const [sorting, setSorting] = useState<any[]>([]);
    const [columnFilters, setColumnFilters] = useState<any[]>([]);
    const [columnVisibility, setColumnVisibility] = useState<any>({});
    const [rowSelection, setRowSelection] = useState<any>({});
    const [globalFilter, setGlobalFilter] = useState('');

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: Number(Cookies.get("page-size")) || 10,
    });

    const table = useReactTable({
        data: dataState,
        columns,

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getRowId: (row: { id: number }) => row?.id?.toString(),

        onSortingChange: (updater) => setSorting(updater as []),
        onColumnFiltersChange: (updater) => setColumnFilters(updater as []),
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,

        enableRowSelection: () => true,

        autoResetAll: false,
        autoResetExpanded: false,
        state: {
            sorting,
            rowSelection,
            globalFilter,
            pagination,
            columnFilters,
            columnVisibility,
        },

        ...tableOptions,
    });

    const filteredLength = table?.getFilteredRowModel()?.rows?.length;
    const totalPages = Math.ceil(filteredLength / pagination.pageSize || 1);

    const updatePageSize = useCallback((pageSize: number) => {
        setPagination({ pageIndex: 0, pageSize: Number(pageSize) });
        Cookies.set("page-size", pageSize.toString());
    }, [pagination.pageSize]);

    const headers: string[] = table.getAllColumns()
        .reduce((acc, col) => {
            const header = col.columnDef.header;
            const id = col.columnDef.id;
            const idsThatHaveSortFn = ["name", "email", "username", "address", "title"];

            if (id && typeof header === "string") {
                acc.push(header)
            } else if (id && idsThatHaveSortFn.includes(id)) {
                acc.push(id)
            }

            return acc
        }, [] as string[]);

    const rows = data?.map((rowData: any) =>
        table.getAllColumns().map(col => {
            const column = col.columnDef as any;
            const accessorFn = (col.columnDef as any)?.accessorFn;

            if (accessorFn) {
                return column.accessorFn(rowData);
            };
            return rowData[column.id];
        }).filter(Boolean)
    );

    const exportToCSV = () => {
        const csvContent = [headers, ...rows]
            .map(row => row.map((field: string | any) => {
                let str = String(field || '').trim();
                str = str.replace(/\s+/g, ' '); // remove any whitespace and newlines

                // Wrap in quotes if contains comma, quote, or newline
                if (str.includes(',') || str.includes('.') || str.includes('"') || str.includes('\n')) {
                    str = str.replace(/"/g, '""');
                    return `"${str}"`;
                }

                return str;
            }).join(','))
            .join('\n');

        const BOM = '\uFEFF'; // for AR
        const blob = new Blob([BOM + csvContent], {
            type: 'text/csv;charset=utf-8'
        });

        const url = URL.createObjectURL(blob);
        const anchorLink = document.createElement('a');

        anchorLink.style.display = 'none';
        anchorLink.href = url;
        anchorLink.download = `${role}.csv`;
        document.body.appendChild(anchorLink);
        anchorLink.click();

        document.body.removeChild(anchorLink);
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        const whatAction = searchParams.get("action") || "";
        // replacing URL , because if user refresh the function will fire
        if (allowedTo.index && whatAction === "download-pdf") {
            window.print();
            router.replace(`/dashboard/${role}`);
        } else if (allowedTo.index && whatAction === "download-excel") {
            exportToCSV();
            router.replace(`/dashboard/${role}`);
        }
    }, [searchParams]);

    const onReset = useCallback(() => {
        router.replace('?');
        router.refresh();

        setDataState(data);
        setGlobalFilter('');
        setColumnFilters([]);
        setColumnVisibility({});
        setRowSelection({});
        setSorting([]);
    }, [data]);

    const refreshTable = useMutation({
        mutationKey: ['refresh-table', role, isDeletedRoute],
        mutationFn: async () => {
            const path = isDeletedRoute
                ? `/${role}/deleted`
                : `/${role}`;

            await fetch(`/api/revalidate/${role}`, { method: "POST" });
            await queryClient.refetchQueries({ queryKey: [path] });
            return { path };
        },
        onSuccess: ({ path }) => {
            router.refresh();
        },
        onError: (error: any) => {
            window.location.reload();
        }
    });

    const contextConfig: Config = {
        role,
        hidden,
        replace,
        disabled,
        allowedTo,
        isDeletedRoute,
        table,

        filter,
        createButton,
        refreshTable,
        onReset,
        exportToCSV,
        updatePageSize
    };

    const contextState: States = {
        dataState, setDataState,
        sorting, setSorting,
        columnFilters, setColumnFilters,
        rowSelection, setRowSelection,
        globalFilter, setGlobalFilter,
        pagination, setPagination,
        columnVisibility, setColumnVisibility
    };

    return (
        <CardContent className="space-y-4">
            <TableConfigProvider value={{ ...contextConfig }}>
                <TableStateProvider value={{ ...contextState }}>

                    <TableHeader />
                    <TableContent columnsLength={columns?.length} />
                    <TablePagination totalPages={totalPages} />

                </TableStateProvider>
            </TableConfigProvider>

            <TablePDF headers={headers} rows={rows} title={`${role} Table`} />
        </CardContent>
    );
};