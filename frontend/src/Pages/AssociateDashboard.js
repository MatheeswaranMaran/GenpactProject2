import React, { useState, useEffect } from 'react';
import AssociateHeader from '../Components/AssociateHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ViewAllTasks from '../Components/ViewAllTasks';

const AssociateDashboard = () => {
  const [eid, setEid] = useState('');
  const [tasksdata, setTD] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login !== "true") {
      navigate('/');
    } else {
      getData();
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/statistics/${eid}`);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const id = localStorage.getItem("eid");

  const getData = () => {
    axios.get(`http://localhost:8081/emp/employee/${id}`)
      .then((res) => {
        localStorage.setItem("ename", res.data.name);
        localStorage.setItem("role", res.data.role);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });

    axios.get("http://localhost:8081/emp/gettasks")
      .then((res) => {
        setTD(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks data!", error);
      });
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <AssociateHeader />
      <button
        onClick={logout}
        className="w-40 bg-red-700 text-white py-2 rounded-full absolute top-5 right-5 shadow-lg hover:bg-red-800 transition duration-300 transform hover:scale-105"
      >
        Logout
      </button>
      <div className="mt-6 w-full flex max-w-md bg-transparent rounded-lg shadow-lg p-1 flex-col justify-center items-center">
        <h2 className="font-serif text-3xl mb-2 font-semibold">Search</h2>
        <form onSubmit={handleSubmit} className="flex w-full bg-white rounded-md">
          <input
            type="text"
            name="eid"
            id="eid"
            value={eid}
            onChange={(e) => setEid(e.target.value)}
            placeholder="Enter Employee ID"
            className="border border-gray-300 p-3 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 text-sm rounded-r-md shadow hover:bg-blue-700 transition duration-300"
          >Search
          </button>
        </form>
      </div>
      <div className="mt-10 w-full max-w-6xl">
        <ViewAllTasks data={tasksdata} />
      </div>
    </div>
  );
};

export default AssociateDashboard;
