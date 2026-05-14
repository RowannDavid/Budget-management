package backend

class User {

    String fullname
    String email
    String password
    String currency = "XOF"
    String role = "USER"

    Date dateCreated
    Date lastUpdated

    static hasMany = [
        expenses: Expense,
        incomes: Income,
        accounts: Account,
        budgets: Budget,
        savingsGoals: SavingsGoal
    ]

    static constraints = {
        fullname blank: false
        email blank: false, email: true, unique: true
        password blank: false
        currency blank: false
        role inList: ["USER", "ADMIN"]
    }

    static mapping = {
        table 'app_user'
    }
}
