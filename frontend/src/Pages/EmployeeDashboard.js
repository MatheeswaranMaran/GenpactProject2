import React, { useEffect, useState } from 'react';
import EmployeeHeader from '../Components/EmployeeHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ViewTasks from '../Components/ViewTasks';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [taskdata, setTaskData] = useState([]);

  if (localStorage.getItem("login") !== "true") {
    navigate("/");
  }

  const AddTask = () => {
    navigate("/addTask");
  };

  const id = localStorage.getItem("eid");

  const getData = () => {
    axios.get(`http://localhost:8081/emp/employee/${id}`)
      .then((res) => {
        localStorage.setItem("ename", res.data.name);
        localStorage.setItem("role", res.data.role);
      })
      .catch((err) => {
        console.error("Error fetching employee data:", err);
      });

    axios.get(`http://localhost:8081/emp/task/${id}`)
      .then((res) => {
        setTaskData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching task data:", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-teal-200 via-blue-200 to-purple-200 min-h-screen flex flex-col items-center p-6">
      <EmployeeHeader />
      <button
        onClick={logout}
        className="w-40 bg-red-700 text-white py-2 rounded-full absolute top-5 right-5 hover:bg-red-800 transition duration-300 shadow-md"
      >
        Logout
      </button>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl mt-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {localStorage.getItem('ename')}</h2>
        <button
          onClick={AddTask}
          className="w-full max-w-xs bg-teal-600 text-white py-3 rounded-lg mb-6 hover:bg-teal-700 transition duration-300 shadow-lg"
        >
          Add Task
        </button>
        <ViewTasks data={taskdata} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
