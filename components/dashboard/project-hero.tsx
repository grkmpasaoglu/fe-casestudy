"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Building2, CheckCircle2, Circle, Clock, Lock } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Project, ProjectStatus } from "@/lib/types"
import { cn, formatDate } from "@/lib/utils"

interface ProjectHeroProps {
    project: Project
}

const statusSteps: ProjectStatus[] = ["Draft", "Active", "Review", "Approved", "Locked"]

export function ProjectHero({ project }: ProjectHeroProps) {
    const currentStepIndex = statusSteps.indexOf(project.status)

    return (
        <Card className="w-full bg-white dark:bg-zinc-950/50 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left: Project Info */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                    {project.project_type}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-zinc-500">
                                    <Building2 className="size-3" />
                                    <span>{project.department.name}</span>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                {project.project_name}
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-sm">
                                {project.objectives}
                            </p>
                        </div>

                        <div className="flex items-center gap-8">
                            {/* Owner */}
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-900 shadow-sm">
                                    <AvatarFallback>
                                        {project.owner.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Owner</span>
                                    <span className="text-sm font-medium hover:underline cursor-pointer">{project.owner.name}</span>
                                    <span className="text-[10px] text-zinc-400">{project.owner.title}</span>
                                </div>
                            </div>

                            {/* Governance Manager (Optional) */}
                            {project.governance_manager && (
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-900 shadow-sm">
                                        <AvatarFallback className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200">
                                            {project.governance_manager.name.split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Governance</span>
                                        <span className="text-sm font-medium hover:underline cursor-pointer">{project.governance_manager.name}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Status Stepper */}
                    <div className="flex-1 lg:max-w-md">
                        <div className="relative flex items-center justify-between">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-2">
                                <div className="h-0.5 w-full bg-zinc-100 dark:bg-zinc-800" />
                            </div>

                            {statusSteps.map((step, index) => {
                                const isCompleted = index < currentStepIndex
                                const isCurrent = index === currentStepIndex

                                return (
                                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                backgroundColor: isCompleted || isCurrent ? "var(--step-bg)" : "var(--step-inactive)",
                                                scale: isCurrent ? 1.1 : 1
                                            }}
                                            style={{
                                                // @ts-ignore
                                                "--step-bg": isCurrent ? "#0ea5e9" : isCompleted ? "#10b981" : "#f4f4f5",
                                                "--step-inactive": "#f4f4f5" // bg-zinc-100
                                            }}
                                            className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                                                isCompleted ? "border-emerald-500 text-white" :
                                                    isCurrent ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/30" :
                                                        "border-zinc-200 bg-zinc-50 text-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
                                            )}
                                        >
                                            {isCompleted ? <CheckCircle2 className="size-4" /> :
                                                isCurrent ? <Clock className="size-4 animate-pulse" /> :
                                                    step === "Locked" ? <Lock className="size-3" /> :
                                                        <Circle className="size-3 fill-current" />
                                            }
                                        </motion.div>
                                        <span className={cn(
                                            "text-[10px] font-medium uppercase tracking-wider transition-colors",
                                            isCurrent ? "text-sky-500 font-bold" :
                                                isCompleted ? "text-emerald-500" : "text-zinc-400"
                                        )}>
                                            {step}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-2 text-xs text-zinc-400">
                            <Clock className="size-3" />
                            Created {formatDate(project.created_at)}
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-2 text-xs text-zinc-400">
                            <Clock className="size-3" />
                            Last updated {formatDate(project.updated_at)}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
