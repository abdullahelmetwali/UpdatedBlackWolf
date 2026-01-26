import { TextField as TextFieldTypo } from "@/types";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import { cn } from "@/lib/cn";
import { EyeClosedIcon, EyeIcon, Flag } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const TextField = ({
    label,
    className,
    type = "text",
    required = false,

    value,
    registerFor,
    register,
    errors,
    errorMessage,

    tooltip,
    textarea,
    toggleSeePassword = false,

    ...props
}: TextFieldTypo) => {
    const hasError = errors?.[registerFor];
    const isMobile = useIsMobile();
    const [inputType, setInputType] = useState(type);
    return (
        <div className="space-y-1 w-full">
            {
                label &&
                <div className="inline-flex gap-3">
                    <Label htmlFor={(registerFor as string) || label} className="text-nowrap capitalize">
                        {required && '*'} {label}
                    </Label>
                    {(hasError || errorMessage) && (
                        <span className="text-xs text-destructive max-w-96 truncate text-nowrap"
                            title={hasError?.message || errorMessage}
                        >
                            {hasError?.message || errorMessage}
                        </span>
                    )}
                </div>
            }
            <div className={cn("max-md:min-w-60 2xl:min-w-80 max-w-3xl w-full relative", className)}>
                {
                    textarea ?
                        <Textarea
                            id={registerFor || label}
                            defaultValue={value}
                            cols={1}
                            className={cn('h-16 max-h-24', className)}
                            {...(register ? register(registerFor, {
                                required: required ? `${label} is required` : false,
                            }) : {})}
                            aria-invalid={!!hasError}

                            {...props as any}
                        />
                        :
                        <Input
                            id={registerFor || label}
                            type={inputType}
                            step={inputType === "number" ? '0.001' : undefined}
                            defaultValue={value}
                            autoComplete={inputType === "password" ? 'new-password' : 'off'}
                            {...(register ? register(registerFor, {
                                required: required ? `${label} is required` : false,
                            }) : {})}
                            className="w-full text-sm"
                            aria-invalid={!!hasError}
                            required={required}

                            {...props as any}
                        />
                }
                {
                    tooltip &&
                    <>
                        {
                            isMobile ?
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            className="absolute inset-y-0 end-0 rounded-s-none"
                                            type="button"
                                            size={"icon"}
                                            variant={"outline"}
                                        >
                                            <Flag />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-fit !py-0.5 text-sm"
                                        side="top"
                                        align="end"
                                        sideOffset={4}
                                    >
                                        {tooltip}
                                    </PopoverContent>
                                </Popover>
                                :
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            className="absolute inset-y-0 end-0 rounded-s-none"
                                            type="button"
                                            size={"icon"}
                                            variant={"outline"}
                                        >
                                            <Flag />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-popover text-popover-foreground [&_svg]:bg-popover [&_svg]:fill-popover">
                                        {tooltip}
                                    </TooltipContent>
                                </Tooltip>
                        }
                    </>
                }
                {
                    toggleSeePassword &&
                    <Button
                        type="button"
                        className="absolute inset-y-0 end-0 rounded-s-none transition"
                        onClick={() => setInputType((prev: string) => {
                            if (prev === "password") return "text"
                            return "password"
                        })}
                        size={"icon"}
                        variant={"outline"}
                    >
                        {inputType === "password" ? <EyeIcon /> : <EyeClosedIcon />}
                    </Button>
                }
            </div>
        </div>
    );
};