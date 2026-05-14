package backend

class SavingsGoal {

    String name
    BigDecimal targetAmount
    BigDecimal currentAmount = 0.0G
    Date deadline

    User user

    Date dateCreated
    Date lastUpdated

    static constraints = {
        name blank: false
        targetAmount min: 0.0G
        currentAmount min: 0.0G
        deadline nullable: true
    }
}
