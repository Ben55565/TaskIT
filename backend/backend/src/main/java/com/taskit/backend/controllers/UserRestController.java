package com.taskit.backend.controllers;

import com.taskit.backend.dao.UserDAO;
import com.taskit.backend.entity.User;
import com.taskit.backend.responses.ResponseData;
import com.taskit.backend.validations.UserValidations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping ("/api")
public class UserRestController {
	
	final private UserDAO userDAO;
	
	public UserRestController (UserDAO userDAO) {
		this.userDAO = userDAO;
		
	}
	
	@PostMapping ("/users")
	public ResponseEntity<String> create (@RequestBody User user) {
		user.setDateTime();
		if (UserValidations.isUsernameValid(user.getUsername(), userDAO)) {
			System.out.println("User already exists. Failed to create new user.");
			return ResponseEntity.badRequest().body("User already exists. Failed to create new user.");
		}
		else if (!UserValidations.isPhoneNumValid(user.getPhone_number())) {
			return ResponseEntity.badRequest().body("Phone number invalid. Failed to create new user.");
		}
		else {
			userDAO.create(user);
			System.out.println("User created!");
			return ResponseEntity.ok("User saved at backend, details:\n" + user);
		}
		
	}
	
	@GetMapping ("/users/{userName}")
	public ResponseData getUser (@PathVariable String userName, @RequestParam String password) {
		// NOTE TO SELF: NEED TO MAKE IT CASE SENSITIVE
		User user = userDAO.read(userName);
		if (user == null){
			return new ResponseData("No such user exists. Please register.", null);
		}
		else{
			if (Objects.equals(user.getPassword(), password)){
				return new ResponseData("Signed in successfully!", user);
			}
		}
		return new ResponseData("Incorrect password.", null);
	}
	
	@GetMapping ("/users")
	public StringBuilder getAll () {
		StringBuilder response = new StringBuilder();
		List<User> allUsers = userDAO.readAll();
		if (allUsers.isEmpty()) {
			response.append("No users currently in the database");
		}
		for (User user : allUsers) {
			response.append(user).append("\n");
		}
		
		return response;
	}
	
	@PutMapping("/users")
	private void updateUser (User user, String field, String newValue) {
		switch (field) {
			case "lastname" -> {
				user.setLastName(newValue);
				System.out.println("Last name updated to " + newValue);
			}
			case "firstname" -> {
				user.setFirstName(newValue);
				System.out.println("First name updated to " + newValue);
			}
			case "username" -> {
				if (UserValidations.isUsernameValid(newValue, userDAO)) {
					System.out.println("Username already taken.");
					return;
				}
				user.setUsername(newValue);
				System.out.println("Username updated to " + newValue);
			}
			case "password" -> {
				user.setPassword(newValue);
				System.out.println("Password updated to " + newValue);
			}
			case null, default -> System.out.println("No field to update.");
		}
		userDAO.update(user);
		System.out.println("updated student:\n" + userDAO.read(user.getUsername()));
		
	}
	
	// not set up yet
	private void dropUser (User user) {
		if (UserValidations.isUsernameValid(user.getUsername(), userDAO)) {
			System.out.println("Deleting User...");
			userDAO.delete(user.getUsername());
		}
		else {
			System.out.println("No such user exists, failed to delete.");
		}
	}
	
}
