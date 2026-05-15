package backend

import grails.rest.RestfulController

class AccountController extends RestfulController {

    CurrentUserService currentUserService

    static responseFormats = ['json']

    AccountController() {
        super(Account)
    }

    def index() {
        Users user = currentUserService.getCurrentUser(request)
        respond Account.findAllByUsers(user)
    }

    def save() {
        try {
            Users user = currentUserService.getCurrentUser(request)
            Account account = new Account(request.JSON)
            account.users = user
            account.save(flush: true, failOnError: true)
            respond account
        } catch (Exception e) {
            respond([success: false, message: e.message], status: 400)
        }
    }
}
