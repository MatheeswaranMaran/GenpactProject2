package com.maddy.ett.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maddy.ett.model.EmployeeModel;
import com.maddy.ett.model.TaskModel;
import com.maddy.ett.service.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("/emp")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/add")
	public String addEmployee(@RequestBody EmployeeModel employee) {
		employeeService.addEmployee(employee);
		return "data added";
	}
	
	@PostMapping("/task")
	public String addTask(@RequestBody TaskModel task) {
	    employeeService.addTask(task);
	    return "task added";
	    
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody EmployeeModel user){
		List<EmployeeModel> isAuth = employeeService.authenticate(user.getEid(),user.getPwd());
		if(!isAuth.isEmpty()) {
			String role = isAuth.get(0).getRole();
			return ResponseEntity.ok(role);
		}
		else {
			return ResponseEntity.ok("invalid");
		}
	}
	
	@GetMapping("/task/{id}")
	public List<TaskModel> getTaskById(@PathVariable("id") String eid){
		return employeeService.findbyEid(eid);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteTask(@PathVariable("id") Integer id) {
		return employeeService.deleteTask(id);
	}
	
	@PutMapping("/updatetask/{id}")
	public String updateTask(@PathVariable("id") Integer id, @RequestBody TaskModel task) {
		return employeeService.updateTask(id, task);
	}
	
	@PutMapping("/updateemp/{id}")
	public String updateEmployee(@PathVariable("id") Integer id, @RequestBody EmployeeModel employee) {
		return employeeService.updateEmployee(id, employee);
	}
	
	@PutMapping("/update/{id}")
	public String updateEmp(@PathVariable("id") String eid, @RequestBody EmployeeModel employee) {
		return employeeService.updateEmp(eid, employee);
	}
	
	 @GetMapping("/employee/{eid}")
	    public ResponseEntity<EmployeeModel> getEmployeeByEid(@PathVariable("eid") String eid) {
	        EmployeeModel employee = employeeService.getEmployeeByEid(eid);
	        if (employee != null) {
	            return ResponseEntity.ok(employee);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	    }
	 
	 @GetMapping("/taskById/{taskId}")
	 public ResponseEntity<TaskModel> getTaskByTaskId(@PathVariable("taskId") Integer taskId) {
	     TaskModel task = employeeService.getTaskByTaskId(taskId);
	     if (task != null) {
	         return ResponseEntity.ok(task);
	     } else {
	         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	     }
	 }
	 
	 @GetMapping("/getdata")
		public List<EmployeeModel> getEmployees(){
			return employeeService.getEmployeeData();
		}
		
		@GetMapping("/gettasks")
		public List<TaskModel> getTasks(){
			return employeeService.getTaskData();
		}

}
