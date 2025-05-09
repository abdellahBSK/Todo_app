import React from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";


const TodoList = () => {
  return (
    <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Tasks</th>
          <th>Actions</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>
     
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                    alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Hart Hagerty</div>
              </div>
            </div>
          </td>
          <td>
            Zemlak, Daniel and Leannon
         
          </td>
          <td><FiEdit className='text-blue-500' size={20} /></td>
          <td><FaRegTrashAlt className='text-red-500' size={20} /></td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default TodoList
