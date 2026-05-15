package backend

import grails.converters.JSON

class ExportController {

    CurrentUserService currentUserService
    ExpenseService expenseService
    IncomeService incomeService

    static responseFormats = ['json']

    /**
     * Exporte les dépenses en format CSV.
     */
    def expensesAsCsv() {
        Users user = currentUserService.getCurrentUser(request)
        List<Expense> expenses = expenseService.getUserExpenses(user)

        String dateStr = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date())
        String filename = "expenses_${dateStr}.csv"
        
        response.setHeader("Content-disposition", "attachment; filename=${filename}")
        response.contentType = "text/csv"

        StringBuilder csv = new StringBuilder()
        csv.append("Date;Description;Montant;Categorie;Compte;Methode\n")

        expenses.each { e ->
            String expenseDateStr = new java.text.SimpleDateFormat("yyyy-MM-dd").format(e.expense_date)
            csv.append("${expenseDateStr};")
            csv.append("${e.description ?: ''};")
            csv.append("${e.amount};")
            csv.append("${e.category?.name};")
            csv.append("${e.account?.name};")
            csv.append("${e.payment_method}\n")
        }

        render text: csv.toString(), contentType: "text/csv", encoding: "UTF-8"
    }

    /**
     * Exporte les revenus en format CSV.
     */
    def incomesAsCsv() {
        Users user = currentUserService.getCurrentUser(request)
        List<Income> incomes = incomeService.getUserIncomes(user)

        String dateStr = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date())
        String filename = "incomes_${dateStr}.csv"
        
        response.setHeader("Content-disposition", "attachment; filename=${filename}")
        response.contentType = "text/csv"

        StringBuilder csv = new StringBuilder()
        csv.append("Date;Source;Description;Montant;Compte\n")

        incomes.each { i ->
            String incomeDateStr = new java.text.SimpleDateFormat("yyyy-MM-dd").format(i.incomeDate)
            csv.append("${incomeDateStr};")
            csv.append("${i.description ?: ''};")
            csv.append("${i.amount};")
            csv.append("${i.account?.name}\n")
        }

        render text: csv.toString(), contentType: "text/csv", encoding: "UTF-8"
    }
}
