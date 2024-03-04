const { contextBridge } = require("electron")
const { exec } = require("child_process")

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
                        .filter(n=>n.replace(/\s+/, "").length) // skip empty lines (just in case)
                        .map(line => line.split("\t")) // separate each line into array of values
                        .map(line => ({name:line[0], id:line[1], version:line[2]})) // put values into an object
                    )
                }
            })
        })
    }
})