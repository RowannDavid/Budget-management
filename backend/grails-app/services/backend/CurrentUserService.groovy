package backend

import grails.gorm.transactions.Transactional

@Transactional
class CurrentUserService {

    Users getCurrentUser(def request) {

        def userId = request.getAttribute("userId")
        println "--- CurrentUserService debug ---"
        println "Found userId attribute: ${userId}"

        if (!userId) {
            println "No userId found in request attributes!"
            return null
        }

        Users user = Users.get(userId as Long)
        if (!user) {
            println "User ID ${userId} exists in token but NOT in database!"
        }
        
        return user
    }
}
