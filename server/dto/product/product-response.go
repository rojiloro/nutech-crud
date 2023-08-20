package productsdto

type CreateProductResponse struct {
	ID       int    `json:"id"`
	Image    string `json:"image" form:"image"`
	Name     string `json:"name" form:"name" validate:"required"`
	Purchase int    `json:"purchase" form:"purchase" validate:"required"`
	Selling  int    `json:"selling" form:"selling" validate:"required"`
	Qty      int    `json:"qty" form:"qty" validate:"required"`
}
