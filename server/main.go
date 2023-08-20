package main

import (
	"CRUD/database"
	"CRUD/pkg/mysql"
	"CRUD/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {
	godotenv.Load()
    e := echo.New()
    mysql.DatabaseInit()
	database.RunMigration()

	routes.RouteInit(e.Group("/api/v1"))

	
    e.Logger.Fatal(e.Start("localhost:5000"))
}