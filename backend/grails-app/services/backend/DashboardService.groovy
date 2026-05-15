package backend

import grails.gorm.transactions.Transactional

@Transactional
class DashboardService {

    def getSummary(Users user) {

        BigDecimal totalIncome = Income.findAllByUsers(user)*.amount?.sum() ?: 0
        BigDecimal totalExpense = Expense.findAllByUsers(user)*.amount?.sum() ?: 0
        BigDecimal balance = totalIncome - totalExpense

        // Transactions récentes
        List<Income> recentIncomes = Income.findAllByUsers(user, [max: 5, sort: "dateCreated", order: "desc"])
        List<Expense> recentExpenses = Expense.findAllByUsers(user, [max: 5, sort: "dateCreated", order: "desc"])

        // Répartition par catégorie
        def categoryData = Expense.createCriteria().list {
            eq("users", user)
            projections {
                groupProperty("category")
                sum("amount")
            }
        }.collect { row ->
            [name: row[0].name, value: row[1]]
        }

        return [
                totalIncome    : totalIncome,
                totalExpense   : totalExpense,
                balance        : balance,
                recentIncomes  : recentIncomes,
                recentExpenses : recentExpenses,
                categoryData   : categoryData
        ]
    }
}
