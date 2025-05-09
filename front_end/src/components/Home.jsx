import React from "react";
import AddTask from "../partials/AddTask";
import TodoList from "../partials/TodoList";

const Home = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center my-5 flex flex-col gap-4" >
                <h1 className="text-2xl font-bold mb-4">Todo List </h1>
                <p className="text-gray-600">Welcome to the Todo List application!</p>
                <p className="text-gray-600">This is a simple application to manage your tasks.</p>
                <AddTask/>
            </div>
            <TodoList />
        </main>
    );
}
export default Home;