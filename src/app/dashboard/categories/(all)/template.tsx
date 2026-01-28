"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Card className="max-lg:!gap-0 max-md:*:!px-1">

                <div className="flex flex-wrap items-end lg:items-center justify-between gap-4 mb-4">
                    <CardHeader className="max-md:px-1">
                        <CardTitle className="text-4xl capitalize">
                            All Products.
                        </CardTitle>
                        <CardDescription>
                            Here you can see all products in the system.
                        </CardDescription>
                    </CardHeader>
                    <div className="lg:me-6">
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/products/deleted">
                                <Trash2 />
                                Recently Deleted Products
                            </Link>
                        </Button>
                    </div>
                </div>
                {children}
            </Card>
        </main>
    )
}