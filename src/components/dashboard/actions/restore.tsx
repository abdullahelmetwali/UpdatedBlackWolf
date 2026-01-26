"use client";
import { BASE_URL } from "@/utils/url";
import { TOKEN_CL } from "@/utils/token/client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useModals } from "@/contexts/modals";
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

export function Restore({ role, }: { role: string }) {
    const { isModalOpen, closeModal, getItemInModal } = useModals();

    const itemToDelete = getItemInModal(`restore-${role}`);
    const isOpen = isModalOpen(`restore-${role}`);

    const router = useRouter();
    const token = TOKEN_CL();

    const restoreMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${BASE_URL}/${role}/restore/${itemToDelete?.id}`, {
                method: "PATCH",
                headers: { 'Authorization': `Bearer ${token}`, },
            });

            if (!response.ok) throw new Error("Restore failed");
            await Promise.all([
                fetch(`/api/revalidate/${role}`, { method: "POST" }),
                fetch(`/api/revalidate/${role}/deleted`, { method: "POST" }),
            ]);

            const data = await response.json();
            return data?.data;
        },
        onSuccess: (response) => {
            closeModal(`restore-${role}`);

            router.refresh();

            toast({
                title: "Done, operation success",
                description: `The item restored back to system successfully`,
            });

        },
        onError: (error: any) => {
            const err = error?.response?.data;
            closeModal(`restore-${role}`);

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
            if (!restoreMutation.isPending && !v) {
                closeModal(`restore-${role}`)
            }
        }}>
            <DialogContent onKeyDown={(e) => {
                if (e.key === "Enter" && !restoreMutation.isPending) {
                    restoreMutation.mutate();
                }
            }}>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action will restore the item back to the system.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className={'grid md:grid-cols-2 items-center gap-2 mt-4 *:!mx-0'}>
                    <DialogClose asChild disabled={restoreMutation.isPending}>
                        <Button variant="secondary" disabled={restoreMutation.isPending} className="w-full">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className="w-full"
                        variant="destructive"
                        onClick={() => {
                            if (!restoreMutation.isPending) {
                                restoreMutation.mutate();
                            }
                        }}
                        disabled={restoreMutation.isPending}
                    >
                        {restoreMutation.isPending ? "Restoring..." : "Restore"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}