import { ModuleCard } from "./module-card";
import { server } from "@/server/apis";
import { QueryState } from "@/components/ui/query-state";

interface ModulesListProps {
  quizId: string;
}

export const ModulesList = ({ quizId }: ModulesListProps) => {
  const modules = server.quizModules.useList({ quizId });

  return (
    <QueryState {...modules} isEmpty={modules.data?.length === 0}>
      <QueryState.Error />
      <QueryState.Loading />
      <QueryState.Empty>No modules found.</QueryState.Empty>
      <QueryState.Data>
        <div className="flex flex-col gap-4">
          {modules.data?.map((module) => (
            <ModuleCard quizId={quizId} key={module.id} module={module} />
          ))}
        </div>
      </QueryState.Data>
    </QueryState>
  );
};
