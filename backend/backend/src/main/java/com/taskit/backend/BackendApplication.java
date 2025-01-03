package com.taskit.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

// should be false on production level (due to security reasons, it's logging a password in the console)
// in the parentheses: SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@SpringBootApplication ()
public class BackendApplication {
	
	public static void main (String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner commandLineRunner () {
		return runner -> System.out.println("Running backend");
	}
	
}
