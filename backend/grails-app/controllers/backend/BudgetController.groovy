package backend

import grails.rest.RestfulController
import java.time.LocalDate

class BudgetController extends RestfulController {

    BudgetService budgetService
    CurrentUserService currentUserService

    static responseFormats = ['json']

    BudgetController() {
        super(Budget)
    }

    /**
     * Liste les budgets de l'utilisateur pour une période donnée.
     * Si aucun paramètre n'est fourni, utilise le mois et l'année en cours.
     */
    def index() {
        Users user = currentUserService.getCurrentUser(request)
        
        Integer month = params.int('month') ?: LocalDate.now().getMonthValue()
        Integer year = params.int('year') ?: LocalDate.now().getYear()

        respond budgetService.getBudgetsWithStatus(user, month, year)
    }

    /**
     * Crée ou met à jour un budget.
     */
    def save() {
        try {
            Users user = currentUserService.getCurrentUser(request)
            Budget budget = budgetService.createOrUpdateBudget(request.JSON, user)
            
            respond([
                success: true,
                message: "Budget enregistré",
                data: budgetService.calculateStatus(budget)
            ])
        } catch (Exception e) {
            respond([success: false, message: e.message], status: 400)
        }
    }
}
