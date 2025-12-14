import TaskCard from "./TaskCard";

export default function TaskColumn({ status, tasks, moveTask, setEditTask, openModal }) {
  return (
    <div
      className="column"
      onDragOver={e => e.preventDefault()}
      onDrop={e => moveTask(+e.dataTransfer.getData("id"), status)}
    >
      <h3>{status}</h3>

      {tasks.filter(t => t.status === status).map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => { setEditTask(task); openModal(); }}
        />
      ))}
    </div>
  );
}
