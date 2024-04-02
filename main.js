const { app, BrowserWindow, ipcMain, Notification } = require("electron/main")
const path = require("node:path")


app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		}
	})

	win.loadFile("index/index.html")

	ipcMain.handle("notify", (event, appId, dateString) => {
		const date = new Date(dateString)
        const timeDiff = date - Date.now()
        if (timeDiff > 0) {
            setTimeout(() => {
                new Notification({
                    title: appId,
                    body: "Лицензия приложения истекла!"
                }).show()
            }, timeDiff)
        }
	})
})


app.on('window-all-closed', () => {
	app.quit()
})
