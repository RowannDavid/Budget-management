package backend

class HealthController {

    static responseFormats = ['json']

    def index() {
        render(contentType: "application/json") {
            [status: "OK", timestamp: new Date()]
        }
    }
}
