package backend

class Income {

    BigDecimal amount
    String description
    Date incomeDate

    Date dateCreated
    Date lastUpdated

    static belongsTo = [users:Users, account:Account]

    static constraints = {
        amount min: 0.0G
        description nullable: true
        incomeDate nullable: false

    }
}

