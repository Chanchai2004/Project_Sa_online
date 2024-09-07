package entity

import (
	

	"gorm.io/gorm"
)

type Theater struct {
	gorm.Model
	TheaterName  string
	

	
}
