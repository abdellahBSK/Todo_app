import React from 'react';
import { CiCirclePlus } from "react-icons/ci";

const AddTask = () => {
    return (
    <div>
        <button className="bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-2">
            Add new Task <CiCirclePlus size={18} />
        </button>
    </div>
    )
}
export default AddTask;