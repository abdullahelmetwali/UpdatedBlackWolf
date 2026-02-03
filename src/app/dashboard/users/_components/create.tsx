import { CreateOrUpdate } from "@/types";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useForm } from "react-hook-form";
import { revalidate } from "@/utils/revalidate";
import { toast } from "@/hooks/use-toast";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { statuses } from "@/constants";
import { Picker } from "@/components/form/picker";
import { TextField } from "@/components/form/text-field";

export function CreateUser({
    disabled,
    onError,
    onSuccess,
}: CreateOrUpdate) {
    const {
        setValue,
        setError,
        clearErrors,
        reset,
        formState: { errors },
        register,
        watch,
        getValues,
    } = useForm();

    const createSize = useFormSubmission({
        endPoint: "/sizes",
        method: "POST",
        setError,
        clearErrors,
        onError: onError,
        onSuccess: async (response) => {
            await revalidate({ url: "/sizes" });
            onSuccess?.(response);

            toast({
                variant: "success",
                title: `${response.name} added to system successfully`
            });

            reset();
        },
    });

    const onSubmit = (data: any) => {
        const body = {
            name: data.name,
            status: data.status || "1"
        };

        createSize.mutate(body);
    };

    return (
        <Drawer>
            <DrawerTrigger disabled={disabled?.add} asChild>
                <Button variant="outline">
                    <Plus />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create new Size</DrawerTitle>
                    <DrawerDescription>Here you can add new size to the system</DrawerDescription>
                </DrawerHeader>

                <div className="w-full grid place-items-center pb-4 *:w-11/12 *:md:w-8/12"
                    aria-disabled={createSize.isPending}>
                    <form
                        id="sizes"
                        className=" grid gap-2 md:grid-cols-2 place-items-center"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSubmit(getValues())
                        }}
                    >
                        {/* name */}
                        <TextField
                            label="Name"
                            placeholder="Enter size name here..."

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
                            placeHolder="Choose size status from here..."
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
                            form="sizes"
                            variant={"secondary"}
                            disabled={createSize.isPending}
                        >
                            {createSize.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
};