package backend

import grails.rest.RestfulController

class SavingsGoalController extends RestfulController {

    SavingsGoalService savingsGoalService
    CurrentUserService currentUserService

    static responseFormats = ['json']

    SavingsGoalController() {
        super(SavingsGoal)
    }

    def index() {
        Users user = currentUserService.getCurrentUser(request)
        respond savingsGoalService.listGoalsWithProgress(user)
    }

    def save() {
        try {
            Users user = currentUserService.getCurrentUser(request)
            
            SavingsGoal goal = savingsGoalService.createGoal(request.JSON, user)
            
            respond([
                success: true,
                message: "Objectif d'épargne créé",
                data: savingsGoalService.getGoalProgress(goal)
            ])
        } catch (Exception e) {
            respond([success: false, message: e.message], status: 400)
        }
    }
}
