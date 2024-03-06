async function list() {
    try {
        const apps = await Apps.list()
        return apps
    }
    catch(error) {
        console.error(error)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const programsEl = document.querySelector(".programs")
    for (const app of await list()) {
        const el = document.createElement("button")
        el.className = "program"
        el.innerHTML = `<p class="name">${app.name}</p><p class="version">${app.version}</p>`
        programsEl.appendChild(el)

        el.addEventListener("click", () => {
            sessionStorage.setItem("currentApp", app.id)
            location = "../updater/updater.html"
        })
    }
})