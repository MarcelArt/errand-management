package view_routes

import (
	"github.com/MarcelArt/errand-management/database"
	view_handlers "github.com/MarcelArt/errand-management/handlers/view"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupDevToolsRoutes(app *fiber.App) {
	h := view_handlers.NewTableHandler(repositories.NewTableRepo(database.GetDB()))

	g := app.Group("/dev-tools")
	g.Get("/", h.Index)
	g.Get("/create", h.CreateView)
	g.Get("/create/add/:i", h.AddField)

	g.Post("/create", h.Create)
	g.Post("/drop", h.DropAll)
	g.Post("/migrate", h.MigrateModels)
}
