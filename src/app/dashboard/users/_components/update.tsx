"use client";
import { CreateOrUpdate } from "@/types";
import { Category } from "@/types/models";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { revalidate } from "@/utils/revalidate";
import { useModals } from "@/contexts/modals";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import { statuses } from "@/constants";
import { TextField } from "@/components/form/text-field";
import { Picker } from "@/components/form/picker";

export function UpdateUser({
    disabled,
    onError,
    onSuccess,
}: CreateOrUpdate) {
    const { getItemInModal, isModalOpen, closeModal } = useModals();

    const thisCategory: Category = getItemInModal("update-categories") || {};
    const isOpen = isModalOpen("update-categories");

    const {
        setValue,
        setError,
        clearErrors,
        formState: { errors },
        register,
        watch,
        getValues,
    } = useForm<Category>({
        defaultValues: {
            name: thisCategory.name,
            slug: thisCategory.slug,
            status: thisCategory.status,
        },
    });

    useEffect(() => {
        if (thisCategory && isOpen) {
            setValue("name", thisCategory.name || "");
            setValue("slug", thisCategory.slug || "");
            setValue("status", thisCategory.status || "");
        }
    }, [thisCategory, isOpen]);

    const updateCategory = useFormSubmission({
        endPoint: `/categories/${thisCategory._id}`,
        method: "PUT",
        setError,
        clearErrors,
        onError: (error) => {
            onError?.(error);
        },
        onSuccess: async (response) => {
            await revalidate({ url: "/categories" });
            onSuccess?.(response);

            toast({
                variant: "success",
                title: `${response.name} updated successfully`
            });

            closeModal("update-categories");
        },
    });

    const onSubmit = (data: any) => {
        const body = {
            name: data.name,
            status: data.status || "1"
        };

        updateCategory.mutate(body);
    };

    return (
        <Drawer open={isOpen} onOpenChange={(open) => { if (!open) closeModal("update-categories") }}>
            <DrawerContent className="max-h-[90dvh]">
                <DrawerHeader>
                    <DrawerTitle>Update {thisCategory.name}</DrawerTitle>
                    <DrawerDescription>Here you can update {thisCategory.name} to the system</DrawerDescription>
                </DrawerHeader>
                <div className="w-full grid place-items-center pb-4 *:w-11/12 *:md:w-8/12 max-md:overflow-y-scroll"
                    aria-disabled={updateCategory.isPending}>
                    <form
                        id="update-categories"
                        className="grid gap-2 md:grid-cols-2 place-items-center"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSubmit(getValues())
                        }}
                    >
                        {/* name */}
                        <TextField
                            label="Name"
                            placeholder={`Product's old name is ${thisCategory.name}`}

                            register={register}
                            registerFor="name"
                            errors={errors}

                            disabled={disabled?.name}
                            required
                        />

                        {/* status */}
                        <Picker
                            items={statuses}
                            label="Status"
                            placeHolder={`Product's old status is ${thisCategory.status}`}
                            className="w-full"

                            value={watch("status") || "1"}
                            setValue={setValue}
                            setValueFor={"status"}
                            errors={errors}

                            disabled={disabled?.status}
                            required
                        />
                    </form>
                    <DrawerFooter className="w-full px-0 grid md:grid-cols-2">
                        <DrawerClose asChild>
                            <Button variant={"destructive"}>
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            type="submit"
                            form="update-categories"
                            variant={"secondary"}
                            disabled={updateCategory.isPending}
                        >
                            {updateCategory.isPending ? "Updatting..." : "Update"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
};