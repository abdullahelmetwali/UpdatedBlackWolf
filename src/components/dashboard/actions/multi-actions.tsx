"use client";
import { MultiAction } from "@/types";
import { BASE_URL } from "@/utils/url";
import { TOKEN_CL } from "@/utils/token/client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useTableState } from "@/components/dashboard/table/context";
import { toast } from "@/hooks/use-toast";

import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function MinimalMultiAction({ actionType, ids, children, message, role }: MultiAction) {
    const router = useRouter();
    const { setRowSelection } = useTableState();

    const token = TOKEN_CL();

    const [open, setOpen] = useState(false);

    const multiAction = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${BASE_URL}/${role}/multi-actions`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}`, },
                body: JSON.stringify({
                    type: actionType,
                    ids: ids
                }),
            });

            if (!response.ok) throw new Error(response.statusText);
            await Promise.all([
                fetch(`/api/revalidate/${role}`, { method: "POST" }),
                fetch(`/api/revalidate/${role}/deleted`, { method: "POST" }),
            ]);

            const data = await response.json();
            return data.data;
        },
        onSuccess: () => {
            router.refresh();

            setRowSelection({});
            setOpen(false);

            toast({
                title: "Done, operation success",
                description: message,
            });
        },
        onError: (error: any) => {
            const err = error?.response?.data;
            setOpen(false);

            if (err?.status === 403) {
                toast({
                    variant: "destructive",
                    title: (
                        <div className="flex items-center gap-4">
                            <Ghost size={25} />
                            <p className="text-xs">
                                403 | You don't have permission to make this action.
                            </p>
                        </div>
                    ) as any,
                });

                setTimeout(() => window.location.reload(), 1100);
                return;
            } else {
                toast({
                    title: "Failed",
                    description: error?.response?.data?.message || "Something went wrong, please try again later!",
                    variant: 'destructive'
                });
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={(v) => {
            if (!multiAction.isPending && !v) {
                setOpen(false)
            } else {
                setOpen(true)
            }
        }}>
            <DialogTrigger disabled={!ids.length} asChild>
                {children}
            </DialogTrigger>
            <DialogContent onKeyDown={(e) => {
                if (e.key === "Enter" && !multiAction.isPending) {
                    multiAction.mutate();
                }
            }}>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This will
                        <strong className="mx-1">
                            {actionType.replace(/[_-]/g, " ")}
                        </strong>
                        the selected
                        <strong className="mx-1">
                            {role}.
                        </strong>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="grid md:grid-cols-2 gap-2 mt-4 *:!mx-0">
                    <Button
                        variant="secondary"
                        onClick={() => setOpen(false)}
                        disabled={multiAction.isPending}
                        className="w-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={actionType === "delete" ? 'destructive' : 'default'}
                        className="w-full"
                        onClick={() => multiAction.mutate()}
                        disabled={multiAction.isPending}
                    >
                        {multiAction.isPending ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}