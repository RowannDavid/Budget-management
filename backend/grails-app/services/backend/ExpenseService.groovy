package backend

class ExpenseService {

    BigDecimal totalExpenses(User user) {
        def total = Expense.where { user == user }.projections { sum('amount') }.get()
        return total ?: 0.0G
    }
}
