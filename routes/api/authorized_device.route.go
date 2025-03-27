package api_routes

import (
	"github.com/MarcelArt/errand-management/database"
	api_handlers "github.com/MarcelArt/errand-management/handlers/api"
	"github.com/MarcelArt/errand-management/middlewares"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupAuthorizedDeviceRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewAuthorizedDeviceHandler(repositories.NewAuthorizedDeviceRepo(database.GetDB()))

	g := api.Group("/authorized-device")
	g.Get("/", auth.ProtectedAPI, h.Read)
	g.Get("/:id", auth.ProtectedAPI, h.GetByID)
	g.Post("/", auth.ProtectedAPI, h.Create)
	g.Put("/:id", auth.ProtectedAPI, h.Update)
	g.Delete("/:id", auth.ProtectedAPI, h.Delete)
}
