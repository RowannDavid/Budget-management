package backend

import grails.rest.RestfulController

class IncomeController extends RestfulController {

    IncomeService incomeService

    static responseFormats = ['json']

    IncomeController() {
        super(Income)
    }

    def index() {

        Users user = Users.get(request.getAttribute("userId"))

        respond incomeService.getUserIncomes(user)
    }

    def save() {

        try {

            Users user = Users.get(request.getAttribute("userId"))

            Income income = incomeService.createIncome(
                    request.JSON,
                    user
            )

            respond([
                    success: true,
                    data: income
            ])

        } catch(Exception e) {

            respond([
                    success: false,
                    message: e.message
            ], status: 400)
        }
    }
}