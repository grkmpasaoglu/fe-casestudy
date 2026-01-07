"use client"

import { cn } from "@/lib/utils"

import { Target, TrendingUp, Clock, Link as LinkIcon } from "lucide-react"

export const roleColors: Record<string, string> = {
    "lookup": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    "time_id": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "exog": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    "endog": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    "not_used": "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
}

export function RoleBadge({ role }: { role: string }) {
    const Icon = () => {
        switch (role) {
            case "endog": return <Target className="size-3 mr-1" />
            case "exog": return <TrendingUp className="size-3 mr-1" /> // "Tahmin" / Predictor
            case "time_id": return <Clock className="size-3 mr-1" />
            case "lookup": return <LinkIcon className="size-3 mr-1" />
            default: return null
        }
    }

    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider", roleColors[role] || roleColors["not_used"])}>
            <Icon />
            {role}
        </span>
    )
}
