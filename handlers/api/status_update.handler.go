
package api_handlers

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type StatusUpdateHandler struct {
	BaseCrudHandler[models.StatusUpdate, models.StatusUpdateDTO, models.StatusUpdatePage]
	repo repositories.IStatusUpdateRepo
}

func NewStatusUpdateHandler(repo repositories.IStatusUpdateRepo) *StatusUpdateHandler {
	return &StatusUpdateHandler{
		BaseCrudHandler: BaseCrudHandler[models.StatusUpdate, models.StatusUpdateDTO, models.StatusUpdatePage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new status update
// @Summary Create a new status update
// @Description Create a new status update
// @Tags StatusUpdate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param StatusUpdate body models.StatusUpdateDTO true "StatusUpdate data"
// @Success 201 {object} models.StatusUpdateDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /status-update [post]
func (h *StatusUpdateHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of status updates
// @Summary Get a list of status updates
// @Description Get a list of status updates
// @Tags StatusUpdate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.StatusUpdatePage
// @Router /status-update [get]
func (h *StatusUpdateHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing status update
// @Summary Update an existing status update
// @Description Update an existing status update
// @Tags StatusUpdate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "StatusUpdate ID"
// @Param StatusUpdate body models.StatusUpdateDTO true "StatusUpdate data"
// @Success 200 {object} models.StatusUpdateDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /status-update/{id} [put]
func (h *StatusUpdateHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing status update
// @Summary Delete an existing status update
// @Description Delete an existing status update
// @Tags StatusUpdate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "StatusUpdate ID"
// @Success 200 {object} models.StatusUpdate
// @Failure 500 {object} string
// @Router /status-update/{id} [delete]
func (h *StatusUpdateHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a status update by ID
// @Summary Get a status update by ID
// @Description Get a status update by ID
// @Tags StatusUpdate
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "StatusUpdate ID"
// @Success 200 {object} models.StatusUpdate
// @Failure 500 {object} string
// @Router /status-update/{id} [get]
func (h *StatusUpdateHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
