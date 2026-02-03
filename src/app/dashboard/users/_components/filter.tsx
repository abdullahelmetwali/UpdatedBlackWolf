
import { useForm } from "react-hook-form";

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

import { roles } from "@/constants";
import { TextField } from "@/components/form/text-field";
import { Picker } from "@/components/form/picker";

export function UsersFilter() {
    const {
        register,
        watch,
        setValue
    } = useForm();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Funnel />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Users Filter</DialogTitle>
                    <DialogDescription>Here you can filter all your users</DialogDescription>
                </DialogHeader>
                <div className="space-y-2 my-2">
                    <TextField
                        placeholder="Enter user's name here..."
                        registerFor="name"
                        register={register}
                    />

                    <TextField
                        placeholder="Enter user's email here..."
                        registerFor="email"
                        register={register}
                    />

                    <TextField
                        type="number"
                        placeholder="Enter user's phone here..."
                        registerFor="phone"
                        register={register}
                    />

                    <Picker
                        items={roles}

                        className="-space-y-2"
                        placeHolder="Select user's role from here..."

                        value={watch("role")}
                        setValue={setValue}
                        setValueFor="role"
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