"use client"

import * as React from "react"
import { Database, FileSpreadsheet } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TableLineage, ProjectTable } from "@/lib/types"

interface LineageViewProps {
    lineage: TableLineage
    tables: ProjectTable[]
}

export function LineageView({ lineage, tables }: LineageViewProps) {
    const sourceTables = tables.filter(t => t.table_type === "source")
    const derivedTables = tables.filter(t => t.table_type === "derived")

    const [hoveredTable, setHoveredTable] = React.useState<string | null>(null)

    const containerRef = React.useRef<HTMLDivElement>(null)
    const itemRefs = React.useRef<Map<string, HTMLDivElement>>(new Map())

    const [paths, setPaths] = React.useState<Array<{
        id: string,
        start: { x: number, y: number },
        end: { x: number, y: number },
        source: string,
        target: string
    }>>([])

    React.useEffect(() => {
        const calculatePaths = () => {
            if (!containerRef.current) return

            const containerRect = containerRef.current.getBoundingClientRect()
            const newPaths: typeof paths = []

            lineage.forEach((rel) => {
                const sourceEl = itemRefs.current.get(rel.parent_table)
                const targetEl = itemRefs.current.get(rel.child_table)

                if (sourceEl && targetEl) {
                    const sourceRect = sourceEl.getBoundingClientRect()
                    const targetRect = targetEl.getBoundingClientRect()

                    const startX = sourceRect.right - containerRect.left
                    const startY = sourceRect.top - containerRect.top + (sourceRect.height / 2)

                    const endX = targetRect.left - containerRect.left
                    const endY = targetRect.top - containerRect.top + (targetRect.height / 2)

                    newPaths.push({
                        id: `${rel.parent_table}-${rel.child_table}`,
                        start: { x: startX, y: startY },
                        end: { x: endX, y: endY },
                        source: rel.parent_table,
                        target: rel.child_table
                    })
                }
            })
            setPaths(newPaths)
        }

        calculatePaths()

        const observer = new ResizeObserver(calculatePaths)
        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        window.addEventListener('resize', calculatePaths)

        return () => {
            window.removeEventListener('resize', calculatePaths)
            observer.disconnect()
        }
    }, [lineage, tables])


    return (
        <Card className="bg-white dark:bg-zinc-950/50 h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Data Lineage</CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-x-auto" ref={containerRef}>
                <div className="relative min-w-[600px] md:min-w-0 h-full p-1"> {/* Min width wrapper for mobile scroll */}
                    {/* SVG Overlay for Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        {paths.map((path) => {
                            const isHovered = hoveredTable === path.source || hoveredTable === path.target
                            const isDimmed = hoveredTable && !isHovered

                            const curvature = 0.5
                            const deltaX = path.end.x - path.start.x
                            const cp1x = path.start.x + (deltaX * curvature)
                            const cp1y = path.start.y
                            const cp2x = path.end.x - (deltaX * curvature)
                            const cp2y = path.end.y

                            const d = `M ${path.start.x} ${path.start.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${path.end.x} ${path.end.y}`

                            return (
                                <path
                                    key={path.id}
                                    d={d}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={isHovered ? 2 : 1}
                                    className={`
                                        transition-all duration-300
                                        ${isHovered ?
                                            "text-blue-500 dark:text-blue-400 opacity-100 z-10" :
                                            isDimmed ? "text-zinc-200 dark:text-zinc-800 opacity-50" : "text-zinc-300 dark:text-zinc-700"
                                        }
                                    `}
                                />
                            )
                        })}
                    </svg>

                    <div className="flex items-start justify-between gap-16 py-4 relative z-10">
                        {/* Source Column */}
                        <div className="flex flex-col gap-4 flex-1">
                            <span className="text-xs font-semibold text-zinc-400 text-center mb-2">Source</span>
                            <div className="flex flex-col gap-6">
                                {sourceTables.map(table => (
                                    <div
                                        key={table.project_table_id}
                                        ref={(el) => {
                                            if (el) itemRefs.current.set(table.table_name, el)
                                            else itemRefs.current.delete(table.table_name)
                                        }}
                                        onMouseEnter={() => setHoveredTable(table.table_name)}
                                        onMouseLeave={() => setHoveredTable(null)}
                                        className={`
                                            relative p-3 rounded-md border text-sm font-medium transition-all cursor-pointer bg-white dark:bg-zinc-900
                                            ${hoveredTable === table.table_name || lineage.some(l => l.parent_table === table.table_name && l.child_table === hoveredTable) ?
                                                "border-blue-500 ring-2 ring-blue-500/20 text-blue-700 dark:text-blue-300 z-20 scale-105" :
                                                "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Database className="size-3" />
                                            <span className="truncate">{table.table_name}</span>
                                        </div>
                                        {/* Connection Dot */}
                                        <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full border border-white dark:border-zinc-900 transition-colors ${hoveredTable === table.table_name || lineage.some(l => l.parent_table === table.table_name && l.child_table === hoveredTable) ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-700"
                                            }`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Derived Column */}
                        <div className="flex flex-col gap-4 flex-1">
                            <span className="text-xs font-semibold text-zinc-400 text-center mb-2">Derived</span>
                            <div className="flex flex-col gap-6">
                                {derivedTables.map(table => {
                                    const isDepending = hoveredTable && lineage.some(l => l.parent_table === hoveredTable && l.child_table === table.table_name);
                                    const isHovered = hoveredTable === table.table_name;
                                    const isParentHovered = hoveredTable && lineage.some(l => l.child_table === hoveredTable && l.parent_table === table.table_name);
                                    const highlight = isHovered || isDepending || isParentHovered;

                                    return (
                                        <div
                                            key={table.project_table_id}
                                            ref={(el) => {
                                                if (el) itemRefs.current.set(table.table_name, el)
                                                else itemRefs.current.delete(table.table_name)
                                            }}
                                            onMouseEnter={() => setHoveredTable(table.table_name)}
                                            onMouseLeave={() => setHoveredTable(null)}
                                            className={`
                                                relative p-3 rounded-md border text-sm font-medium transition-all cursor-pointer bg-white dark:bg-zinc-900
                                                ${highlight ?
                                                    "border-blue-500 ring-2 ring-blue-500/20 text-blue-700 dark:text-blue-300 z-20 scale-105" :
                                                    "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileSpreadsheet className="size-3" />
                                                <span className="truncate">{table.table_name}</span>
                                            </div>
                                            {/* Connection Dot */}
                                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-white dark:border-zinc-900 transition-colors ${highlight ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-700"
                                                }`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
