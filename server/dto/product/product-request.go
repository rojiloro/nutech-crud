package productsdto

type CreateProductRequest struct {
	Image    string `json:"image" form:"image"`
	Name     string `json:"name" form:"name" validate:"required"`
	Purchase int    `json:"purchase" form:"purchase" validate:"required"`
	Selling  int    `json:"selling" form:"selling" validate:"required"`
	Qty      int    `json:"qty" form:"qty" validate:"required"`
}

type UpdateProductRequest struct {
	Image    string `json:"image" form:"image"`
	Name     string `json:"name" form:"name"`
	Purchase int    `json:"purchase" form:"purchase"`
	Selling  int    `json:"selling" form:"selling"`
	Qty      int    `json:"qty" form:"qty"`
}
