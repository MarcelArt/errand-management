package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"gorm.io/gorm"
)

const memberCategoryPriorityPageQuery = `
	select
		mcp.*,
		m."name" member,
		c.value category
	from member_category_priorities mcp 
	join members m on mcp.member_id = m.id
	join categories c on mcp.category_id = c.id
`

type IMemberCategoryPriorityRepo interface {
	IBaseCrudRepo[models.MemberCategoryPriority, models.MemberCategoryPriorityDTO, models.MemberCategoryPriorityPage]
}

type MemberCategoryPriorityRepo struct {
	BaseCrudRepo[models.MemberCategoryPriority, models.MemberCategoryPriorityDTO, models.MemberCategoryPriorityPage]
}

func NewMemberCategoryPriorityRepo(db *gorm.DB) *MemberCategoryPriorityRepo {
	return &MemberCategoryPriorityRepo{
		BaseCrudRepo: BaseCrudRepo[models.MemberCategoryPriority, models.MemberCategoryPriorityDTO, models.MemberCategoryPriorityPage]{
			db:        db,
			pageQuery: memberCategoryPriorityPageQuery,
		},
	}
}
