import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [eid, setEid] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { eid, pwd };
    try {
      const res = await axios.post("http://localhost:8081/emp/login", loginData);
      if (res.data) {
        alert("Successfully logged in!");
        localStorage.setItem("eid", eid);
        localStorage.setItem("login", "true");
        if (res.data === "admin") {
          navigate('/admin');
        } else if (res.data === "associate") {
          navigate("/associate");
        } else {
          navigate("/employee");
        }
      } else {
        setError("Login Failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 rounded-xl -z-10"></div>
        <h2 className="text-3xl font-serif font-extrabold mb-6 text-gray-900 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="eid" className="block text-gray-700 font-semibold mb-2">Employee ID</label>
            <input
              type="text"
              placeholder="Enter your Employee ID"
              name="eid"
              id="eid"
              value={eid}
              onChange={(e) => setEid(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition duration-300 shadow-sm"
            />
          </div>
          <div className="relative">
            <label htmlFor="pwd" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="pwd"
              id="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition duration-300 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
          >
            Login
          </button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
