package backend

class Income {

    BigDecimal amount
    String description
    Date incomeDate

    User user
    Category category
    Account account

    Date dateCreated
    Date lastUpdated

    static constraints = {
        amount min: 0.0G
        description nullable: true
        incomeDate nullable: false
        category nullable: true
        account nullable: true
    }
}
