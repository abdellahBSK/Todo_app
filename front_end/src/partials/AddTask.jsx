import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { FiEdit3, FiCalendar, FiAlignLeft } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useTaskContext } from '../context/TaskContext';

const AddTask = ({ setNotification }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTask } = useTaskContext();

    // Close modal with escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };
        
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isModalOpen]);

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
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-full py-3 px-4 rounded-lg 
                          hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all 
                          shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium cursor-pointer"
            >
                Add new Task <CiCirclePlus size={20} />
            </button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsModalOpen(false);
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
                                    <FiEdit3 className="text-white/90" size={20} />
                                    <h2 className="text-xl font-bold">Add New Task</h2>
                                </div>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors cursor-pointer"
                                    aria-label="Close modal"
                                >
                                    <IoCloseOutline size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="mb-5">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2 flex items-center gap-2" htmlFor="title">
                                        <FiCalendar size={16} className="text-blue-500" />
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2.5 px-4 
                                                text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 
                                                focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 transition-all"
                                        placeholder="What needs to be done?"
                                        required
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2 flex items-center gap-2" htmlFor="description">
                                        <FiAlignLeft size={16} className="text-blue-500" />
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2.5 px-4 
                                                text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 
                                                focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 resize-none transition-all"
                                        placeholder="Add some details about this task..."
                                        rows="4"
                                    />
                                </div>
                                
                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 
                                                font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 
                                                transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                                                text-white font-medium py-2.5 px-5 rounded-lg focus:outline-none focus:ring-2 
                                                focus:ring-blue-500 shadow-md hover:shadow-lg transition-all cursor-pointer"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddTask;