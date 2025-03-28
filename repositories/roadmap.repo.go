package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"gorm.io/gorm"
)

const roadmapPageQuery = `
	select
		r.*,
		t."name" task,
		m."name" member
	from roadmaps r 
	join tasks t on r.task_id = t.id
	join members m on r.member_id = m.id
`

type IRoadmapRepo interface {
	IBaseCrudRepo[models.Roadmap, models.RoadmapDTO, models.RoadmapPage]
}

type RoadmapRepo struct {
	BaseCrudRepo[models.Roadmap, models.RoadmapDTO, models.RoadmapPage]
}

func NewRoadmapRepo(db *gorm.DB) *RoadmapRepo {
	return &RoadmapRepo{
		BaseCrudRepo: BaseCrudRepo[models.Roadmap, models.RoadmapDTO, models.RoadmapPage]{
			db:        db,
			pageQuery: roadmapPageQuery,
		},
	}
}
