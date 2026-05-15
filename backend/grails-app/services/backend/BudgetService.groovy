package backend

import grails.gorm.transactions.Transactional
import java.time.LocalDate

@Transactional
class BudgetService {

    /**
     * Crée ou met à jour un budget pour un utilisateur, une catégorie et une période donnée.
     */
    Budget createOrUpdateBudget(Map data, Users user) {
        Category category = Category.get(data.categoryId)
        if (!category) throw new Exception("Catégorie introuvable")

        // On cherche si un budget existe déjà pour ce mois/année/catégorie
        Budget budget = Budget.findByUsersAndCategoryAndMonthAndYear(user, category, data.month, data.year)

        if (!budget) {
            budget = new Budget()
            budget.users = user
            budget.category = category
            budget.month = data.month
            budget.year = data.year
        }

        budget.amount_limit = data.amount_limit
        budget.save(flush: true, failOnError: true)
        
        return budget
    }

    /**
     * Récupère les budgets d'un utilisateur avec leur état de consommation en temps réel.
     */
    List getBudgetsWithStatus(Users user, Integer month, Integer year) {
        List<Budget> budgets = Budget.findAllByUsersAndMonthAndYear(user, month, year)
        
        return budgets.collect { budget ->
            calculateStatus(budget)
        }
    }

    /**
     * Logique métier de calcul du statut d'un budget
     */
    Map calculateStatus(Budget budget) {
        // 1. Calculer le total des dépenses pour cette catégorie sur la période du budget
        // On définit le début et la fin du mois
        Calendar cal = Calendar.getInstance()
        cal.set(budget.year, budget.month - 1, 1, 0, 0, 0)
        Date start = cal.time
        
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH))
        cal.set(Calendar.HOUR_OF_DAY, 23)
        cal.set(Calendar.MINUTE, 59)
        cal.set(Calendar.SECOND, 59)
        Date end = cal.time

        BigDecimal currentSpend = Expense.createCriteria().get {
            eq("users", budget.users)
            eq("category", budget.category)
            between("expense_date", start, end)
            projections {
                sum("amount")
            }
        } ?: 0.0

        BigDecimal percentage = budget.amount_limit > 0 ? (currentSpend / budget.amount_limit) * 100 : 0
        String status = "SAFE"
        
        if (percentage >= 100) {
            status = "DANGER"
        } else if (percentage >= 80) {
            status = "WARNING"
        }

        return [
            id: budget.id,
            category: [id: budget.category.id, name: budget.category.name],
            amount_limit: budget.amount_limit,
            current_spend: currentSpend,
            percentage: percentage.setScale(2, BigDecimal.ROUND_HALF_UP),
            status: status,
            month: budget.month,
            year: budget.year
        ]
    }
}
