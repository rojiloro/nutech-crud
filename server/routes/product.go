package routes

import (
	"CRUD/handlers"
	"CRUD/pkg/middleware"
	"CRUD/pkg/mysql"
	"CRUD/repositories"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	product := repositories.RepositoryProduct(mysql.DB)
	h := handlers.HandlerProduct(product)

	e.POST("/product", middleware.UploadFile(h.CreateProduct))
	e.GET("/products", h.FindProducts)
	e.GET("/product/:id", h.GetProduct)
	e.PATCH("/update-product/:id", middleware.UploadFile(h.UpdateProduct))
	e.DELETE("/product/:id", h.DeleteProduct)
}
