package api_routes

import (
	"github.com/MarcelArt/errand-management/database"
	api_handlers "github.com/MarcelArt/errand-management/handlers/api"
	"github.com/MarcelArt/errand-management/middlewares"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/MarcelArt/errand-management/services"
	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewUserHandler(
		repositories.NewUserRepo(database.GetDB()),
		repositories.NewAuthorizedDeviceRepo(database.GetDB()),
		services.NewMailService(),
	)

	g := api.Group("/user")
	g.Get("/", auth.ProtectedAPI, h.Read)
	g.Get("/:id", auth.ProtectedAPI, h.GetByID)
	g.Get("/verify/:id", h.Verify)

	g.Post("/", h.Create)
	g.Post("/login", h.Login)
	g.Post("/refresh", h.Refresh)

	g.Put("/:id", auth.ProtectedAPI, h.Update)
	g.Delete("/:id", auth.ProtectedAPI, h.Delete)
}
