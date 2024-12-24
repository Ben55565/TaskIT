package com.taskit.backend.responses;

import com.taskit.backend.entity.User;

public class ResponseData {
	
	private String result;
	private User user;
	
	public ResponseData () {
	
	}
	
	public ResponseData (String result, User user) {
		this.result = result;
		this.user = user;
	}
	
	public String getResult () {
		return result;
	}
	
	public void setResult (String result) {
		this.result = result;
	}
	
	public User getUser () {
		return user;
	}
	
	public void setUser (User user) {
		this.user = user;
	}
}
