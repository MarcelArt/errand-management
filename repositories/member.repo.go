package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"github.com/gofiber/fiber/v2"
	"github.com/morkid/paginate"
	"gorm.io/gorm"
)

const memberPageQuery = "select * from members where deleted_at is null"

type IMemberRepo interface {
	IBaseCrudRepo[models.Member, models.MemberDTO, models.MemberPage]
	WithCategoryPriorities(c *fiber.Ctx) paginate.Page
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

func (r *MemberRepo) WithCategoryPriorities(c *fiber.Ctx) paginate.Page {
	var datas []models.MemberWithCategoryPriority
	query := `
		select 
			mcp.id id,
			m.id member_id,
			m."name" name,
			c.id category_id,
			c.value category,
			coalesce(mcp.priority, 3) priority,
			c.deleted_at category_deleted_at
		from members m 
		left join member_category_priorities mcp on m.id = mcp.member_id
		cross join categories c 
		where c.deleted_at is null
	`
	pg := paginate.New()

	stmt := r.db.Raw(query)
	return pg.With(stmt).Request(c.Request()).Response(&datas)
}
