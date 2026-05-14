package backend

import grails.rest.RestfulController

class AccountController extends RestfulController<Account> {

    static responseFormats = ['json']

    AccountController() {
        super(Account)
    }
}
