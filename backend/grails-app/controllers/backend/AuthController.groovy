package backend



class AuthController {

    AuthService authService;
    JwtService jwtService

    static responseFormats = ['json']

    def register() {
        try {
            Users users = authService.register(request.JSON)
            respond(
                    [
                            success: true,
                            message: "le compte est crée",
                            data: [
                                    id: users.id,
                                    name: users.name,
                                    email: users.email
                            ]
                    ]
            )

        } catch (Exception e) {
            respond(
                    [
                            success: false,
                            message: e.message
                    ], status: 400
            )
        }
    }

    def login() {
        try {
            Users users = authService.login(
                    request.JSON.email,
                    request.JSON.password)

            String token = jwtService.generateToken(users)
            respond(
                    [
                            success: true,
                            message: "la connexion est reussi",
                            token: token,
                            data: [
                                    id: users.id,
                                    name: users.name,
                                    email: users.email
                            ]
                    ]
            )

        } catch (Exception e) {
            respond(
                    [
                            success: false,
                            message: e.message
                    ], status: 401
            )
        }
    }
}