package backend

class Expense {

    BigDecimal amount;
    String description;
    String payment_method;
    Date expense_date;

    Date dateCreated
    Date lastUpdated

    static belongsTo = [
            users:Users,
            category:Category,
            account:Account
    ]

    static constraints = {
        amount min: 0.0
        description nullable: true
        payment_method blank: false
        expense_date nullable: false
    }
}

