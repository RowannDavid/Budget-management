package backend

import grails.rest.RestfulController

class IncomeController extends RestfulController {

    IncomeService incomeService
    CurrentUserService currentUserService

    static responseFormats = ['json']

    IncomeController() {
        super(Income)
    }

    def index() {

        Users user = currentUserService.getCurrentUser(request)

        respond([
                success: true,
                data: incomeService.getUserIncomes(user),
                message: "Revenus récupérés"
        ])
    }

    def save() {

        try {

            Users user = currentUserService.getCurrentUser(request)

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