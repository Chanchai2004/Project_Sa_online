package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tanapon395/sa-67-example/config"
	"github.com/tanapon395/sa-67-example/controller"
)

const PORT = "8000"

func main() {

	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// เปลี่ยนเส้นทางของกลุ่ม route ให้มี prefix เป็น /api
	router := r.Group("api")
	{
		// Member Routes
		router.GET("/members", controller.ListMembers)
		router.GET("/member/:id", controller.GetMember)
		router.POST("/members", controller.CreateMember)
		router.PATCH("/members", controller.UpdateMember)
		router.DELETE("/members/:id", controller.DeleteMember)

		// Movie Routes
		router.GET("/movies", controller.ListMovies)         // แสดงรายการหนังทั้งหมด
		router.GET("/movie/:id", controller.GetMovie)        // แสดงรายละเอียดหนังโดยใช้ ID
		router.POST("/movies", controller.CreateMovie)       // เพิ่มหนังใหม่พร้อมโปสเตอร์ (รับไฟล์ poster)
		router.PATCH("/movies/:id", controller.UpdateMovie)  // อัปเดตข้อมูลหนังพร้อมโปสเตอร์ (รับไฟล์ poster)
		router.DELETE("/movies/:id", controller.DeleteMovie) // ลบหนังโดยใช้ ID
		router.GET("/movie/:id/poster", controller.GetMoviePosterByID)

		// Theater Routes
		router.GET("/theaters", controller.ListTheaters)

		// Showtime Routes
		router.POST("/showtimes", controller.CreateShowTime)
		router.GET("/showtimes/:id", controller.GetShowTime)
		router.GET("/showtimes", controller.ListShowTimes)
		router.PATCH("/showtimes/:id", controller.UpdateShowTime)
		router.DELETE("/showtimes/:id", controller.DeleteShowTime)
		router.DELETE("/showtimes", controller.DeleteShowTimeByDetails) // เพิ่มเส้นทางสำหรับการลบโดยใช้รายละเอียด
	}

	// เส้นทางหลักสำหรับตรวจสอบการทำงานของ API
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server
	r.Run("localhost:" + PORT)
}

// CORS middleware สำหรับอนุญาตการเชื่อมต่อจากทุกที่
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
