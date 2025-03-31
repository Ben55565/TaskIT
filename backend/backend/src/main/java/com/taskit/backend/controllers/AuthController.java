package com.taskit.backend.controllers;

import com.taskit.backend.entity.User;
import com.taskit.backend.requests.LoginRequest;
import com.taskit.backend.responses.ResponseData;
import com.taskit.backend.security.JwtUtil;
import com.taskit.backend.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping ("/api/auth")
public class AuthController {
	
	private final UserService userService;
	private final JwtUtil jwtUtil;
	
	public AuthController (UserService userService, JwtUtil jwtUtil) {
		this.userService = userService;
		this.jwtUtil = jwtUtil;
	}
	
	@PostMapping ("/login")
	public ResponseData login (@RequestBody LoginRequest loginRequest) {
		User user = userService.read(loginRequest.getUsername());
		
		if (user == null) {
			return new ResponseData("No such user exists. Please register.", null, null);
		}
		else {
			if (Objects.equals(user.getPassword(), loginRequest.getPassword())) {
				return new ResponseData("Signed in successfully!", user, jwtUtil.generateToken(user.getUsername()));
			}
		}
		return new ResponseData("Incorrect password.", null, null);
	}
	
	@GetMapping("/validate-token")
	public ResponseEntity<Map<String, Object>> validateToken(@RequestHeader("Authorization") String authHeader) {
		Map<String, Object> response = new HashMap<>();
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			response.put("valid", false);
			return ResponseEntity.ok(response);
		}
		
		String token = authHeader.substring(7);
		
		boolean isValid = jwtUtil.validateToken(token);
		if (isValid) {
			User user = userService.read(jwtUtil.extractUsername(token));
			response.put("user", user);
			response.put("expiration", jwtUtil.getTokenRemainingTime(token));
		}
		else {
			response.put("expired", true);
			response.put("message", "Token has expired. Please log in again.");
		}
		response.put("valid", isValid);
		
		return ResponseEntity.ok(response);
	}
	
}
