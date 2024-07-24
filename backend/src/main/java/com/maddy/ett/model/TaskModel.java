package com.maddy.ett.model;

import jakarta.persistence.*;

@Entity
public class TaskModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String eid;
	private String ename;
	private String role;
	private String pname;
	private String date;
	private String start;
	private String end;
	private String taskCategory;
	private String description;
	private String myAssociate;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEid() {
		return eid;
	}
	public void setEid(String eid) {
		this.eid = eid;
	}
	public String getEname() {
		return ename;
	}
	public void setEname(String ename) {
		this.ename = ename;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public String getTaskCategory() {
		return taskCategory;
	}
	public void setTaskCategory(String taskCategory) {
		this.taskCategory = taskCategory;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getMyAssociate() {
		return myAssociate;
	}
	public void setMyAssociate(String myAssociate) {
		this.myAssociate = myAssociate;
	}
}
