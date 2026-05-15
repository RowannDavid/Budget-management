package backend

import grails.rest.RestfulController

class ExpenseController extends RestfulController {

    ExpenseService expenseService

    static responseFormats = ['json']

    ExpenseController() {
        super(Expense)
    }

    def index() {

        Users user = Users.get(request.getAttribute("userId"))

        respond expenseService.getUserExpenses(user)
    }

    def save() {

        try {

            Users user = Users.get(request.getAttribute("userId"))

            Expense expense = expenseService.createExpense(
                    request.JSON,
                    user
            )

            respond([
                    success: true,
                    data: expense
            ])

        } catch(Exception e) {

            respond([
                    success: false,
                    message: e.message
            ], status: 400)
        }
    }

    def update() {

        try {

            Expense expense = expenseService.updateExpense(
                    params.id as Long,
                    request.JSON
            )

            respond([
                    success: true,
                    data: expense
            ])

        } catch(Exception e) {

            respond([
                    success: false,
                    message: e.message
            ], status: 400)
        }
    }

    def delete() {

        try {

            expenseService.deleteExpense(params.id as Long)

            respond([
                    success: true,
                    message: "Expense deleted"
            ])

        } catch(Exception e) {

            respond([
                    success: false,
                    message: e.message
            ], status: 400)
        }
    }
}