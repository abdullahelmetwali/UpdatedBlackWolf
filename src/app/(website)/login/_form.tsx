"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useFormSubmission } from "@/hooks/use-form-submission";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/form/text-field";

export function LogInForm() {
    const {
        register,
        setError,
        getValues,
        formState: { errors }
    } = useForm();

    const login = useFormSubmission({
        endPoint: "/auth/sign-in",
        method: "POST",
        setError,
        onSuccess: (res) => {
        }
    });

    const onSubmit = (data: any) => {
        const body = {
            email: data.email,
            password: data.password
        }

        login.mutate(body);
    };

    return (
        <div className="w-full">
            <h2 className="text-center text-2xl font-semibold">
                Welcome back!
            </h2>
            <p className="text-center text-muted-foreground text-sm">
                Enter your email below to login to your account
            </p>
            <form
                id="login"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSubmit(getValues())
                }}
                className="grid gap-2 my-8"
                aria-disabled={login.isPending}
            >
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
                    type="password"
                    label="Password"
                    placeholder="Enter your password here..."

                    register={register}
                    registerFor="password"
                    errors={errors}

                    toggleSeePassword
                    required
                />

                <Button variant={"default"} type="submit" form="login" className="mt-4" disabled={login.isPending}>
                    {login.isPending ? "Submitting..." : "Submit"}
                </Button>

                <div className="text-center text-sm text-muted-foreground space-x-1">
                    <span>
                        Don't have an account?
                    </span>
                    <Link href={'/signup'} className="underline">
                        Signup
                    </Link>
                </div>
            </form>
        </div>
    )
};