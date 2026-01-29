"use client";
import { BASE_URL } from "@/utils/url";
import { TOKEN_CL } from "@/utils/token/client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useModals } from "@/contexts/modals";
import { useTableConfig } from "../table/context";
import { toast } from "@/hooks/use-toast";

import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function Delete({ role }: { role: string }) {
    const { isModalOpen, closeModal, getItemInModal } = useModals();
    const { allowedTo } = useTableConfig();

    const itemToDelete = getItemInModal(`delete-${role}`);
    const isOpen = isModalOpen(`delete-${role}`);

    const router = useRouter();
    const token = TOKEN_CL();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${BASE_URL}/${role}/soft/${itemToDelete?._id}`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}`, },
            });

            if (!response.ok) throw new Error("Delete failed");

            await Promise.all([
                fetch(`/api/revalidate/${role}`, { method: "POST" }),
                fetch(`/api/revalidate/${role}/deleted`, { method: "POST" }),
            ]);

            const data = await response.json();
            return data?.data;
        },
        onSuccess: (response) => {
            closeModal(`delete-${role}`);

            router.refresh();

            toast({
                variant: "success",
                title: "Done, operation success",
                description: `The item deleted temporarily from system successfully`,
            });

        },
        onError: (error: any) => {
            const err = error?.response?.data;
            closeModal(`delete-${role}`);

            if (err?.status === 403) {
                toast({
                    variant: "destructive",
                    title: (
                        <div className="flex items-center gap-4">
                            <Ghost size={25} />
                            <p className="text-xs">
                                403 | You don’t have permission to make this action.
                            </p>
                        </div>
                    ) as any,
                });

                setTimeout(() => window.location.reload(), 1100);
                return;
            } else {
                toast({
                    title: "Failed",
                    description: "Something went wrong, please try again later!",
                    variant: 'destructive'
                });
            }
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={(v) => {
            if (!deleteMutation.isPending && !v) {
                closeModal(`delete-${role}`)
            }
        }}>
            <DialogContent onKeyDown={(e) => {
                if (e.key === "Enter" && !deleteMutation.isPending) {
                    deleteMutation.mutate();
                }
            }}>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This will be deleted
                        <span className="text-destructive font-bold mx-1">
                            {itemToDelete?.name}
                        </span>
                        <b>
                            {allowedTo.forceDelete ? "temporarily" : "forever"}
                        </b>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className={'grid md:grid-cols-2 items-center gap-2 mt-4 *:!mx-0'}>
                    <DialogClose asChild disabled={deleteMutation.isPending}>
                        <Button variant="secondary" disabled={deleteMutation.isPending} className="w-full">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className="w-full"
                        variant="destructive"
                        onClick={() => {
                            if (!deleteMutation.isPending) {
                                deleteMutation.mutate();
                            }
                        }}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};