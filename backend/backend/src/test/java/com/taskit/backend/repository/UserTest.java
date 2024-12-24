package com.taskit.backend.repository;

import com.taskit.backend.controllers.UserRestController;
import com.taskit.backend.entity.User;
import com.taskit.backend.service.UserService;
import com.taskit.backend.validations.UserValidations;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles ("test")
public class UserTest {
	
	@Autowired
	private UserService userService;
	
	@MockBean
	private UserRestController controller;
	
	@Autowired
	private MockMvc mockMvc;
	
	private static Stream<User> correctUserProvider () {
		return Stream.of(new User("firstName1", "lastName1", "username1", "email1", "+9726565481", "password1"), new User("firstName2", "lastName2", "username2", "email2", "+9726565482", "password2"), new User("firstName3", "lastName3", "username3", "email3", "+9726565483", "password3"));
	}
	
	private static Stream<User> incorrectUserProvider () {
		return Stream.of(new User("firstName", "lastName", "username", "email1", "+9726565481", "password1"), new User("firstName", "lastName", "username", "email2", "+9726565482", "password2"), new User("firstName", "lastName", "username", "email3", "+9726565483", "password3"));
	}
	
	@Transactional
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
	
	@Transactional
	@ParameterizedTest
	@ValueSource (strings = {"aaa@", "a.", "ben@.com", "aaa.com"})
	public void userRepository_SaveUserInvalidEmail_ShouldReturnFalse (String email) {
		assertFalse(UserValidations.isEmailValid(email, userService));
	}
	
	@Test
	@Transactional
	public void userRepository_SaveUserInvalidUsernames_ShouldReturnFalse () {
		User user1 = new User("firstName", "lastName", "username", "email", "+972656548", "password");
		userService.createOrUpdate(user1);
		
		User newUser = new User("firstName", "lastName", "username", "email", "+972656548", "password");
		
	}
	
	@ParameterizedTest
	@MethodSource ("correctUserProvider")
	public void userRepository_DeleteUser_returnsPossible (User user) {
		User savedUser = userService.createOrUpdate(user);
		userService.delete(savedUser.getUsername());
		assertNull(userService.read(savedUser.getUsername()));
	}
}
