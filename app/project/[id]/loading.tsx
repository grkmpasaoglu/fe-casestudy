import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function Loading() {
    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-black/50 p-6 md:p-8 space-y-8">
            {/* Hero Skeleton */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-96" />
                            <div className="flex gap-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 max-w-md">
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    {/* Lineage */}
                    <Skeleton className="h-48 w-full rounded-xl" />
                    {/* Tables */}
                    <Skeleton className="h-96 w-full rounded-xl" />
                </div>
                <div className="xl:col-span-1 space-y-8">
                    {/* Governance */}
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        </div>
    )
}
