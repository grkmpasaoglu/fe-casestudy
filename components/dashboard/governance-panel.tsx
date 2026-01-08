"use client"
import { User as ShieldCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Governance } from "@/lib/types"
import { CircularProgress } from "@/components/ui/circular-progress"
import { cn } from "@/lib/utils"

interface GovernancePanelProps {
    governance: Governance | null
}

export function GovernancePanel({ governance }: GovernancePanelProps) {
    if (!governance) return null

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-5 text-zinc-500" />
                        <CardTitle className="text-base">Compliance Status</CardTitle>
                    </div>
                </CardHeader>
                <CardContent
                    className={`pb-6 ${governance.compliance_checklist
                        ? "flex flex-col items-center justify-center"
                        : "flex justify-start items-start"
                        }`}
                >
                    {governance.compliance_checklist ? (
                        <div className="flex flex-col items-center gap-4">
                            <CircularProgress
                                value={governance.compliance_checklist.completion_percentage}
                                size={140}
                                strokeWidth={12}
                            />
                            <div className="text-center">
                                <h4 className="font-medium text-sm">
                                    {governance.compliance_checklist.template_name}
                                </h4>
                                <p className="text-xs text-zinc-500 mt-1">
                                    {governance.compliance_checklist.completed_items}/
                                    {governance.compliance_checklist.total_items} items completed
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="py-4 text-left text-zinc-500">
                            <p className="text-sm">No compliance checklist for this project type.</p>
                        </div>
                    )}
                </CardContent>

            </Card>

            {/* Approvals */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Pending Approvals</CardTitle>
                        <Badge variant="secondary">{governance.approvals.filter(a => a.status === "Pending").length}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {governance.approvals.length === 0 ? (
                        <p className="text-sm text-zinc-500">No active approval requests.</p>
                    ) : (
                        governance.approvals.map((approval) => (
                            <div
                                key={approval.approval_id}
                                className={cn(
                                    "flex flex-col gap-2 rounded-lg border p-3 text-sm transition-colors",
                                    approval.status === "Pending"
                                        ? "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900"
                                        : "bg-zinc-50 border-zinc-100 dark:bg-zinc-900/50 dark:border-zinc-800"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{approval.approval_type}</span>
                                    <Badge variant={approval.status === "Pending" ? "outline" : "default"} className={cn(
                                        approval.status === "Pending" && "text-amber-600 border-amber-600 dark:text-amber-500 dark:border-amber-500",
                                        approval.status === "Approved" && "bg-emerald-500 text-white"
                                    )}>
                                        {approval.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <span>Approver:</span>
                                    <div className="flex items-center gap-1">
                                        <Avatar className="h-4 w-4">
                                            <AvatarFallback className="text-[8px]">{approval.approver.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <span>{approval.approver.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Stakeholders */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Stakeholders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {governance.stakeholders.map((stakeholder) => (
                        <div key={stakeholder.user_id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{stakeholder.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{stakeholder.name}</span>
                                    <span className="text-xs text-zinc-500">{stakeholder.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    )
}
