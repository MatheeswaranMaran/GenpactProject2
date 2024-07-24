import React from 'react';

const ViewAllTasks = ({ data }) => {
  const name = localStorage.getItem("ename");

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-gray-50 border-collapse border border-gray-300">
        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
          <tr>
            <th className="px-4 py-3 border-b">Task Id</th>
            <th className="px-4 py-3 border-b">Employee Name</th>
            <th className="px-4 py-3 border-b">Employee ID</th>
            <th className="px-4 py-3 border-b">Employee Role</th>
            <th className="px-4 py-3 border-b">Project Name</th>
            <th className="px-4 py-3 border-b">Date</th>
            <th className="px-4 py-3 border-b">Starting Time</th>
            <th className="px-4 py-3 border-b">Ending Time</th>
            <th className="px-4 py-3 border-b">Task Category</th>
            <th className="px-4 py-3 border-b">Task Description</th>
            <th className="px-4 py-3 border-b">Associate Name</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data?.filter((task) => task.myAssociate === name).map((task) => (
            <tr key={task.id} className="hover:bg-gray-100">
              <td className="px-4 py-3 border-b">{task.id}</td>
              <td className="px-4 py-3 border-b">{task.ename}</td>
              <td className="px-4 py-3 border-b">{task.eid}</td>
              <td className="px-4 py-3 border-b">{task.role}</td>
              <td className="px-4 py-3 border-b">{task.pname}</td>
              <td className="px-4 py-3 border-b">{task.date}</td>
              <td className="px-4 py-3 border-b">{task.start}</td>
              <td className="px-4 py-3 border-b">{task.end}</td>
              <td className="px-4 py-3 border-b">{task.taskCategory}</td>
              <td className="px-4 py-3 border-b">{task.description}</td>
              <td className="px-4 py-3 border-b">{task.myAssociate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllTasks;
