package backend

class Users {

    String name;
    String email;
    String password;
    String currency = 'FCFA';

    Date dateCreated
    Date lastUpdated

    static hasMany = [
            account:Account,
            expense:Expense,
            income:Income,
            category:Category,
            budget:Budget,
            savingsgoal:SavingsGoal
    ]

    static constraints = {
        name nullable: false, blank: false
        email blank: false, email: true, unique: true
        password blank: false, minSize: 4
        currency blank: false
    }

}
