"use client";
import { CreateOrUpdate } from "@/types";
import { Category, Color } from "@/types/models";

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

export function UpdateColor({
    disabled,
    onError,
    onSuccess,
}: CreateOrUpdate) {
    const { getItemInModal, isModalOpen, closeModal } = useModals();

    const thisColor: Color = getItemInModal("update-colors") || {};
    const isOpen = isModalOpen("update-colors");

    const {
        setValue,
        setError,
        clearErrors,
        formState: { errors },
        register,
        watch,
        getValues,
    } = useForm<Color>({
        defaultValues: {
            name: thisColor.name,
            value: thisColor.value,
            status: thisColor.status,
        },
    });

    useEffect(() => {
        if (thisColor && isOpen) {
            setValue("name", thisColor.name || "");
            setValue("value", thisColor.value || "");
            setValue("status", thisColor.status || "");
        }
    }, [thisColor, isOpen]);

    const updateColor = useFormSubmission({
        endPoint: `/colors/${thisColor._id}`,
        method: "PUT",
        setError,
        clearErrors,
        onError: (error) => {
            onError?.(error);
        },
        onSuccess: async (response) => {
            await revalidate({ url: "/colors" });
            onSuccess?.(response);

            toast({
                variant: "success",
                title: `${response.name} updated successfully`
            });

            closeModal("update-colors");
        },
    });

    const onSubmit = (data: any) => {
        const body = {
            name: data.name,
            value: data.value,
            status: data.status || "1"
        };

        updateColor.mutate(body);
    };

    return (
        <Drawer open={isOpen} onOpenChange={(open) => { if (!open) closeModal("update-colors") }}>
            <DrawerContent className="max-h-[90dvh]">
                <DrawerHeader>
                    <DrawerTitle>Update {thisColor.name}</DrawerTitle>
                    <DrawerDescription>Here you can update {thisColor.name} to the system</DrawerDescription>
                </DrawerHeader>
                <div className="w-full grid place-items-center pb-4 *:w-11/12 *:md:w-8/12 max-md:overflow-y-scroll"
                    aria-disabled={updateColor.isPending}>
                    <form
                        id="update-colors"
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
                            placeholder={`Product's old name is ${thisColor.name}`}

                            register={register}
                            registerFor="name"
                            errors={errors}

                            disabled={disabled?.name}
                            required
                        />

                        {/* value */}
                        <TextField
                            type="color"
                            label="Color"
                            placeholder="Choose color value here..."

                            register={register}
                            registerFor="value"
                            errors={errors}

                            disabled={disabled?.value}
                            required
                        />

                        {/* status */}
                        <Picker
                            items={statuses}
                            label="Status"
                            placeHolder={`Product's old status is ${thisColor.status}`}
                            className="w-full md:col-span-2"

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
                            form="update-colors"
                            variant={"secondary"}
                            disabled={updateColor.isPending}
                        >
                            {updateColor.isPending ? "Updatting..." : "Update"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
};