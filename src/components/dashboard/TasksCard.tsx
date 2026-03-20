import { CheckCircle2 } from "lucide-react";

const TasksCard = () => {
  return (
    <div className="card-zelo fade-in-up stagger-3 flex flex-col items-center justify-center py-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 mb-3">
        <CheckCircle2 size={24} className="text-success" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">Nenhuma tarefa pendente</p>
    </div>
  );
};

export default TasksCard;
