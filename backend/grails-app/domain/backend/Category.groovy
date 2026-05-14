package backend

class Category {

    String name
    String type // e.g. "EXPENSE" or "INCOME"

    User user // can be null if it's a global category

    Date dateCreated
    Date lastUpdated

    static constraints = {
        name blank: false
        type blank: false, inList: ["EXPENSE", "INCOME"]
        user nullable: true
    }
}
