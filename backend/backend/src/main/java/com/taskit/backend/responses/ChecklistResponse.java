package com.taskit.backend.responses;

import com.taskit.backend.entity.Checklist;
import com.taskit.backend.entity.ChecklistItem;

import java.util.List;

public class ChecklistResponse {
	
	private Checklist checklist;
	private List<ChecklistItem> tasks;
	
	public ChecklistResponse (Checklist checklist, List<ChecklistItem> tasks) {
		this.checklist = checklist;
		this.tasks = tasks;
	}
	
	public Checklist getChecklist () {
		return checklist;
	}
	
	public void setChecklist (Checklist checklist) {
		this.checklist = checklist;
	}
	
	public List<ChecklistItem> getTasks () {
		return tasks;
	}
	
	public void setTasks (List<ChecklistItem> tasks) {
		this.tasks = tasks;
	}
	
	@Override
	public String toString () {
		return "ChecklistResponse{" + "checklist=" + checklist + ", tasks=" + tasks + '}';
	}
}
