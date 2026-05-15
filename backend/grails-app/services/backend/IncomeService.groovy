package backend

import grails.gorm.transactions.Transactional

@Transactional
class IncomeService {

    Income createIncome (Map data, Users users) {

        Income income = new Income()

        income.amount = data.amount
        income.description = data.description
        income.incomeDate = data.incomeDate instanceof String ? new java.text.SimpleDateFormat("yyyy-MM-dd").parse(data.incomeDate) : data.incomeDate

        income.users = users
        income.account = Account.get(data.accountId)

        income.save(flush: true)

        return income
    }

    List<Income> getUserIncomes(Users users) {
        return Income.findAllByUsers(users)
    }


}