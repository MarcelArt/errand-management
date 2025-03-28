
package api_handlers

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/MarcelArt/errand-management/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type TaskHandler struct {
	BaseCrudHandler[models.Task, models.TaskDTO, models.TaskPage]
	repo repositories.ITaskRepo
}

func NewTaskHandler(repo repositories.ITaskRepo) *TaskHandler {
	return &TaskHandler{
		BaseCrudHandler: BaseCrudHandler[models.Task, models.TaskDTO, models.TaskPage]{
			repo: repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new task
// @Summary Create a new task
// @Description Create a new task
// @Tags Task
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Task body models.TaskDTO true "Task data"
// @Success 201 {object} models.TaskDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /task [post]
func (h *TaskHandler) Create(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Create(c)
}

// Read retrieves a list of tasks
// @Summary Get a list of tasks
// @Description Get a list of tasks
// @Tags Task
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.TaskPage
// @Router /task [get]
func (h *TaskHandler) Read(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Read(c)
}

// Update updates an existing task
// @Summary Update an existing task
// @Description Update an existing task
// @Tags Task
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Task ID"
// @Param Task body models.TaskDTO true "Task data"
// @Success 200 {object} models.TaskDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /task/{id} [put]
func (h *TaskHandler) Update(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Update(c)
}

// Delete deletes an existing task
// @Summary Delete an existing task
// @Description Delete an existing task
// @Tags Task
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Task ID"
// @Success 200 {object} models.Task
// @Failure 500 {object} string
// @Router /task/{id} [delete]
func (h *TaskHandler) Delete(c *fiber.Ctx) error {
	return h.BaseCrudHandler.Delete(c)
}

// GetByID retrieves a task by ID
// @Summary Get a task by ID
// @Description Get a task by ID
// @Tags Task
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "Task ID"
// @Success 200 {object} models.Task
// @Failure 500 {object} string
// @Router /task/{id} [get]
func (h *TaskHandler) GetByID(c *fiber.Ctx) error {
	return h.BaseCrudHandler.GetByID(c)
}
