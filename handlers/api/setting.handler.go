
package api_handlers

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type SettingHandler struct {
	BaseCrudHandler[models.Setting, models.SettingDTO, models.SettingPage]
	repo repositories.ISettingRepo
}

func NewSettingHandler(repo repositories.ISettingRepo) *SettingHandler {
	return &SettingHandler{
		BaseCrudHandler: BaseCrudHandler[models.Setting, models.SettingDTO, models.SettingPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new setting
// @Summary Create a new setting
// @Description Create a new setting
// @Tags Setting
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Setting body models.SettingDTO true "Setting data"
// @Success 201 {object} models.SettingDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /setting [post]
func (h *SettingHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of settings
// @Summary Get a list of settings
// @Description Get a list of settings
// @Tags Setting
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.SettingPage
// @Router /setting [get]
func (h *SettingHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing setting
// @Summary Update an existing setting
// @Description Update an existing setting
// @Tags Setting
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Setting ID"
// @Param Setting body models.SettingDTO true "Setting data"
// @Success 200 {object} models.SettingDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /setting/{id} [put]
func (h *SettingHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing setting
// @Summary Delete an existing setting
// @Description Delete an existing setting
// @Tags Setting
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Setting ID"
// @Success 200 {object} models.Setting
// @Failure 500 {object} string
// @Router /setting/{id} [delete]
func (h *SettingHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a setting by ID
// @Summary Get a setting by ID
// @Description Get a setting by ID
// @Tags Setting
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Setting ID"
// @Success 200 {object} models.Setting
// @Failure 500 {object} string
// @Router /setting/{id} [get]
func (h *SettingHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
