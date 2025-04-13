package com.taskit.backend.controllers;

import com.taskit.backend.entity.User;
import com.taskit.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping ("/api")
public class UserRestController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@PostMapping ("/users")
	public ResponseEntity<Map> create (@RequestBody User user) {
		
		if (userService.read(user.getUsername()) != null) {
			return ResponseEntity.badRequest().body(Map.of("error", "usernameError"));
		}
		else if (isPhoneNumValidAndNotTaken(user.getPhone_number())) {
			return ResponseEntity.badRequest().body(Map.of("error", "phonenumError"));
		}
		else if (isEmailValidAndNotTaken(user.getEmail())) {
			return ResponseEntity.badRequest().body(Map.of("error", "emailError"));
		}
		else {
			user.setDateTime();
			String rawPassword = user.getPassword();
			String hashedPassword = passwordEncoder.encode(rawPassword);
			user.setPassword(hashedPassword);
			User savedUser = userService.createOrUpdate(user);
			return ResponseEntity.ok().body(Map.of("success", "User created successfully", "username", savedUser.getUsername(), "timestamp", savedUser.getDateTime(), "user", savedUser));
		}
		
	}
	
	public boolean isPhoneNumValidAndNotTaken (String num) {
		return ! (isPhoneNumValid(num) && userService.isUserExistsByPhoneNum(num) == null);
	}
	
	public boolean isEmailValidAndNotTaken (String email) {
		return ! isEmailValid(email) && userService.isUserExistsByEmail(email) != null;
	}
	
	public static boolean isPhoneNumValid (String num) {
		Pattern pattern = Pattern.compile("\\+\\d(\\d{7})");
		Matcher matcher = pattern.matcher(num);
		return matcher.find();
	}
	
	public static boolean isEmailValid (String email) {
		Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
		Matcher matcher = pattern.matcher(email);
		return matcher.find();
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
				if (userService.read(newValue) != null) {
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
		System.out.println("updated User:\n" + userService.read(user.getUsername()));
		
	}
	
	@DeleteMapping ("/users/{userName}")
	public void dropUser (User user) {
		if (userService.read(user.getUsername()) != null) {
			System.out.println("Deleting User...");
			userService.delete(user.getUsername());
		}
		else {
			System.out.println("No such user exists, failed to delete.");
		}
	}
	
}
