var __author__ = "kubik.augustyn@post.cz"

var hours_names = $$.Data.http("GET", "hours.array").responseText.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n")

var hours = []

for (var hour_name of hours_names) {
    if (hour_name.length && hour_name[0] !== "#") {
        var hour = new Hour(hour_name)
        hour.onAfterLoad = () => {
            window.scrollTo(0, document.body.scrollHeight)
        }
        hours.push(hour)
    }
}

function renderHours(container, hours) {
    console.log("Render hours:", hours)
    container.innerHTML = hours.length ? "" : "<h1>No hours yet</h1><h2>This place feels so empty</h2>"
    for (var hour of hours) {
        container.appendChild(hour.div)
    }
}

renderHours(document.getElementById("notes"), hours)
document.body.removeChild(document.getElementById("loading"))
