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

        users.save(flush: true, failOnError: true)

        // --- LOGIQUE FINTECH : Initialisation de l'environnement ---

        // 1. Création du compte par défaut
        Account mainAccount = new Account()
        mainAccount.name = "Compte Principal"
        mainAccount.balance = 0.0
        mainAccount.type = "CASH"
        mainAccount.users = users
        mainAccount.save(flush: true, failOnError: true)

        // 2. Création des catégories par défaut
        List<String> defaultCategories = [
                "Transport", "Nourriture", "Santé",
                "Loyer", "Factures", "Loisirs"
        ]

        defaultCategories.each { catName ->
            new Category(
                    name: catName,
                    type: "EXPENSE",
                    color: "#4A90E2", // Couleur par défaut
                    icon: "category",  // Icone par défaut
                    users: users
            ).save(flush: true, failOnError: true)
        }

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