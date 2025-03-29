package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"gorm.io/gorm"
)

const memberPageQuery = "select * from members where deleted_at is null"

type IMemberRepo interface {
	IBaseCrudRepo[models.Member, models.MemberDTO, models.MemberPage]
}

type MemberRepo struct {
	BaseCrudRepo[models.Member, models.MemberDTO, models.MemberPage]
}

func NewMemberRepo(db *gorm.DB) *MemberRepo {
	return &MemberRepo{
		BaseCrudRepo: BaseCrudRepo[models.Member, models.MemberDTO, models.MemberPage]{
			db:        db,
			pageQuery: memberPageQuery,
		},
	}
}
