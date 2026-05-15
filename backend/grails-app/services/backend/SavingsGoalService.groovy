package backend

import grails.gorm.transactions.Transactional

@Transactional
class SavingsGoalService {

    /**
     * Crée un objectif d'épargne de manière transactionnelle.
     */
    SavingsGoal createGoal(Map data, Users user) {
        if (!user) throw new Exception("Utilisateur non authentifié")

        SavingsGoal goal = new SavingsGoal()
        
        // On assigne manuellement les champs pour éviter les conflits
        goal.title = data.title
        goal.targetAmount = data.targetAmount ?: 0
        goal.currentAmount = data.currentAmount ?: 0
        goal.users = user
        
        if (data.deadline instanceof String && data.deadline != "") {
            goal.deadline = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(data.deadline)
        }

        goal.save(flush: true, failOnError: true)
        return goal
    }

    /**
     * Calcule la progression d'un objectif d'épargne.
     */
    Map getGoalProgress(SavingsGoal goal) {
        BigDecimal progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0
        
        return [
            id: goal.id,
            title: goal.title,
            targetAmount: goal.targetAmount,
            currentAmount: goal.currentAmount,
            deadline: goal.deadline,
            progress: progress.setScale(2, BigDecimal.ROUND_HALF_UP),
            isCompleted: progress >= 100
        ]
    }

    /**
     * Liste les objectifs d'épargne d'un utilisateur avec leur progression.
     */
    List listGoalsWithProgress(Users user) {
        List<SavingsGoal> goals = SavingsGoal.findAllByUsers(user)
        return goals.collect { getGoalProgress(it) }
    }
}
