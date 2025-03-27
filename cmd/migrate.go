package cmd

import (
	"os"

	"github.com/MarcelArt/errand-management/config"
	"github.com/MarcelArt/errand-management/database"
)

func Migrate(arg string) {
	switch arg {
	case "up":
		config.SetupENV()
		database.ConnectDB()
		database.MigrateDB()
	case "down":
		config.SetupENV()
		database.ConnectDB()
		database.DropDB()
	default:
		println("Unknown command")
		os.Exit(0)
	}
}
