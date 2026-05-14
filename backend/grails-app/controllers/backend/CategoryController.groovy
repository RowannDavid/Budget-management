package backend

import grails.rest.RestfulController

class CategoryController extends RestfulController<Category> {

    static responseFormats = ['json']

    CategoryController() {
        super(Category)
    }
}
