package backend

import grails.rest.RestfulController
import grails.gorm.transactions.Transactional

class ExpenseController extends RestfulController<Expense> {

    static responseFormats = ['json']

    ExpenseController() {
        super(Expense)
    }

    @Override
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        User currentUser = request.getAttribute('user') as User
        
        def expenseList = Expense.findAllByUser(currentUser, params)
        def totalCount = Expense.countByUser(currentUser)

        response.addHeader("X-Total-Count", totalCount.toString())
        respond expenseList
    }

    @Override
    @Transactional
    def save() {
        User currentUser = request.getAttribute('user') as User
        def expense = new Expense()
        bindData(expense, request.JSON)
        expense.user = currentUser

        if (expense.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond expense.errors, view:'create'
            return
        }

        expense.save flush:true
        respond expense, [status: 201]
    }
}
