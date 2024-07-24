import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js';
import './App.css';
import EmployeeLogin from './Pages/EmployeeLogin';
import {Routes, Route} from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AssociateDashboard from './Pages/AssociateDashboard';
import EmployeeRegister from './Components/EmployeeRegister';
import AddTask from './Components/AddTask';
import UpdateTask from './Components/UpdateTask';
import Statistics from './Components/Statistics'
import AdminStatistics from './Components/AdminStatistics';

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<EmployeeLogin/>} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/associate" element={<AssociateDashboard/>}/>
        <Route path="/employee" element={<EmployeeDashboard/>}/>
        <Route path="/addEmployee" element={<EmployeeRegister/>}/>
        <Route path="/addTask" element={<AddTask />}/>
        <Route path="/updateTask/:id" element={<UpdateTask/>}/>
        <Route path="/statistics/:id" element={<Statistics/>}/>
        <Route path="/adminstatistics/:id" element={<AdminStatistics/>} />
      </Routes>
    </div>
  );
}

export default App;
