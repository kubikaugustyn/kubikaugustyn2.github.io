var __author__ = "kubik.augustyn@post.cz"

function addSubwaySurfObject(key, url, name, cache = true) {
    subwaySurfObjects[key] = {
        url,
        name,
        value: undefined
    }
    if (cache && localStorage.getItem("responseText:" + url)) {
        subwaySurfObjects[key].value = JSON.parse(localStorage.getItem("responseText:" + url))
    } else {
        var http = new XMLHttpRequest()
        http.open("GET", url, false)
        http.send()
        if (cache) localStorage.setItem("responseText:" + url, http.responseText)
        subwaySurfObjects[key].value = JSON.parse(http.responseText)
    }
    return subwaySurfObjects[key]
}

var subwaySurfObjects = {}
var path = "https://kuba-apis.web.app/other/mobile/android/data/com.kiloo.subwaysurf/files/tower/gamedata/objects/"
addSubwaySurfObject("runConfiguration", path + "0b4da150333f0973904e34727609328689436e68-runConfiguration", "0b4da150333f0973904e34727609328689436e68-runConfiguration")
addSubwaySurfObject("userIngameCommunication", path + "15a03e7810526a50c3be10bea87c438baff361ce-userIngameCommunication", "15a03e7810526a50c3be10bea87c438baff361ce-userIngameCommunication")
addSubwaySurfObject("missions", path + "17b4acc6f948ea3d55bbb7ceb95923b07bc64f33-missions", "17b4acc6f948ea3d55bbb7ceb95923b07bc64f33-missions")
addSubwaySurfObject("topRun", path + "3a0d24006eef0071b04d904f19fceb0510ddfcaa-topRun", "3a0d24006eef0071b04d904f19fceb0510ddfcaa-topRun")
addSubwaySurfObject("spawnChances", path + "3f8eab6e59e98cf813e0ff66b83317e6b01c9aa5-spawnChances", "3f8eab6e59e98cf813e0ff66b83317e6b01c9aa5-spawnChances")
addSubwaySurfObject("scheduler", path + "512c2ea325539d70b92440910eec0e0b98de7b94-scheduler", "512c2ea325539d70b92440910eec0e0b98de7b94-scheduler")
addSubwaySurfObject("popups", path + "58781cd7d168cf37fe747015c91fee72d839a87d-popups", "58781cd7d168cf37fe747015c91fee72d839a87d-popups")
addSubwaySurfObject("rewardedPopups", path + "5902e2065da58be3cc0ac908d26ce9f037b39461-rewardedPopups", "5902e2065da58be3cc0ac908d26ce9f037b39461-rewardedPopups")
addSubwaySurfObject("achievements", path + "606d5ca303585a0561887c78148a5cdfeed46459-achievements", "606d5ca303585a0561887c78148a5cdfeed46459-achievements")
addSubwaySurfObject("shop", path + "6709623aa2aadee691ed2d25046f359fe9d785db-shop", "6709623aa2aadee691ed2d25046f359fe9d785db-shop")
addSubwaySurfObject("products", path + "757e052316a559384984b6d1a8fa7598c55ec071-products", "757e052316a559384984b6d1a8fa7598c55ec071-products")
addSubwaySurfObject("hunts", path + "85f68372c37e974f09587c976bfb25aedae1b737-hunts", "85f68372c37e974f09587c976bfb25aedae1b737-hunts")
addSubwaySurfObject("leaderboards", path + "9aa0e3af28c5c5ed658ceaf42871efdd325a2ce4-leaderboards", "9aa0e3af28c5c5ed658ceaf42871efdd325a2ce4-leaderboards")
addSubwaySurfObject("general", path + "9d7d115af68fdfc6e5deea9b0e18a4d34217f5af-general", "9d7d115af68fdfc6e5deea9b0e18a4d34217f5af-general")
addSubwaySurfObject("boards", path + "ac3b3489198cdf4976eeb748b35b4c71d2569469-boards", "ac3b3489198cdf4976eeb748b35b4c71d2569469-boards")
addSubwaySurfObject("ageGroups", path + "b9d1af3ad0b8e538dbae493029314f892b4c7f7c-ageGroups", "b9d1af3ad0b8e538dbae493029314f892b4c7f7c-ageGroups")
addSubwaySurfObject("liveEvents", path + "c0867c30bc00e682a129d745eb3f92dd398d4050-liveEvents", "c0867c30bc00e682a129d745eb3f92dd398d4050-liveEvents")
addSubwaySurfObject("mailbox", path + "e1501b727d5eb6a54b0f17a8825ae147aa49bac4-mailbox", "e1501b727d5eb6a54b0f17a8825ae147aa49bac4-mailbox")
addSubwaySurfObject("lootBoxes", path + "e6edc808af2a265ea86df5956017ebaa1bb88253-lootboxes", "e6edc808af2a265ea86df5956017ebaa1bb88253-lootboxes")
addSubwaySurfObject("characters", path + "eb41993d30633c1a0eb1adbcda5d060371d2d135-characters", "eb41993d30633c1a0eb1adbcda5d060371d2d135-characters")
addSubwaySurfObject("trophies", path + "ebb8440fbcb97841a9526380b9f5a84c4e7624e1-trophies", "ebb8440fbcb97841a9526380b9f5a84c4e7624e1-trophies")
addSubwaySurfObject("challenges", path + "ec179173088e3319e91329868e13a2e81eec4f50-challenges", "ec179173088e3319e91329868e13a2e81eec4f50-challenges")
addSubwaySurfObject("cities", path + "f1fc6c09cf3d52152fdb58812e0879533135c5c0-cities", "f1fc6c09cf3d52152fdb58812e0879533135c5c0-cities")
addSubwaySurfObject("notifications", path + "f568ee5bee6f8cc6e49a54c8967096cf2ca5e670-notifications", "f568ee5bee6f8cc6e49a54c8967096cf2ca5e670-notifications")
addSubwaySurfObject("adPlacements", path + "f6641a020024bff032bdcb76d9f8d0d378711b8e-adPlacements", "f6641a020024bff032bdcb76d9f8d0d378711b8e-adPlacements")
addSubwaySurfObject("lootTables", path + "f7880c52dee4321d69534d65c0948d1a19b866eb-loottables", "f7880c52dee4321d69534d65c0948d1a19b866eb-loottables")
addSubwaySurfObject("promotions", path + "f93885b6e0ea3afde37dff52d2a5f9de1f8d7ff9-promotions", "f93885b6e0ea3afde37dff52d2a5f9de1f8d7ff9-promotions")
addSubwaySurfObject("calendars", path + "fd52699f5ade10a678187039fdadd82dc0aab646-calendars", "fd52699f5ade10a678187039fdadd82dc0aab646-calendars")
subwaySurfObjects.dot = {}
subwaySurfObjects.dot.val = "."

