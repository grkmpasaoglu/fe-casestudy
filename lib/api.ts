import {
  Project,
  ProjectTable,
  Operation,
  Governance,
  TableLineage,
} from "@/lib/types";

import sampleData from "@/app/api-mock/sample-data.json";

const DELAY_MS = 600;

export async function fetchProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  return sampleData.projects as unknown as Project[];
}

export async function fetchProjectById(projectId: string): Promise<Project | undefined> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  return (sampleData.projects as unknown as Project[]).find(
    (p) => p.project_id === projectId
  );
}

export async function fetchProjectTables(projectId: string): Promise<ProjectTable[]> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  const tables = (sampleData.project_tables as Record<string, ProjectTable[]>)[projectId];
  return tables || [];
}

export async function fetchRecentOperations(projectId: string): Promise<Operation[]> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    const operations = (sampleData.recent_operations as Record<string, Operation[]>)[projectId];
    return operations || [];
}

export async function fetchGovernanceData(projectId: string): Promise<Governance | null> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    const governance = (sampleData.governance as Record<string, Governance>)[projectId];
    return governance || null;
}

export async function fetchTableLineage(projectId: string): Promise<TableLineage> {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    const lineage = (sampleData.table_lineage as Record<string, TableLineage>)[projectId];
    return lineage || [];
}
