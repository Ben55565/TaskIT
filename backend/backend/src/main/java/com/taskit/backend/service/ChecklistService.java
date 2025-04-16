package com.taskit.backend.service;

import com.taskit.backend.entity.Checklist;

import java.util.List;

public interface ChecklistService {
	
	Checklist createOrUpdate (Checklist checklist);
	
	void delete (int id);
	
	Checklist read (int id);
	
	List<Checklist> readAll ();
	
}
