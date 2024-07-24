import React from 'react';

const ViewAllEmployees = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="px-4 py-2 border-b border-gray-400">Employee ID</th>
            <th className="px-4 py-2 border-b border-gray-400">Employee Name</th>
            <th className="px-4 py-2 border-b border-gray-400">Employee Role</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((employee) => (
            <tr key={employee.eid} className="hover:bg-gray-50 transition duration-200">
              <td className="px-4 py-2 border-b border-gray-300">{employee.eid}</td>
              <td className="px-4 py-2 border-b border-gray-300">{employee.name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllEmployees;
