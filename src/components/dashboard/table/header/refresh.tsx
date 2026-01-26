import { useTableConfig } from "../context";

import { Loader, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function TableRefresh({ children }: { children?: React.ReactNode }) {
    const { refreshTable, disabled, hidden, role } = useTableConfig();

    if (hidden?.refresh) return null;
    return (
        <>
            {
                children ?
                    (children)
                    :
                    (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    title="Refresh Table"
                                    className="group *:!size-3.5"
                                    variant={'outline'}
                                    disabled={refreshTable.isPending || disabled?.refresh}
                                    onClick={() => refreshTable.mutate({})}
                                >
                                    {refreshTable.isPending ? <Loader className="animate-spin" /> : <RefreshCcw className="group-hover:-rotate-[270deg] transition-all" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Refresh {role}
                            </TooltipContent>
                        </Tooltip>
                    )
            }
        </>
    );
};