package com.taskit.backend.service;

import com.taskit.backend.entity.ChecklistItem;

import java.util.List;

public interface ChecklistItemService {
	
	ChecklistItem createOrUpdate (ChecklistItem checklist);
	
	void delete (int id);
	
	ChecklistItem read (int id);
	
	List<ChecklistItem> readAll ();
}
