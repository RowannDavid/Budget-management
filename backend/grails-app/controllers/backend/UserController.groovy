package backend

import grails.rest.RestfulController

class UserController extends RestfulController<User> {

    static responseFormats = ['json']

    UserController() {
        super(User)
    }
}
