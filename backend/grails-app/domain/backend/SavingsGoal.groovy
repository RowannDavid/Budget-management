package backend

class SavingsGoal {

    String title;
    BigDecimal targetAmount;
    BigDecimal currentAmount;
    Date deadline;

    Date dateCreated
    Date lastUpdated

    static belongsTo = [users:Users]

    static constraints = {
        title blank: false
        targetAmount min: 0.0
        currentAmount min: 0.0
        deadline nullable: true
    }
}



