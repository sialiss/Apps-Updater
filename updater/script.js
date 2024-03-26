async function info(appId) {
    try {
        return await Apps.info(appId)
    }
    catch(error) {
        console.error(error)
        return "Choose an app!"
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
    const appInfo = await info(appId)
    mainEl.textContent = appInfo

    const update_btn = document.createElement("button")
    update_btn.className = "update-btn"
    update_btn.innerText = "update"
    mainEl.appendChild(update_btn)

    const run_btn = document.createElement("button")
    run_btn.className = "run-btn"
    run_btn.innerText = "run"
    mainEl.appendChild(run_btn)

    const uninstall_btn = document.createElement("button")
    uninstall_btn.className = "uninstall-btn"
    uninstall_btn.innerText = "uninstall"
    mainEl.appendChild(uninstall_btn)

    update_btn.addEventListener("click", async () => { await update(appId) })
    run_btn.addEventListener("click", async () => { await run(appId) })
    uninstall_btn.addEventListener("click", async () => { await uninstall(appId) })
})