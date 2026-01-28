import Image, { ImageProps } from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DialogImage({ children, ...props }: { children?: React.ReactNode } & ImageProps) {
    return (
        <Dialog>
            <DialogTrigger>
                {children ?
                    children
                    :
                    <Avatar className="!rounded">
                        <AvatarFallback className="uppercase text-sm rounded !h-8 mt-0.5">
                            {props.alt[0]}{props.alt[0]}
                        </AvatarFallback>
                        <AvatarImage src={props.src as string} alt={props.alt} />
                    </Avatar>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.alt}</DialogTitle>
                    <DialogDescription>
                        Click outside or press ESC to close
                    </DialogDescription>
                </DialogHeader>
                <Image {...props} />
            </DialogContent>
        </Dialog>
    )
}