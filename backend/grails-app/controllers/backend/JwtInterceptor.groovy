package backend

class JwtInterceptor {

    JwtService jwtService

    int order = HIGHEST_PRECEDENCE + 100

    JwtInterceptor() {
        matchAll()
            .excludes(uri: '/api/auth/**')
            .excludes(uri: '/api/health')
            .excludes(uri: '/error')
            .excludes(uri: '/notFound')
            .excludes(uri: '/')
    }

    boolean before() {
        // Only intercept /api routes
        if (!request.forwardURI.startsWith('/api/')) {
            return true
        }

        String authHeader = request.getHeader("Authorization")
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            response.status = 401
            render(contentType: "application/json") { [error: "Unauthorized", message: "Missing or invalid Authorization header"] }
            return false
        }

        String token = authHeader.substring(7)
        def decodedJWT = jwtService.verifyToken(token)

        if (!decodedJWT) {
            response.status = 401
            render(contentType: "application/json") { [error: "Unauthorized", message: "Token expired or invalid"] }
            return false
        }

        // Get user from DB
        Long userId = decodedJWT.getClaim("userId").asLong()
        User currentUser = User.get(userId)

        if (!currentUser) {
            response.status = 401
            render(contentType: "application/json") { [error: "Unauthorized", message: "User not found"] }
            return false
        }

        // Inject user in request context for controllers to use
        request.setAttribute('user', currentUser)

        // Basic Role Check Example: 
        // If route contains /admin/, require ADMIN role
        if (request.forwardURI.contains('/admin/') && currentUser.role != 'ADMIN') {
            response.status = 403
            render(contentType: "application/json") { [error: "Forbidden", message: "Admin access required"] }
            return false
        }

        return true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
