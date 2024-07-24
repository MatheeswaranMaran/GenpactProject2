package com.maddy.ett.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.maddy.ett.model.TaskModel;

public interface TaskRepository extends JpaRepository<TaskModel, Integer>{
	List<TaskModel> findByEid(String eid);
	List<TaskModel> findByEidAndDate(String eid, String date);
}
