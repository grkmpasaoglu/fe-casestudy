import { notFound } from "next/navigation"
import { fetchProjectById, fetchProjectTables, fetchRecentOperations, fetchGovernanceData, fetchTableLineage } from "@/lib/api"
import { ProjectHero } from "@/components/dashboard/project-hero"
import { DataTablesList } from "@/components/dashboard/data-tables-list"
import { OperationsFeed } from "@/components/dashboard/operations-feed"
import { GovernancePanel } from "@/components/dashboard/governance-panel"
import { LineageView } from "@/components/dashboard/lineage-view"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"

export default async function ProjectPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const projectData = fetchProjectById(id)
    const tablesData = fetchProjectTables(id)
    const operationsData = fetchRecentOperations(id)
    const governanceData = fetchGovernanceData(id)
    const lineageData = fetchTableLineage(id)

    const [project, tables, operations, governance, lineage] = await Promise.all([
        projectData,
        tablesData,
        operationsData,
        governanceData,
        lineageData
    ])

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-black/50 p-6 md:p-8 space-y-8">

            {/* 1. Project Hero */}
            <FadeIn>
                <ProjectHero project={project} />
            </FadeIn>

            {/* 2. Main Grid */}
            <FadeInStagger className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Middle Left: Data & Ops (2/3) */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Lineage */}
                    <FadeIn>
                        <LineageView lineage={lineage} tables={tables} />
                    </FadeIn>

                    {/* Data Tables */}
                    <FadeIn>
                        <DataTablesList tables={tables} />
                    </FadeIn>

                    {/* Operations Feed */}
                    <FadeIn>
                        <OperationsFeed operations={operations} />
                    </FadeIn>
                </div>

                {/* Middle Right: Governance (1/3) */}
                <div className="xl:col-span-1 space-y-8">
                    <FadeIn>
                        <GovernancePanel governance={governance} />
                    </FadeIn>
                </div>

            </FadeInStagger>
        </div>
    )
}
