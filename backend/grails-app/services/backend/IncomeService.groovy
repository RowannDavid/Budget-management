package backend

class IncomeService {

    BigDecimal totalIncomes(User user) {
        def total = Income.where { user == user }.projections { sum('amount') }.get()
        return total ?: 0.0G
    }
}
