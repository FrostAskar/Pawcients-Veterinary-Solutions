package com.esliceu.pawcients.Services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.esliceu.pawcients.Models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {

    @Value("${token.secret}")
    String tokenSecret;

    @Value("${token.expire}")
    long tokenExpire;

    public String createToken(User user) {
        Map<String, Object> payload = createPayloadForToken(user);
        String t = JWT.create()
                .withPayload(payload)
                .withExpiresAt(new Date(System.currentTimeMillis() + tokenExpire))
                .sign(Algorithm.HMAC512(tokenSecret.getBytes()));
        return t;
    }

    private Map<String, Object> createPayloadForToken(User user) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", user.getName());
        payload.put("surname", user.getSurname());
        payload.put("email", user.getEmail());
        payload.put("profilePicture", user.getProfilePicture());
        payload.put("id", user.getId());
        payload.put("type", user.getType());
        payload.put("iat", new Date(System.currentTimeMillis()));
        return payload;
    }

    public String getUser(String token) {
        String user = JWT.require(Algorithm.HMAC512(tokenSecret.getBytes()))
                .build()
                .verify(token)
                .getClaim("id")
                .asString();
        return user;
    }

}
