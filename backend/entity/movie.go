package entity

import (
    "gorm.io/gorm"
)

type Movie struct {
    gorm.Model
    MovieName     string        `gorm:"type:varchar(255);not null"` // ชื่อภาพยนตร์
	MovieDuration int           `gorm:"type:int"`                   // เปลี่ยนเป็นหน่วยนาที
    MovieType     string        `gorm:"type:varchar(100)"`          // ประเภทภาพยนตร์
    Director      string        `gorm:"type:varchar(255)"`          // ผู้กำกับ
    Actor         string        `gorm:"type:varchar(255)"`          // นักแสดง
    Synopsis      string        `gorm:"type:text"`                  // เรื่องย่อ
    ReleaseDate   string        `gorm:"type:varchar(100)"`          // เก็บวันที่ในรูปแบบ string
    Poster        []byte        `gorm:"type:blob"`                  // เก็บภาพโปสเตอร์เป็น blob
}
