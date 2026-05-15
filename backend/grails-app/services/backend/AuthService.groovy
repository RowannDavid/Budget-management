package backend

import grails.gorm.transactions.Transactional
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Transactional
class AuthService {

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder()

    Users register(Map data) {

        Users existingUser = Users.findByEmail(data.email)

        if (existingUser) {
            throw new Exception("Email deja utilisé")
        }

        Users users = new Users()

        users.name = data.name
        users.email = data.email
        // hash du mot de passe
        users.password = passwordEncoder.encode(data.password)
        users.currency = data.currency ?: 'FCFA'

        users.save(flush: true)

        return users
    }

    Users login(String email, String password) {

        Users users = Users.findByEmail(email)

        if (!users) {
            throw new Exception("utilisateur introuvable")
        }

        boolean passwordValidator = passwordEncoder.matches(password, users.password)

        if (!passwordValidator) {
            throw new Exception('password invalide')
        }


        return users
    }
}