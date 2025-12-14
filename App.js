import { useEffect, useState } from "react";
import data from "./Tasks.json";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  const columns = ["To-Do", "In-Progress", "Completed"];

  // Load tasks on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(data);
    }
  }, []);

  // Save tasks whenever there is a change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Move task between columns
  const handleTaskMove = (taskId, newStatus) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
    });
  };

  return (
    <>
      <header className="navbar">
        <h2>Task To Do...</h2>
        <button onClick={() => setIsModalOpen(true)}>New Task</button>
      </header>

      <div className="board">
        {columns.map(status => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            moveTask={handleTaskMove}
            setEditTask={setTaskBeingEdited}
            openModal={() => setIsModalOpen(true)}
          />
        ))}
      </div>

      {isModalOpen && (
        <TaskModal close={() => {
          setIsModalOpen(false);
          setTaskBeingEdited(null);
        }}
          tasks={tasks}
          setTasks={setTasks}
          editTask={taskBeingEdited}
        />
      )}
    </>
  );
}
