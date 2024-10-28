package com.taskit.backend.dao;

import com.taskit.backend.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class UserDAOImpl implements UserDAO {
	
	private final EntityManager entityManager;
	
	@Autowired
	public UserDAOImpl (EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public void create (User user) {
		entityManager.persist(user);
	}
	
	@Override
	@Transactional
	public void update (User user) {
		entityManager.merge(user);
		
	}
	
	@Override
	@Transactional
	public void delete (String username) {
		entityManager.remove(read(username));
	}
	
	@Override
	public User read (String username) {
		return entityManager.find(User.class, username);
	}
	
	@Override
	public List<User> readAll () {
		TypedQuery<User> query = entityManager.createQuery("FROM User", User.class);
		return query.getResultList();
	}
	
	@Override
	public User isUserExistsByUniqueFields (String field, String data) {
		TypedQuery<User> query = entityManager.createQuery("FROM User WHERE " + field + "=:theData", User.class);
		query.setParameter("theData", data);
		User user;
		try {
			user = query.getSingleResult();
			
		}
		catch (NoResultException e) {
			user = null;
		}
		
		return user;
	}
	
}