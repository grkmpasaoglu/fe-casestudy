"use client"

import { cn } from "@/lib/utils"

interface CircularProgressProps {
    value: number
    size?: number
    strokeWidth?: number
    className?: string
}

export function CircularProgress({
    value,
    size = 120,
    strokeWidth = 10,
    className
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (value / 100) * circumference

    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="rotate-[-90deg]"
            >
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-zinc-100 dark:text-zinc-800"
                />

                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold dark:text-white">{value}%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Complete</span>
            </div>
        </div>
    )
}
