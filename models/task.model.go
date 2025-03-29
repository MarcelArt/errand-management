package models

import (
	"time"

	"gorm.io/gorm"
)

const taskTableName = "tasks"

type Task struct {
	gorm.Model
	Priority     uint      `gorm:"default:5" json:"priority"`
	Name         string    `gorm:"not null" json:"name"`
	Eta          float64   `gorm:"not null" json:"eta"`
	RemainingEta float64   `gorm:"not null" json:"remainingEta"`
	IsAvailable  bool      `gorm:"not null" json:"isAvailable"`
	DoneAt       time.Time `json:"doneAt"`
	CategoryID   uint      `gorm:"not null" json:"categoryId"`

	Category Category `json:"category"`
}

type TaskDTO struct {
	DTO
	Priority     uint      `gorm:"default:5" json:"priority"`
	Name         string    `gorm:"not null" json:"name"`
	Eta          float64   `gorm:"not null" json:"eta"`
	RemainingEta float64   `gorm:"not null" json:"remainingEta"`
	IsAvailable  bool      `gorm:"not null" json:"isAvailable"`
	DoneAt       time.Time `json:"doneAt"`
	CategoryID   uint      `gorm:"not null" json:"categoryId"`
}

type TaskPage struct {
	ID           uint      `gorm:"primarykey"`
	Priority     uint      `gorm:"default:5" json:"priority"`
	Name         string    `gorm:"not null" json:"name"`
	Eta          float64   `gorm:"not null" json:"eta"`
	RemainingEta float64   `gorm:"not null" json:"remainingEta"`
	IsAvailable  bool      `gorm:"not null" json:"isAvailable"`
	DoneAt       time.Time `json:"doneAt"`
	CategoryID   uint      `gorm:"not null" json:"categoryId"`
	Category     string    `json:"category"`
}

func (TaskDTO) TableName() string {
	return taskTableName
}
