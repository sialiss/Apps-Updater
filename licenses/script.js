document.addEventListener("DOMContentLoaded", async () => {
    const mainEl = document.querySelector(".main")

    for ([appIdEscaped, { dateString }] of Object.entries(Apps.licences())) {
        const appId = appIdEscaped.replace(/,/g, ".")
        const appEl = document.createElement("p")
        appEl.innerText = `${appId} истекает ${dateString}`
        mainEl.append(appEl)
    }
})