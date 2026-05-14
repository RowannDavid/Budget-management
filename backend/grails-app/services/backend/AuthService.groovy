package backend

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import grails.gorm.transactions.Transactional

@Transactional
class AuthService {

    JwtService jwtService
    def passwordEncoder = new BCryptPasswordEncoder()

    Map register(String fullname, String email, String password, String currency) {
        if (User.findByEmail(email)) {
            return [success: false, message: "Email already exists"]
        }

        def user = new User(
            fullname: fullname,
            email: email,
            password: passwordEncoder.encode(password),
            currency: currency ?: "XOF",
            role: "USER"
        )

        return User.withTransaction { status ->
            if (!user.save(flush: true)) {
                status.setRollbackOnly()
                return [success: false, message: "Failed to create user", errors: user.errors.allErrors]
            }

            return [
                success: true,
                message: "User registered successfully",
                user: [
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role
                ]
            ]
        }
    }

    Map login(String email, String password) {
        def user = User.findByEmail(email)
        
        if (!user) {
            return [success: false, message: "Invalid credentials"]
        }

        if (!passwordEncoder.matches(password, user.password)) {
            return [success: false, message: "Invalid credentials"]
        }

        String token = jwtService.generateToken(user)

        return [
            success: true,
            token: token,
            user: [
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                currency: user.currency,
                role: user.role
            ]
        ]
    }
}
