import { useFormSubmission } from "@/hooks/use-form-submission";
import { useForm } from "react-hook-form";
import { revalidate } from "@/utils/revalidate";
import { useModals } from "@/contexts/modals";
import { toast } from "@/hooks/use-toast";

import { TextField } from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function Description() {
    const { setError, clearErrors, register, watch } = useForm();
    const { getItemInModal, isModalOpen, closeModal } = useModals();

    const product = getItemInModal("description-products") || {};
    const isOpen = isModalOpen("description-products");

    const updateProduct = useFormSubmission({
        endPoint: `/products/${product._id}`,
        method: "PUT",
        setError,
        clearErrors,
        onSuccess: async () => {
            await revalidate({ url: "/products" });
            toast({
                variant: "success",
                title: `${product.name} description updated successfully`
            })

            closeModal("description-products");
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) closeModal("description-products")
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Description for {product?.name}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div>
                    <TextField
                        disabled={updateProduct.isPending}
                        register={register}
                        registerFor="description"
                        value={product?.description || "N/A"}
                        textarea
                    />
                </div>
                <DialogFooter>
                    <Button
                        disabled={updateProduct.isPending}
                        onClick={() => updateProduct.mutate({
                            ...product,
                            description: watch("description"),
                        })}>
                        {updateProduct.isPending ? "Updatting...." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};