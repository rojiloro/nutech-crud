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

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	product, err := h.ProductRepositories.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {
	image := c.Get("dataFile").(string)
	id, _ := strconv.Atoi(c.Param("id"))
	purchase, _ := strconv.Atoi(c.Param("purchase"))
	selling, _ := strconv.Atoi(c.FormValue("selling"))
	qty, _ := strconv.Atoi(c.FormValue("qty"))

	product, err := h.ProductRepositories.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	request := productsdto.UpdateProductRequest{
		Image:    image,
		Name:     c.FormValue("name"),
		Purchase: purchase,
		Selling:  selling,
		Qty:      qty,
	}

	validation := validator.New()
	err = validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Image != "" {
		product.Image = request.Image
	}
	if request.Name != "" {
		product.Name = request.Name
	}
	if request.Purchase != 0 {
		product.Purchase = request.Purchase
	}
	if request.Selling != 0 {
		product.Selling = request.Selling
	}
	if request.Qty != 0 {
		product.Qty = request.Qty
	}

	updateProduct, err := h.ProductRepositories.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: updateProduct})
}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepositories.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ProductRepositories.DeleteProduct(product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
