import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const EmployeeRegister = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regData = { name, role };

    try {
      const res = await axios.post("http://localhost:8081/emp/add", regData);
      if (res.data) {
        alert("Successfully registered");
        onRequestClose();
      } else {
        alert("Error Occurred");
      }
    } catch (err) {
      console.error("An error occurred");
    }
    window.location.reload();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Register Employee Modal"
    >
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Register Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Enter employee name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-2">Role</label>
            <input
              type="text"
              name="role"
              id="role"
              value={role}
              placeholder="Enter employee role"
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Register
            </button>
            <button 
              type="button" 
              onClick={onRequestClose} 
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EmployeeRegister;
