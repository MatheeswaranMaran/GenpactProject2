package com.maddy.ett.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maddy.ett.model.EmployeeModel;
import com.maddy.ett.model.TaskModel;
import com.maddy.ett.repository.EmployeeRepository;
import com.maddy.ett.repository.TaskRepository;

@Service
public class EmployeeServiceImplementation implements EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Override
	public EmployeeModel addEmployee(EmployeeModel employee) {
		String eid = isRandom();
		String pwd = eid;
		employee.setEid(eid);
		employee.setPwd(pwd);
		return employeeRepository.save(employee);
	}

	@Override
	public TaskModel addTask(TaskModel task) {
	    return taskRepository.save(task);
	}

	@Override
	public List<EmployeeModel> authenticate(String eid, String pwd) {
		// TODO Auto-generated method stub
		List<EmployeeModel> e = employeeRepository.findByEidAndPwd(eid,pwd);
		return e;
	}

	@Override
	public String deleteTask(Integer id) {
		// TODO Auto-generated method stub
		taskRepository.deleteById(id);
		return "deleted";
	}

	@Override
	public String updateTask(Integer id, TaskModel task) {
		// TODO Auto-generated method stub
		Optional<TaskModel> t = taskRepository.findById(id);
		if(t.isPresent()) {
			TaskModel tm = t.get();
			tm.setDate(task.getDate());
			tm.setDescription(task.getDescription());
			tm.setMyAssociate(task.getMyAssociate());
			tm.setStart(task.getStart());
			tm.setEnd(task.getEnd());
			tm.setPname(task.getPname());
			tm.setTaskCategory(task.getTaskCategory());
			taskRepository.save(tm);
			return "updated";
		}
		return "2";
	}

	@Override
	public List<TaskModel> findbyEid(String eid) {
		// TODO Auto-generated method stub
		return taskRepository.findByEid(eid);
	}

	private String isRandom() {
		Random r = new Random();
		return String.format("%04d", r.nextInt(10000));
    }

	@Override
	public String updateEmployee(Integer id, EmployeeModel employee) {
		Optional<EmployeeModel> e = employeeRepository.findById(id);
		if(e.isPresent()) {
			EmployeeModel em = e.get();
			em.setName(employee.getName());
			em.setRole(employee.getRole());
			employeeRepository.save(em);
			return "updated employee";
		}
		return "update";
	}

	@Override
	public String updateEmp(String eid, EmployeeModel employee) {
		EmployeeModel e = employeeRepository.findByEid(eid);
		if(e!=null) {
			e.setName(employee.getName());
			e.setRole(employee.getRole());
			employeeRepository.save(e);
			return "Updated employee";
		}
		return "updated";
	}

	@Override
	public EmployeeModel getEmployeeByEid(String eid) {
		// TODO Auto-generated method stub
		return employeeRepository.findByEid(eid);
	}

	@Override
	public TaskModel getTaskByTaskId(Integer taskId) {
		// TODO Auto-generated method stub
		Optional<TaskModel> t = taskRepository.findById(taskId);
		if(t.isPresent()) {
			t.get();
		}
		return t.get();
	}

	@Override
	public List<EmployeeModel> getEmployeeData() {
		// TODO Auto-generated method stub
		return employeeRepository.findAll();
	}

	@Override
	public List<TaskModel> getTaskData() {
		// TODO Auto-generated method stub
		return taskRepository.findAll();
	}

}
