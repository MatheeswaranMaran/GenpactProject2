import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
  const [pname, setPname] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [description, setDescription] = useState('');
  const [myAssociate, setMyAssociate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const regTask = { pname, date, start, end, taskCategory, description, myAssociate };
    try {
      axios.put(`http://localhost:8081/emp/updatetask/${id}`, regTask).then((res) => {
        if (res.data === "updated") {
          alert("Task updated successfully!");
          navigate("/employee");
        } else {
          alert("Task update failed.");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 flex flex-col items-center justify-center p-4">
      <button
        onClick={() => navigate("/employee")}
        className="bg-black text-white py-2 px-4 rounded-md mb-6 hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Back
      </button>
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pname" className="block text-gray-700 text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              id="pname"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
              placeholder="Enter Project Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">Task Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="start" className="block text-gray-700 text-sm font-medium mb-2">Start Time</label>
            <input
              type="time"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="end" className="block text-gray-700 text-sm font-medium mb-2">End Time</label>
            <input
              type="time"
              id="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="taskCategory" className="block text-gray-700 text-sm font-medium mb-2">Task Category</label>
            <input
              type="text"
              id="taskCategory"
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value)}
              placeholder="Enter Task Category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="myAssociate" className="block text-gray-700 text-sm font-medium mb-2">Associate Name</label>
            <input
              type="text"
              id="myAssociate"
              value={myAssociate}
              onChange={(e) => setMyAssociate(e.target.value)}
              placeholder="Enter Associate Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
