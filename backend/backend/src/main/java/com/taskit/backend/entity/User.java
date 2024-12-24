package com.taskit.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@SuppressWarnings ("ALL")
@Entity
@Table (name = "\"user\"")
public class User {
	
	@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name = "username")
	private String username;
	@Column (name = "email")
	private String email;
	@Column (name = "password")
	private String password;
	@Column (name = "create_time")
	private LocalDateTime dateTime;
	@Column (name = "phone_number")
	private String phone_number;
	@Column (name = "fname")
	private String firstName;
	@Column (name = "lname")
	private String lastName;
	
	public User () {
	
	}
	
	public User (String firstName, String lastName, String username, String email, String phone_number, String password) {
		
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.phone_number = phone_number;
		this.password = password;
		this.dateTime = LocalDateTime.now();
	}
	
	public String getUsername () {
		return username;
	}
	
	public void setUsername (String username) {
		this.username = username;
	}
	
	public String getEmail () {
		return email;
	}
	
	public void setEmail (String email) {
		this.email = email;
	}
	
	public String getPassword () {
		return password;
	}
	
	public void setPassword (String password) {
		this.password = password;
	}
	
	public LocalDateTime getDateTime () {
		return dateTime;
	}
	
	public void setDateTime () {
		this.dateTime = LocalDateTime.now();
	}
	
	public String getPhone_number () {
		return phone_number;
	}
	
	public void setPhone_number (String phone_number) {
		this.phone_number = phone_number;
	}
	
	public String getFirstName () {
		return firstName;
	}
	
	public void setFirstName (String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName () {
		return lastName;
	}
	
	public void setLastName (String lastName) {
		this.lastName = lastName;
	}
	
	@Override
	public String toString () {
		return "User{" + "username='" + username + '\'' + ", email='" + email + '\'' + ", password='" + password + '\'' + ", dateTime=" + dateTime + ", phone_number='" + phone_number + '\'' + ", firstName='" + firstName + '\'' + ", lastName='" + lastName + '\'' + '}';
	}
}
