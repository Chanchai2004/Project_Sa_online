package config

import (
	"fmt"


	"github.com/tanapon395/sa-67-example/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Member{},
		&entity.Gender{},
		&entity.Movie{},
		&entity.Theater{},
		&entity.ShowTimes{},
	)

	
	

	Theater1 := entity.Theater{
		TheaterName: "Theater 1",
	}
	db.FirstOrCreate(&Theater1, entity.Theater{TheaterName: "Theater 1"})

	
// สร้างข้อมูลเพศ
GenderMale := entity.Gender{Name: "Male"}
GenderFemale := entity.Gender{Name: "Female"}

db.FirstOrCreate(&GenderMale, &entity.Gender{Name: "Male"})
db.FirstOrCreate(&GenderFemale, &entity.Gender{Name: "Female"})

// สร้างข้อมูลสมาชิก
hashedPassword, _ := HashPassword("123456")
Member := &entity.Member{
	UserName:   "software_analysis", // เพิ่ม Username
	FirstName:  "Software",
	LastName:   "Analysis",
	Email:      "sa@gmail.com",
	Password:   hashedPassword,
	GenderID:   1,
	TotalPoint: 2,
	Role:       "user", // เพิ่ม Role สำหรับสมาชิก
}

db.FirstOrCreate(Member, &entity.Member{
	Email: "sa@gmail.com",
})

hashedPassword2, _ := HashPassword("123")
Member2 := &entity.Member{
	UserName:   "software_analysis2", // เพิ่ม Username
	FirstName:  "Software2",
	LastName:   "Analysis2",
	Email:      "sa2@gmail.com",
	Password:   hashedPassword2,
	GenderID:   1,
	TotalPoint: 5,
	Role:       "admin", // เพิ่ม Role สำหรับสมาชิก
}

db.FirstOrCreate(Member2, &entity.Member{
	Email: "sa2@gmail.com",
})


	// สร้างข้อมูลโรงหนัง
	theaters := []entity.Theater{
		{TheaterName: "Theater 1"},
		{TheaterName: "Theater 2"},
		{TheaterName: "Theater 3"},
		{TheaterName: "Theater 4"},
		{TheaterName: "Theater 5"},
		{TheaterName: "Theater 6"},
		{TheaterName: "Theater 7"},
		{TheaterName: "Theater 8"},
		{TheaterName: "Theater 9"},
		{TheaterName: "Theater 10"},
		{TheaterName: "Theater 11"},
		{TheaterName: "Theater 12"},
		{TheaterName: "Theater 13"},
		{TheaterName: "Theater 14"},
		{TheaterName: "Theater 15"},
		{TheaterName: "Theater 16"},
		{TheaterName: "Theater 17"},
		{TheaterName: "Theater 18"},
	}

	for _, theater := range theaters {
		db.FirstOrCreate(&theater, entity.Theater{TheaterName: theater.TheaterName})
	}
}
