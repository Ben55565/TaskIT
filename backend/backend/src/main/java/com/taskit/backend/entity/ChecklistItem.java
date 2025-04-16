package com.taskit.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table (name = "\"checklist_item\"")
public class ChecklistItem {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column (name = "id")
	private int id;
	@Column (name = "task_id")
	private int taskId;
	@Column (name = "data")
	private String data;
	@Column (name = "create_time")
	private LocalDateTime dateTime;
	
	public ChecklistItem () {
	}
	
	public ChecklistItem (String data) {
		this.data = data;
	}
	
	public ChecklistItem (String data, int taskId) {
		this.data = data;
		this.taskId = taskId;
	}
	
	public String getData () {
		return data;
	}
	
	public void setData (String data) {
		this.data = data;
	}
	
	public int getId () {
		return id;
	}
	
	public LocalDateTime getDateTime () {
		return dateTime;
	}
	
	public void setDateTime (LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}
	
	public int getTaskId () {
		return taskId;
	}
	
	public void setTaskId (int taskId) {
		this.taskId = taskId;
	}
	
	@Override
	public String toString () {
		return "ChecklistItem{" + "id=" + id + '\'' + ", data='" + data + '\'' + ", dateTime=" + dateTime + '}';
	}
}
