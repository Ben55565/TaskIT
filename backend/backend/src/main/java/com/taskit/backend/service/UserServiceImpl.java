package com.taskit.backend.service;

import com.taskit.backend.entity.User;
import com.taskit.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	
	@Autowired
	public UserServiceImpl (UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public User createOrUpdate (User user) {
		return userRepository.save(user);
	}
	
	@Override
	public void delete (String username) {
		userRepository.deleteById(username);
	}
	
	@Override
	public User read (String username) {
		return userRepository.findById(username).orElse(null);
	}
	
	@Override
	public List<User> readAll () {
		return userRepository.findAll();
	}
	
	@Override
	public User isUserExistsByEmail (String data) {
		return userRepository.findByEmail(data);
	}
	
	public User isUserExistsByPhoneNum (String data) {
		return userRepository.findByPhoneNum(data);
	}
	
	
}
