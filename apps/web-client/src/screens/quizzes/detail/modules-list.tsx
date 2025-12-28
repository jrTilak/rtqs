import { P } from "@/components/ui/typography";
import { ModuleCard } from "./module-card";

interface ModulesListProps {
  quizId: string;
}

const MOCK_MODULES = [
  {
    id: "1",
    name: "Introduction to React",
  },
  {
    id: "2",
    name: "React Hooks",
    quizId: "demo-1",
  },
  {
    id: "3",
    name: "State Management",
    quizId: "demo-1",
  },
];

export const ModulesList = ({ quizId }: ModulesListProps) => {
  const modules = MOCK_MODULES.filter(
    (module) => module.quizId === quizId
  );
  // TODO: API data
  if (modules.length === 0) {
    return (
      <P>
        No modules found. Click "Add Module" to create one.
      </P>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
};