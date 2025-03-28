package models

import "gorm.io/gorm"

const memberCategoryPriorityTableName = "member_category_priorities"

type MemberCategoryPriority struct {
	gorm.Model
	Priority int `gorm:"default:3" json:"priority"`

	CategoryID uint `gorm:"not null" json:"categoryId"`
	MemberID   uint `gorm:"not null" json:"memberId"`

	Category Category `json:"category"`
	Member   Member   `json:"member"`
}

type MemberCategoryPriorityDTO struct {
	DTO
	Priority int `gorm:"default:3" json:"priority"`

	CategoryID uint `gorm:"not null" json:"categoryId"`
	MemberID   uint `gorm:"not null" json:"memberId"`
}

type MemberCategoryPriorityPage struct {
	ID         uint   `gorm:"primarykey"`
	Priority   int    `gorm:"default:3" json:"priority"`
	CategoryID uint   `gorm:"not null" json:"categoryId"`
	Category   string `json:"category"`
	MemberID   uint   `gorm:"not null" json:"memberId"`
	Member     string `json:"member"`
}

func (MemberCategoryPriorityDTO) TableName() string {
	return memberCategoryPriorityTableName
}
