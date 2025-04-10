package com.taskit.backend.configurations;

import com.taskit.backend.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
public class SecurityConfig {
	
	private final JwtFilter jwtFilter;
	
	public SecurityConfig (JwtFilter jwtFilter) {
		this.jwtFilter = jwtFilter;
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(request -> {
					var config = new org.springframework.web.cors.CorsConfiguration();
					config.addAllowedOrigin("http://localhost:3000");
					config.setAllowedMethods(List.of("GET", "POST"));
					config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Access-Control-Allow-Origin"));
					config.setAllowCredentials(true);
					return config;
				})).csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for testing (enable in production)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/users/**").authenticated()
						.requestMatchers("/api/auth/login", "/api/auth/validate-token").permitAll())
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
	
}
