package models

import (
	"time"

	"gorm.io/gorm"
)

const roadmapTableName = "roadmaps"

type Roadmap struct {
	gorm.Model
	StartAt    time.Time `gorm:"not null" json:"startAt"`
	FinishedAt time.Time `gorm:"not null" json:"finishedAt"`

	TaskID   uint `gorm:"not null" json:"taskId"`
	MemberID uint `gorm:"not null" json:"memberId"`

	Task   Task   `json:"task"`
	Member Member `json:"member"`
}

type RoadmapDTO struct {
	DTO
	StartAt    time.Time `gorm:"not null" json:"startAt"`
	FinishedAt time.Time `gorm:"not null" json:"finishedAt"`

	TaskID   uint `gorm:"not null" json:"taskId"`
	MemberID uint `gorm:"not null" json:"memberId"`
}

type RoadmapPage struct {
	ID         uint      `gorm:"primarykey"`
	StartAt    time.Time `gorm:"not null" json:"startAt"`
	FinishedAt time.Time `gorm:"not null" json:"finishedAt"`
	TaskID     uint      `gorm:"not null" json:"taskId"`
	MemberID   uint      `gorm:"not null" json:"memberId"`
}

func (RoadmapDTO) TableName() string {
	return roadmapTableName
}
