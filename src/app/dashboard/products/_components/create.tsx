"use client";
import { CreateOrUpdate } from "@/types";
import { useForm } from "react-hook-form";
import { revalidate } from "@/utils/revalidate";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useGet } from "@/hooks/use-get";
import { toast } from "@/hooks/use-toast";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { FileUpload } from "@/components/form/file-upload";
import { Picker } from "@/components/form/picker";

import { CreateCategory } from "../../categories/_components/create";
import { CreateSize } from "../../sizes/_components/create";
import { CreateColor } from "../../colors/_components/create";

export const CreateProduct = ({
    disabled,
    onError,
    onSuccess
}: CreateOrUpdate) => {
    const {
        setValue,
        setError,
        clearErrors,
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
        clearErrors,
        onError: (err) => { onError?.(err) },
        onSuccess: async (res) => {
            await revalidate({ url: "/products" });
            onSuccess?.(res);

            toast({
                variant: "success",
                title: `${res.name} added to system successfully`
            })
        },
    });

    const onSubmit = (data: any) => {
        const fd = new FormData();

        fd.append("name", data.name);
        fd.append("description", data.description);
        fd.append("price", data.price);
        fd.append("discount", data.discount);
        fd.append("inStock", data.inStock);
        fd.append("status", data.status || "1");

        data.categories.forEach(c => fd.append("categories[]", c._id));
        data.sizes.forEach(s => fd.append("sizes[]", s._id));
        data.colors.forEach(c => fd.append("colors[]", c._id));

        if (data.image) {
            fd.append("image", data.image);
        };

        createProduct.mutate(fd);
    };

    return (
        <Drawer>
            <DrawerTrigger disabled={disabled?.add} asChild>
                <Button variant={"outline"}>
                    <Plus />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90dvh]">
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

                            disabled={disabled?.name}
                            required
                        />

                        {/* price */}
                        <TextField
                            type="number"
                            label="Price"
                            placeholder="Enter product price here..."

                            register={register}
                            registerFor="price"
                            errors={errors}

                            disabled={disabled?.price}
                            required
                        />

                        {/* discount */}
                        <TextField
                            type="number"
                            label="Discount ( % )"
                            placeholder="Enter product discount here..."

                            register={register}
                            registerFor="discount"
                            errors={errors}

                            disabled={disabled?.discount}
                        />

                        {/* in stock */}
                        <TextField
                            type="number"
                            label="In Stock"
                            placeholder="Enter product stocks number here..."

                            register={register}
                            registerFor="inStock"
                            errors={errors}

                            disabled={disabled?.inStock}
                            required
                        />

                        {/* categroies */}
                        <div className="flex items-end gap-1 w-full">
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
                                    disabled={disabled?.categories}
                                    required
                                />
                            </div>
                            <div className="w-fit">
                                <CreateCategory
                                    disabled={{ status: true }}
                                    onSuccess={(response) => {
                                        const oldCategories = watch("categories") || [];
                                        setValue("categories", [...oldCategories, response]);
                                    }}
                                />
                            </div>
                        </div>

                        {/* sizes */}
                        <div className="flex items-end gap-1 w-full">
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
                                    disabled={disabled?.sizes}
                                    required
                                />
                            </div>
                            <div className="w-fit">
                                <CreateSize
                                    disabled={{ status: true }}
                                    onSuccess={(response) => {
                                        const oldSizes = watch("sizes") || [];
                                        setValue("sizes", [...oldSizes, response]);
                                    }}
                                />
                            </div>
                        </div>

                        {/* colors */}
                        <div className="flex items-end gap-1 w-full">
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
                                    disabled={disabled?.colors}
                                    required
                                />
                            </div>
                            <div className="w-fit">
                                <CreateColor
                                    disabled={{ status: true }}
                                    onSuccess={(response) => {
                                        const oldColors = watch("colors") || [];
                                        setValue("colors", [...oldColors, response]);
                                    }}
                                />
                            </div>
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

                            disabled={disabled?.status}
                            required
                        />

                        {/* description - image */}
                        <div className="grid md:grid-cols-2 md:col-span-2 w-full gap-2 mt-0.5">
                            <TextField
                                label="Description"
                                placeholder="Enter product description here..."
                                className="min-h-32"

                                register={register}
                                registerFor="description"
                                errors={errors}

                                textarea
                                disabled={disabled?.description}
                            />
                            <div className="w-full *:!space-y-1">
                                <Label>* Image</Label>
                                <FileUpload
                                    name="image"
                                    value={watch("image")}
                                    onChange={(img) => setValue("image", img)}
                                    disabled={disabled?.image}
                                    required
                                />
                            </div>
                        </div>
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
                        >
                            {createProduct.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}