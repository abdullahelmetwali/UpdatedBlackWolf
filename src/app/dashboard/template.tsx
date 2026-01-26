"use client"
import { useGet } from "@/hooks/use-get";

import { PersonStanding } from "lucide-react";

import { SidebarFooter, SidebarInset, SidebarProvider, } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header"
import { Admin } from "@/components/dashboard/sidebar/admin";

export const metadata = {
    title: "Home | Dashboard"
};

export default function Dashboard({ children }) {
    const { data, isLoading, error } = useGet({ url: "/users/dashboard", context: "dashboard" });

    // if (data) {
    //     return (
    //         <div className="fixed h-dvh w-dvw top-0 end-0 bg-background flex justify-center items-center gap-2 z-50 *:animate-pulse">
    //             <span>
    //                 <PersonStanding />
    //             </span>
    //             <span>
    //                 Waiting...
    //             </span>
    //         </div>
    //     )
    // };

    return (
        <SidebarProvider>

            <Sidebar>
                <SidebarFooter>
                    <Admin admin={data} />
                </SidebarFooter>
            </Sidebar>

            <SidebarInset className="flex flex-col relative bg-surface">
                <Header />
                <main className="py-4 px-1">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
