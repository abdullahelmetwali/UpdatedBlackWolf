import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTableConfig, useTableState } from "../context";
import { Button } from "@/components/ui/button";
import { ChevronDown, RefreshCcw, TrashIcon } from "lucide-react";
import { MinimalMultiAction } from "../../actions/multi-actions";

export function TableMultiAction() {
    const { rowSelection, } = useTableState();
    const { disabled, role, allowedTo, isDeletedRoute, hidden } = useTableConfig();

    if (hidden?.multiAction) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild
                disabled={
                    Object.keys(rowSelection)?.length === 0 ||
                    disabled?.multiAction
                }
            >
                <Button variant={'outline'} type="button">
                    Multi Actions <ChevronDown className="ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!w-[--radix-dropdown-menu-trigger-width]">

                {
                    isDeletedRoute ?
                        (allowedTo.forceDelete) &&
                        <DropdownMenuItem asChild>
                            <MinimalMultiAction
                                role={role}
                                actionType={'force-delete'}
                                ids={Object.keys(rowSelection)}
                                message={`These ${role.toLowerCase()} deleted successfully`}
                            >
                                <Button variant={'ghost'} className="w-full justify-start h-7">
                                    <TrashIcon />
                                    Force Delete
                                </Button>
                            </MinimalMultiAction>
                        </DropdownMenuItem>
                        :
                        (allowedTo.delete) &&
                        <DropdownMenuItem asChild>
                            <MinimalMultiAction
                                role={role}
                                actionType={'delete'}
                                ids={Object.keys(rowSelection)}
                                message={`These ${role.toLowerCase()} deleted successfully`}
                            >
                                <Button variant={'ghost'} className="w-full justify-start h-7">
                                    <TrashIcon />
                                    Delete
                                </Button>
                            </MinimalMultiAction>
                        </DropdownMenuItem>
                }

                {
                    isDeletedRoute ?
                        (allowedTo.restore) &&
                        <DropdownMenuItem asChild>
                            <MinimalMultiAction
                                role={role}
                                actionType={'restore'}
                                ids={Object.keys(rowSelection)}
                                message={`These ${role.toLowerCase()} restored successfully`}
                            >
                                <Button variant={'ghost'} className="w-full justify-start h-7">
                                    <RefreshCcw />
                                    Restore
                                </Button>
                            </MinimalMultiAction>
                        </DropdownMenuItem>
                        :
                        <>
                            {/* active */}
                            <DropdownMenuItem asChild>
                                <MinimalMultiAction
                                    role={role}
                                    actionType={'status_active'}
                                    ids={Object.keys(rowSelection)}
                                    message={`These ${role.toLowerCase()} activated successfully`}
                                >
                                    <Button variant={'ghost'} className="w-full justify-start h-7">
                                        <span className="rounded-full relative size-2 before:size-2 before:rounded-full before:absolute before:end-0 before:animate-ping before:bg-lime-600 bg-lime-600" />
                                        Active
                                    </Button>
                                </MinimalMultiAction>
                            </DropdownMenuItem>

                            {/* inactive */}
                            <DropdownMenuItem asChild>
                                <MinimalMultiAction
                                    role={role}
                                    actionType={'status_inactive'}
                                    ids={Object.keys(rowSelection)}
                                    message={`These ${role} unactivated successfully`}
                                >
                                    <Button variant={'ghost'} className="w-full justify-start h-7">
                                        <span className="size-2 rounded-full bg-destructive" />
                                        Unactive
                                    </Button>
                                </MinimalMultiAction>
                            </DropdownMenuItem>
                        </>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}