var subwaySurfObjectRenderTexts = {}
subwaySurfObjectRenderTexts.runConfiguration = [
    {type: "header", value: "Konfigurace běhu", size: 1},
    {type: "header", value: "Konverzní kurzy", size: 2},
    {type: "text", value: "Mince - Body: +runConfiguration.value.conversionRates.Coins.Points"},
    {type: "header", value: "Oživení", size: 2},
    {type: "text", value: "Počáteční náklady v klíčích: +runConfiguration.value.reviveCosts.baseKeyCost"},
    {type: "text", value: "Násobitel nákladů v klíčích: +runConfiguration.value.reviveCosts.keyCostMultiplier"},
    {type: "text", value: "Maximální náklady v klíčích: +runConfiguration.value.reviveCosts.keyCostCap"},
    {
        type: "text",
        value: "Počet běhů na oživení reklamou: +runConfiguration.value.reviveCosts.firstAllowedRunForAdsRevive"
    },
    {
        type: "text",
        value: "Maximální počet oživení reklamou za 1 běh: +runConfiguration.value.reviveCosts.reviveWithAdsPerRunCap"
    },
    {
        type: "text",
        value: "Maximální počet oživení s bonusem za 1 běh: +runConfiguration.value.reviveCosts.reviveWithBonusPerRunCap"
    },

    {
        type: "text",
        value: "Počet běhů na oživení klíči: +runConfiguration.value.reviveCosts.firstAllowedRunForKeysRevive"
    },
    {type: "text", value: "Minimální čas na zrušení oživení: +runConfiguration.value.reviveCosts.minTimeToDismiss+s"},
    {type: "text", value: "Maximální čas na oživení: +runConfiguration.value.reviveCosts.reviveTime+s"},
    /*
    reviveWithMultipleAdsDailyCap: 30
    reviveWithMultipleAdsEnabled: false
    reviveWithMultipleAdsPerRunCapMain: 1
    */
    {type: "header", value: "Oživení - Pomoc", size: 2},
    {type: "text", value: "Povoleno: +runConfiguration.value.reviveHintsConfiguration.reviveHintsEnabled:Ano:Ne"},
    {type: "header", value: "Pomoc - Pole", size: 3},
    {type: "text/array-objects", path: "runConfiguration.value.reviveHintsConfiguration.hints"},
    {type: "header", value: "Atd+dot.val+dot.val+dot.val", size: 2}
]

function getSubwaySurfObjectTextByKeys(keys) {
    var result = subwaySurfObjects
    for (var key of keys.split(".")) result = result[key]
    return result
}

function getValue(item) {
    var result = ""
    for (var part of item.value.split("+")) {
        var partResult
        var splitted = part.split(":")
        var ifIsTrue, ifIsFalse
        if (part.includes(":")) {
            if (splitted.length === 3) {
                part = splitted[0]
                ifIsTrue = splitted[1]
                ifIsFalse = splitted[2]
            }
        }
        if (part.includes(".")) partResult = getSubwaySurfObjectTextByKeys(part)
        else partResult = part

        if (ifIsTrue && ifIsFalse) {
            var isTrue = true
            if (typeof partResult === "string") isTrue = $$.String.toBool(partResult)
            else isTrue = partResult
            result += isTrue ? ifIsTrue : ifIsFalse
        } else {
            result += partResult
        }
    }
    return result
}

function subwaySurfObjectRenderText(key, elem) {
    for (var item of subwaySurfObjectRenderTexts[key]) {
        var div, header
        switch (item.type) {
            case "header":
                header = document.createElement("h" + item.size)
                header.innerHTML = getValue(item)
                elem.appendChild(header)
                break
            case "text":
                div = document.createElement("div")
                div.innerHTML = getValue(item)
                elem.appendChild(div)
                break
            case "text/array-objects":
                div = document.createElement("div")
                div.innerHTML = JSON.stringify(getSubwaySurfObjectTextByKeys(item.path))
                elem.appendChild(div)
                break
            default:
                console.log("Undefined item type:", item.type)
                break
        }
    }
}
