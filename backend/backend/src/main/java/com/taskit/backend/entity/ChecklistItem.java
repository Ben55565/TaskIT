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
	@Column (name = "text")
	private String text;
	@Column (name = "create_time")
	private LocalDateTime dateTime;
	@Column (name = "checked")
	private boolean checked;
	
	public ChecklistItem () {
	}
	
	public ChecklistItem (String text) {
		this.text = text;
		this.checked = false;
	}
	
	public ChecklistItem (String text, int taskId) {
		this.text = text;
		this.taskId = taskId;
		this.checked = false;
	}
	
	public String getText () {
		return text;
	}
	
	public void setText (String text) {
		this.text = text;
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
	
	public boolean isChecked () {
		return checked;
	}
	
	public void setChecked (boolean checked) {
		this.checked = checked;
	}
	
	@Override
	public String toString () {
		return "ChecklistItem{" + "id=" + id + '\'' + ", data='" + text + '\'' + ", dateTime=" + dateTime + '}';
	}
}
