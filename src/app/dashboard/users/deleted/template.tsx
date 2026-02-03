"use client";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Card className="max-lg:!gap-0 max-md:*:!px-1">

                <div className="flex flex-wrap items-end lg:items-center justify-between gap-4 mb-4">
                    <CardHeader className="max-md:px-1">
                        <CardTitle className="text-4xl capitalize">
                            Recently Deleted Sizes Table.
                        </CardTitle>
                        <CardDescription>
                            Here you can see recently deleted Sizes in the system.
                        </CardDescription>
                    </CardHeader>
                    <div className="lg:me-6">
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/sizes">
                                <Ruler />
                                All Sizes
                            </Link>
                        </Button>
                    </div>
                </div>
                {children}
            </Card>
        </main>
    )
}