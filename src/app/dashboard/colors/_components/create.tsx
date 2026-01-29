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

export function CreateColor({
    disabled,
    onError,
    onSuccess,
}: CreateOrUpdate) {
    const {
        setValue,
        setError,
        clearErrors,
        formState: { errors },
        register,
        watch,
        getValues,
    } = useForm();

    const createColor = useFormSubmission({
        endPoint: "/colors",
        method: "POST",
        setError,
        clearErrors,
        onError: onError,
        onSuccess: async (response) => {
            await revalidate({ url: "/colors" });
            onSuccess?.(response);

            toast({
                variant: "success",
                title: `${response.name} added to system successfully`
            });

        },
    });

    const onSubmit = (data: any) => {
        const body = {
            name: data.name,
            value: data.value,
            status: data.status || "1"
        };

        createColor.mutate(body);
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
                    <DrawerTitle>Create new color</DrawerTitle>
                    <DrawerDescription>Here you can add new color to the system</DrawerDescription>
                </DrawerHeader>

                <div className="w-full grid place-items-center pb-4 *:w-11/12 *:md:w-8/12"
                    aria-disabled={createColor.isPending}>
                    <form
                        id="colors"
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
                            placeholder="Enter color name here..."

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
                            placeHolder="Choose color status from here..."
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
                            form="colors"
                            variant={"secondary"}
                            disabled={createColor.isPending}
                        >
                            {createColor.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
};