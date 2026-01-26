"use client";
import { PickerTypo } from "@/types";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { ChevronDown, ChevronsUpDown, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

export function Picker({
    label,
    placeHolder,
    className,
    required = false,

    value,
    setValue,
    setValueFor,
    errors,
    onReset,

    items,
    itemLabel = "name",
    itemValue = "_id",

    isLoading,
    error,

    searchMode = false, // if true , it means that it will popover (have search)
    ...props
}: PickerTypo) {
    const hasError = errors?.setValueFor;

    const [search, setSearch] = useState("");
    const filteredItems = items?.filter((item) =>
        item[itemLabel]?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className={cn("grid gap-1 pt-1 h-fit relative z-20 space-y-1", value ? 'pe-4' : '', className)}>
            <div className="inline-flex items-center gap-2">
                <Label htmlFor={(setValueFor as string)} className="relative z-10 text-nowrap capitalize">
                    {required && '*'} {label}
                </Label>
                {(hasError) && (
                    <span className="text-[10px] text-destructive text-nowrap max-w-32">
                        {hasError?.message}
                    </span>
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild
                    {...props as any}
                >
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "flex justify-between w-full font-normal relative z-30 border border-input bg-background",
                            value ? "opacity-100" : "opacity-60"
                        )}
                        aria-invalid={!!hasError}
                        {...props as any}
                    >
                        <span className="truncate max-w-60">
                            {/* truncate max-w-40 md:max-w-60 lg:max-w-28 2xl:max-w-40 */}
                            {
                                value ?
                                    items?.find(item =>
                                        String(item[itemValue]) === String(value)
                                    )?.[itemLabel]
                                    :
                                    placeHolder
                            }
                        </span>
                        {
                            searchMode ?
                                <ChevronsUpDown className="ms-auto h-4 w-4 relative z-30 !size-3.5" />
                                :
                                <ChevronDown className="!size-3.5" />
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] p-1 space-y-0 bg-card">
                    {
                        searchMode ?
                            <div className="relative ps-4 w-full">
                                <FocusScope>
                                    <Input
                                        aria-hidden={false}
                                        type="text"
                                        placeholder={placeHolder}
                                        value={search}
                                        onKeyDown={(e) => e.stopPropagation()}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="!outline-none !border-none !ring-0 !shadow-none text-sm"
                                    />
                                    <Search className="absolute top-2.5 start-1 !size-4" />
                                </FocusScope>
                            </div>
                            :
                            <DropdownMenuLabel className="capitalize">
                                {label || placeHolder}
                            </DropdownMenuLabel>
                    }

                    {<DropdownMenuSeparator className="bg-secondary" />}

                    <div className="max-h-60 overflow-y-auto w-full">
                        {isLoading ? (
                            <p className="text-center text-sm p-4 animate-pulse">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-sm text-destructive p-4">{error?.message}</p>
                        ) : filteredItems?.length === 0 ? (
                            <p className="text-center text-sm text-muted-foreground p-4">No results</p>
                        ) : (
                            filteredItems.map((item, index) => {
                                const thisItemLabel = item[itemLabel];
                                const thisItemValue = item[itemValue];
                                const isDisabled = Number(item?.status) === 0;
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={index}
                                        disabled={isDisabled}
                                        checked={String(value) === String(thisItemValue)}
                                        onCheckedChange={() => setValue(setValueFor, String(thisItemValue))}
                                        title={isDisabled ? "Disabled" : thisItemLabel}
                                        className="hover:bg-secondary cursor-pointer ps-2 truncate max-w-[calc(var(--radix-dropdown-menu-trigger-width)-5px)] [&_span]:!end-2 [&_span]:start-auto justify-between"
                                    >
                                        {thisItemLabel}
                                        {
                                            isDisabled &&
                                            <span className="size-2 rounded-full bg-destructive" />
                                        }
                                    </DropdownMenuCheckboxItem>
                                )
                            })
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                type="button"
                variant={"default"}
                className={cn(
                    "absolute z-10 ps-12 h-8 w-4 [&_svg]:size-auto transition-all",
                    value ? '-end-3 opacity-100 visible' : '-end-6 opacity-0 invisible pointer-events-none',
                    label ? "top-6" : "top-2.5"
                )}
                onClick={() => {
                    setValue(setValueFor, "");
                    onReset?.()
                }}
                {...props as any}
            >
                <X size={13} />
            </Button>
        </div>
    );
};