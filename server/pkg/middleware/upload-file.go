package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		file, err := c.FormFile("image")
		if file != nil {

			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}

			// validate extension
			extension := filepath.Ext(file.Filename)
			if extension != ".png" && extension != ".jpg" {
				return c.JSON(http.StatusBadRequest, "format tidak valid, hanya png dan jpg!")
			}

			//validate file size
			if file.Size > 100*1024 {
				return c.JSON(http.StatusBadRequest, "file tidak boleh lebih dari 100kb")
			}

			src, err := file.Open()
			if err != nil {
				return c.JSON(http.StatusBadRequest, err)
			}
			defer src.Close()

			var ctx = context.Background()
			var CLOUD_NAME = os.Getenv("CLOUD_NAME")
			var API_KEY = os.Getenv("API_KEY")
			var API_SECRET = os.Getenv("API_SECRET")

			cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
			resp, err := cld.Upload.Upload(ctx, src, uploader.UploadParams{Folder: "crud"})
			if err != nil {
				fmt.Println(err)
			}
			c.Set("dataFile", resp.SecureURL)
			return next(c)
		}
		c.Set("dataFile", "")
		return next(c)
	}
}
