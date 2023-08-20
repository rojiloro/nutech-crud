package models

type Product struct {
	ID       int    `json:"id" gorm:"primarykey:autoIncrement"`
	Image    string `json:"image" gorm:"type: varchar(500)"`
	Name     string `json:"name" gorm:"type: varchar(255), unique"`
	Purchase int    `json:"purchase"`
	Selling  int    `json:"selling"`
	Qty      int    `json:"qty"`
}
