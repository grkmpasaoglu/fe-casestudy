"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, LayoutDashboard, Settings, Moon, Sun, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/types"

interface SidebarProps {
    projects: Project[]
}

export function Sidebar({ projects }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    return (
        <motion.div
            initial={{ width: 260 }}
            animate={{ width: isCollapsed ? 80 : 260 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 25 }}
            className="hidden md:flex relative h-full flex-col border-r border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50 backdrop-blur-xl"
        >
            <div className="flex items-center justify-between p-4">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 font-bold text-lg"
                        >
                            <span>Project Overview Dashboard</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-auto"
                >
                    {isCollapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <div className="px-3 mb-2">
                    {!isCollapsed && <h3 className="mb-2 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Projects</h3>}
                    <nav className="flex flex-col gap-1">
                        {projects.map((project) => {
                            const isActive = pathname === `/project/${project.project_id}`
                            return (
                                <Link
                                    key={project.project_id}
                                    href={`/project/${project.project_id}`}
                                >
                                    <div className={cn(
                                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50",
                                        isActive ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400"
                                    )}>
                                        <div className={cn(
                                            "size-2 rounded-full shrink-0",
                                            project.status === "Active" ? "bg-emerald-500" :
                                                project.status === "Draft" ? "bg-zinc-400" :
                                                    project.status === "Review" ? "bg-amber-500" :
                                                        project.status === "Locked" ? "bg-rose-500" : "bg-blue-500"
                                        )} />
                                        {!isCollapsed && (
                                            <span className="truncate">{project.project_name}</span>
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>

            <div className="mt-auto border-t border-zinc-200 p-4 dark:border-zinc-800">
                <div className="flex flex-col gap-2">
                    <Button
                        variant="ghost"
                        className={cn("justify-start", isCollapsed && "justify-center px-0")}
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        {!isCollapsed && <span className="ml-2">Toggle Theme</span>}
                    </Button>

                    <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                        <div className="size-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            JS
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">John Smith</span>
                                <span className="text-xs text-zinc-500">Data Scientist</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
