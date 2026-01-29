import { ManualErr, UseFromSubmissionType } from "@/types";

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "@/utils/url";
import { TOKEN_CL } from "@/utils/token/client";

import { toast } from "./use-toast";
import { Ghost } from "lucide-react";

export const useFormSubmission = ({
    endPoint,
    method,

    beforeRun,
    beforeSuccess,
    onSuccess,

    onError,
    clearErrors,
    setError,
}: UseFromSubmissionType) => {
    const token = TOKEN_CL();
    const queryClient = useQueryClient();

    const submitForm = async (body: Record<string, string> | FormData) => {
        beforeRun?.();
        clearErrors?.();

        const isFormData = body instanceof FormData;
        const response = await fetch(`${BASE_URL}${endPoint}`, {
            method: method,
            body: isFormData ? body : JSON.stringify(body),
            headers: {
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                ...(isFormData ? {} : { "Content-Type": "application/json" })
            },
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
            queryClient.invalidateQueries({ queryKey: [endPoint] });
        },
        onError: (error: ManualErr) => {
            const errHandled = onError?.(error);
            if (errHandled && errHandled.handled) {
                return;
            }

            const errors: Record<string, string> = error?.errors || {};
            const errStatus: number = error.status || 404;
            const errorStatusText: string = error.statusText || "Action failed";

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