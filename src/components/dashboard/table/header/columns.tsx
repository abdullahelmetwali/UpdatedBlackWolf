import { useTableConfig } from "../context";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TableColumns({ children }: { children?: React.ReactNode }) {
    const { disabled, hidden, table } = useTableConfig();

    if (hidden?.columns) return null;
    return (
        <>
            {
                children ?
                    children
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={disabled?.columns}>
                            <Button variant={'outline'} type="button">
                                Columns <ChevronDown className="ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={"end"}
                            className="max-md:w-[--radix-dropdown-menu-trigger-width] w-full"
                        >
                            {
                                table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize truncate max-md:max-w-[--radix-dropdown-menu-trigger-width]"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {typeof column.columnDef.header === 'string'
                                                ? column.columnDef.header
                                                : column?.id
                                            }
                                        </DropdownMenuCheckboxItem>
                                    ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
            }
        </>
    )
}