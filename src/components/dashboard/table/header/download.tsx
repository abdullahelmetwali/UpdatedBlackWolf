import { useTableConfig, useTableState } from "../context";

import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TableDownload({ children }: { children?: React.ReactNode }) {
    const { dataState } = useTableState();
    const { exportToCSV, disabled, hidden, } = useTableConfig();

    if (hidden?.download) return null;
    return (
        <>
            {
                children ?
                    (children)
                    :
                    (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild
                                disabled={disabled?.download || !dataState.length}
                            >
                                <Button type="button" title={"dowload"} variant={'outline'}>
                                    <DownloadIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    disabled={disabled?.downloadPDF}
                                    onClick={() => window.print()}
                                >
                                    PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    disabled={disabled?.downloadCSV}
                                    onClick={exportToCSV}
                                >
                                    Excel
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
            }
        </>
    );
};