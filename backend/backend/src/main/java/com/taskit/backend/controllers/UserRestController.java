package com.taskit.backend.controllers;

import com.taskit.backend.entity.User;
import com.taskit.backend.responses.ResponseData;
import com.taskit.backend.service.UserService;
import com.taskit.backend.validations.UserValidations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping ("/api")
public class UserRestController {
	
	final private UserService userService;
	
	public UserRestController (UserService userService) {
		this.userService = userService;
		
	}
	
	@PostMapping ("/users")
	public ResponseEntity<Map> create (@RequestBody User user) {
		
		if (userService.read(user.getUsername()) != null) {
			return ResponseEntity.badRequest().body(Map.of("error", "usernameError"));
		}
		else if (! UserValidations.isPhoneNumValid(user.getPhone_number(), userService)) {
			return ResponseEntity.badRequest().body(Map.of("error", "phonenumError"));
		}
		else if (! UserValidations.isEmailValid(user.getEmail(), userService)) {
			return ResponseEntity.badRequest().body(Map.of("error", "emailError"));
		}
		else {
			user.setDateTime();
			User savedUser = userService.createOrUpdate(user);
			return ResponseEntity.ok().body(Map.of("success", "User created successfully", "username", savedUser.getUsername(), "timestamp", savedUser.getDateTime()));
		}
		
	}
	
	@GetMapping ("/users/{userName}")
	public ResponseData getUser (@PathVariable String userName, @RequestParam String password) {
		// NOTE TO SELF: NEED TO MAKE IT CASE SENSITIVE
		User user = userService.read(userName);
		if (user == null) {
			return new ResponseData("No such user exists. Please register.", null);
		}
		else {
			if (Objects.equals(user.getPassword(), password)) {
				return new ResponseData("Signed in successfully!", user);
			}
		}
		return new ResponseData("Incorrect password.", null);
	}
	
	@GetMapping ("/users")
	public ResponseEntity<List<User>> getAll () {
		List<User> allUsers = userService.readAll();
		if (allUsers.isEmpty()) {
			return ResponseEntity.ok(Collections.emptyList());
		}
		
		return ResponseEntity.ok(allUsers);
	}
	
	@PutMapping ("/users/{userName}")
	private void updateUser (@PathVariable String userName, @RequestBody User user, @RequestParam String field, @RequestParam String newValue) {
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
				if (UserValidations.isUsernameValid(newValue, userService)) {
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
		userService.createOrUpdate(user);
		System.out.println("updated student:\n" + userService.read(user.getUsername()));
		
	}
	
	@DeleteMapping ("/users/{userName}")
	private void dropUser (User user) {
		if (userService.read(user.getUsername()) != null) {
			System.out.println("Deleting User...");
			userService.delete(user.getUsername());
		}
		else {
			System.out.println("No such user exists, failed to delete.");
		}
	}
	
}
