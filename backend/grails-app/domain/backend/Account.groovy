package backend

class Account {

    String name;
    BigDecimal balance = 0.0;
    String type;

    Date dateCreated
    Date lastUpdated

    static hasMany = [expense:Expense, income:Income]
    static belongsTo = [users:Users]

    static constraints = {
        name blank: false
        balance min: 0.0
        type blank: false
    }
}
