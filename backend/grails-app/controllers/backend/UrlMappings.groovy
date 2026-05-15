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
