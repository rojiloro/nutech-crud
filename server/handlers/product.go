package handlers

import (
	productsdto "CRUD/dto/product"
	dto "CRUD/dto/result"
	"CRUD/models"
	"CRUD/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerProduct struct {
	ProductRepositories repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	image := c.Get("dataFile").(string)
	purchase, _ := strconv.Atoi(c.FormValue("purchase"))
	selling, _ := strconv.Atoi(c.FormValue("selling"))
	qty, _ := strconv.Atoi(c.FormValue("qty"))

	request := productsdto.CreateProductRequest{
		Image:    image,
		Name:     c.FormValue("name"),
		Purchase: purchase,
		Selling:  selling,
		Qty:      qty,
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	product := models.Product{
		ID:       0,
		Image:    request.Image,
		Name:     request.Name,
		Purchase: request.Purchase,
		Selling:  request.Selling,
		Qty:      request.Qty,
	}

	data, err := h.ProductRepositories.CreateProduct(product)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerProduct) FindProducts(c echo.Context) error {
	products, err := h.ProductRepositories.FindProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}

// func (h *handlerProduct) GetProduct(c echo.Context) error {

// }

// func (h *handlerProduct) UpdateProduct(c echo.Context) error {

// }

// func (h *handlerProduct) DeleteProduct(c echo.Context) error {

// }
