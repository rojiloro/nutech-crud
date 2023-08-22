package models

type Product struct {
	ID          int    `json:"id" gorm:"primarykey:autoIncrement"`
	Image       string `json:"image" gorm:"type: varchar(500)"`
	ProductName string `json:"productName" gorm:"type: varchar(255)"`
	Purchase    int    `json:"purchase"`
	Selling     int    `json:"selling"`
	Qty         int    `json:"qty"`
}
