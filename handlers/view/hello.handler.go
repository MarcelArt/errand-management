package view_handlers

import (
	"github.com/MarcelArt/errand-management/utils"
	"github.com/MarcelArt/errand-management/views/hello"
	"github.com/gofiber/fiber/v2"
)

func HelloWorldView(c *fiber.Ctx) error {
	return utils.Render(c, hello.Show("marcel"))
}
