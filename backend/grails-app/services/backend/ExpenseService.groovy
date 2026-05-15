package backend

import grails.gorm.transactions.Transactional

@Transactional
class ExpenseService {

    Expense createExpense (Map data, Users users) {

        Expense expense = new Expense()

        expense.amount = data.amount
        expense.description = data.description
        expense.payment_method = data.payment_method
        expense.expense_date = data.expense_date instanceof String ? new java.text.SimpleDateFormat("yyyy-MM-dd").parse(data.expense_date) : data.expense_date

        expense.users = users
        expense.category = Category.get(data.categoryId)
        expense.account = Account.get(data.accountId)

        expense.save(flush: true)

        return expense
    }

    List<Expense> getUserExpenses(Users users) {
        return Expense.findAllByUsers(users)
    }

    Expense updateExpense (Long id, Map data) {

        Expense expense = Expense.get(id)

        if(!expense) {
            throw new Exception("Expense non trouvée")
        }

        expense.amount = data.amount
        expense.description = data.description
        expense.payment_method = data.payment_method

        expense.save(flush: true)

        return expense
    }
    void deleteExpense (Long id) {

        Expense expense = Expense.get(id)
        if(!expense) {
            throw new Exception("Expense non trouvée")
        }
        expense.delete(flush: true)

    }
}