package api_routes

import (
	"github.com/MarcelArt/errand-management/database"
	api_handlers "github.com/MarcelArt/errand-management/handlers/api"
	"github.com/MarcelArt/errand-management/middlewares"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupRoadmapRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewRoadmapHandler(repositories.NewRoadmapRepo(database.GetDB()))

	g := api.Group("/roadmap")
	g.Get("/", h.Read)
	g.Get("/:id", h.GetByID)
	g.Post("/", h.Create)
	g.Put("/:id", h.Update)
	g.Delete("/:id", h.Delete)
}
