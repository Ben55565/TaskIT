package com.taskit.backend.responses;

import com.taskit.backend.entity.ChecklistItem;

public class updateTaskResponse {
	
	private int checklistId;
	private ChecklistItem task;
	
	public updateTaskResponse () {
	}
	
	public updateTaskResponse (int checklistId, ChecklistItem task) {
		this.checklistId = checklistId;
		this.task = task;
	}
	
	public int getChecklistId () {
		return checklistId;
	}
	
	public void setChecklistId (int checklistId) {
		this.checklistId = checklistId;
	}
	
	public ChecklistItem getTask () {
		return task;
	}
	
	public void setTask (ChecklistItem task) {
		this.task = task;
	}
	
	@Override
	public String toString () {
		return "updateTaskResponse{" + "checklistId=" + checklistId + ", item=" + task + '}';
	}
}
