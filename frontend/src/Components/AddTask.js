import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
  const [pname, setPname] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [description, setDescription] = useState('');
  const [myAssociate, setMyAssociate] = useState('');
  const [taskdata, setTaskdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const eid = localStorage.getItem('eid');
      const result = await axios.get(`http://localhost:8081/emp/task/${eid}`);
      setTaskdata(result.data);
    };
    fetchData();
  }, []);

  const validateTask = () => {
    const startTime = new Date(`${date}T${start}`);
    const endTime = new Date(`${date}T${end}`);
    const newTaskDuration = (endTime - startTime) / (1000 * 60 * 60); // duration in hours

    if (newTaskDuration > 8) {
      alert('Task duration should not exceed 8 hours');
      return false;
    }

    let totalDuration = newTaskDuration;

    for (let existingTask of taskdata) {
      if (existingTask.date === date) {
        const existingStart = new Date(`${existingTask.date}T${existingTask.start}`);
        const existingEnd = new Date(`${existingTask.date}T${existingTask.end}`);
        const existingTaskDuration = (existingEnd - existingStart) / (1000 * 60 * 60);
        totalDuration += existingTaskDuration;

        if (
          (startTime >= existingStart && startTime < existingEnd) ||
          (endTime > existingStart && endTime <= existingEnd) ||
          (startTime <= existingStart && endTime >= existingEnd)
        ) {
          alert('Task time overlaps with an existing task');
          return false;
        }
      }
    }

    if (totalDuration > 8) {
      alert('Total task duration for the day should not exceed 8 hours');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateTask()) {
      const eid = localStorage.getItem('eid');
      const ename = localStorage.getItem('ename');
      const role = localStorage.getItem('role');
      const regTask = { eid, ename, role, pname, date, start, end, taskCategory, description, myAssociate };
      try {
        const res = await axios.post('http://localhost:8081/emp/task', regTask);
        if (res.data === 'task added') {
          alert('Task is added Successfully');
          navigate('/employee');
        } else {
          alert('Task is not added');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <button
        onClick={() => navigate('/employee')}
        className="mt-4 bg-teal-500 text-white py-2 px-4 m-4 rounded-md hover:bg-teal-600 transition duration-300"
      >
        Back
      </button>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">Add New Task</h2>
        <div className="mb-5">
          <label htmlFor="pname" className="block text-gray-800 font-medium mb-2">Project Name</label>
          <input
            type="text"
            name="pname"
            id="pname"
            placeholder="Enter your Project Name"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="block text-gray-800 font-medium mb-2">Task Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="start" className="block text-gray-800 font-medium mb-2">Start Time</label>
          <input
            type="time"
            name="start"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="end" className="block text-gray-800 font-medium mb-2">End Time</label>
          <input
            type="time"
            name="end"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="taskCategory" className="block text-gray-800 font-medium mb-2">Task Category</label>
          <input
            type="text"
            name="taskCategory"
            id="taskCategory"
            placeholder="Enter the task category"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block text-gray-800 font-medium mb-2">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter the Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="myAssociate" className="block text-gray-800 font-medium mb-2">Associate Name</label>
          <input
            type="text"
            name="myAssociate"
            id="myAssociate"
            placeholder="Enter the associate name"
            value={myAssociate}
            onChange={(e) => setMyAssociate(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
