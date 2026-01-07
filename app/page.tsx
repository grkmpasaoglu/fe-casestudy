import { redirect } from "next/navigation";
import { fetchProjects } from "@/lib/api";

export default async function Home() {
  const projects = await fetchProjects();

  if (projects.length > 0) {
    redirect(`/project/${projects[0].project_id}`);
  }

  return (
    <div className="flex h-full items-center justify-center p-8 text-center text-zinc-500">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">No Projects Found</h2>
        <p className="mt-2">There are no projects currently available. Create one to get started.</p>
      </div>
    </div>
  );
}
