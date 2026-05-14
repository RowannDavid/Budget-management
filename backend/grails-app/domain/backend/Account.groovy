package backend

class Account {

    String name
    BigDecimal balance = 0.0G

    User user

    Date dateCreated
    Date lastUpdated

    static hasMany = [
        expenses: Expense,
        incomes: Income
    ]

    static constraints = {
        name blank: false
        balance nullable: false
    }
}
