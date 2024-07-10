import { KanbanBoard } from "./kanban-board";
import { KanbanCard } from "./kanban-card";
import { KanbanColumn } from "./kanban-column";

interface BaseData {
  id: number;
  name: string;
  description?: string;
}

type Props<TData extends BaseData> = {
  data: Record<string, Array<TData>>;
};

export const Kanban = <TData extends BaseData>({ data }: Props<TData>) => {
  return (
    <>
      <KanbanBoard>
        {Object.entries(data).map(([status, tasks]) => (
          <KanbanColumn key={status} title={status} id={status}>
            {tasks.map((task) => (
              <KanbanCard
                key={task.id}
                id={task.id.toString()}
                name={task.name}
                description={task.description}
              />
            ))}
          </KanbanColumn>
        ))}
      </KanbanBoard>
    </>
  );
};
