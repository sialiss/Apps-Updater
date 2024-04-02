const { app, BrowserWindow, ipcMain, Notification } = require("electron/main")
const path = require("node:path")
const Store = require("electron-store")

const store = new Store()
const timers = new Map()

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
		appId = appId.replace(/\./g, ",")
		{
			const timer = timers.get(appId)
			if (timer) {
				clearTimeout(timer)
			}
		}
		setTimer(appId, dateString)
		store.set(`licences.${appId}`, { dateString })
	})

	ipcMain.handle("clear-notification", (event, appId) => {
		clearLicence(appId.replace(/\./g, ","))
	})

	{
		const licences = store.get("licences")
		for ([appIdEscaped, { dateString }] of Object.entries(licences)) {
			setTimer(appIdEscaped, dateString)
		}
	}
})


app.on("window-all-closed", () => {
	app.quit()
})


function setTimer(appIdEscaped, dateString) {
	const date = new Date(dateString)
	const timeDiff = date - Date.now()
	if (timeDiff > 0) {
		const timer = setTimeout(() => {
			new Notification({
				title: appIdEscaped.replace(/,/g, "."),
				body: "Лицензия приложения истекла!"
			}).show()
			clearLicence(appIdEscaped)
		}, timeDiff)
		timers.set(appIdEscaped, timer)
	}
	else {
		new Notification({
			title: appIdEscaped.replace(/,/g, "."),
			body: "Лицензия приложения истекла!"
		}).show()
		clearLicence(appIdEscaped)
	}
}

function clearLicence(appIdEscaped) {
	store.delete(`licences.${appIdEscaped}`)
	const timer = timers.get(appIdEscaped)
	if (timer) {
		clearTimeout(timer)
	}
}