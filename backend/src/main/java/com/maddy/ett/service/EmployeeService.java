package com.maddy.ett.service;

import java.util.List;

import com.maddy.ett.model.EmployeeModel;
import com.maddy.ett.model.TaskModel;

public interface EmployeeService {
	public abstract EmployeeModel addEmployee(EmployeeModel employee);
	public abstract TaskModel addTask(TaskModel task);
	public abstract List<EmployeeModel> authenticate(String eid, String pwd);
	public abstract List<TaskModel> findbyEid(String eid);
	public abstract String deleteTask(Integer id);
	public abstract String updateTask(Integer id, TaskModel task);
	public abstract String updateEmployee(Integer id, EmployeeModel employee);
	public abstract String updateEmp(String eid, EmployeeModel employee);
	public abstract EmployeeModel getEmployeeByEid(String eid);
	public abstract TaskModel getTaskByTaskId(Integer taskId);
	public abstract List<EmployeeModel> getEmployeeData();
	public abstract List<TaskModel> getTaskData();
}
