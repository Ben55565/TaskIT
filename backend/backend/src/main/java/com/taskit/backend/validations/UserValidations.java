package com.taskit.backend.validations;

import com.taskit.backend.service.UserService;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserValidations {
	
	public static boolean isUsernameValid (String userName, UserService userService) {
		return userService.read(userName) != null;
		
	}
	
	public static boolean isEmailValid (String email, UserService userService) {
		Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
		Matcher matcher = pattern.matcher(email);
		return matcher.find() && userService.isUserExistsByEmail(email) == null;
	}
	
	public static boolean isPhoneNumValid (String num, UserService userService) {
		Pattern pattern = Pattern.compile("\\+\\d(\\d{7})");
		Matcher matcher = pattern.matcher(num);
		return matcher.find() && userService.isUserExistsByPhoneNum(num) == null;
	}
	
	// Add password validation for strong password
	
}
