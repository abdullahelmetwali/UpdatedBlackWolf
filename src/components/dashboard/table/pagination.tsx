import { useTableConfig, useTableState } from "./context";

import {
    ChevronsLeft,
    ChevronLeft,
    ChevronsRight,
    ChevronRight,
    Eclipse
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

export const TablePagination = ({ totalPages }) => {
    const { pagination, dataState } = useTableState();
    const { table } = useTableConfig();

    const pageIndex = table.getState().pagination.pageIndex;
    const VISIBLE_PAGES = 5;

    return (
        <div className="flex items-center justify-between gap-4 space-x-2 py-2 max-lg:flex-col-reverse">
            <div className="flex text-sm text-muted-foreground text-right">
                {table?.getFilteredSelectedRowModel()?.rows?.length} of {" "}
                {dataState?.length || 0} Selected rows.
            </div>

            <div className="flex items-center justify-between">
                <Pagination>
                    <PaginationContent>

                        {/* Previous button */}
                        <PaginationItem className="space-x-1">
                            <Button
                                type="button"
                                variant="outline"
                                className="invisible md:visible"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronsLeft className="rtl:rotate-180" />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeft className="rtl:rotate-180" />
                            </Button>
                        </PaginationItem>

                        {/* Page numbers */}
                        {
                            totalPages &&
                            <>
                                {[...Array(Math.min(VISIBLE_PAGES, (totalPages || 0) - pagination.pageIndex))].map((_, i) => {
                                    const pageNumber = pagination.pageIndex + i;
                                    return (
                                        <PaginationItem key={pageNumber}>
                                            <Button
                                                type="button"
                                                variant={pagination.pageIndex === pageNumber ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => table.setPageIndex(pageNumber)}
                                            >
                                                {pageNumber + 1}
                                            </Button>
                                        </PaginationItem>
                                    );
                                })}
                            </>
                        }

                        {/* NEXT PAGES after visible */}
                        {
                            totalPages > pageIndex + VISIBLE_PAGES &&
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="px-2">
                                        <Eclipse />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="max-h-[360px] overflow-y-auto">
                                    <div className="sticky top-0 z-20">
                                        <Input
                                            className="w-[130px] bg-card z-20"
                                            placeholder="Page number"
                                            type="number"
                                            onChange={(e) => {
                                                if ((Number(e.target.value) - 1) < (dataState.length / pagination.pageSize)) {
                                                    table.setPageIndex(Number(e.target.value) - 1)
                                                    e.target.setAttribute('aria-invalid', "false")
                                                } else {
                                                    e.target.setAttribute('aria-invalid', "true")
                                                }
                                            }}
                                        />
                                    </div>
                                    {[...Array(VISIBLE_PAGES + 3)].map((_, i) => {
                                        const pageNumber = VISIBLE_PAGES + i;
                                        return (
                                            <DropdownMenuItem
                                                key={pageNumber}
                                                onClick={() => table.setPageIndex(pageNumber)}
                                            >
                                                {pageNumber + 1}
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }

                        {/* Next button */}
                        <PaginationItem className="space-x-1">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRight className="rtl:rotate-180" />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="invisible md:visible"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronsRight className="rtl:rotate-180" />
                            </Button>
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            </div>

        </div >
    )
};