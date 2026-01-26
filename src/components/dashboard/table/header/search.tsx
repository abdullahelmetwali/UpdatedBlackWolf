import { Input } from "@/components/ui/input";
import { useTableConfig, useTableState } from "../context";

export function TableSearch({ children }: { children?: React.ReactNode }) {
    const { globalFilter, setGlobalFilter, } = useTableState();
    const { disabled, hidden } = useTableConfig();

    if (hidden?.search) return null;
    return (
        <>
            {
                children ?
                    children
                    :
                    <Input
                        disabled={disabled?.search}
                        placeholder="Search all columns"
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-full min-w-md text-sm"
                    />
            }
        </>
    )
}