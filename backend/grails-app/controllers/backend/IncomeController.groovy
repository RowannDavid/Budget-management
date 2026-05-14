package backend

import grails.rest.RestfulController

class IncomeController extends RestfulController<Income> {

    static responseFormats = ['json']

    IncomeController() {
        super(Income)
    }
}
