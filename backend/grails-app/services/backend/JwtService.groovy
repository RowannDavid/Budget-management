package backend

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import com.auth0.jwt.exceptions.JWTVerificationException
import grails.core.GrailsApplication

class JwtService {

    GrailsApplication grailsApplication

    private String getSecret() {
        return grailsApplication.config.getProperty('jwt.secret', String, 'super_secret_key_change_me_in_prod')
    }

    String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(getSecret())
        
        // Token expires in 24 hours
        Date expiry = new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24))

        String token = JWT.create()
                .withIssuer("budget-manager")
                .withSubject(user.email)
                .withClaim("userId", user.id as Long)
                .withClaim("role", user.role)
                .withExpiresAt(expiry)
                .sign(algorithm)
                
        return token
    }

    DecodedJWT verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(getSecret())
            return JWT.require(algorithm)
                    .withIssuer("budget-manager")
                    .build()
                    .verify(token)
        } catch (JWTVerificationException exception) {
            // Invalid signature/claims
            return null
        }
    }
}
