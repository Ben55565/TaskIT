package com.taskit.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table (name = "\"checklist\"")
public class Checklist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name = "id")
	private int id;
	@Column (name = "title")
	private String title;
	@Column (name = "content")
	private String content;
	@Column (name = "create_time")
	private LocalDateTime dateTime;
	
	public Checklist () {
	
	}
	
	public Checklist (String title) {
		this.title = title;
		this.dateTime = LocalDateTime.now();
	}
	
	public Checklist (int id, String title, String content) {
		this.title = title;
		this.content = content;
		this.dateTime = LocalDateTime.now();
	}
	
	public int getId () {
		return id;
	}
	
	public void setId (int id) {
		this.id = id;
	}
	
	public String getTitle () {
		return title;
	}
	
	public void setTitle (String title) {
		this.title = title;
	}
	
	public String getContent () {
		return content;
	}
	
	public void setContent (String content) {
		this.content = content;
	}
	
	public LocalDateTime getDateTime () {
		return dateTime;
	}
	
	public void setDateTime (LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}
	
	@Override
	public String toString () {
		return "Checklist{" + "id=" + id + ", title='" + title + '\'' + ", content=" + content + ", dateTime=" + dateTime + '}';
	}
}
