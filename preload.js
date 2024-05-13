const { contextBridge, ipcRenderer } = require("electron")
const { exec } = require("child_process")
const Store = require("electron-store")

const store = new Store()

contextBridge.exposeInMainWorld("Apps", {
    list: () => {
        return new Promise((res, rej) => {
            // returns string of lines where values are saparated by \t in the following format:
            // name id  version
            exec("flatpak list", (error, stdout) => {
                if (error) {
                    rej(error)
                }
                else {
                    res(
                        stdout
                            .split("\n") // split lines
                            .filter(n => n.replace(/\s+/, "").length) // skip empty lines (just in case)
                            .map(line => line.split("\t")) // separate each line into array of values
                            .map(line => ({ name: line[0], id: line[1], version: line[2] })) // put values into an object
                    )
                }
            })
        })
    },
    info: (appId) => {
        return new Promise((res, rej) => {
            exec(`flatpak info ${appId}`, (error, stdout) => {
                if (error) {
                    rej(error)
                }
                else {
                    res(stdout)
                }
            })
        })
    },
    update: (appId) => {
        return new Promise((res, rej) => {
            exec(`flatpak update -y ${appId}`, (error, stdout) => {
                if (error) {
                    rej(error)
                }
                else {
                    res(stdout)
                    alert('Приложение было обновлено!')
                }
            })
        })
    },
    run: (appId) => {
        return new Promise((res, rej) => {
            exec(`flatpak run ${appId}`, (error, stdout) => {
                if (error) {
                    rej(error)
                }
                else {
                    res(stdout)
                }
            })
        })
    },
    uninstall: (appId) => {
        return new Promise((res, rej) => {
            exec(`flatpak uninstall -y ${appId}`, (error, stdout) => {
                if (error) {
                    rej(error)
                }
                else {
                    res(stdout)
                }
            })
        })
    },
    notify: (appId, dateString) => {
        ipcRenderer.invoke("notify", appId, dateString)
    },
    clearNotification: (appId) => {
        ipcRenderer.invoke("clear-notification", appId)
    },
    licences: () => {
        return store.get("licences")
    }
})