package backend

import backend.JWTAuthenticationFilter
import backend.JWTService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SecurityConfig {

    JWTService jwtService

    @Bean
    JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter(jwtService: jwtService)
    }
}
