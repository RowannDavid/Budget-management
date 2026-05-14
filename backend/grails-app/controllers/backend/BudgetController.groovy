package backend

import grails.rest.RestfulController

class BudgetController extends RestfulController<Budget> {

    static responseFormats = ['json']

    BudgetController() {
        super(Budget)
    }
}
