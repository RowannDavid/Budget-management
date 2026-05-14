package backend

class StatsService {

    ExpenseService expenseService
    IncomeService incomeService

    def getMonthlyExpensesStats() {
        // Mock data or simple aggregation
        return [
            [month: "Jan", total: 150000],
            [month: "Feb", total: 120000],
            [month: "Mar", total: 180000]
        ]
    }

    def getMonthlyIncomesStats() {
        return [
            [month: "Jan", total: 300000],
            [month: "Feb", total: 300000],
            [month: "Mar", total: 350000]
        ]
    }

    def getBalance() {
        // Usually you'd calculate this based on the current user
        // For now, return mock balance matching example
        return [balance: 350000]
    }

    def getExpensesByCategory() {
        return [
            [category: "Food", amount: 150000],
            [category: "Transport", amount: 50000],
            [category: "Internet", amount: 25000]
        ]
    }

    def getDashboardStats() {
        // Usually you'd aggregate from ExpenseService and IncomeService for the specific user
        return [
            totalExpenses: 250000,
            totalIncomes: 600000,
            balance: 350000
        ]
    }
}
