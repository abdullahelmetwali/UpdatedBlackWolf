import { flexRender, HeaderGroup, Row } from "@tanstack/react-table";

// import { useRecord } from "@/store/record"
import { useTableConfig } from "./context";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";

// import { FeaturedContextMenu } from "@/components/features/context-menu";

import { Delete } from "@/components/dashboard/actions/delete";
import { ForceDelete } from "@/components/dashboard/actions/force-delete";
import { Restore } from "@/components/dashboard/actions/restore";

export const TableContent = ({ columnsLength }) => {
    const { role, hidden, replace, allowedTo, createButton, disabled, table, isDeletedRoute } = useTableConfig();
    // const { openModal, setRecord } = useRecord();

    const toggleRowSelection = (row: Row<any>) => {
        if (allowedTo.multiActions) {
            if (row.getIsSelected()) {
                row.toggleSelected(!row.original?._id)
            } else {
                row.toggleSelected(!!row.original?._id)
            }
        }
    };

    // const contextMenuConfig = (row: Row<any>): FeaturedContextMenuTypo => {
    //     return {
    //         role: role,
    //         children: null,
    //         additions: contextMenuAdditions,
    //         disabled: disabled?.contextMenu,

    //         update: {
    //             action: () => {
    //                 createButton && openModal(`update-${role}`, row.original)
    //             },
    //             link: (createButton ? "" : `/dashboard/${role}/${row.original?._id}`)
    //         },
    //         show: {
    //             action: () => openModal(`show-${role}`, row.original)
    //         },
    //         actions: {
    //             deleteAction: () => {
    //                 replace?.contextMenu?.deleteAction?.()
    //                     ??
    //                     openModal(`delete-${role}`, row.original);
    //             },
    //             forceDeleteAction: () => {
    //                 replace?.contextMenu?.forceDeleteAction?.()
    //                     ??
    //                     openModal(`force-delete-${role}`, row.original)
    //             },
    //             restoreAction: () => {
    //                 replace?.contextMenu?.restoreAction?.()
    //                     ??
    //                     openModal(`restore-${role}`, row.original)
    //             },
    //             multiAction: () => {
    //                 replace?.contextMenu?.multiAction?.()
    //                     ??
    //                     setRecord("multiActions-contextMenu", row.original)
    //             }
    //         },
    //         hidden: {
    //             create: hidden?.contextMenu?.create,
    //             update: hidden?.contextMenu?.update,
    //             show: hidden?.contextMenu?.show,
    //             download: hidden?.contextMenu?.download,

    //             indexPage: (hidden?.contextMenu?.indexPage || !isDeletedRoute),
    //             deletedPage: (hidden?.contextMenu?.deletedPage || isDeletedRoute),

    //             activate: hidden?.contextMenu?.activate || row.original?.status === 1,
    //             unactivate:
    //                 !row.getCanSelect()
    //                 || row.original?.status === 0
    //                 || hidden?.contextMenu?.unactivate,

    //             deleteAction: hidden?.contextMenu?.deleteAction || !row.getCanSelect(),
    //             forceDeleteAction: hidden?.contextMenu?.forceDeleteAction,
    //             restoreAction: hidden?.contextMenu?.restoreAction,
    //         },
    //     }
    // };

    return (
        <div className="rounded border pb-4 !overflow-hidden">
            <Table className='overflow-hidden'>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>, index: number) =>
                        <TableRow key={index} className="bg-border rounded-lg !sticky top-0">
                            <TableHead className="grid place-items-center w-20">
                                {
                                    allowedTo.multiActions && (
                                        <Checkbox
                                            checked={
                                                table.getIsAllPageRowsSelected() ||
                                                (table.getIsSomePageRowsSelected() && "indeterminate")
                                            }
                                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                            aria-label="Select all"
                                        />
                                    )
                                }
                            </TableHead>
                            {
                                headerGroup?.headers.map((header, index: number) => (
                                    <TableHead key={index} className="px-4 text-nowrap">
                                        {
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </TableHead>
                                ))
                            }
                        </TableRow>
                    )}
                </TableHeader>
                <TableBody>
                    {(table?.getRowModel().rows?.length) ? (
                        table?.getRowModel()?.rows?.map((row: Row<any>, index: number) => (
                            // <FeaturedContextMenu key={row?._id}
                            //     title={row.original?.name || row.original?.title || row.original?.group_name}
                            //     {...contextMenuConfig(row)}
                            // >
                            <TableRow
                                key={index}
                                onDoubleClick={() => toggleRowSelection(row)}
                                data-state={row?.getIsSelected() && "selected"}
                                className="hover:bg-muted"
                            >
                                {
                                    (allowedTo.multiActions) && (row.getCanSelect()) ? (
                                        <TableCell className="grid place-items-center h-full min-h-12 w-20">
                                            <Checkbox
                                                value={row.original._id}
                                                checked={row.getIsSelected()}
                                                onCheckedChange={(value) => row.toggleSelected(!!value)}
                                                aria-label={`Select ${row?.original.name}`}
                                            />
                                        </TableCell>
                                    )
                                        :
                                        <TableCell className="w-20" />
                                }
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="px-4 truncate">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                            // </FeaturedContextMenu>
                        ))
                    ) : (
                        <TableRow className="w-full">
                            <TableCell colSpan={columnsLength + 1}
                                className="h-28 w-full text-nowrap !text-center text-base">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* actions */}
            <Delete role={role} />
            <ForceDelete role={role} />
            <Restore role={role} />

        </div>
    )
}