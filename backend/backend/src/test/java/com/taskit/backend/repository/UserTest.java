package com.taskit.backend.repository;

import com.taskit.backend.controllers.UserController;
import com.taskit.backend.entity.User;
import com.taskit.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles ("test")
public class UserTest {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserController userController;
	
	private static Stream<User> correctUserProvider () {
		return Stream.of(
				new User("firstName1", "lastName1", "username1", "email1@gmail1.com", "+9726565481", "password1"),
				new User("firstName2", "lastName2", "username2", "email2@gmail2.com", "+9726565482", "password2"),
				new User("firstName3", "lastName3", "username3", "email3@gmail3.com", "+9726565483", "password3"));
	}
	
	private static Stream<User> incorrectUserProvider () {
		return Stream.of(
				new User("firstName", "lastName", "username", "email1", "+9726565481", "password1"),
				new User("firstName", "lastName", "username", "email2", "+9726565482", "password2"),
				new User("firstName", "lastName", "username", "email3", "+9726565483", "password3"));
	}
	
	@ParameterizedTest
	@MethodSource ("correctUserProvider")
	public void userRepository_SaveUser_ShouldReturnTrue (User user) {
		User savedUser = userService.createOrUpdate(user);
		assertNotNull(savedUser);
		assertNotNull(savedUser.getDateTime());
		assertEquals(user.getFirstName(), savedUser.getFirstName());
		assertEquals(user.getLastName(), savedUser.getLastName());
		assertEquals(user.getUsername(), savedUser.getUsername());
		assertEquals(user.getEmail(), savedUser.getEmail());
		assertEquals(user.getPhone_number(), savedUser.getPhone_number());
		assertEquals(user.getPassword(), savedUser.getPassword());
	}
	
	@ParameterizedTest
	@ValueSource (strings = {"aaa@", "a.", "ben@.com", "aaa.com", "aaa@gmail.com"})
	public void userRepository_SaveUserInvalidEmail_ShouldReturnFalse (String email) {
		assertFalse(userController.isEmailValidAndNotTaken(email));
		
	}
	
	@Test
	public void userRepository_SaveUserInvalidUsernames_ShouldReturnFalse () {
		User user = new User("firstName", "lastName", "username", "email", "+972656548", "password");
		userController.create(user);
		User duplicate = new User("firstName", "lastName", "username", "email", "+972656548", "password");
		assertNotNull(userController.create(duplicate).getBody().get("error"));
		
	}
	
	@ParameterizedTest
	@MethodSource ("correctUserProvider")
	public void userRepository_DeleteUser_returnsPossible (User user) {
		userService.createOrUpdate(user);
		assertNotNull(userService.read(user.getUsername()));
		userController.dropUser(user);
		assertNull(userService.read(user.getUsername()));
	}
}
