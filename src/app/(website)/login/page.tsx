import Image from "next/image";
import { LogInForm } from "./_form";
import { PersonStanding } from "lucide-react";

export default function LogIn() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <div className="flex items-center gap-2 font-medium text-primary ">
                        <div className="bg-primary flex size-6 items-center justify-center rounded-md">
                            <PersonStanding className="size-4 text-primary-foreground" />
                        </div>
                        Black Wolf Login
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LogInForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src={"/imgs/login.png"}
                    width={600}
                    height={600}
                    alt="auth-image"
                    className="absolute inset-0 z-10 h-full w-full object-cover"
                    priority
                />
            </div>
        </div>
    )
}