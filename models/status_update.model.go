package models

import "gorm.io/gorm"

const statusUpdateTableName = "status_updates"

type StatusUpdate struct {
	gorm.Model
	Note string `gorm:"not null" json:"note"`

	TaskID uint `gorm:"not null" json:"taskId"`

	Task Task `json:"task"`
}

type StatusUpdateDTO struct {
	DTO
	Note string `gorm:"not null" json:"note"`

	TaskID uint `gorm:"not null" json:"taskId"`
}

type StatusUpdatePage struct {
	ID     uint   `gorm:"primarykey"`
	Note   string `gorm:"not null" json:"note"`
	TaskID uint   `gorm:"not null" json:"taskId"`
	Task   string `json:"task"`
}

func (StatusUpdateDTO) TableName() string {
	return statusUpdateTableName
}
