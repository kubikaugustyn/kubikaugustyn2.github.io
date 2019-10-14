//prvni menu
var menu1 = new CSkryvaneMenu("Menu1", 100)

menu1.NovaPolozka (
    "Knihy",
    "location.href='http://www.vltava.cz'",
    "Velký výběr knih");

menu1.NovaPolozka (
    "Články",
    "location.href='http://programovanie.pc.sk'",
    "články o programování");

menu1.Cara(); //--------------------------------

menu1.NovaPolozka (
    "1",
    "location.href='http://www.javafile.com'",
    "Velký výběr skriptů");

menu1.x=100;

//menu1.y=100;

//druhe menu

var  loutky = new CSkryvaneMenu("Loutky", 150);

Loutky.NovaPolozka (
    "Spejbl",
    "SluzbaSpejbl()",
    "Info Spejbl");

Loutka.NovaPolozka (
    "Hurvínek",
    "alert('Služba Hurvínek')",
    "Info Hurvínek");

loutky.Cara(); //-----------------------------

Loutky.NovaPolozka (
    "Hamo",
    "alert('Služba Hamo')",
    "Info Hamo");

loutky.classMenu = "menu2";

loutky.classPolozka = "polozka2";

loutky.classApolozka = "Apolozka2";

//priklad funkce volame z menu

function SluzbaSpejbl() {
    alert("Hlasi se sluzba Spejbl");
}

function CPolozkaMenu(Text, Sluzba, Info) {
    //konstruktor
    this.Text = Text;
    this.Sluzba = Sluzba;
    this.Info = Info;
}

function CSkryvaneMenu(Meno, Sirka) {
    //argumenty
    this.Meno = Meno;
    this.Sirka = Sirka;
    //nastavitelné vlastnosti
    //souřadnice .. pokud nesjsou defin. myš
    this.x = null;
    this.y = null;
    //třídy prvků menu
    this.classMenu = "Menu";
    this.classPolozka = "Polozka";
    this.classApolozka = "Apolozka";

    this.Polozky = new  Array();

    this.divMenu = null;
    this.divX = null;

    this.NovaPolozka = NovaPolozka;
    this.Cara = Cara;
    this.Zobraz = Zobraz;
    this.Skryj = Skryj;
    this.DejPolozku = DejPolozku;
    this.Nad = Nad;
    this.Mimo = Mimo;
    this.Klepnuti = Klepnuti;

    //definice metod
    function NovaPolozka(Text, Sluzba, Info) {
        this.Polozky.push(new CPolozkaMenu(Text, Sluzba, Info));
    }

    function Cara() {
        this.Polozky.push(null)
    }

    function Zobraz(x, y) {
        var Menu = document.createElement('div');
        var Atr = document.createAttribute("class");
        Atr.value = this.classMenu;
        Menu.setAttributeNode(Atr);
        var sTxt = "";
        sTxt+= '<div id="' + this.Meno + '_X" ';
        sTxt+= 'onclick="' + this.Meno + '.Klepnuti();';
        sTxt+= 'onmouseover="' + this.Meno + '.Nad()'
    }
}
