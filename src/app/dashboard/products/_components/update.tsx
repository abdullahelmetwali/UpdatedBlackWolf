"use client";
import { Product } from "@/types/models";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { revalidate } from "@/utils/revalidate";
import { useModals } from "@/contexts/modals";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useGet } from "@/hooks/use-get";
import { toast } from "@/hooks/use-toast";

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
} from "@/components/ui/drawer";

import { statuses } from "@/constants";
import { MultiPicker } from "@/components/form/multi-picker";
import { TextField } from "@/components/form/text-field";
import { FileUpload } from "@/components/form/file-upload";
import { Picker } from "@/components/form/picker";

export const UpdateProduct = () => {
    const { getItemInModal, isModalOpen, closeModal } = useModals();

    const thisProduct: Product = getItemInModal("update-products") || {};
    const isOpen = isModalOpen("update-products");

    const {
        setValue,
        setError,
        clearErrors,
        formState: { errors },
        register,
        watch,
        getValues,
    } = useForm<Product>({
        defaultValues: {
            name: thisProduct.name,
            slug: thisProduct.slug,
            description: thisProduct.description,
            price: thisProduct.price,
            discount: thisProduct.discount,
            inStock: thisProduct.inStock,
            status: thisProduct.status,
            categories: thisProduct.categories,
            colors: thisProduct.colors,
            sizes: thisProduct.sizes,
        },
    });

    useEffect(() => {
        if (thisProduct && isOpen) {
            setValue("name", thisProduct.name || "");
            setValue("slug", thisProduct.slug || "");
            setValue("description", thisProduct.description || "");

            setValue("price", thisProduct.price || "");
            setValue("discount", thisProduct.discount || "");
            setValue("inStock", thisProduct.inStock || "");

            setValue("image", thisProduct.image);
            setValue("status", thisProduct.status);

            setValue("categories", thisProduct.categories);
            setValue("colors", thisProduct.colors);
            setValue("sizes", thisProduct.sizes);
        }
    }, [thisProduct, isOpen]);

    const { data: categories, isLoading: catLoading, error: catErr } = useGet({ url: "/categories" });
    const { data: sizes, isLoading: sLoading, error: sErr } = useGet({ url: "/sizes" });
    const { data: colors, isLoading: colLoading, error: colErr } = useGet({ url: "/colors" });

    const updateProduct = useFormSubmission({
        endPoint: `/products/${thisProduct._id}`,
        method: "PUT",
        setError,
        clearErrors,
        onSuccess: async () => {
            await revalidate({ url: "/products" });
            toast({
                variant: "success",
                title: `${thisProduct.name} updated successfully`
            })
            closeModal("update-products");
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

        updateProduct.mutate(fd);
    };

    return (
        <Drawer open={isOpen} onOpenChange={(open) => { if (!open) closeModal("update-products") }}>
            <DrawerContent className="max-h-[90dvh]">
                <DrawerHeader>
                    <DrawerTitle>Update {thisProduct.name}</DrawerTitle>
                    <DrawerDescription>Here you can update {thisProduct.name} to the system</DrawerDescription>
                </DrawerHeader>
                <div className="w-full grid place-items-center pb-4 *:w-11/12 *:md:w-8/12 max-md:overflow-y-scroll"
                    aria-disabled={updateProduct.isPending}>
                    <form
                        id="update-products"
                        className="grid gap-2 md:grid-cols-2 place-items-center"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSubmit(getValues())
                        }}
                    >
                        {/* name */}
                        <TextField
                            label="Name"
                            placeholder={`Product's old name is ${thisProduct.name}`}

                            register={register}
                            registerFor="name"
                            errors={errors}
                            required
                        />

                        {/* price */}
                        <TextField
                            type="number"
                            label="Price"
                            placeholder={`Product's old price is ${thisProduct.price}`}

                            register={register}
                            registerFor="price"
                            errors={errors}
                            required
                        />

                        {/* discount */}
                        <TextField
                            type="number"
                            label="Discount ( % )"
                            placeholder={`Product's old discount is ${thisProduct.discount}`}

                            register={register}
                            registerFor="discount"
                            errors={errors}
                        />

                        {/* in stock */}
                        <TextField
                            type="number"
                            label="In Stock"
                            placeholder={`Product's old stock is ${thisProduct.inStock}`}

                            register={register}
                            registerFor="inStock"
                            errors={errors}
                            required
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
                                required
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
                                required
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
                                required
                            />
                        </div>

                        {/* status */}
                        <Picker
                            items={statuses}
                            label="Status"
                            placeHolder={`Product's old status is ${thisProduct.status}`}
                            className="w-full"

                            value={watch("status") || "1"}
                            setValue={setValue}
                            setValueFor={"status"}
                            errors={errors}

                            required
                        />

                        {/* description - image */}
                        <div className="grid md:grid-cols-2 md:col-span-2 w-full gap-2 mt-0.5">
                            <TextField
                                label="Description"
                                placeholder={`Product's old description is ${thisProduct.description || "N/A"}`}
                                className="min-h-32"

                                register={register}
                                registerFor="description"
                                errors={errors}

                                textarea
                            />
                            <div className="w-full *:!space-y-1">
                                <Label>* Image</Label>
                                <FileUpload
                                    name="image"
                                    value={watch("image")}
                                    onChange={(img) => setValue("image", img)}
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
                            form="update-products"
                            variant={"secondary"}
                            disabled={updateProduct.isPending}
                        >
                            {updateProduct.isPending ? "Updatting..." : "Update"}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
};