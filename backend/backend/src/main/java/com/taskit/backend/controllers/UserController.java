package com.taskit.backend.controllers;

import com.taskit.backend.dao.UserDAO;
import com.taskit.backend.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
public class UserController {
	
	@PostMapping("/create")
	public ResponseEntity<String> createUser(@RequestBody User user){
		user.setDateTime();
		System.out.println(user);
		
		return ResponseEntity.ok("User saved at backend, details:\n" + user);
	}
	
	@GetMapping("/get")
	public String getUser(){
		return "hello from backend";
	}

	private void dropUser (UserDAO userDAO) {
		
		System.out.println("Deleting a user...");
		User user = new User("ben", "daniels", "ben555655", "ben55565@gmail.com", "0526688020", "naninani");
		
		
		System.out.println("Deleting User...");
		userDAO.drop(user);
		
	}
	
	private void searchUser (UserDAO userDAO) {
		
		System.out.println("searching a user...");
		User user = new User("ben", "daniels", "ben555655", "ben55565@gmail.com", "0526688020", "naninani");
		userDAO.search(user.getUsername());
		
	}
	
}
