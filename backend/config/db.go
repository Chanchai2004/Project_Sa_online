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

	hashedPassword2, _ := HashPassword("12353456")
	Member2 := &entity.Member{
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

	movies := []entity.Movie{
		{MovieName: "Inception", MovieDuration: 148, MovieType: "Sci-Fi", Director: "Christopher Nolan", Actor: "Leonardo DiCaprio", Synopsis: "A skilled thief is offered a chance to have his past crimes forgiven.", ReleaseDate: "2010-07-16", Poster: nil},
		{MovieName: "The Dark Knight", MovieDuration: 152, MovieType: "Action", Director: "Christopher Nolan", Actor: "Christian Bale", Synopsis: "Batman raises the stakes in his war on crime.", ReleaseDate: "2008-07-18", Poster: nil},
		{MovieName: "Interstellar", MovieDuration: 169, MovieType: "Sci-Fi", Director: "Christopher Nolan", Actor: "Matthew McConaughey", Synopsis: "A team of explorers travel through a wormhole in space.", ReleaseDate: "2014-11-07", Poster: nil},
	}
	

	for _, movie := range movies {
		db.FirstOrCreate(&movie, entity.Movie{MovieName: movie.MovieName})
	}

	// สร้างข้อมูลโรงหนัง
	theaters := []entity.Theater{
		{TheaterName: "Theater 1"},
		{TheaterName: "Theater 2"},
		{TheaterName: "Theater 3"},
		{TheaterName: "Theater 4"},
		{TheaterName: "Theater 5"},
		{TheaterName: "Theater 6"},
	}

	for _, theater := range theaters {
		db.FirstOrCreate(&theater, entity.Theater{TheaterName: theater.TheaterName})
	}
}
