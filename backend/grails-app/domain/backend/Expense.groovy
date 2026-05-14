package backend

class Expense {

    BigDecimal amount
    String description
    Date expenseDate

    User user
    Category category
    Account account

    Date dateCreated
    Date lastUpdated

    static constraints = {
        amount min: 0.0G
        description nullable: true
        expenseDate nullable: false
        category nullable: true
        account nullable: true
    }
}
