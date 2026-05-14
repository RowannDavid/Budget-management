package backend

import grails.rest.RestfulController

class SavingsGoalController extends RestfulController<SavingsGoal> {

    static responseFormats = ['json']

    SavingsGoalController() {
        super(SavingsGoal)
    }
}
