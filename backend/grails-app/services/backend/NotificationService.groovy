package backend

import grails.gorm.transactions.Transactional

@Transactional
class NotificationService {

    /**
     * Crée une nouvelle notification pour un utilisateur.
     */
    Notification createNotification(Users user, String title, String message, String type) {
        Notification notification = new Notification(
            users: user,
            title: title,
            message: message,
            type: type
        )
        notification.save(flush: true, failOnError: true)
        return notification
    }

    /**
     * Liste les notifications d'un utilisateur.
     */
    List<Notification> listNotifications(Users user, Boolean onlyUnread = false) {
        if (onlyUnread) {
            return Notification.findAllByUsersAndIs_read(user, false, [sort: "dateCreated", order: "desc"])
        }
        return Notification.findAllByUsers(user, [sort: "dateCreated", order: "desc"])
    }

    /**
     * Marque une notification comme lue.
     */
    void markAsRead(Long id) {
        Notification notification = Notification.get(id)
        if (notification) {
            notification.is_read = true
            notification.save(flush: true)
        }
    }
}
