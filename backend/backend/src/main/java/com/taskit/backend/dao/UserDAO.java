package com.taskit.backend.dao;

import com.taskit.backend.entity.User;

public interface UserDAO {
	
	void save (User user);
	
	void drop (User user);
	
	User search (String userName);
}
