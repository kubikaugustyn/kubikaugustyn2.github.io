/* **********************************************************
    //
    // https://css-tricks.com/converting-color-spaces-in-javascript/
    //
     **************************************************************/

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function RGBToColorComponents(rgb) {
    // Choose correct separator
    var separator = rgb.indexOf(",") > -1 ? "," : " ";

    // Turn "rgb(r,g,b)" into [r,g,b]
    var rgbStringItems = rgb.substr(4).split(")")[0].split(separator)

    var rgbItems = rgbStringItems.map(function (item) {
        return parseInt(item)
    })

    return rgbItems
}


function RGBToHex(rgb) {
    var rgb = RGBToColorComponents(rgb)
    var r = pad((rgb[0]).toString(16), 2),
        g = pad((rgb[1]).toString(16), 2),
        b = pad((rgb[2]).toString(16), 2)

    return "#" + r + g + b;
}


function RGBToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    var cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta === 0)
        h = 0;
    // Red is max
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l]
}

function RGBToHSL1(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    var cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

// Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l]
}

function getStyle(element, property) {
    return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    })];
}

function loadColor() {
    console.log("loadColor()...")
    var testDiv = document.getElementById("pickedColor")
    var backgroundColorRGBComponents = RGBToColorComponents(getStyle(testDiv, "background-color"))
    var testStyle = getStyle(testDiv, "background-color")
    var hslColor = RGBToHSL(backgroundColorRGBComponents[0], backgroundColorRGBComponents[1], backgroundColorRGBComponents[2])
    console.log("hsl color: " + hslColor)
    console.log("rgb color:", getStyle(testDiv, "background-color"))
    console.log("hex color:", RGBToHex(getStyle(testDiv, "background-color")))
    loadColorsToInputs()

    function loadColorsToInputs() {
        if (ntc.name(RGBToHex(getStyle(testDiv, "background-color")))[1]) {
            console.log('RGBToHex(getStyle(testDiv, "background-color")))[1]')
            document.getElementById('colorName').value = ntc.name(RGBToHex(getStyle(testDiv, "background-color")))[1]
        } else if (ntc.name(RGBToHex(getStyle(testDiv, "background-color"))) != [1]) {
            console.log('RGBToHex(getStyle(testDiv, "background-color")))!=[1]')
            document.getElementById('colorName').value = ntc.name(RGBToHex(getStyle(testDiv, "background-color")))[0]
        }
        //console.log(document.getElementById("pickedColor").style.backgroundColor)
        var hslColor1 = RGBToHSL1(backgroundColorRGBComponents[0], backgroundColorRGBComponents[1], backgroundColorRGBComponents[2])
        document.getElementById('colorName').value = document.getElementById("pickedColor").style.backgroundColor
        document.getElementById('R').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[0]
        document.getElementById('G').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[1]
        document.getElementById('B').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[2]
        document.getElementById('Hex').value = RGBToHex(getStyle(testDiv, "background-color")).split('#')[1]
        document.getElementById('H').value = hslColor1[0]
        document.getElementById('S').value = hslColor1[1] + "%"
        document.getElementById('L').value = hslColor1[2] + "%"
    }
}

function colorName() {
    console.log(document.getElementById('colorName').value)
    if (existsColor(document.getElementById('colorName').value)) {
        document.getElementById('pickedColor').style.backgroundColor = document.getElementById('colorName').value
        var r = RGBToColorComponents(getStyle(document.getElementById('pickedColor'), "background-color"))[0]
        var g = RGBToColorComponents(getStyle(document.getElementById('pickedColor'), "background-color"))[1]
        var b = RGBToColorComponents(getStyle(document.getElementById('pickedColor'), "background-color"))[2]
        document.getElementById('R').value = r
        document.getElementById('G').value = g
        document.getElementById('B').value = b
        document.getElementById('Hex').value = RGBToHex("rgb("+[r, g, b].join(", ")+")").replace("#", "")
        document.getElementById('H').value = RGBToHSL(r, g, b)[0]
        document.getElementById('S').value = RGBToHSL(r, g, b)[1] + "%"
        document.getElementById('L').value = RGBToHSL(r, g, b)[2] + "%"
    }
    /*document.getElementById('pickedColor').style.backgroundColor = document.getElementById('colorName').value*/
    //document.getElementById('pickedColor').style.backgroundcolor = 'blue'
    console.log(document.getElementById('pickedColor'), document.getElementById('pickedColor').style)
    /*document.getElementById('R').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[0]
    document.getElementById('G').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[1]
    document.getElementById('B').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[2]
    document.getElementById('Hex').value = RGBToHex(getStyle(testDiv, "background-color")).split('#')[1]
    document.getElementById('H').value = hslColor1[0]
    document.getElementById('S').value = hslColor1[1] + "%"
    document.getElementById('L').value = hslColor1[2] + "%"*/

}

function RGB() {
    console.log("rgb(", document.getElementById('R').value, ", ", document.getElementById('G').value, ", ", document.getElementById('B').value)
}

function Hex() {
    console.log("hex ", document.getElementById('Hex').value)
}

function HSL() {
    console.log("hsl(", document.getElementById('H').value, ", ", document.getElementById('S').value, ", ", document.getElementById('L').value)
}


function existsColor(color) {
    var englishToCzechColors = {
        "lightblue": "světlemodrá",
        "lightgreen": "světlezelená",
        "lightyellow": "světležlutá",
        "lightgray": "světlešedá",
        "red": "červená",
        "darkblue": "tmavěmodrá",
        "violet": "fialová",
        "blueviolet": "modrofialová",
        "blue": "modrá",
        "green": "zelená",
        "darkgreen": "tmavězelená",
        "greenyellow": "zelenožlutá",
        "darkred": "tmavěčervená",
        "orangered": "oranžovočervená",
        "gold": "zlatá",
        "orange": "oranžová",
        "darkorange": "tmavěoranžová",
        "yellow": "žlutá",
        "darkviolet": "tmavěfialová",
        "pink": "růžová",
        "white": "bílá",
        "darkgray": "tmavěšedá",
        "gray": "šedá",
        "black": "černá",
        "brown": "hnědá",
        "beige": "béžová"
    }
    for (var englishColor in englishToCzechColors) {
        if (color === englishColor) {
            return true
        }
    }
    return false
}
