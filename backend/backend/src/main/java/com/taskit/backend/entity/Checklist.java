package com.taskit.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table (name = "\"checklist\"")
public class Checklist {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column (name = "id")
	private int id;
	@Column (name = "title")
	private String title;
	@Column (name = "create_time")
	private LocalDateTime dateTime;
	@Column (name = "username")
	private String username;
	
	public Checklist () {
	
	}
	
	public Checklist (String title) {
		this.title = title;
		this.dateTime = LocalDateTime.now();
	}
	
	public Checklist (int id, String title) {
		this.title = title;
		this.dateTime = LocalDateTime.now();
	}
	
	public Checklist (int id, String title, String username) {
		this.title = title;
		this.dateTime = LocalDateTime.now();
		this.username = username;
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
	
	public LocalDateTime getDateTime () {
		return dateTime;
	}
	
	public void setDateTime (LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}
	
	public String getUsername () {
		return username;
	}
	
	public void setUsername (String username) {
		this.username = username;
	}
	
	@Override
	public String toString () {
		return "Checklist{" + "id=" + id + ", title='" + title + '\'' + ", dateTime=" + dateTime + ", username='" + username + '\'' + '}';
	}
}
