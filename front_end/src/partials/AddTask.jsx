import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { useTaskContext } from '../context/TaskContext';

const AddTask = ({ setNotification }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTask } = useTaskContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await addTask({ title, description });
            setTitle('');
            setDescription('');
            setIsModalOpen(false);
            setNotification({ message: 'Task added successfully!', type: 'success' });
        } catch (error) {
            console.error('Error adding task:', error);
            setNotification({ message: 'Failed to add task', type: 'error' });
        }
    };

    return (
        <div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-2"
            >
                Add new Task <CiCirclePlus size={18} />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter task description"
                                    rows="3"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTask;