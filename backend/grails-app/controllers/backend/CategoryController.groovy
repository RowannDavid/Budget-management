package backend

import grails.rest.RestfulController

class CategoryController extends RestfulController {

    CurrentUserService currentUserService

    static responseFormats = ['json']

    CategoryController() {
        super(Category)
    }

    def index() {
        Users user = currentUserService.getCurrentUser(request)
        respond Category.findAllByUsers(user)
    }

    def save() {
        try {
            Users user = currentUserService.getCurrentUser(request)
            Category category = new Category(request.JSON)
            category.users = user
            category.save(flush: true, failOnError: true)
            respond category
        } catch (Exception e) {
            respond([success: false, message: e.message], status: 400)
        }
    }
}
