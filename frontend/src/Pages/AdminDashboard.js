import React, { useState, useEffect } from 'react';
import EmployeeRegister from '../Components/EmployeeRegister';
import AdminHeader from '../Components/AdminHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ViewAllTasksAdmin from '../Components/ViewAllTasksAdmin';
import ViewAllEmployees from '../Components/ViewAllEmployees';

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [eid, setEid] = useState('');
  const [taskdata, setTD] = useState([]);
  const [employeedata, setED] = useState([]);
  const id = localStorage.getItem("eid");
  const [emp, setEmp] = useState(true);
  const [task, setTask] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/adminstatistics/${eid}`);
  }

  const getData = () => {
    axios.get(`http://localhost:8081/emp/employee/${id}`)
      .then((res) => {
        localStorage.setItem("ename", res.data.name);
        localStorage.setItem("role", res.data.role);
      });

    axios.get("http://localhost:8081/emp/gettasks")
      .then((res) => setTD(res.data));

    axios.get("http://localhost:8081/emp/getdata")
      .then((res) => setED(res.data));
  }

  const handleType = (type) => {
    if (type === "emp") {
      setEmp(true);
      setTask(false);
    } else if (type === "task") {
      setTask(true);
      setEmp(false);
    }
  }

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login !== "true") {
      navigate('/');
    } else {
      getData();
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center font-sans p-6 bg-gradient-to-r from-blue-100 to-green-100 min-h-screen">
      <AdminHeader />
      <div className="flex flex-col items-center bg-white shadow-green-600 p-6 rounded-lg shadow-inner mt-6 w-full max-w-2xl">
        <button
          onClick={openModal}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-600 transition duration-300 mb-4"
        >
          Register Employee
        </button>
        <EmployeeRegister isOpen={isModalOpen} onRequestClose={closeModal} />
        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="mt-6 w-full flex max-w-md bg-gradient-to-r rounded-lg shadow-lg p-1">
        <form onSubmit={handleSubmit} className="flex w-full bg-transparent rounded-md">
          <input
            type="text"
            name="eid"
            id="eid"
            value={eid}
            onChange={(e) => setEid(e.target.value)}
            placeholder="Enter Employee ID"
            className="border border-gray-300 p-3 rounded-l-md w-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 text-sm rounded-r-md shadow hover:bg-blue-700 transition duration-300"
          >Search
          </button>
        </form>
      </div>
      <div className="flex space-x-4 justify-center mt-6">
        <button
          onClick={() => handleType("emp")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          View Employees
        </button>
        <button
          onClick={() => handleType("task")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          View Tasks
        </button>
      </div>

      {task && (
        <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks Details</h2>
          <ViewAllTasksAdmin data={taskdata} />
        </div>
      )}
      {emp && (
        <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Details</h2>
          <ViewAllEmployees data={employeedata} />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
