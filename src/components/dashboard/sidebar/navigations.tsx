import React from "react";
import Link from "next/link";

import { Box, Layers, Palette, Ruler, Users } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function Navigations() {
    const navigations = [
        {
            label: "General System",
            pages: [
                {
                    title: "Users",
                    icon: Users,
                    link: "/users"
                },
            ]
        },
        {
            label: "E-Commerce System",
            pages: [
                {
                    title: "Products",
                    icon: Box,
                    link: "/products"
                },
                {
                    title: "Categories",
                    icon: Layers,
                    link: "/categories"
                },
                {
                    title: "Colors",
                    icon: Palette,
                    link: "/colors"
                },
                {
                    title: "Sizes",
                    icon: Ruler,
                    link: "/sizes"
                },
            ]
        },
    ];

    return (
        <SidebarGroup>
            {
                navigations.map((item, index) => {
                    const GROUP_LABEL = item.label;
                    const PAGES_OF_GROUP = item.pages;
                    return (
                        <React.Fragment key={index}>
                            <SidebarGroupLabel key={index} className="text-muted-foreground">
                                {GROUP_LABEL}
                            </SidebarGroupLabel>
                            <div className="group-data-[state=expanded]:ps-2">
                                <SidebarMenu
                                    key={index}
                                    className="group-data-[state=expanded]:ps-1 group-data-[state=expanded]:border-s"
                                >
                                    {
                                        PAGES_OF_GROUP.map((page, iPage) => (
                                            <SidebarMenuItem key={iPage}>
                                                <SidebarMenuButton tooltip={page.title} asChild>
                                                    <Link href={`/dashboard${page.link}`}>
                                                        {page.icon && <page.icon />}
                                                        <span>{page.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))
                                    }
                                </SidebarMenu>
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </SidebarGroup>
    )
}