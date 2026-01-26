import { Button } from "@/components/ui/button";
import { useTableConfig } from "../context";

export function TableReset({ children }: { children?: React.ReactNode }) {
    const { onReset, disabled, hidden } = useTableConfig();

    if (hidden?.reset) return null;
    return (
        <>
            {
                children ?
                    children
                    :
                    <Button
                        variant={'outline'}
                        type="button"
                        onClick={onReset}
                        disabled={disabled?.reset}
                    >
                        Reset
                    </Button>
            }
        </>
    );
};