package backend

class Category {

    String name
    String type // e.g. "EXPENSE" or "INCOME"

    Date dateCreated
    Date lastUpdated

    static hasmany = [expense:Expense,budgets:Budget]
    static belongsTo = [users:Users]

    static constraints = {
        name blank: false
        type blank: false, inList: ["EXPENSE", "INCOME"]
    }
}