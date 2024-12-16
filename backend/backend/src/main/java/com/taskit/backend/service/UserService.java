package com.taskit.backend.service;

import com.taskit.backend.entity.User;
import java.util.List;

public interface UserService {
	
	void createOrUpdate (User user);
	
	void delete (String username);
	
	User read (String username);
	
	List<User> readAll ();
	
	User isUserExistsByEmail (String data);
	
	User isUserExistsByPhoneNum (String data);
	
}
