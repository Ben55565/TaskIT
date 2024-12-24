package com.taskit.backend.repositories;

import com.taskit.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	
	@Query ("FROM User WHERE email = :value")
	User findByEmail (@Param ("value") String value);
	
	@Query ("FROM User WHERE phone_number = :value")
	User findByPhoneNum (@Param ("value") String value);
	
}
