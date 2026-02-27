"use client";
import { User } from "@/types/models";
import { UseFormReturn } from "react-hook-form";
import { useGet } from "@/hooks/use-get";
import { useFormSubmission } from "@/hooks/use-form-submission";

import { TextField } from "@/components/form/text-field";
import { Picker } from "@/components/form/picker";

export function ShippingInfo({ user, form }: { user: User, form: UseFormReturn }) {
    const {
        watch,
        setValue,
        register,
        formState: { errors }
    } = form;

    const { data: countries, isLoading: countryLoading, error: countryErr } = useGet({
        context: "special",
        url: "https://restcountries.com/v3.1/all?fields=name",
        select: (data) => data
            .map((c: any) => ({
                _id: c.name.common,
                name: c.name.common,
            }))
            .sort((a: any, b: any) => a.name.localeCompare(b.name))
    });

    const getCities = useFormSubmission({
        endPoint: "https://countriesnow.space/api/v0.1/countries/cities",
        context: "special",
        method: "POST",
        onError() {
            return { handled: true };
        },
    });

    const cities = getCities?.data?.map((c: string) => ({
        _id: c,
        name: c,
    }));
    return (
        <div className="my-4">
            <form>
                {/* personl info */}
                <div className="py-4">
                    <h3 className="text-lg font-bold">
                        Personal Information
                    </h3>
                    <div className="my-2 grid md:grid-cols-2 gap-4">
                        <TextField
                            label="First Name"
                            registerFor="firstName"
                            placeholder={user?.firstName || "Enter your first name..."}
                            required
                        />
                        <TextField
                            label="Last Name"
                            registerFor="lastName"
                            placeholder={user?.lastName || "Enter your last name..."}
                            required
                        />
                        <TextField
                            label="Email"
                            registerFor="email"
                            placeholder={user?.email || "Enter your email..."}
                            required
                        />
                        <TextField
                            label="Phone"
                            placeholder={user?.phone || "Enter your phone..."}
                            required
                        />
                    </div>
                </div>

                {/* shipping info */}
                <div className="py-4">
                    <h3 className="text-lg font-bold">
                        Shipping Information
                    </h3>
                    <div className="my-2 grid md:grid-cols-2 gap-4">
                        {/* country */}
                        <Picker
                            items={countries}
                            isLoading={countryLoading}
                            error={countryErr}

                            label="Country"
                            placeHolder="Select your country / region..."

                            onReset={() => {
                                setValue("country", "");
                                setValue("city", "");
                            }}
                            setValue={(_, choosed: string) => {
                                setValue("country", choosed);
                                getCities.mutate({ country: choosed });
                            }}
                            setValueFor="country"
                            value={watch("country")}

                            searchMode
                            required
                        />

                        {/* city */}
                        <Picker
                            items={cities}
                            isLoading={getCities.isPending}
                            errors={getCities.error?.errors}
                            disabled={!watch("country")}

                            label="City"
                            placeHolder="Select your city..."

                            setValue={setValue}
                            setValueFor="city"
                            value={watch("city")}

                            searchMode
                            required
                        />

                        {/* address */}
                        <TextField
                            label="Address"
                            register={register}
                            registerFor="address"
                            placeholder={user?.address || "Enter your address..."}
                            required
                        />

                        {/* zip code */}
                        <TextField
                            type="number"
                            label="Zip Code"
                            placeholder={user?.zipCode?.toString() || "Enter your zip code..."}
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};