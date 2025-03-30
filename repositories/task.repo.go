package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"gorm.io/gorm"
)

const taskPageQuery = `
	select
		t.*,
		c.value category
	from tasks t 
	join categories c on t.category_id = c.id
	where t.deleted_at is null
`

type ITaskRepo interface {
	IBaseCrudRepo[models.Task, models.TaskDTO, models.TaskPage]
}

type TaskRepo struct {
	BaseCrudRepo[models.Task, models.TaskDTO, models.TaskPage]
}

func NewTaskRepo(db *gorm.DB) *TaskRepo {
	return &TaskRepo{
		BaseCrudRepo: BaseCrudRepo[models.Task, models.TaskDTO, models.TaskPage]{
			db:        db,
			pageQuery: taskPageQuery,
		},
	}
}
