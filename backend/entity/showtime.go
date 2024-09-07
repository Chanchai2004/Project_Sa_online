package entity

import (
    "time"
    "gorm.io/gorm"
)

type ShowTimes struct {
    gorm.Model
    Showdate  time.Time
    MovieID   *uint
    Movie     Movie `gorm:"foreignKey:MovieID"`
    TheaterID *uint
    Theater   Theater `gorm:"foreignKey:TheaterID"`
    //Tickets   []Ticket `gorm:"foreignKey:ShowTimesID"`
}
