import React from 'react'
import { FolderGit2 } from 'lucide-react'

export default function ProjectSelectPage() {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center animate-in fade-in-50">
            <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
                <FolderGit2 className="h-8 w-8 text-zinc-500" />
            </div>
            <div className="max-w-md space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    No Project Selected
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Please select a project from the menu to view its dashboard.
                </p>
            </div>
        </div>
    )
}