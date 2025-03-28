package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"gorm.io/gorm"
)

const statusUpdatePageQuery = `
	select
		su.*,
		t."name" task
	from status_updates su 
	join tasks t on su.task_id = t.id
`

type IStatusUpdateRepo interface {
	IBaseCrudRepo[models.StatusUpdate, models.StatusUpdateDTO, models.StatusUpdatePage]
}

type StatusUpdateRepo struct {
	BaseCrudRepo[models.StatusUpdate, models.StatusUpdateDTO, models.StatusUpdatePage]
}

func NewStatusUpdateRepo(db *gorm.DB) *StatusUpdateRepo {
	return &StatusUpdateRepo{
		BaseCrudRepo: BaseCrudRepo[models.StatusUpdate, models.StatusUpdateDTO, models.StatusUpdatePage]{
			db:        db,
			pageQuery: statusUpdatePageQuery,
		},
	}
}
