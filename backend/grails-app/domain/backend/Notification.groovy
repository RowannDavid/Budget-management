package backend

class Notification {

    String title
    String message
    String type // e.g., "INFO", "WARNING", "SUCCESS", "DANGER"
    Boolean is_read = false

    Date dateCreated
    Date lastUpdated

    static belongsTo = [users: Users]

    static constraints = {
        title blank: false
        message blank: false
        type inList: ["INFO", "WARNING", "SUCCESS", "DANGER"]
        is_read nullable: false
    }
}
