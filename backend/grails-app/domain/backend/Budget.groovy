package backend

class Budget {

    BigDecimal amount_limit;
    Integer month;
    Integer year;

    Date dateCreated
    Date lastUpdated

    static belongsTo = [users:Users, category:Category]

    static constraints = {
        amount_limit min: 0.0
        month min: 1, max: 12
        year min: 2000
    }
}
