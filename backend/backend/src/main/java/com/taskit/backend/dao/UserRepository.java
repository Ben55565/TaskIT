package com.taskit.backend.dao;

import com.taskit.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String> {
	
	@Query ("FROM User WHERE email = :value")
	User findByEmail(@Param("value") String value);
	
	
	@Query ("FROM User WHERE phone_number = :value")
	User findByPhoneNum(@Param("value") String value);


}
