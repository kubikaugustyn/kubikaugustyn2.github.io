/* **********************************************************
    //
    // https://css-tricks.com/converting-color-spaces-in-javascript/
    //
     **************************************************************/
function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

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

  var rgbItems = rgbStringItems.map(function (item) { return parseInt(item) })

  return rgbItems
}


function RGBToHex(rgb) {
  var rgb = RGBToColorComponents(rgb)
  var r = pad((rgb[0]).toString(16), 2),
      g = pad((rgb[1]).toString(16), 2),
      b = pad((rgb[2]).toString(16), 2)

  return "#" + r + g + b;
}


function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  var cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
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

  return "hsl(" + h + "," + s + "%," + l + "%)"
}

function RGBToHSL1(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  var cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
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
  return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
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
        document.getElementById('colorName').value = ntc.name(RGBToHex(getStyle(testDiv, "background-color")))
        //console.log(document.getElementById("pickedColor").style.backgroundColor)
        var hslColor1 = RGBToHSL1(backgroundColorRGBComponents[0], backgroundColorRGBComponents[1], backgroundColorRGBComponents[2])
        document.getElementById('R').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[0]
        document.getElementById('G').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[1]
        document.getElementById('B').value = RGBToColorComponents(getStyle(testDiv, "background-color"))[2]
        document.getElementById('Hex').value = RGBToHex(getStyle(testDiv, "background-color")).split('#')[1]
        document.getElementById('H').value = hslColor1[0]
        document.getElementById('S').value = hslColor1[1] + "%"
        document.getElementById('L').value = hslColor1[2] + "%"
    }
}
