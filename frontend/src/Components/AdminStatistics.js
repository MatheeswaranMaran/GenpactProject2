import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';

const AdminStatistics = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
      >
        Back
      </button>
      <div className="w-full max-w-4xl space-y-6">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Basis Analytics</h2>
          <Monthly id={id} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weekly Basis Analytics</h2>
          <Weekly id={id} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Basis Analytics</h2>
          <Daily id={id} />
        </div>
      </div>
    </div>
  );
}

export default AdminStatistics;
