async function info(appId) {
    try {
        return await Apps.info(appId)
    }
    catch(error) {
        console.error(error)
        return "Info unavailable!"
    }
}

async function update(appId) {
    try {
        return await Apps.update(appId)
    }
    catch(error) {
        console.error(error)
        return "Oh no an error!"
    }
}

async function run(appId) {
    try {
        return await Apps.run(appId)
    }
    catch(error) {
        console.error(error)
        return "Oh no an error!"
    }
}

async function uninstall(appId) {
    try {
        return await Apps.uninstall(appId)
    }
    catch(error) {
        console.error(error)
        return "Oh no an error!"
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const appId = sessionStorage.getItem("currentApp")
    const mainEl = document.querySelector(".app-info")
    const appName = document.querySelector(".app-name")

    if (appId) {
        appName.innerText = appId

        const appInfo = await info(appId)
        mainEl.textContent = appInfo

        const btns_container = document.querySelector(".buttons-container")
    
        const update_btn = document.createElement("button")
        const run_btn = document.createElement("button")
        const uninstall_btn = document.createElement("button")

        update_btn.className, run_btn.className, uninstall_btn.className = "buttons"
        
        update_btn.innerText = "update"
        run_btn.innerText = "run"
        uninstall_btn.innerText = "uninstall"

        btns_container.appendChild(update_btn)
        btns_container.appendChild(run_btn)
        btns_container.appendChild(uninstall_btn)

        update_btn.addEventListener("click", async () => { await update(appId) })
        run_btn.addEventListener("click", async () => { await run(appId) })
        uninstall_btn.addEventListener("click", async () => { await uninstall(appId) })
        
        // notifications
        const license_settings_container = document.querySelector("#license-settings")

        const dateEl = document.querySelector("#expiration-date")
        const timeEl = document.querySelector("#expiration-time")
        const notifyEl = document.querySelector("#notify")

        notifyEl.addEventListener("change", () => {
            // notification enabled
            if (notifyEl.checked) {
                const dateString = `${dateEl.value} ${timeEl.value}`
                Apps.notify(appId, dateString)
            }
            // notification disabled
            else {
                
            }
        })

        license_settings_container.classList.remove("hidden")
    }
    else {
        appName.innerText = "Choose an app!"
    }
})