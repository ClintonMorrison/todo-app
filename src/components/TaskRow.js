import React from 'react';

import './TaskRow.css';

export default function TaskRow({ task, onToggleComplete, onDelete }) {
  return (
    <tr className={`task-row ${task.completed ? 'completed' : ''}`}>
      <td className="column-checkbox">
        <input id={`${task.id}-completed`} type="checkbox" checked={task.completed} onChange={onToggleComplete} />
      </td>
      <td className="column-priority">{task.priority}</td>
      <td className="column-description">{task.description}</td>
      <td>
        <button className="delete-task" onClick={onDelete}>&times;</button>
      </td>
    </tr>
  );
}