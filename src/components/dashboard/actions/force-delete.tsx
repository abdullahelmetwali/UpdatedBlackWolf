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

export function ForceDelete({ role, }: { role: string }) {
    const { isModalOpen, closeModal, getItemInModal } = useModals();

    const itemToDelete = getItemInModal(`force-delete-${role}`);
    const isOpen = isModalOpen(`force-delete-${role}`);

    const router = useRouter();
    const token = TOKEN_CL();

    const forceDeleteMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${BASE_URL}/${role}/hard/${itemToDelete?._id}`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}`, },
            });

            if (!response.ok) throw new Error("Delete failed");
            await fetch(`/api/revalidate/${role}/deleted`, { method: "POST" });

            const data = await response.json();
            return data?.data;
        },
        onSuccess: (response) => {
            closeModal(`force-delete-${role}`);

            router.refresh();

            toast({
                variant: "success",
                title: "Done, operation success",
                description: `The item deleted forever from system successfully`,
            });

        },
        onError: (error: any) => {
            const err = error?.response?.data;
            closeModal(`force-delete-${role}`);

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
            if (!forceDeleteMutation.isPending && !v) {
                closeModal(`force-delete-${role}`)
            }
        }}>
            <DialogContent onKeyDown={(e) => {
                if (e.key === "Enter" && !forceDeleteMutation.isPending) {
                    forceDeleteMutation.mutate();
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
                            forever
                        </b>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className={'grid md:grid-cols-2 items-center gap-2 mt-4 *:!mx-0'}>
                    <DialogClose asChild disabled={forceDeleteMutation.isPending}>
                        <Button variant="secondary" disabled={forceDeleteMutation.isPending} className="w-full">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className="w-full"
                        variant="destructive"
                        onClick={() => {
                            if (!forceDeleteMutation.isPending) {
                                forceDeleteMutation.mutate();
                            }
                        }}
                        disabled={forceDeleteMutation.isPending}
                    >
                        {forceDeleteMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}