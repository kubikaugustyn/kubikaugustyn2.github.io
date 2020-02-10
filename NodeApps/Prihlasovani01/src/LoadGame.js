function deleteLoadGameScript() {document.getElementById('loadGame').innerHTML = ''}
function VratText1() {
    document.getElementById('game1').innerHTML = game1Text
}
var game1Hrani = 'Hrajete hru1...'
var game1Text = 'Hra načtena...<br><button onclick="VratText(game1Hrani, \'game1\');deleteLoadGameScript();playGame()" class="btn btn-secondary">Hrát</button>'
var game1Nacitani = '<button class="btn btn-secondary" style="cursor: not-allowed;">Načítání hry... (přibližně 10s)</button>'
var game1 =
    '<div id="game1">' +
        'Hru se nepodařilo načíst.<br><br><button onclick="VratText(game1Nacitani, \'game1\');setTimeout(VratText1, 10000)" class="btn btn-secondary">Zkusit znovu načíst</button>' +
    '</div>'
