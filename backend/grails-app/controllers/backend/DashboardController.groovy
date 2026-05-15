package backend

class DashboardController {

    DashboardService dashboardService
    CurrentUserService currentUserService

    static responseFormats = ['json']

    def index() {

        Users user = currentUserService.getCurrentUser(request)

        if (!user) {
            respond([success: false, message: "User not found"], status: 401)
            return
        }

        respond dashboardService.getSummary(user)
    }
}
