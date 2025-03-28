package models

import "gorm.io/gorm"

const memberTableName = "members"

type Member struct {
	gorm.Model
	Name    string  `gorm:"not null" json:"name"`
	MaxLoad float64 `gorm:"not null" json:"maxLoad"`
}

type MemberDTO struct {
	DTO
	Name    string  `gorm:"not null" json:"name"`
	MaxLoad float64 `gorm:"not null" json:"maxLoad"`
}

type MemberPage struct {
	ID      uint    `gorm:"primarykey"`
	Name    string  `gorm:"not null" json:"name"`
	MaxLoad float64 `gorm:"not null" json:"maxLoad"`
}

func (MemberDTO) TableName() string {
	return memberTableName
}
