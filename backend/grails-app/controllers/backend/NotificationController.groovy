package backend

import grails.rest.RestfulController

class NotificationController extends RestfulController {

    NotificationService notificationService
    CurrentUserService currentUserService

    static responseFormats = ['json']

    NotificationController() {
        super(Notification)
    }

    def index() {
        Users user = currentUserService.getCurrentUser(request)
        Boolean onlyUnread = params.boolean('unread') ?: false
        respond notificationService.listNotifications(user, onlyUnread)
    }

    def markAsRead() {
        notificationService.markAsRead(params.id as Long)
        respond([success: true, message: "Notification marquée comme lue"])
    }
}
