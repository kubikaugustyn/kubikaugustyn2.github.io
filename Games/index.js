var games = [
    {
        name: "Diamantovi",
        logo: "Diamantovi/src/img/logo.png",
        link: "Diamantovi"
    }
]

var gameDivTeplate = `<div onclick="document.location.pathname += '/LINK'" class="gameDiv">
<img src="LOGO" alt="Game logo" class="logo">
<p class="name">NAME</p>
</div>`

function onLoad() {
    console.log("Body loaded...")
    var gamesSectionDiv = document.getElementById("gamesSection")

    for (var game of games) {
        var gameDiv = gameDivTeplate
        gameDiv = gameDiv.replace("NAME", game.name)
        gameDiv = gameDiv.replace("LOGO", game.logo)
        gameDiv = gameDiv.replace("LINK", game.link)
        gamesSectionDiv.innerHTML += gameDiv
    }
}
