"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Card className="max-lg:!gap-0 max-md:*:!px-1">

                <div className="flex lg:items-center justify-between gap-4 mb-2 max-lg:flex-col">
                    <CardHeader className="max-md:px-1">
                        <CardTitle className="text-4xl capitalize">
                            All Products.
                        </CardTitle>
                        <CardDescription>
                            Here you can see all products in the system.
                        </CardDescription>
                    </CardHeader>
                </div>
                {children}
            </Card>
        </main>
    )
}