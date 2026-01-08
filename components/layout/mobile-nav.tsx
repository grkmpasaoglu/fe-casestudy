"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Project } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileNavProps {
    projects: Project[]
}

export function MobileNav({ projects }: MobileNavProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    return (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
            {/* Logo Area */}
            <div className="flex items-center gap-2 font-bold text-lg">
                <span>Project Overview Dashboard</span>
            </div>

            {/* Hamburger Button */}
            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
                <Menu className="size-5" />
            </Button>

            {/* Overlay & Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-zinc-950 z-50 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-900">
                                <span className="font-semibold text-sm text-zinc-500 uppercase tracking-wider">Navigation</span>
                                <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X className="size-5" />
                                </Button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto py-4 px-3">
                                <h3 className="mb-2 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Projects</h3>
                                <nav className="flex flex-col gap-1">
                                    {projects.map((project) => {
                                        const isActive = pathname === `/project/${project.project_id}`
                                        return (
                                            <Link
                                                key={project.project_id}
                                                href={`/project/${project.project_id}`}
                                                className={cn(
                                                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                                    isActive ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400"
                                                )}
                                            >
                                                <div className={cn(
                                                    "size-2 rounded-full shrink-0",
                                                    project.status === "Active" ? "bg-emerald-500" :
                                                        project.status === "Draft" ? "bg-zinc-400" :
                                                            project.status === "Review" ? "bg-amber-500" :
                                                                project.status === "Locked" ? "bg-rose-500" : "bg-blue-500"
                                                )} />
                                                <span className="truncate">{project.project_name}</span>
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>

                            {/* Drawer Footer */}
                            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-900 p-4 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                                            JS
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">John Smith</span>
                                            <span className="text-xs text-zinc-500">Data Scientist</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2 cursor-pointer"
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    >
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span>Toggle Theme</span>
                                    </Button>
                                </div>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
