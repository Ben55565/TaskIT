package com.taskit.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {
	
	@Value ("${jwt.secret.key}")
	private String secretKey;
	
	@Value ("${jwt.expiration.time}")
	private long expirationTime;
	
	public String generateToken (String username) {
		SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
		return Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + expirationTime)).signWith(key, SignatureAlgorithm.HS256).compact();
	}
	
	public boolean validateToken (String token) {
		try {
			String extractedUsername = extractUsername(token);
			return extractedUsername != null && ! isTokenExpired(token);
		}
		catch (ExpiredJwtException e) {
			return false;
		}
	}
	
	public String extractUsername (String token) {
		Claims claims = getClaims(token);
		if (claims == null) {
			return null;
		}
		return claims.getSubject();
	}
	
	private boolean isTokenExpired (String token) {
		Claims claims = getClaims(token);
		if (claims == null) {
			return true;
		}
		return claims.getExpiration().before(new Date());
	}
	
	private Claims getClaims (String token) {
		try {
			return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey))).build().parseClaimsJws(token).getBody();
		}
		catch (ExpiredJwtException e) {
			return null;
		}
	}
	
	public String getTokenRemainingTime (String token) {
		Claims claims = getClaims(token);
		if (claims == null) {
			return "";
		}
		Date expirationDate = claims.getExpiration();
		long remainingMillis = expirationDate.getTime() - System.currentTimeMillis();
		
		long min = TimeUnit.MILLISECONDS.toMinutes(remainingMillis);
		long sec = TimeUnit.MILLISECONDS.toSeconds(remainingMillis) % 60;
		
		return min + " Minutes, " + sec + " Seconds - To token expiration";
	}
}
