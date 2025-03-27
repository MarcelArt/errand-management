
package api_handlers

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type CategoryHandler struct {
	BaseCrudHandler[models.Category, models.CategoryDTO, models.CategoryPage]
	repo repositories.ICategoryRepo
}

func NewCategoryHandler(repo repositories.ICategoryRepo) *CategoryHandler {
	return &CategoryHandler{
		BaseCrudHandler: BaseCrudHandler[models.Category, models.CategoryDTO, models.CategoryPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new category
// @Summary Create a new category
// @Description Create a new category
// @Tags Category
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Category body models.CategoryDTO true "Category data"
// @Success 201 {object} models.CategoryDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /category [post]
func (h *CategoryHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of categories
// @Summary Get a list of categories
// @Description Get a list of categories
// @Tags Category
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.CategoryPage
// @Router /category [get]
func (h *CategoryHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing category
// @Summary Update an existing category
// @Description Update an existing category
// @Tags Category
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Category ID"
// @Param Category body models.CategoryDTO true "Category data"
// @Success 200 {object} models.CategoryDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /category/{id} [put]
func (h *CategoryHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing category
// @Summary Delete an existing category
// @Description Delete an existing category
// @Tags Category
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Category ID"
// @Success 200 {object} models.Category
// @Failure 500 {object} string
// @Router /category/{id} [delete]
func (h *CategoryHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a category by ID
// @Summary Get a category by ID
// @Description Get a category by ID
// @Tags Category
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Category ID"
// @Success 200 {object} models.Category
// @Failure 500 {object} string
// @Router /category/{id} [get]
func (h *CategoryHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
