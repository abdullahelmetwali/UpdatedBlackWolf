import { CreateOrUpdate } from "@/types";
import { useForm } from "react-hook-form";
import { useFormSubmission } from "@/hooks/use-form-submission";
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

import { genders, roles } from "@/constants";
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

    const createUser = useFormSubmission({
        endPoint: "/users",
        method: "POST",
        setError,
        clearErrors,
        onError: onError,
        onSuccess: async (response) => {
            await revalidate({ url: "/users" });
            onSuccess?.(response);

            toast({
                variant: "success",
                title: `${response?.user?.name} added to system successfully`
            });

            reset();
        },
    });

    const onSubmit = (data: any) => {
        const body = {
            email: data.email,
            password: data.password,
            name: data.name,
            phone: data.phone,
            gender: data.gender,
            role: data.role
        };

        createUser.mutate(body);
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
                    <DrawerTitle>Create new user</DrawerTitle>
                    <DrawerDescription>Here you can add new user to the system</DrawerDescription>
                </DrawerHeader>

                <div className="w-full grid place-items-center pb-4 *:w-11/12 *:md:w-8/12"
                    aria-disabled={createUser.isPending}>
                    <form
                        id="users"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSubmit(getValues());
                        }}
                        className=" grid gap-3 md:grid-cols-2 place-items-center"
                        aria-disabled={createUser.isPending}
                    >
                        <TextField
                            label="Name"
                            placeholder="Enter your name here..."

                            register={register}
                            registerFor="name"
                            errors={errors}
                            required
                        />

                        <TextField
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email address here..."

                            register={register}
                            registerFor="email"
                            errors={errors}
                            required
                        />

                        <TextField
                            type="number"
                            label="Phone Number"
                            placeholder="Enter your phone number here..."

                            register={register}
                            registerFor="phone"
                            errors={errors}
                            required
                        />

                        <TextField
                            type="password"
                            label="Password"
                            placeholder="Enter your password here..."

                            register={register}
                            registerFor="password"
                            errors={errors}

                            toggleSeePassword
                            required
                        />

                        <Picker
                            items={genders}

                            label="Gender"
                            placeHolder="Select your gender"
                            className="w-full"

                            value={watch("gender")}
                            setValue={setValue}
                            setValueFor={"gender"}

                            errors={errors}
                            required
                        />

                        <Picker
                            items={roles}

                            label="Role"
                            placeHolder="Select your role"
                            className="w-full"

                            value={watch("role")}
                            setValue={setValue}
                            setValueFor={"role"}

                            errors={errors}
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
                            form="users"
                            variant={"secondary"}
                            disabled={createUser.isPending}
                        >
                            {createUser.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
};