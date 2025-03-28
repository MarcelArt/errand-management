
package api_handlers

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type RoadmapHandler struct {
	BaseCrudHandler[models.Roadmap, models.RoadmapDTO, models.RoadmapPage]
	repo repositories.IRoadmapRepo
}

func NewRoadmapHandler(repo repositories.IRoadmapRepo) *RoadmapHandler {
	return &RoadmapHandler{
		BaseCrudHandler: BaseCrudHandler[models.Roadmap, models.RoadmapDTO, models.RoadmapPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new roadmap
// @Summary Create a new roadmap
// @Description Create a new roadmap
// @Tags Roadmap
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Roadmap body models.RoadmapDTO true "Roadmap data"
// @Success 201 {object} models.RoadmapDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /roadmap [post]
func (h *RoadmapHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of roadmaps
// @Summary Get a list of roadmaps
// @Description Get a list of roadmaps
// @Tags Roadmap
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.RoadmapPage
// @Router /roadmap [get]
func (h *RoadmapHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing roadmap
// @Summary Update an existing roadmap
// @Description Update an existing roadmap
// @Tags Roadmap
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Roadmap ID"
// @Param Roadmap body models.RoadmapDTO true "Roadmap data"
// @Success 200 {object} models.RoadmapDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /roadmap/{id} [put]
func (h *RoadmapHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing roadmap
// @Summary Delete an existing roadmap
// @Description Delete an existing roadmap
// @Tags Roadmap
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Roadmap ID"
// @Success 200 {object} models.Roadmap
// @Failure 500 {object} string
// @Router /roadmap/{id} [delete]
func (h *RoadmapHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a roadmap by ID
// @Summary Get a roadmap by ID
// @Description Get a roadmap by ID
// @Tags Roadmap
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Roadmap ID"
// @Success 200 {object} models.Roadmap
// @Failure 500 {object} string
// @Router /roadmap/{id} [get]
func (h *RoadmapHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
