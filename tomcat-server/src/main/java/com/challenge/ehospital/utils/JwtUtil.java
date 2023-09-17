// @collapsed
package com.challenge.ehospital.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.challenge.ehospital.user.dtos.UserRoles;
import com.google.gson.Gson;

public class JwtUtil {
    private static String secretKey = "mysecretkeywhichmustnotbelessthan256bitslong";
    private static Algorithm algorithm = Algorithm.HMAC256(secretKey);
    private static JWTVerifier verifier = JWT.require(algorithm).build();

    public static String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || authHeader.isEmpty()) {
            throw new IllegalArgumentException("Authorization header is missing");
        }

        if (!authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header format");
        }

        String jwtToken = authHeader.substring(7); // Remove the "Bearer " prefix
        return jwtToken;
    }

    public static String signJwtToken(String data, UserRoles secondary) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("role", secondary.toString());
        payload.put("email", data);
        payload.put("phone", data);
        payload.put("username", data);
        
        String jwtToken = JWT.create()
            .withPayload(payload)
            .withIssuer(data)
            .withSubject(data)
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + 5000000L))
            .withJWTId("secondary")
            .sign(algorithm);

        return jwtToken;
    }

    public static String signJwtToken(String data, String secondary) {
        String jwtToken = JWT.create()
            .withIssuer(data)
            .withSubject("Baeldung Details")
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + 5000L))
            .withJWTId(secondary)
            .withNotBefore(new Date(System.currentTimeMillis() + 1000L))
            .sign(algorithm);

        return jwtToken;
    }

    public static String signJwtToken(String data) {
        String jwtToken = JWT.create()
            .withIssuer(data)
            .withSubject("Baeldung Details")
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + 5000L))
            .withJWTId("")
            .withNotBefore(new Date(System.currentTimeMillis() + 1000L))
            .sign(algorithm);

        return jwtToken;
    }

    public static String fromJwtTokenGetSecondary(String jwtToken) {
        String data = verifier.verify(jwtToken).getId();
        return data;
    }

    public static String fromJwtTokenGet(String jwtToken) {
        String data = verifier.verify(jwtToken).getIssuer();
        return data;
    }
}
