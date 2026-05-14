package backend

class StatsController {

    static responseFormats = ['json']
    
    ExpenseService expenseService
    IncomeService incomeService
    StatsService statsService

    def monthlyExpenses() {
        def stats = statsService.getMonthlyExpensesStats()
        render(contentType: "application/json") { stats }
    }

    def monthlyIncomes() {
        def stats = statsService.getMonthlyIncomesStats()
        render(contentType: "application/json") { stats }
    }

    def balance() {
        def stats = statsService.getBalance()
        render(contentType: "application/json") { stats }
    }

    def categories() {
        def stats = statsService.getExpensesByCategory()
        render(contentType: "application/json") { stats }
    }

    def dashboard() {
        def stats = statsService.getDashboardStats()
        render(contentType: "application/json") { stats }
    }
}
