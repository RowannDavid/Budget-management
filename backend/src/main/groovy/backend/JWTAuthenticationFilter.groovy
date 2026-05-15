package backend

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.filter.OncePerRequestFilter

class JwtAuthenticationFilter extends OncePerRequestFilter {

    JwtService jwtService

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) {

        String path = request.requestURI
        println "--- Filter hit for path: ${path} ---"

        // routes publiques
        if (path.endsWith("/api/login") || path.endsWith("/api/register")) {
            println "Skipping filter for public route"
            filterChain.doFilter(request, response)
            return
        }

        String authHeader = request.getHeader("Authorization")

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            response.status = 401
            response.contentType = "application/json"
            response.writer.write('{"success": false, "message":"Token manquant"}')
            return
        }

        try {

            String token = authHeader.substring(7)
            def claims = jwtService.validateToken(token)

            println "Token valid for user: ${claims.get("userId")}"
            request.setAttribute("userId", claims.get("userId"))

            filterChain.doFilter(request, response)

        } catch(Exception e) {
            println "Auth error: ${e.message}"
            response.status = 401
            response.contentType = "application/json"
            response.writer.write('{"success": false, "message":"Token invalide"}')
        }
    }
}
