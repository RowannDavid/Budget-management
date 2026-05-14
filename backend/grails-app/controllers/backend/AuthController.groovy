package backend

import grails.gorm.transactions.Transactional

class AuthController {

    static responseFormats = ['json']

    AuthService authService

    def login() {
        def requestData = request.JSON
        
        if (!requestData?.email || !requestData?.password) {
            render(status: 400, contentType: "application/json") {
                [success: false, message: "Email and password are required"]
            }
            return
        }

        def result = authService.login(requestData.email, requestData.password)

        if (result.success) {
            render(status: 200, contentType: "application/json") { result }
        } else {
            render(status: 401, contentType: "application/json") { result }
        }
    }

    @Transactional
    def register() {
        def requestData = request.JSON

        if (!requestData?.email || !requestData?.password || !requestData?.fullname) {
            render(status: 400, contentType: "application/json") {
                [success: false, message: "Fullname, email and password are required"]
            }
            return
        }

        def result = authService.register(
            requestData.fullname, 
            requestData.email, 
            requestData.password, 
            requestData.currency
        )

        if (result.success) {
            render(status: 201, contentType: "application/json") { result }
        } else {
            render(status: 400, contentType: "application/json") { result }
        }
    }
}
