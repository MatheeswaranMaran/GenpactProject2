import React from 'react';

const ViewAllTasksAdmin = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="px-4 py-2 border-b border-gray-400">Task Id</th>
            <th className="px-4 py-2 border-b border-gray-400">Employee Name</th>
            <th className="px-4 py-2 border-b border-gray-400">Employee ID</th>
            <th className="px-4 py-2 border-b border-gray-400">Employee Role</th>
            <th className="px-4 py-2 border-b border-gray-400">Project Name</th>
            <th className="px-4 py-2 border-b border-gray-400">Date</th>
            <th className="px-4 py-2 border-b border-gray-400">Starting Time</th>
            <th className="px-4 py-2 border-b border-gray-400">Ending Time</th>
            <th className="px-4 py-2 border-b border-gray-400">Task Category</th>
            <th className="px-4 py-2 border-b border-gray-400">Task Description</th>
            <th className="px-4 py-2 border-b border-gray-400">Associate Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition duration-200">
              <td className="px-4 py-2 border-b border-gray-300">{task.id}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.ename}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.eid}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.role}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.pname}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.date}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.start}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.end}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.taskCategory}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.description}</td>
              <td className="px-4 py-2 border-b border-gray-300">{task.myAssociate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllTasksAdmin;
