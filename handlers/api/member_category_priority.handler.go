
package api_handlers

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type MemberCategoryPriorityHandler struct {
	BaseCrudHandler[models.MemberCategoryPriority, models.MemberCategoryPriorityDTO, models.MemberCategoryPriorityPage]
	repo repositories.IMemberCategoryPriorityRepo
}

func NewMemberCategoryPriorityHandler(repo repositories.IMemberCategoryPriorityRepo) *MemberCategoryPriorityHandler {
	return &MemberCategoryPriorityHandler{
		BaseCrudHandler: BaseCrudHandler[models.MemberCategoryPriority, models.MemberCategoryPriorityDTO, models.MemberCategoryPriorityPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new member category priority
// @Summary Create a new member category priority
// @Description Create a new member category priority
// @Tags MemberCategoryPriority
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param MemberCategoryPriority body models.MemberCategoryPriorityDTO true "MemberCategoryPriority data"
// @Success 201 {object} models.MemberCategoryPriorityDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /member-category-priority [post]
func (h *MemberCategoryPriorityHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of member category priorities
// @Summary Get a list of member category priorities
// @Description Get a list of member category priorities
// @Tags MemberCategoryPriority
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.MemberCategoryPriorityPage
// @Router /member-category-priority [get]
func (h *MemberCategoryPriorityHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing member category priority
// @Summary Update an existing member category priority
// @Description Update an existing member category priority
// @Tags MemberCategoryPriority
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "MemberCategoryPriority ID"
// @Param MemberCategoryPriority body models.MemberCategoryPriorityDTO true "MemberCategoryPriority data"
// @Success 200 {object} models.MemberCategoryPriorityDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /member-category-priority/{id} [put]
func (h *MemberCategoryPriorityHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing member category priority
// @Summary Delete an existing member category priority
// @Description Delete an existing member category priority
// @Tags MemberCategoryPriority
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "MemberCategoryPriority ID"
// @Success 200 {object} models.MemberCategoryPriority
// @Failure 500 {object} string
// @Router /member-category-priority/{id} [delete]
func (h *MemberCategoryPriorityHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a member category priority by ID
// @Summary Get a member category priority by ID
// @Description Get a member category priority by ID
// @Tags MemberCategoryPriority
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "MemberCategoryPriority ID"
// @Success 200 {object} models.MemberCategoryPriority
// @Failure 500 {object} string
// @Router /member-category-priority/{id} [get]
func (h *MemberCategoryPriorityHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
