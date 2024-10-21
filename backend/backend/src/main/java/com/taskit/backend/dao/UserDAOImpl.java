package com.taskit.backend.dao;

import com.taskit.backend.entity.User;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserDAOImpl implements UserDAO{
	
	private final EntityManager entityManager;
	@Autowired
	public UserDAOImpl (EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public void save (User user) {
		entityManager.persist(user);
	
	}
	
	@Override
	@Transactional
	public void drop (User user) {
		User deletion = search(user.getUsername());
		if(deletion == null){
			System.out.print(" Cannot delete.");
			return;
		}
		entityManager.remove(deletion);
		System.out.println("User deleted!");
	}
	
	@Override
	public User search (String userName) {
		User subject = entityManager.find(User.class, userName);
		if (subject == null){
			System.out.print("No such user exists!");
		}

		return subject;

	}
}
