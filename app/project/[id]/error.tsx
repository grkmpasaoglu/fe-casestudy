"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4 text-center p-8">
            <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                <AlertCircle className="size-8" />
            </div>
            <h2 className="text-xl font-bold">Something went wrong!</h2>
            <p className="max-w-md text-zinc-500">
                We encountered an error while loading the project data. Please try again.
            </p>
            <Button onClick={() => reset()} variant="outline">
                Try again
            </Button>
        </div>
    )
}
