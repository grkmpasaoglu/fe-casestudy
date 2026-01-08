"use client"
import { Activity } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Operation } from "@/lib/types"
import { formatRelativeTime } from "@/lib/utils"

interface OperationsFeedProps {
    operations: Operation[]
}

export function OperationsFeed({ operations }: OperationsFeedProps) {
    return (
        <Card className="h-full max-h-[500px] flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Activity className="size-5 text-zinc-500" />
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2">
                <div className="border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-6">
                    {operations.length > 0 ? operations.map((op, index) => (
                        <div key={op.operation_log_id} className="relative pl-6">
                            {/* Timestamp Dot */}
                            <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-zinc-200 ring-4 ring-white dark:bg-zinc-700 dark:ring-zinc-950" />

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        {op.operation_name.replace("_", " ")}
                                    </span>
                                    <span className="text-xs text-zinc-400">
                                        {formatRelativeTime(op.execution_timestamp)}
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {op.executed_by.name} performed <span className="font-mono text-zinc-600 dark:text-zinc-400">{op.operation_type}</span> on <span className="font-semibold">{op.affected_table}</span>
                                </p>

                                {/* Parameters (Optional detail) */}
                                {Object.keys(op.input_parameters).length > 0 && (
                                    <div className="mt-1 p-2 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-100 dark:border-zinc-800 font-mono text-[10px] text-zinc-500 break-all">
                                        {JSON.stringify(op.input_parameters).slice(0, 100)}...
                                    </div>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="flex items-start justify-start h-full ml-4">
                            <span className="text-zinc-500">No operations found for this project</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
