package api_routes

import (
	"github.com/MarcelArt/errand-management/database"
	api_handlers "github.com/MarcelArt/errand-management/handlers/api"
	"github.com/MarcelArt/errand-management/middlewares"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupMemberRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewMemberHandler(repositories.NewMemberRepo(database.GetDB()))

	g := api.Group("/member")
	g.Get("/", h.Read)
	g.Get("/priorities", h.WithCategoryPriorities)
	g.Get("/:id", h.GetByID)
	g.Post("/", h.Create)
	g.Put("/:id", h.Update)
	g.Delete("/:id", h.Delete)
}
