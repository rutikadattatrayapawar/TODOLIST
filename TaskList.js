import React from 'react';

const TaskList = ({ tasks, completeTask, deleteTask }) => {
  const handleCompleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });
      if (response.ok) {
        completeTask(id);
      } else {
        console.error('Error completing task:', response.statusText);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        deleteTask(id);
      } else {
        console.error('Error deleting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => handleCompleteTask(task.id)} // Updated to call handleCompleteTask
          >
            {task.title}
          </span>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button> // Updated to call handleDeleteTask
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
