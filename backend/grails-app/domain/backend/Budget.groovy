package backend

class Budget {

    BigDecimal amount
    Integer month
    Integer year

    User user
    Category category // If null, it's a general budget

    Date dateCreated
    Date lastUpdated

    static constraints = {
        amount min: 0.0G
        month min: 1, max: 12
        year min: 2000
        category nullable: true
    }
}
