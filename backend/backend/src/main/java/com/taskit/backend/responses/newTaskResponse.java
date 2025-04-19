package com.taskit.backend.responses;

import com.taskit.backend.entity.ChecklistItem;

public class newTaskResponse {
	
	private int checklistId;
	private String newTask;
	
	public newTaskResponse () {
	
	}
	
	public newTaskResponse (int checklistId, String newTask) {
		this.checklistId = checklistId;
		this.newTask = newTask;
	}
	
	public String getNewTask () {
		return newTask;
	}
	
	public void setNewTask (String newTask) {
		this.newTask = newTask;
	}
	
	public int getChecklistId () {
		return checklistId;
	}
	
	public void setChecklistId (int checklistId) {
		this.checklistId = checklistId;
	}
	
	@Override
	public String toString () {
		return "newTaskResponse{" + "checklistId=" + checklistId + ", newTask='" + newTask + '\'' + '}';
	}
}
