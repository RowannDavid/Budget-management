package backend

class UrlMappings {

    static mappings = {
        "/api/users"(resources: 'user')
        "/api/accounts"(resources: 'account')
        "/api/categories"(resources: 'category')
        "/api/expenses"(resources: 'expense')
        "/api/incomes"(resources: 'income')
        "/api/budgets"(resources: 'budget')
        "/api/savings-goals"(resources: 'savingsGoal')

        "/api/auth/login"(controller: 'auth', action: 'login', method: 'POST')
        "/api/auth/register"(controller: 'auth', action: 'register', method: 'POST')

        "/api/health"(controller: 'health', action: 'index', method: 'GET')

        "/api/stats/expenses/monthly"(controller: 'stats', action: 'monthlyExpenses', method: 'GET')
        "/api/stats/incomes/monthly"(controller: 'stats', action: 'monthlyIncomes', method: 'GET')
        "/api/stats/balance"(controller: 'stats', action: 'balance', method: 'GET')
        "/api/stats/categories"(controller: 'stats', action: 'categories', method: 'GET')
        "/api/stats/dashboard"(controller: 'stats', action: 'dashboard', method: 'GET')

        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
