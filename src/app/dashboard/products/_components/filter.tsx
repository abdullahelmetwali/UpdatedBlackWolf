
import { useForm } from "react-hook-form";
import { useGet } from "@/hooks/use-get";

import { Funnel } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { TextField } from "@/components/form/text-field";
import { Picker } from "@/components/form/picker";

export function ProductsFilter() {
    const {
        register,
        watch,
        setValue
    } = useForm();

    const { data: categories, isLoading: catLoading, error: catErr } = useGet({ url: "/categories" });
    const { data: sizes, isLoading: sLoading, error: sErr } = useGet({ url: "/sizes" });
    const { data: colors, isLoading: colLoading, error: colErr } = useGet({ url: "/colors" });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Funnel />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Products Filter</DialogTitle>
                    <DialogDescription>Here you can filter all your products</DialogDescription>
                </DialogHeader>
                <div className="space-y-2 my-2">
                    <TextField
                        placeholder="Enter product's name here..."
                        registerFor="name"
                        register={register}
                    />

                    <TextField
                        type="number"
                        placeholder="Enter product's price here..."
                        registerFor="price"
                        register={register}
                    />

                    <Picker
                        items={categories}
                        error={catErr}
                        isLoading={catLoading}

                        className="-space-y-2"
                        placeHolder="Select product's category from here..."

                        value={watch("category")}
                        setValue={setValue}
                        setValueFor="category"
                    />

                    <Picker
                        items={sizes}
                        error={sErr}
                        isLoading={sLoading}

                        className="-space-y-2"
                        placeHolder="Select product's size from here..."

                        value={watch("size")}
                        setValue={setValue}
                        setValueFor="size"
                    />

                    <Picker
                        items={colors}
                        error={colErr}
                        isLoading={colLoading}

                        className="-space-y-2"
                        placeHolder="Select product's color from here..."

                        value={watch("color")}
                        setValue={setValue}
                        setValueFor="color"
                    />
                </div>
                <DialogFooter className="gap-1 flex md:flex-row items-center">
                    <DialogClose asChild>
                        <Button variant={"destructive"} className="w-full">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button className="w-full">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};