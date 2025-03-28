package models

import (
	"gorm.io/gorm"
)

const settingTableName = "settings"

type Setting struct {
	gorm.Model
	IsPrioritizeInProgress bool   `gorm:"not null" json:"isPrioritizeInProgress"`
	Lang                   string `gorm:"default:en" json:"lang"`
	IsAuto                 bool   `gorm:"not null" json:"isAuto"`
}

type SettingDTO struct {
	DTO
	IsPrioritizeInProgress bool   `gorm:"not null" json:"isPrioritizeInProgress"`
	Lang                   string `gorm:"default:en" json:"lang"`
	IsAuto                 bool   `gorm:"not null" json:"isAuto"`
}

type SettingPage struct {
	ID                     uint   `gorm:"primarykey"`
	IsPrioritizeInProgress bool   `gorm:"not null" json:"isPrioritizeInProgress"`
	Lang                   string `gorm:"default:en" json:"lang"`
	IsAuto                 bool   `gorm:"not null" json:"isAuto"`
}

func (SettingDTO) TableName() string {
	return settingTableName
}
