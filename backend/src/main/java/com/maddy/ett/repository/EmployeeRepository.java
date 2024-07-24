package com.maddy.ett.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maddy.ett.model.EmployeeModel;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Integer> {
	List<EmployeeModel> findByEidAndPwd(String eid, String pwd);
	EmployeeModel findByEid(String eid);
}
