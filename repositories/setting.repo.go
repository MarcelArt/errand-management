package repositories

import (
	"github.com/MarcelArt/errand-management/models"
	"gorm.io/gorm"
)

const settingPageQuery = "select * from settings"

type ISettingRepo interface {
	IBaseCrudRepo[models.Setting, models.SettingDTO, models.SettingPage]
}

type SettingRepo struct {
	BaseCrudRepo[models.Setting, models.SettingDTO, models.SettingPage]
}

func NewSettingRepo(db *gorm.DB) *SettingRepo {
	return &SettingRepo{
		BaseCrudRepo: BaseCrudRepo[models.Setting, models.SettingDTO, models.SettingPage]{
			db:        db,
			pageQuery: settingPageQuery,
		},
	}
}
