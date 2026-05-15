package backend

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.Claims

import java.security.Key
import javax.crypto.spec.SecretKeySpec

class JWTService {

    private static final String SECRET =
            "budget-manager-secret-key"

    private Key getKey() {

        return new SecretKeySpec(
                SECRET.getBytes(),
                SignatureAlgorithm.HS256.jcaName
        )
    }

    // GENERATE TOKEN
    String generateToken(Users users) {

        return Jwts.builder()
                .setSubject(users.email)
                .claim("userId", users.id.toString())
                .claim("fullname", users.name)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        )
                )
                .signWith(
                        getKey(),
                        SignatureAlgorithm.HS256
                )
                .compact()
    }

    // VALIDATE TOKEN
    Claims validateToken(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
    }
}