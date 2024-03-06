async function info(appId) {
    try {
        return await Apps.info(appId)
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
})