import React, { useState, useEffect } from 'react';
import { FiEdit, FiCalendar, FiAlignLeft } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck, FaHourglass } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useTaskContext } from '../context/TaskContext';

const TodoList = ({ setNotification }) => {
  const { tasks, isLoading, error, removeTask, editTask, toggleTaskCompletion } = useTaskContext();
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);


  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && editingTask) {
        setEditingTask(null);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [editingTask]);

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
  // const handleDeleteTask = async (id) => {
  //   if (window.confirm('Are you sure you want to delete this task?')) {
  //     try {
  //       await removeTask(id);
  //       setNotification({ message: 'Task deleted successfully!', type: 'success' });
  //     } catch (error) {
  //       console.error('Error deleting task:', error);
  //       setNotification({ message: 'Failed to delete task', type: 'error' });
  //     }
  //   }
  // };

  const handleDeleteClick  = (task) => {
    setTaskToDelete(task);
  };
  
  const confirmDelete = async () => {
    try {
      await removeTask(taskToDelete._id);
      setNotification({ message: 'Task deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting task:', error);
      setNotification({ message: 'Failed to delete task', type: 'error' });
    } finally {
      setTaskToDelete(null);
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
                  <FiEdit className="text-blue-500 cursor-pointer" size={20} />
                </button>
                <button onClick={() => handleDeleteClick(task)}>
                <FaRegTrashAlt className="text-red-500 cursor-pointer" size={20} />
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Task Modal */}
      <AnimatePresence>
        {taskToDelete && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setTaskToDelete(null);
            }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 text-white relative">
                <div className="flex items-center gap-2">
                  <FaRegTrashAlt size={20} className="text-white/90" />
                  <h2 className="text-xl font-bold">Delete Task</h2>
                </div>
                <button
                  onClick={() => setTaskToDelete(null)}
                  className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-800 dark:text-gray-200 mb-6">
                  Are you sure you want to permanently delete the task{' '}
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    “{taskToDelete?.title}”
                  </span>
                  ?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setTaskToDelete(null)}
                    className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 
                              font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 
                              transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 
                    text-white font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-red-500 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Edit Task Modal */}
      <AnimatePresence>
        {editingTask && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setEditingTask(null);
            }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white relative">
                <div className="flex items-center gap-2">
                  <FiEdit className="text-white/90" size={20} />
                  <h2 className="text-xl font-bold">Edit Task</h2>
                </div>
                <button 
                  onClick={() => setEditingTask(null)}
                  className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-5">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2 flex items-center gap-2" htmlFor="editTitle">
                    <FiCalendar size={16} className="text-blue-500" />
                    Title
                  </label>
                  <input
                    type="text"
                    id="editTitle"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2.5 px-4 
                            text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 
                            focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 transition-all"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2 flex items-center gap-2" htmlFor="editDescription">
                    <FiAlignLeft size={16} className="text-blue-500" />
                    Description
                  </label>
                  <textarea
                    id="editDescription"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2.5 px-4 
                            text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 
                            focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 resize-none transition-all"
                    rows="4"
                  />
                </div>
                
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 
                            font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 
                            transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                            text-white font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-blue-500 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;