"use client"

import { Database, Table as TableIcon, GitBranch } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ProjectTable } from "@/lib/types"
import { RoleBadge } from "./data-tables-utils"
import { formatDate } from "@/lib/utils"

interface DataTablesListProps {
    tables: ProjectTable[]
}

export function DataTablesList({ tables }: DataTablesListProps) {
    return (
        <Card className="h-full bg-white dark:bg-zinc-950/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Database className="size-5 text-zinc-500" />
                    <CardTitle>Data Assets</CardTitle>
                    <Badge variant="secondary" className="ml-auto">{tables.length}</Badge>
                </div>
            </CardHeader>
            <div className="px-2">
                <Accordion type="single" collapsible className="w-full">
                    {tables.map((table) => {
                        const currentVersion = table.versions.find(v => v.table_version_id === table.current_version_id) || table.versions[0]

                        return (
                            <AccordionItem key={table.project_table_id} value={table.project_table_id}>
                                <AccordionTrigger className="hover:no-underline cursor-pointer">
                                    <div className="flex items-center gap-4 w-full text-left">
                                        <div className="flex items-center gap-3 min-w-[30%]">
                                            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                                <TableIcon className="size-4 text-zinc-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{table.display_name}</span>
                                                <span className="text-xs text-zinc-500 font-mono">{table.table_name}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-xs text-zinc-500">
                                            <div className="flex flex-col items-start min-w-[80px]">
                                                <span className="uppercase tracking-wider text-[10px]">Type</span>
                                                <Badge variant="outline" className="mt-0.5 h-5 text-[10px] bg-transparent font-normal border-zinc-200 dark:border-zinc-800">
                                                    {table.table_type}
                                                </Badge>
                                            </div>
                                            <div className="hidden sm:flex flex-col items-start min-w-[80px]">
                                                <span className="uppercase tracking-wider text-[10px]">Rows</span>
                                                <span className="mt-0.5 font-medium text-zinc-700 dark:text-zinc-300">{currentVersion.row_count.toLocaleString("en-US")}</span>
                                                {/* hydration error için en-us kullandım */}
                                            </div>
                                            <div className="hidden sm:flex flex-col items-start min-w-[80px]">
                                                <span className="uppercase tracking-wider text-[10px]">Version</span>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <GitBranch className="size-3" />
                                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">v{currentVersion.version_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="pl-[52px] pr-4 py-2 space-y-4">
                                        {/* Columns Grid */}
                                        <div>
                                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Schema & Roles</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                {table.columns.map((col) => (
                                                    <div key={col.column_id} className="flex items-center justify-between p-2 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                                        <div className="flex flex-col truncate">
                                                            <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate text-xs" title={col.display_name}>{col.display_name}</span>
                                                            <span className="text-[10px] text-zinc-400 font-mono truncate">{col.column_name} ({col.data_type})</span>
                                                        </div>
                                                        <RoleBadge role={col.role} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Version Info */}
                                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                <span>Last updated by</span>
                                                <span className="font-medium text-zinc-700 dark:text-zinc-300">{currentVersion.created_by}</span>
                                                <span>on {formatDate(currentVersion.created_at)}</span>
                                            </div>
                                            {currentVersion.checkpoint_type && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {currentVersion.checkpoint_type.replace("_", " ")}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </div>
        </Card>
    )
}
