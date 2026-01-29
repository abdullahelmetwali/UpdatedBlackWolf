"use client";
import Link from "next/link";

import { Box } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Card className="max-lg:!gap-0 max-md:*:!px-1">

                <div className="flex lg:items-center justify-between gap-4 mb-2 max-lg:flex-col">
                    <CardHeader className="max-md:px-1">
                        <CardTitle className="text-4xl capitalize">
                            Recently Deleted Products Table.
                        </CardTitle>
                        <CardDescription>
                            Here you can see all recently deleted products in the system.
                        </CardDescription>
                    </CardHeader>

                    <div className="lg:me-6">
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/products">
                                <Box />
                                All Products
                            </Link>
                        </Button>
                    </div>

                </div>
                {children}
            </Card>
        </main>
    )
}