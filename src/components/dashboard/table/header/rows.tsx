import { useTableConfig, useTableState } from "../context";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

export function TableRows({ children }: { children?: React.ReactNode }) {
    const { updatePageSize, disabled, hidden } = useTableConfig();
    const { pagination } = useTableState();

    if (hidden?.rows) return null;
    return (
        <>
            {
                children ?
                    children
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={disabled?.rows}>
                            <Button variant={'outline'} type="button">
                                Rows <ChevronDown className="ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end"
                            className="max-md:w-[--radix-dropdown-menu-trigger-width]"
                        >
                            <DropdownMenuCheckboxItem checked={pagination.pageSize === 10}
                                onCheckedChange={() => updatePageSize(10)}
                            >
                                10
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={pagination.pageSize === 20}
                                onCheckedChange={() => updatePageSize(20)}
                            >
                                20
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={pagination.pageSize === 30}
                                onCheckedChange={() => updatePageSize(30)}
                            >
                                30
                            </DropdownMenuCheckboxItem>
                            <Input
                                type="number"
                                maxLength={2}
                                minLength={0}
                                className="max-w-32 text-xs h-7"
                                placeholder={`Rows number is ${pagination.pageSize}`}
                                onChange={(e) => {
                                    if (e.target.value.length <= 2 && e.target.value) {
                                        setTimeout(() => {
                                            updatePageSize(Number(e.target.value));
                                        }, 1500)
                                        e.target.setAttribute('aria-invalid', 'false');
                                    } else {
                                        e.target.setAttribute('aria-invalid', 'true');
                                    }
                                }}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
            }
        </>
    )
}