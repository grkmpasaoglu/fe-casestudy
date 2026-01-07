"use client"

import * as React from "react"
import { ArrowRight, Database, FileSpreadsheet } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TableLineage, ProjectTable } from "@/lib/types"

interface LineageViewProps {
    lineage: TableLineage
    tables: ProjectTable[]
}

export function LineageView({ lineage, tables }: LineageViewProps) {
    // Simple heuristic: Source tables Level 0, Derived tables Level 1.
    // Real lineage would need a graph traversal to assign levels. 
    // Given sample data structure, we can identify sources and derived.

    const sourceTables = tables.filter(t => t.table_type === "source")
    const derivedTables = tables.filter(t => t.table_type === "derived")

    // Map lineage to find connections
    // Draw lines? Or just list with arrows?
    // "Mini-view showing how tables relate". Visualizing with simple columns is best.

    const [hoveredTable, setHoveredTable] = React.useState<string | null>(null)

    return (
        <Card className="bg-white dark:bg-zinc-950/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Data Lineage</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between gap-8 py-4 relative">

                    {/* Source Column */}
                    <div className="flex flex-col gap-4 flex-1">
                        <span className="text-xs font-semibold text-zinc-400 text-center mb-2">Source</span>
                        <div className="flex flex-col gap-3">
                            {sourceTables.map(table => (
                                <div
                                    key={table.project_table_id}
                                    onMouseEnter={() => setHoveredTable(table.table_name)}
                                    onMouseLeave={() => setHoveredTable(null)}
                                    className={`
                                relative p-3 rounded-md border text-sm font-medium transition-all cursor-pointer
                                ${hoveredTable === table.table_name || lineage.some(l => l.parent_table === table.table_name && l.child_table === hoveredTable) ?
                                            "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-blue-200" :
                                            "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                                        }
                            `}
                                >
                                    <div className="flex items-center gap-2">
                                        <Database className="size-3" />
                                        <span className="truncate">{table.table_name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Connector Area */}
                    <div className="flex flex-col justify-center items-center text-zinc-300 dark:text-zinc-700">
                        <ArrowRight className="size-5" />
                    </div>

                    {/* Derived Column */}
                    <div className="flex flex-col gap-4 flex-1">
                        <span className="text-xs font-semibold text-zinc-400 text-center mb-2">Derived</span>
                        <div className="flex flex-col gap-3">
                            {derivedTables.map(table => {
                                const isDepending = hoveredTable && lineage.some(l => l.parent_table === hoveredTable && l.child_table === table.table_name);
                                const isHovered = hoveredTable === table.table_name;
                                const isParentHovered = hoveredTable && lineage.some(l => l.child_table === hoveredTable && l.parent_table === table.table_name);

                                // Check upstream dependencies
                                const highlight = isHovered || isDepending; // Highlighting derived when source is hovered, or self hovered.

                                return (
                                    <div
                                        key={table.project_table_id}
                                        onMouseEnter={() => setHoveredTable(table.table_name)}
                                        onMouseLeave={() => setHoveredTable(null)}
                                        className={`
                                    p-3 rounded-md border text-sm font-medium transition-all cursor-pointer
                                    ${highlight ?
                                                "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 shadow-sm ring-1 ring-emerald-200" :
                                                "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                                            }
                                `}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FileSpreadsheet className="size-3" />
                                            <span className="truncate">{table.table_name}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
