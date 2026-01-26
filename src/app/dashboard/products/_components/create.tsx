"use client";
import { useForm } from "react-hook-form";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useGet } from "@/hooks/use-get";
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
import { MultiPicker } from "@/components/form/multi-picker";
import { TextField } from "@/components/form/text-field";
import { Picker } from "@/components/form/picker";

export const CreateProduct = () => {
    const {
        setValue,
        setError,
        formState: { errors },
        register,
        watch,
        getValues,
    } = useForm();

    const { data: categories, isLoading: catLoading, error: catErr } = useGet({ url: "/categories" });
    const { data: sizes, isLoading: sLoading, error: sErr } = useGet({ url: "/sizes" });
    const { data: colors, isLoading: colLoading, error: colErr } = useGet({ url: "/colors" });

    const createProduct = useFormSubmission({
        endPoint: "/products",
        method: "POST",
        setError,
        onError: (err) => {
            if (err) {
                toast({
                    variant: "destructive",
                    title: err?.message
                });
                console.log(err?.message)
            }
            return { handled: true }
        },
        onSuccess: (res) => {
            console.log(res)
        },
    });

    const onSubmit = (data: any) => {
        const product = {
            name: "ssss",
            price: "112",
            discount: "1111",
            inStock: "1111",
            categories: ["6970c519ce7756889a545b4c"],
            colors: ["696f5fd20a1a990996149316"],
            sizes: ["69708df680d5c9e15ba323a2"],
        };

        // const body = {
        //     name: data.name,
        //     price: data.price,
        //     discount: data.discount,
        //     inStock: data.inStock,
        //     categories: data.categories.map(c => c._id),
        //     sizes: data.sizes.map(s => s._id),
        //     colors: data.colors.map(c => c._id),
        //     status: data.status
        // }

        createProduct.mutate(product);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"outline"}>
                    <Plus />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80dvh]">
                <DrawerHeader>
                    <DrawerTitle>Create new product</DrawerTitle>
                    <DrawerDescription>Here you can add new product to the system</DrawerDescription>
                </DrawerHeader>
                <div className="w-full grid place-items-center pb-4 *:w-11/12 *:md:w-8/12 max-md:overflow-y-scroll"
                    aria-disabled={createProduct.isPending}>
                    <form
                        id="products"
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
                            placeholder="Enter product name here..."

                            register={register}
                            registerFor="name"
                            errors={errors}
                            required={false}
                        />

                        {/* price */}
                        <TextField
                            type="number"
                            label="Price"
                            placeholder="Enter product price here..."

                            register={register}
                            registerFor="price"
                            errors={errors}
                            required={false}
                        />

                        {/* discount */}
                        <TextField
                            type="number"
                            label="Discount ( % )"
                            placeholder="Enter product discount here..."

                            register={register}
                            registerFor="discount"
                            errors={errors}
                        />

                        {/* in stock */}
                        <TextField
                            type="number"
                            label="In Stock"
                            placeholder="Enter product stocks number here..."

                            register={register}
                            registerFor="inStock"
                            errors={errors}
                            required={false}
                        />

                        {/* categroies */}
                        <div className="w-full">
                            <MultiPicker
                                items={categories}
                                isLoading={catLoading}
                                error={catErr}

                                label="Categories"
                                placeHolder="Choose product categories from here..."
                                className="w-full"

                                value={watch("categories")}
                                setValue={setValue}
                                setValueFor={"categories"}
                                errors={errors}

                                variant={"dropdown"}
                                required={false}
                            />
                        </div>

                        {/* sizes */}
                        <div className="w-full">
                            <MultiPicker
                                items={sizes}
                                isLoading={sLoading}
                                error={sErr}

                                label="Sizes"
                                placeHolder="Choose product sizes from here..."
                                className="w-full"

                                value={watch("sizes")}
                                setValue={setValue}
                                setValueFor={"sizes"}
                                errors={errors}

                                variant={"dropdown"}
                                required={false}
                            />
                        </div>

                        {/* colors */}
                        <div className="w-full">
                            <MultiPicker
                                items={colors}
                                isLoading={colLoading}
                                error={colErr}

                                label="colors"
                                placeHolder="Choose product colors from here..."
                                className="w-full"

                                value={watch("colors")}
                                setValue={setValue}
                                setValueFor={"colors"}
                                errors={errors}

                                variant="dropdown"
                                required={false}
                            />
                        </div>

                        {/* status */}
                        <Picker
                            items={statuses}
                            label="Status"
                            placeHolder="Choose product status from here..."
                            className="w-full"

                            value={watch("status") || "1"}
                            setValue={setValue}
                            setValueFor={"status"}
                            errors={errors}

                            required={false}
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
                            form="products"
                            variant={"secondary"}
                            disabled={createProduct.isPending}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onSubmit(getValues())
                            }}
                        >
                            {createProduct.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}