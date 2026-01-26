"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/form/text-field";
import { Picker } from "@/components/form/picker";
import { genders } from "@/constants";

export function SignUpForm() {
    const {
        register,
        setError,
        setValue,
        clearErrors,
        getValues,
        watch,
        formState: { errors }
    } = useForm();

    const signUp = useFormSubmission({
        endPoint: "/auth/sign-up",
        method: "POST",
        setError,
        clearErrors,
        onSuccess: (res) => {
            Cookies.set("BW_TOKEN", res.token);

            toast({
                variant: "success",
                title: "Your account created successfully"
            });

            window.history.back();
        }
    });

    const onSubmit = (data: any) => {
        const body = {
            email: data.email,
            password: data.password,
            name: data.name,
            phone: data.phone,
            gender: data.gender
        }

        signUp.mutate(body);
    };

    return (
        <div className="w-full">
            <h2 className="text-center text-3xl font-semibold">
                Hello, New Wolf.
            </h2>
            <p className="text-center text-muted-foreground text-sm">
                Enter your data below to create an account.
            </p>
            <form
                id="signUp"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSubmit(getValues());
                }}
                className="grid gap-2 my-8"
                aria-disabled={signUp.isPending}
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

                    value={watch("gender")}
                    setValue={setValue}
                    setValueFor={"gender"}

                    errors={errors}
                    required
                />
                <Button
                    type="submit"
                    form="signUp"
                    variant={"default"}
                    className="mt-4"
                    disabled={signUp.isPending}
                >
                    {signUp.isPending ? "Submitting..." : "Submit"}
                </Button>

                <div className="text-center text-sm text-muted-foreground space-x-1">
                    <span>
                        Have an account?
                    </span>
                    <Link href={'/login'} className="underline">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}