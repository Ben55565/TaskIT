package com.taskit.backend.validations;

import com.taskit.backend.dao.UserDAO;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserValidations {
	
	public static boolean isUsernameValid(String userName, UserDAO userDAO){
		return userDAO.isUserExistsByUniqueFields("username", userName) != null;
		
	}
	
	public static boolean isEmailValid(String email){
		Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
		Matcher matcher = pattern.matcher(email);
		return matcher.find();
	}
	
	public static boolean isPhoneNumValid(String num){
		Pattern pattern = Pattern.compile("\\+\\d(\\d{7})");
		Matcher matcher = pattern.matcher(num);
		return matcher.find();
	}
	
	// Add password validation for strong password
	
}
