import React, { useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck, FaHourglass } from "react-icons/fa";
import { useTaskContext } from '../context/TaskContext';

const TodoList = ({ setNotification }) => {
  const { tasks, isLoading, error, removeTask, editTask, toggleTaskCompletion } = useTaskContext();
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Handle edit button click
  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    try {
      await editTask(editingTask._id, {
        title: editTitle,
        description: editDescription,
      });
      setEditingTask(null);
      setNotification({ message: 'Task updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating task:', error);
      setNotification({ message: 'Failed to update task', type: 'error' });
    }
  };

  // Handle delete task
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await removeTask(id);
        setNotification({ message: 'Task deleted successfully!', type: 'success' });
      } catch (error) {
        console.error('Error deleting task:', error);
        setNotification({ message: 'Failed to delete task', type: 'error' });
      }
    }
  };

  // Handle toggle completion
  const handleToggleCompletion = async (id, completed) => {
    try {
      await toggleTaskCompletion(id, completed);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center py-4">No tasks found. Add a task to get started!</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className={task.completed ? 'bg-gray-100' : ''}>
              <td>
                <button
                  onClick={() => handleToggleCompletion(task._id, task.completed)}
                  className={`p-2 rounded-full ${task.completed ? 'bg-green-100' : 'bg-yellow-100'}`}
                >
                  {task.completed ? (
                    <FaCheck className="text-green-500" size={16} />
                  ) : (
                    <FaHourglass className="text-yellow-500" size={16} />
                  )}
                </button>
              </td>
              <td className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </td>
              <td className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.description || '-'}
              </td>
              <td className="flex space-x-2">
                <button onClick={() => handleEditClick(task)}>
                  <FiEdit className="text-blue-500" size={20} />
                </button>
                <button onClick={() => handleDeleteTask(task._id)}>
                  <FaRegTrashAlt className="text-red-500" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editTitle">
                Title
              </label>
              <input
                type="text"
                id="editTitle"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editDescription">
                Description
              </label>
              <textarea
                id="editDescription"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
