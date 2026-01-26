"use client"

import {
    Sidebar as SidebarCN,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

import { TeamSwitcher } from "./team-switcher"
import { Navigations } from "./navigations"

export function Sidebar({ ...props }: React.ComponentProps<typeof SidebarCN>) {
    return (
        <SidebarCN collapsible="icon" {...props}>

            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>

            <SidebarContent>
                <Navigations />
            </SidebarContent>

            {props.children}

            <SidebarRail />
        </SidebarCN>
    )
}
