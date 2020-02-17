function loadDivsColors() {
    document.getElementById('up').style.backgroundColor = ''
    document.getElementById('left').style.backgroundColor = ''
    document.getElementById('right').style.backgroundColor = ''
    document.getElementById('down').style.backgroundColor = ''
    console.log('loadDivsColors()...')
    joystick.right() ? document.getElementById('right').style.backgroundColor = 'green' : document.getElementById('down').style.backgroundColor = ''
    joystick.left() ? document.getElementById('left').style.backgroundColor = 'green' : document.getElementById('down').style.backgroundColor = ''
    joystick.up() ? document.getElementById('up').style.backgroundColor = 'green' : document.getElementById('down').style.backgroundColor = ''
    joystick.down() ? document.getElementById('down').style.backgroundColor = 'green' : document.getElementById('down').style.backgroundColor = ''
}
