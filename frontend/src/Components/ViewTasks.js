import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewTasks = ({ data }) => {
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/updateTask/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/emp/delete/${id}`)
      .then((res) => {
        if (res.data === "deleted") {
          alert("Task Deleted");
          window.location.reload();
        } else {
          alert("Task is not Deleted");
        }
      });
  };

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 border-b">Task Id</th>
            <th className="py-3 px-4 border-b">Project Name</th>
            <th className="py-3 px-4 border-b">Date</th>
            <th className="py-3 px-4 border-b">Starting Time</th>
            <th className="py-3 px-4 border-b">Ending Time</th>
            <th className="py-3 px-4 border-b">Task Category</th>
            <th className="py-3 px-4 border-b">Task Description</th>
            <th className="py-3 px-4 border-b">Associate Name</th>
            <th className="py-3 px-4 border-b">Update</th>
            <th className="py-3 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data?.map((task) => (
            <tr key={task.id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{task.id}</td>
              <td className="py-3 px-4 border-b">{task.pname}</td>
              <td className="py-3 px-4 border-b">{task.date}</td>
              <td className="py-3 px-4 border-b">{task.start}</td>
              <td className="py-3 px-4 border-b">{task.end}</td>
              <td className="py-3 px-4 border-b">{task.taskCategory}</td>
              <td className="py-3 px-4 border-b">{task.description}</td>
              <td className="py-3 px-4 border-b">{task.myAssociate}</td>
              <td className="py-3 px-4 border-b">
                <button 
                  onClick={() => handleUpdate(task.id)} 
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                >
                  Update
                </button>
              </td>
              <td className="py-3 px-4 border-b">
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTasks;
