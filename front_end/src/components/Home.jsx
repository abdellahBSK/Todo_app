import React, { useState } from "react";
import AddTask from "../partials/AddTask";
import TodoList from "../partials/TodoList";
import Notification from "./Notification";
import { useTaskContext } from "../context/TaskContext";

const Home = () => {
    const { error } = useTaskContext();
    const [notification, setNotification] = useState(null);

    // Set error notification when context error changes
    React.useEffect(() => {
        if (error) {
            setNotification({ message: error, type: 'error' });
        }
    }, [error]);

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="text-center my-5 flex flex-col gap-4" >
                <h1 className="text-2xl font-bold mb-4">Todo List </h1>
                <p className="text-gray-600">Welcome to the Todo List application!</p>
                <p className="text-gray-600">This is a simple application to manage your tasks.</p>
                <AddTask setNotification={setNotification} />
            </div>
            <TodoList setNotification={setNotification} />
        </main>
    );
}

export default Home;