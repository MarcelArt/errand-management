package models

import "gorm.io/gorm"

const categoryTableName = "categories"

type Category struct {
	gorm.Model
	Value string `gorm:"not null" json:"value"`
}

type CategoryDTO struct {
	DTO
	Value string `gorm:"not null" json:"value"`
}

type CategoryPage struct {
	ID    uint   `gorm:"primarykey"`
	Value string `gorm:"not null" json:"value"`
}

func (CategoryDTO) TableName() string {
	return categoryTableName
}
