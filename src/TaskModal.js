import { useState } from "react";

export default function TaskModal({ close, tasks, setTasks, editTask }) {
  const [form, setForm] = useState(
    editTask || {
      title: "",
      description: "",
      priority: "Low",
      status: "To-Do",
      dueDate: ""
    }
  );

  const save = () => {
    if (editTask) {
      setTasks(tasks.map(t => t.id === editTask.id ? form : t));
    } else {
      setTasks([...tasks, { ...form, id: Date.now(), createdAt: new Date() }]);
    }
    close();
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <select onChange={e => setForm({ ...form, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={save}>Save</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
