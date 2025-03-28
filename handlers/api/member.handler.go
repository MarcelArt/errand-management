
package api_handlers

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type MemberHandler struct {
	BaseCrudHandler[models.Member, models.MemberDTO, models.MemberPage]
	repo repositories.IMemberRepo
}

func NewMemberHandler(repo repositories.IMemberRepo) *MemberHandler {
	return &MemberHandler{
		BaseCrudHandler: BaseCrudHandler[models.Member, models.MemberDTO, models.MemberPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new member
// @Summary Create a new member
// @Description Create a new member
// @Tags Member
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Member body models.MemberDTO true "Member data"
// @Success 201 {object} models.MemberDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /member [post]
func (h *MemberHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of members
// @Summary Get a list of members
// @Description Get a list of members
// @Tags Member
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.MemberPage
// @Router /member [get]
func (h *MemberHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing member
// @Summary Update an existing member
// @Description Update an existing member
// @Tags Member
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Member ID"
// @Param Member body models.MemberDTO true "Member data"
// @Success 200 {object} models.MemberDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /member/{id} [put]
func (h *MemberHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing member
// @Summary Delete an existing member
// @Description Delete an existing member
// @Tags Member
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Member ID"
// @Success 200 {object} models.Member
// @Failure 500 {object} string
// @Router /member/{id} [delete]
func (h *MemberHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a member by ID
// @Summary Get a member by ID
// @Description Get a member by ID
// @Tags Member
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Member ID"
// @Success 200 {object} models.Member
// @Failure 500 {object} string
// @Router /member/{id} [get]
func (h *MemberHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
