import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Daily from './Daily';
import Weekly from './Weekly';

const Statistics = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen p-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 font-serif">
      <button
        onClick={() => navigate("/associate")}
        className="mt-8 mb-6 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
      >
        Back
      </button>
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg mb-8 border-t-4 border-blue-500">
        <p className="text-2xl font-bold text-gray-800 mb-4">Weekly Basis Analytics</p>
        <Weekly id={id} />
      </div>
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg border-t-4 border-teal-500">
        <p className="text-2xl font-bold text-gray-800 mb-4">Daily Basis Analytics</p>
        <Daily id={id} />
      </div>
    </div>
  );
}

export default Statistics;
