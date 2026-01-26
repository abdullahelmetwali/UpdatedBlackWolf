import { UseFromSubmissionType } from "@/types";

import { useMutation } from "@tanstack/react-query"
import { BASE_URL } from "@/utils/url";
import { TOKEN_CL } from "@/utils/token/client";

import { toast } from "./use-toast";
import { Ghost } from "lucide-react";

export const useFormSubmission = ({
    endPoint,
    method,
    context = "website",

    beforeRun,
    beforeSuccess,
    onSuccess,

    onError,
    clearErrors,
    setError,
}: UseFromSubmissionType) => {
    const token = TOKEN_CL();

    const submitForm = async (body: any) => {
        beforeRun?.();
        clearErrors?.();

        const response = await fetch(`${BASE_URL}${endPoint}`, {
            method: method,
            body: JSON.stringify(body),
            headers: context === "dashboard" ? { 'Authorization': `Bearer ${token}` } : {},
        });

        const result = await response.json();
        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
                ...result,
            };
        };

        return result.data;
    };

    const mutation = useMutation({
        mutationKey: [`form-submission-${endPoint}`],
        mutationFn: submitForm,
        onSuccess: async (response) => {
            await beforeSuccess?.(response);
            await onSuccess?.(response);
        },
        onError: (error: Error | any) => {
            const errHandled = onError?.(error);
            if (errHandled && errHandled.handled) {
                return;
            }
            console.log(error)
            const errors: Record<string, string> = error?.errors || {};
            const errStatus: number = error.status;
            const errorStatusText: string = error.statusText;

            if (errStatus === 403) {
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
            };

            clearErrors?.();

            Object.keys(errors).map((e) => {
                if (setError) {
                    setError(e, { type: "server", message: errors[e] })
                };
            });

            toast({
                title: `${errStatus} | ${errorStatusText}`,
                variant: 'destructive'
            });
        },
    });
    return {
        ...mutation,
    }
}