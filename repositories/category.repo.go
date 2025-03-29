package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"gorm.io/gorm"
)

const categoryPageQuery = "select * from categories where deleted_at is null"

type ICategoryRepo interface {
	IBaseCrudRepo[models.Category, models.CategoryDTO, models.CategoryPage]
}

type CategoryRepo struct {
	BaseCrudRepo[models.Category, models.CategoryDTO, models.CategoryPage]
}

func NewCategoryRepo(db *gorm.DB) *CategoryRepo {
	return &CategoryRepo{
		BaseCrudRepo: BaseCrudRepo[models.Category, models.CategoryDTO, models.CategoryPage]{
			db:        db,
			pageQuery: categoryPageQuery,
		},
	}
}
