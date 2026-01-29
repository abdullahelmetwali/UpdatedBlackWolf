"use client";

import { Category, Color, IdAndName } from "@/types/models";

import { TextField } from "@/components/form/text-field";
import { useForm } from "react-hook-form";
import { Picker } from "@/components/form/picker";

type FilterTypo = {
    categories: Category[],
    colors: Color[],
    sizes: IdAndName[]
};

export function Filter({ categories, colors, sizes }: FilterTypo) {
    const {
        register,
        setValue,
        watch
    } = useForm();
    return (
        <section className="flex items-center justify-between max-md:flex-col gap-2 overflow-hidden">

            <div className="w-full ">
                <TextField
                    className="max-w-96"
                    placeholder="Search for products..."
                    registerFor="search"
                    register={register}
                />
            </div>

            <div className="flex items-center gap-2 w-8/12 mb-4">
                <div className="w-full">
                    <Picker
                        items={categories}
                        placeHolder="Category"
                        className="w-full md:max-w-48"
                        setValue={setValue}
                        setValueFor="category"
                        value={watch("category")}
                    />
                </div>
                <div className="w-full">
                    <Picker
                        items={colors}
                        placeHolder="Color"
                        className="w-full md:max-w-48"

                        setValue={setValue}
                        setValueFor="color"
                        value={watch("color")}
                    />
                </div>
                <div className="w-full">
                    <Picker
                        items={sizes}
                        placeHolder="Size"
                        className="w-full md:max-w-48"

                        setValue={setValue}
                        setValueFor="size"
                        value={watch("size")}
                    />
                </div>
            </div>
        </section>
    );
};