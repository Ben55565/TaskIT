package com.taskit.backend.dao;

import com.taskit.backend.entity.User;

import java.util.List;

public interface UserDAO {
	
	// Create, Read, Update, Delete = CRUD
	void create (User user);
	
	void update(User user);
	
	void delete (String username);
	
	User read (String username);
	
	List<User> readAll ();
	
	User isUserExistsByUniqueFields(String field, String data);
	
	
}
