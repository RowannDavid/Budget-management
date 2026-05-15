import backend.JwtAuthenticationFilter
import org.springframework.boot.web.servlet.FilterRegistrationBean

beans = {
    jwtAuthenticationFilter(JwtAuthenticationFilter) {
        jwtService = ref("jwtService")
    }

    jwtFilterRegistration(FilterRegistrationBean) {
        filter = ref("jwtAuthenticationFilter")
        urlPatterns = ["/api/*"]
        order = 1
    }
}
