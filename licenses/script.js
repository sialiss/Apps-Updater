document.addEventListener("DOMContentLoaded", async () => {
    const appId = sessionStorage.getItem("currentApp")
    const appName = document.querySelector(".app-name")

    if (appId) {
        appName.innerText = appId
        
        const dateEl = document.querySelector("#expiration-date")
        const timeEl = document.querySelector("#expiration-time")
        const notifyEl = document.querySelector("#notify")

        notifyEl.addEventListener("change", () => {
            // notification enabled
            if (notifyEl.checked) {
                const dateString = `${dateEl.value} ${timeEl.value}`
                const date = new Date(dateString)
                const timeDiff = date - Date.now()
                if (timeDiff > 0) {
                    setTimeout(() => {
                        new Notification(appId, {
                            body: "License expired! Check your license."
                        })
                    }, timeDiff)
                }
            }
            // notification disabled
            else {
                
            }
        })

        const btns_container = document.querySelector(".buttons-container")
        btns_container.classList.remove("hidden")
    }
    else {
        appName.innerText = "Choose an app!"
    }
})