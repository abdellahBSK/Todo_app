import { createContext, useContext, useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      return newTask;
    } catch (error) {
      setError('Failed to add task');
      console.error('Error adding task:', error);
      throw error;
    }
  };

  // Update a task
  const editTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (error) {
      setError('Failed to update task');
      console.error('Error updating task:', error);
      throw error;
    }
  };

  // Delete a task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      setError('Failed to delete task');
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (id, completed) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === id);
      if (taskToUpdate) {
        const updatedTask = await updateTask(id, {
          ...taskToUpdate,
          completed: !completed,
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? updatedTask : task))
        );
      }
    } catch (error) {
      setError('Failed to update task status');
      console.error('Error updating task status:', error);
      throw error;
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};