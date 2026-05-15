package backend

class UrlMappings {

    static mappings = {
        "/api/register"(controller: "auth", action: "register",
                method: "POST"
        )
        "/api/login"(controller: "auth", action: "login",
                method: "POST"
        )
        "/api/expenses"(resources: "expense")
        "/api/incomes"(resources: "income")
        "/api/accounts"(resources: "account")
        "/api/categories"(resources: "category")
        "/api/budgets"(resources: "budget")
        "/api/savings-goals"(resources: "savingsGoal")
        "/api/notifications"(resources: "notification") {
            collection {
                put "/markAsRead/$id"(action: "markAsRead")
            }
        }
        "/api/export/expenses"(controller: "export", action: "expensesAsCsv")
        "/api/export/incomes"(controller: "export", action: "incomesAsCsv")
        "/api/dashboard"(controller: "dashboard", action: "index")

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
