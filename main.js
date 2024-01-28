const { app, BrowserWindow } = require("electron/main")
const path = require("node:path")


app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	})
	
	
	win.loadFile("index.html")
})


app.on('window-all-closed', () => {
	app.quit()
})
