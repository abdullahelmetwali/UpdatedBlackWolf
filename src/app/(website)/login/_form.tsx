"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { controlUserToken } from "@/utils/token/control";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/form/text-field";

export function LogInForm() {
    const {
        register,
        setError,
        clearErrors,
        getValues,
        formState: { errors }
    } = useForm();

    const router = useRouter();

    const login = useFormSubmission({
        endPoint: "/auth/login",
        method: "POST",
        clearErrors,
        setError,
        onError: (err) => {
            const message = err?.errors?.message;
            if (message) {
                toast({
                    variant: "destructive",
                    title: `404 | ${message}`
                });
                return { handled: true };
            }
        },
        onSuccess: (res) => {
            const user = res.user;
            const gender = user.gender === "male";
            const message = "Welcome back," + " " + (gender ? "Mr. " : "Mrs. ") + user.name;
            const role = user.role;

            controlUserToken({ action: "save", token: res.token });
            toast({
                variant: "success",
                title: message
            });

            if (role === "admin") {
                router.push("/dashboard");
            };

            window.history.back();
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
            <h2 className="text-center text-3xl font-semibold">
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
                    aria-invalid={Object.keys(errors).length > 0}
                    required
                />

                <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter your password here..."

                    register={register}
                    registerFor="password"
                    aria-invalid={Object.keys(errors).length > 0}

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