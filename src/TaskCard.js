export default function TaskCard({ task, onEdit }) {
  return (
    <div
      className="task"
      draggable
      onDragStart={e => e.dataTransfer.setData("id", task.id)}
      onClick={onEdit}
    >
      <strong>{task.title}</strong>
      <p>{task.priority}</p>
    </div>
  );
}
