/**
 * ---------------------------------------------------
 * Kutej dárky, špunte!
 * ---------------------------------------------------
 * KutejDarkySpunte
 * ---------------------------------------------------
 * @version 0.1.0
 * @author Lubomír Flaška lubomir.flaska@ceskatelevize.cz
 * @copyright decko.ceskatalevize.cz
 * @home www.decko.cz
 * ---------------------------------------------------
 */
function TestMenu() {
    PIXI.Container.call(this);
    var a = [],
        b = 0,
        c = new ElasticButton("remove app state");
    c.y = b,
        c.buttonType = "remove app state",
        this.addChild(c),
        a.push(c),
        b += c.height + 5,
        this.x = Global.STAGE.width - this.width,
        this.start = function () {
            Gamepad.addButtons(a)
        }
}

function Alert() {
    function a(a) {
        TweenMax.killTweensOf(b);
        f.text = a,
            f.x = 15,
            f.y = 15,
            e.width = f.width + 10,
            e.height = f.height + 10,
            e.x = 10,
            e.y = 10,
            d.width = e.width + 20,
            d.height = e.height + 20,
            b.x = Math.round((Global.STAGE.width - b.width) / 2),
            c = Math.round(Global.STAGE.height / 4 - b.height / 2) - 25
    }

    var b = Display.alert = this;
    PIXI.Container.call(this),
        this.static = !1;
    var c, d = PIXI.Sprite.fromFrame("level_notice_bg.png"),
        e = PIXI.Sprite.fromFrame("level_notice.png");
    this.addChild(d),
        this.addChild(e);
    var f = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontSize: 20,
        wordWrap: !0,
        wordWrapWidth: 300,
        align: "center"
    });
    this.addChild(f),
        this.start = function (d) {
            a(d),
                this.y = c + 10,
                this.alpha = 1,
                this.visible = !0,
                TweenMax.to(this, 2, {
                    y: c - 20,
                    delay: .2
                }),
                TweenMax.to(this, .2, {
                    alpha: 0,
                    y: c - 30,
                    delay: 2,
                    onComplete: function () {
                        Display.alert.visible = !1,
                            b.static = !1
                    }
                })
        },
        this.startStatic = function (b) {
            a(b),
                this.y = c,
                this.alpha = 1,
                this.visible = !0,
                this.static = !0
        },
        this.hide = function () {
            TweenMax.killTweensOf(this),
                TweenMax.to(this, .3, {
                    alpha: 0,
                    onComplete: function () {
                        Display.alert.visible = !1
                    }
                }),
                this.static = !1
        },
        this.visible = !1
}

function Artifacts() {
    function a(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c] === b)
                return !0;
        return !1
    }

    Display.artifacts = this,
        PIXI.Container.call(this);
    var b, c = (Game.levels[Game.levelId].world.layers, {});
    this.init = function () {
        for (var b in Engine.artifacts)
            if (Engine.artifacts.hasOwnProperty(b)) {
                c[b] = new PIXI.Container,
                    this.addChild(c[b]),
                    c[b].artifacts = {};
                for (var d = 0; d < Engine.artifacts[b].length; d++) {
                    var e = Engine.artifacts[b][d];
                    c[b].artifacts[e] = new ArtifactCollected(e),
                        c[b].artifacts[e].y = 54 * d,
                        c[b].addChild(c[b].artifacts[e]),
                        a(Engine.hero.artifacts[b], e) ? c[b].artifacts[e].setCollected(!0) : c[b].artifacts[e].setCollected(!1)
                }
                c[b].x = 62
            }
    },
        this.artifactCollected = function (a, b) {
            c[a].artifacts[b].setCollected(!0)
        },
        this.showLayer = function (a) {
            b && TweenMax.to(b, .3, {
                x: 62
            }),
                TweenMax.to(c[a], .3, {
                    x: 0
                }),
                b = c[a]
        }
}

function ArtifactCollected(a) {
    PIXI.Container.call(this);
    var b = PIXI.Sprite.fromFrame("inventory_" + a + "_off.png");
    this.addChild(b);
    var c = PIXI.Sprite.fromFrame("inventory_" + a + "_on.png");
    this.addChild(c),
        this.setCollected = function (a) {
            a ? (b.visible = !1,
                c.visible = !0) : (b.visible = !0,
                c.visible = !1)
        },
        this.setCollected(!1)
}

function ElasticButton(a) {
    PIXI.Container.call(this);
    var b = new PIXI.Text(a, {
            fontFamily: "Verdana",
            fontSize: 20
        }),
        c = new PIXI.Graphics;
    c.beginFill(16777215),
        c.drawRect(0, 0, b.width, b.height + 5),
        c.endFill(),
        this.addChild(c),
        this.addChild(b)
}

function Hero() {
    function a(a) {
        switch (a) {
            case Label.key.UP:
                break;
            case Label.key.RIGHT:
                d && (d.scale.x = 1,
                    d.x = 0),
                    n.scale.x = 1,
                    n.x = 0;
                break;
            case Label.key.DOWN:
                break;
            case Label.key.LEFT:
                d && (d.scale.x = -1,
                    d.x = d.width),
                    n.scale.x = -1,
                    n.x = n.width
        }
    }

    function b() {
        for (var a = 0; a < c.children.length; a++)
            c.getChildAt(a).stop(),
                c.getChildAt(a).visible = !1
    }

    var c = Display.hero = this;
    PIXI.Container.call(this);
    var d, e, f, g = {
            blue: {},
            green: {},
            yellow: {},
            orange: {},
            red: {}
        },
        h = {
            blue: {},
            green: {},
            yellow: {},
            orange: {},
            red: {}
        },
        i = {
            blue: {},
            green: {},
            yellow: {},
            orange: {},
            red: {}
        },
        j = {
            blue: [],
            green: [],
            yellow: [],
            orange: [],
            red: []
        },
        k = {
            blue: [],
            green: [],
            yellow: [],
            orange: [],
            red: []
        },
        l = {
            blue: [],
            green: [],
            yellow: [],
            orange: [],
            red: []
        };
    for (f in k)
        if (k.hasOwnProperty(f)) {
            for (e = 1; e <= 38; e++)
                j[f].push(PIXI.Texture.fromFrame("hero_" + f + "_portal_" + Tools.fillZeros("", e, 2) + ".png"));
            for (g[f] = new PIXI.extras.AnimatedSprite(j[f]),
                     g[f].y = -50,
                     g[f].animationSpeed = .3,
                     g[f].loop = !1,
                     g[f].onComplete = function () {
                         c.stop(),
                             Engine.phase = Label.phase.WAITING,
                             Sound.changeMusic(Label.layerName.SURFACE)
                     },
                     this.addChild(g[f]),
                     e = 0; e <= 3; e++)
                k[f].push(PIXI.Texture.fromFrame("hero_" + f + "_right_" + e + ".png")),
                    l[f].push(PIXI.Texture.fromFrame("hero_" + f + "_down_" + e + ".png"));
            h[f] = new PIXI.extras.AnimatedSprite(k[f]),
                h[f].animationSpeed = .2,
                this.addChild(h[f]),
                i[f] = new PIXI.extras.AnimatedSprite(l[f]),
                i[f].animationSpeed = .2,
                this.addChild(i[f])
        }
    var m = [];
    for (e = 0; e < 4; e++)
        m.push(PIXI.Texture.fromFrame("hero_black_" + e + ".png"));
    var n = new PIXI.extras.AnimatedSprite(m);
    n.animationSpeed = .2,
        this.addChild(n);
    var o = {
            right: {},
            up: {},
            down: {}
        },
        p = {
            layer_0: [],
            layer_1: [],
            layer_2: [],
            layer_3: [],
            layer_4: []
        };
    for (f in p)
        if (p.hasOwnProperty(f))
            for (var q in o)
                if (o.hasOwnProperty(q)) {
                    for (p[f][q] = [],
                             e = 0; e <= 3; e++)
                        p[f][q].push(PIXI.Texture.fromFrame("hero_black_" + f + "_" + q + "_" + e + ".png"));
                    o[q][f] = new PIXI.extras.AnimatedSprite(p[f][q]),
                        o[q][f].animationSpeed = .2,
                        this.addChild(o[q][f])
                }
    this.startTeleport = function (a) {
        TweenMax.to(this, a, {
            alpha: 0
        })
    },
        this.endTeleport = function (a, c) {
            container.audio.play("vyskok_z_portalu"),
                "main" === c ? (b(),
                    this.alpha = 1,
                    g[Engine.hero.color].visible = !0,
                    g[Engine.hero.color].gotoAndPlay(0)) : TweenMax.to(this, a, {
                    alpha: 1,
                    onComplete: function () {
                        Engine.phase = Label.phase.WAITING
                    }
                })
        },
        this.start = function () {
            Engine.hero.color || (Engine.hero.color = Engine.colors[Math.floor(Math.random() * Engine.colors.length)]),
            0 === Engine.hero.pos.row && (d = h[Engine.hero.color]),
                this.stop(Engine.hero.pos.dir)
        },
        this.stop = function (c) {
            Sound.stopMoveSounds(),
                b(),
                a(c),
                0 === Engine.hero.pos.row ? (d = h[Engine.hero.color],
                    d.alpha = 1,
                    d.visible = !0,
                    n.visible = !1) : (d.visible = !1,
                    n.visible = !0),
                Engine.phase = Label.phase.WAITING
        },
        this.walk = function (c, e) {
            b(),
                a(c),
                d = h[Engine.hero.color],
                this.addChild(d),
                0 === Engine.hero.pos.row ? c === Label.key.LEFT || c === Label.key.RIGHT ? (d.alpha = 1,
                    d.visible = !0,
                    d.play()) : c === Label.key.UP && (d.alpha = 0,
                    TweenMax.to(d, e, {
                        alpha: 1
                    }),
                    n.visible = !0,
                    n.gotoAndPlay(n.currentFrame),
                    d.visible = !0,
                    d.gotoAndPlay(n.currentFrame),
                    Display.spuntici.play()) : 1 === Engine.hero.pos.row && c === Label.key.DOWN ? (d.alpha = 1,
                    TweenMax.to(d, e, {
                        alpha: 0
                    }),
                    n.visible = !0,
                    n.gotoAndPlay(n.currentFrame),
                    d.visible = !0,
                    d.gotoAndPlay(n.currentFrame),
                    Display.spuntici.stop()) : (n.visible = !0,
                    n.play())
        },
        this.dig = function (a, c) {
            if (b(),
            a === Label.key.LEFT)
                var d = Label.key.RIGHT;
            else
                d = a;
            switch (o[d][Engine.hero.upgrades.drill].visible = !0,
                o[d][Engine.hero.upgrades.drill].play(),
                a) {
                case Label.key.UP:
                    0 === Engine.hero.pos.row ? (this.addChild(i[Engine.hero.color]),
                        i[Engine.hero.color].alpha = 0,
                        TweenMax.to(i[Engine.hero.color], c, {
                            alpha: 1
                        }),
                        i[Engine.hero.color].visible = !0,
                        Display.spuntici.play()) : i[Engine.hero.color].visible = !1;
                    break;
                case Label.key.RIGHT:
                    o[d][Engine.hero.upgrades.drill].scale.x = 1,
                        o[d][Engine.hero.upgrades.drill].x = 0,
                        i[Engine.hero.color].visible = !1;
                    break;
                case Label.key.DOWN:
                    1 === Engine.hero.pos.row ? (this.addChild(i[Engine.hero.color]),
                        i[Engine.hero.color].alpha = 1,
                        TweenMax.to(i[Engine.hero.color], c, {
                            alpha: 0
                        }),
                        i[Engine.hero.color].visible = !0,
                        Display.spuntici.stop()) : i[Engine.hero.color].visible = !1;
                    break;
                case Label.key.LEFT:
                    o[d][Engine.hero.upgrades.drill].scale.x = -1,
                        o[d][Engine.hero.upgrades.drill].x = o[d][Engine.hero.upgrades.drill].width,
                        i[Engine.hero.color].visible = !1
            }
        }
}

function Horizon() {
    PIXI.Container.call(this);
    var a = new PIXI.Sprite;
    a.y = -250,
        this.addChild(a),
        this.setSkin = function (b) {
            a.texture = PIXI.Texture.fromFrame("background_horizon_" + (b + 1) + ".png")
        },
        this.setShadow = function () {
        },
        this.reset = function () {
        }
}

function HUD() {
    function a() {
        for (var a = m.length - 1; a >= 0; a--)
            Display.hud.removeChild(m[a]),
                m[a].destroy();
        m = []
    }

    function b() {
        for (var a = l.length - 1; a >= 0; a--)
            Display.hud.removeChild(l[a]),
                l[a].destroy();
        l = []
    }

    Display.hud = this,
        PIXI.Container.call(this);
    var c = Game.levels[Game.levelId].upgrades.energystorage,
        d = PIXI.Sprite.fromFrame("hud_bg.png");
    this.addChild(d);
    var e = new PIXI.Sprite;
    e.position.set(17, 6),
        this.addChild(e);
    var f = PIXI.Sprite.fromFrame("hud_bar_energy_empty.png");
    f.anchor.x = .5,
        e.addChild(f);
    var g = PIXI.Sprite.fromFrame("hud_bar_energy.png");
    g.anchor.x = .5,
        e.addChild(g);
    var h = new TweenMax(g, .3, {
        alpha: 0,
        yoyo: !0,
        repeat: -1,
        ease: Power1.easeIn
    });
    h.pause();
    var i = PIXI.Sprite.fromFrame("hud_bar_energy_empty.png");
    i.anchor.x = .5,
        e.addChild(i),
        this.start = function () {
            this.updateEnergyBarWidth(!0),
                this.updatePocketSize()
        },
        this.updateEnergy = function (a) {
            var b = 1 - Engine.hero.energyUnits / c[Engine.hero.upgrades.energystorage].units;
            TweenMax.to(i.scale, a, {
                y: b,
                ease: Linear.easeNone,
                onComplete: function () {
                    Engine.hero.energyUnits < Game.levels[Game.levelId].energyUnitsAlert ? (Engine.hero.help.firstFuelAlert && (Display.vrtulka.start("dabing4"),
                        Engine.hero.help.firstFuelAlert = !1),
                        h.resume()) : (h.pause(),
                        g.alpha = 1)
                }
            })
        },
        this.updateEnergyBarWidth = function (a) {
            var b = c[Object.keys(c)[0]].units,
                d = c[Object.keys(c)[Object.keys(c).length - 1]].units,
                e = c[Engine.hero.upgrades.energystorage].units,
                h = (e - b) / (d - b),
                j = 9 + 14 * h;
            if (a)
                var k = 0;
            else
                k = .3;
            TweenMax.to([f, g, i], k, {
                width: j
            }),
                this.updateEnergy(k)
        };
    var j, k, l = [],
        m = [],
        n = g.height,
        o = g.width,
        p = {
            coin_0: 5343432,
            coin_1: 11582007,
            coin_2: 16761365,
            coin_3: 15427109,
            coin_4: 14294834
        };
    this.updateFullUnits = function () {
        a();
        for (var b = 0; b < Engine.hero.backpack.length; b++) {
            var c = new PIXI.Graphics;
            c.beginFill(p[Engine.hero.backpack[b]]),
                c.drawRect(0, -k, o, k),
                c.endFill(),
                c.x = 34,
                c.y = 270 - b * (k + 1),
                this.addChild(c),
                m.push(c)
        }
        Engine.hero.backpack.length === l.length && (Engine.hero.help.firstFullCargo && (Display.vrtulka.start("dabing3"),
            Engine.hero.help.firstFullCargo = !1),
            container.audio.play("plny_batoh"),
            TweenMax.to(m, .3, {
                alpha: 0,
                yoyo: !0,
                repeat: 5,
                ease: Power1.easeIn
            }))
    },
        this.updatePocketSize = function () {
            b(),
                j = Game.levels[Game.levelId].upgrades.backpack[Engine.hero.upgrades.backpack].units,
                k = (n - (j - 1)) / j;
            for (var a = 0; a < j; a++) {
                var c = PIXI.Sprite.fromFrame("hud_bar_energy_empty.png");
                c.anchor.set(0, 1),
                    c.x = 34,
                    c.y = 270 - a * (k + 1),
                    c.height = k,
                    this.addChild(c),
                    l.push(c)
            }
            this.updateFullUnits()
        }
}

function Inventory() {
    Display.inventory = this,
        PIXI.Container.call(this);
    var a = [],
        b = 0;
    this.items = {};
    var c = Game.levels[Game.levelId].inventory;
    for (var d in c)
        c.hasOwnProperty(d) && (Engine.inventoryKeys.push(d),
            this.items[d] = new InventoryItem(d),
            this.items[d].y = b,
            this.items[d].buttonType = Label.buttonType.USE_INVENTORY_ITEM,
            this.items[d].name = d,
            this.addChild(this.items[d]),
            a.push(this.items[d]),
            b += this.items[d].height + 6);
    this.start = function () {
        for (var b in this.items)
            this.items.hasOwnProperty(b) && this.items[b].setText(Engine.hero.inventory[b]);
        Gamepad.addButtons(a)
    },
        this.update = function (a) {
            this.items[a].setText(Engine.hero.inventory[a])
        },
        this.keyPressed = function (a) {
            switch (a) {
                case Label.key.DOWN:
                    Engine.inventoryKeysCount++,
                        Engine.inventoryKeysCount > Engine.inventoryKeys.length - 1 ? Engine.inventoryKeysCount = Engine.inventoryKeys.length - 1 : this.hilight();
                    break;
                case Label.key.UP:
                    Engine.inventoryKeysCount--,
                        Engine.inventoryKeysCount < 0 ? Engine.inventoryKeysCount = 0 : this.hilight()
            }
        },
        this.hilight = function () {
            this.unhilight(),
                this.items[Engine.inventoryKeys[Engine.inventoryKeysCount]].hilight()
        },
        this.unhilight = function () {
            for (var a in this.items)
                this.items.hasOwnProperty(a) && this.items[a].unhilight()
        }
}

function InventoryItem(a) {
    PIXI.Container.call(this);
    var b = PIXI.Sprite.fromFrame("inventory_" + a + ".png");
    this.addChild(b);
    var c = PIXI.Sprite.fromFrame("inventory_" + a + "_active.png");
    this.addChild(c);
    var d = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontSize: 11
    });
    d.anchor.set(1),
        d.position.set(b.width - 8, b.height - 8);
    var e = new PIXI.Graphics;
    e.beginFill(14540253),
        e.drawRect(0, 0, d.width + 4, d.height + 4),
        this.addChild(e),
        this.addChild(d),
        this.setText = function (a) {
            d.text = a,
                e.width = d.width + 4,
                e.x = d.x - d.width - 2,
                e.y = d.y - d.height - 2
        },
        this.hilight = function () {
            c.visible = !0,
                b.visible = !1
        },
        this.unhilight = function () {
            c.visible = !1,
                b.visible = !0
        },
        this.unhilight()
}

function Level() {
    Display.level = this;
    PIXI.Container.call(this);
    var a = new World;
    this.addChild(a.cont);
    var b = new Hero;
    b.x = Global.STAGE.center.x - Game.levels[Game.levelId].world.tile.size / 2,
        b.y = Global.STAGE.center.y - Game.levels[Game.levelId].world.tile.size / 2,
        this.addChild(b),
        this.worldShadow = new PIXI.Graphics,
        this.worldShadow.beginFill(0),
        this.worldShadow.drawRect(0, 0, Global.STAGE.width, Global.STAGE.height),
        this.worldShadow.endFill(),
        this.worldShadow.visible = !1,
        this.worldShadow.alpha = 0,
        this.addChild(this.worldShadow);
    var c = new Shop;
    c.x = Math.round(Global.STAGE.width / 2 - c.width / 2 - 15),
        c.y = Math.round(Global.STAGE.height / 2 - c.height / 2 + 30),
        this.addChild(c);
    var d = new Inventory;
    this.addChild(d);
    var e = new Artifacts;
    e.x = 1026,
        e.y = 54,
        this.addChild(e);
    var f = new HUD;
    f.y = 162,
        this.addChild(f);
    var g = new Money;
    g.x = Global.STAGE.width / 2 - g.width / 2,
        this.addChild(g);
    var h = new Vrtulka;
    h.scale.x = -1,
        h.x = Global.STAGE.width + Math.abs(h.width),
        h.y = 100,
        h.visible = !1,
        this.addChild(h);
    var i = new TestMenu;
    this.addChild(i),
        this.start = function () {
            i.start(),
                i.visible = !1,
            Engine.hero.help.intro && (h.start("dabing1"),
                Engine.hero.help.intro = !1),
                f.start(),
                g.start(),
                d.start(),
                a.start(),
                b.start(),
                this.visible = !0,
                Engine.phase = Label.phase.WAITING
        },
        this.continue = function () {
            this.visible = !0,
                Engine.phase = Label.phase.WAITING
        },
        this.close = function () {
            this.visible = !1
        },
        this.close()
}

function Menu() {
    function a(a) {
        "OK" === a.status && (console.log("check for continue", a),
            d.visible = a.slots.length > 0 && "v4.0" === a.slots[Engine.slotNum].metadata)
    }

    Display.menu = this,
        PIXI.Container.call(this);
    var b = [],
        c = PIXI.Sprite.fromFrame("menu_bg.png");
    this.addChild(c);
    var d = PIXI.Sprite.fromFrame("menu_btn_continue_1.png");
    d.buttonType = Label.buttonType.MENU,
        d.name = Label.menuBtns.CONTINUE,
        d.x = 402,
        d.y = 200,
        this.addChild(d),
        b.push(d),
        d.visible = !1;
    var e = PIXI.Sprite.fromFrame("menu_btn_newgame_1.png");
    e.buttonType = Label.buttonType.MENU,
        e.name = Label.menuBtns.NEW,
        e.x = 659,
        e.y = 200,
        this.addChild(e),
        b.push(e),
        this.hideContinue = function () {
            d.visible = !1
        },
        this.start = function () {
            Engine.firstTimeInMenu ? DpCont.isLocalTest || Global.userSignedIn && (AmfConnector.token = dpApp.iCont.appConfig.flashvars.token,
                AmfConnector.getAppStates(a)) : d.visible = !0,
                Gamepad.addButtons(b),
                this.visible = !0
        },
        this.close = function () {
            Gamepad.removeButtons(b),
                this.visible = !1
        },
        this.close()
}

function Money() {
    Display.money = this,
        PIXI.Container.call(this),
        this.money = void 0;
    var a = PIXI.Sprite.fromFrame("money_rectangle.png");
    a.width += 30,
        this.addChild(a);
    var b = PIXI.Sprite.fromFrame("money_duhak.png");
    b.x = 192,
        b.y = 18,
        this.addChild(b);
    var c = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: 30,
        fill: 16777215
    });
    c.anchor.set(1, .5),
        c.x = 182,
        c.y = 34,
        this.addChild(c),
        this.start = function () {
            this.money = 0,
                this.updateText(0)
        },
        this.updateText = function (a) {
            Sound.lib.pocitani_prachu.play(),
                TweenMax.to(this, a, {
                    money: Engine.hero.money,
                    ease: Linear.easeNone,
                    onUpdate: function () {
                        c.text = Math.round(Display.money.money)
                    },
                    onComplete: function () {
                        Sound.lib.pocitani_prachu.stop()
                    }
                })
        }
}

function Shop() {
    function a() {
        switch (d.unhilightBtns(),
            d.upgrades.unhilight(),
            d.inventory.unhilight(),
            Engine.shopSelectLayer) {
            case 0:
                d.hilightQuitBtn();
                break;
            case 1:
                switch (Engine.phase) {
                    case Label.phase.SHOP_SUMMARY:
                        d.hilightNextBtn();
                        break;
                    case Label.phase.SHOP_UPGRADES:
                        Engine.shopUpgradeKeysCount === Engine.shopUpgradeKeys.length ? d.hilightNextBtn() : (d.upgrades.hilight(),
                            Engine.shopFocusName = Engine.shopUpgradeKeys[Engine.shopUpgradeKeysCount]);
                        break;
                    case Label.phase.SHOP_INVENTORY:
                        -1 === Engine.shopInventoryKeysCount ? d.hilightPrevBtn() : (d.inventory.hilight(),
                            Engine.shopFocusName = Engine.shopInventoryKeys[Engine.shopInventoryKeysCount])
                }
                break;
            case 2:
                d.hilightMenuBtn()
        }
    }

    function b() {
        switch (Engine.phase === Label.phase.SHOP_SUMMARY && 0 === Engine.hero.backpack.length && (m++,
            Engine.phase = n[m]),
            a(),
            Engine.phase) {
            case Label.phase.SHOP_SUMMARY:
                Display.shop.hideButtons(),
                    c(),
                    g.start(),
                    Engine.phase = Label.phase.SHOP_SUMMARY,
                    l.visible = !1,
                    k.visible = !0;
                break;
            case Label.phase.SHOP_UPGRADES:
                Display.shop.showButtons(),
                    c(),
                    Display.shop.upgrades.start(),
                    Engine.phase = Label.phase.SHOP_UPGRADES,
                    l.visible = !1,
                    k.visible = !0;
                break;
            case Label.phase.SHOP_INVENTORY:
                Display.shop.showButtons(),
                    c(),
                    Display.shop.inventory.start(),
                    Engine.phase = Label.phase.SHOP_INVENTORY,
                    l.visible = !0,
                    k.visible = !1
        }
    }

    function c() {
        g.close(),
            Display.shop.upgrades.close(),
            Display.shop.inventory.close()
    }

    var d = Display.shop = this;
    PIXI.Container.call(this);
    var e = [],
        f = PIXI.Sprite.fromFrame("shop_background_summary.png");
    this.addChild(f);
    var g = new ShopSummary;
    this.addChild(g),
        this.upgrades = new ShopUpgrades,
        this.addChild(this.upgrades),
        this.inventory = new ShopInventory,
        this.addChild(this.inventory);
    var h = PIXI.Sprite.fromFrame("shop_button_menu.png");
    h.imgName = "shop_button_quit",
        h.buttonType = Label.buttonType.SHOP,
        h.name = Label.shopBtns.MENU,
        h.x = 337,
        h.y = 443,
        this.addChild(h),
        e.push(h);
    var i = new PIXI.Container;
    this.addChild(i);
    var j = PIXI.Sprite.fromFrame("shop_button_quit.png");
    j.imgName = "shop_button_quit",
        j.buttonType = Label.buttonType.SHOP,
        j.name = Label.shopBtns.QUIT,
        j.anchor.set(.5),
        j.x = 695,
        j.y = 61,
        i.addChild(j),
        e.push(j);
    var k = new PIXI.Sprite.fromFrame("shop_button_right.png");
    k.imgName = "shop_button_right",
        k.buttonType = Label.buttonType.SHOP,
        k.name = Label.shopBtns.NEXT,
        k.anchor.set(.5),
        k.x = 695,
        k.y = 407,
        i.addChild(k),
        e.push(k);
    var l = new PIXI.Sprite.fromFrame("shop_button_left.png");
    l.imgName = "shop_button_left",
        l.buttonType = Label.buttonType.SHOP,
        l.name = Label.shopBtns.PREV,
        l.anchor.set(.5),
        l.x = 70,
        l.y = 407,
        i.addChild(l),
        e.push(l);
    var m, n = [Label.phase.SHOP_SUMMARY, Label.phase.SHOP_UPGRADES, Label.phase.SHOP_INVENTORY];
    this.keyPressed = function (b) {
        if ("" !== b.vertical) {
            switch (b.vertical) {
                case Label.key.UP:
                    Engine.shopSelectLayer--;
                    break;
                case Label.key.DOWN:
                    Engine.shopSelectLayer++
            }
            Engine.shopSelectLayer < 0 ? Engine.shopSelectLayer = 0 : Engine.shopSelectLayer > 2 && (Engine.shopSelectLayer = 2)
        } else if ("" !== b.horizontal && 1 === Engine.shopSelectLayer)
            switch (Engine.phase) {
                case Label.phase.SHOP_UPGRADES:
                    switch (b.horizontal) {
                        case Label.key.RIGHT:
                            Engine.shopUpgradeKeysCount++;
                            break;
                        case Label.key.LEFT:
                            Engine.shopUpgradeKeysCount--
                    }
                    Engine.shopUpgradeKeysCount < 0 ? Engine.shopUpgradeKeysCount = 0 : Engine.shopUpgradeKeysCount > Engine.shopUpgradeKeys.length && (Engine.shopUpgradeKeysCount = Engine.shopUpgradeKeys.length);
                    break;
                case Label.phase.SHOP_INVENTORY:
                    switch (b.horizontal) {
                        case Label.key.RIGHT:
                            Engine.shopInventoryKeysCount++;
                            break;
                        case Label.key.LEFT:
                            Engine.shopInventoryKeysCount--
                    }
                    Engine.shopInventoryKeysCount < -1 ? Engine.shopInventoryKeysCount = -1 : Engine.shopInventoryKeysCount > Engine.shopInventoryKeys.length - 1 && (Engine.shopInventoryKeysCount = Engine.shopInventoryKeys.length - 1)
            }
        a()
    },
        this.hilightMenuBtn = function () {
            this.upgrades.unhilight(),
                this.unhilightBtns(),
                h.texture = PIXI.Texture.fromFrame("shop_button_menu_active.png"),
                Engine.shopFocusName = Label.shopBtns.MENU
        },
        this.hilightQuitBtn = function () {
            this.upgrades.unhilight(),
                this.unhilightBtns(),
                j.texture = PIXI.Texture.fromFrame("shop_button_quit_active.png"),
                Engine.shopFocusName = Label.shopBtns.QUIT
        },
        this.hilightNextBtn = function () {
            this.upgrades.unhilight(),
                this.unhilightBtns(),
                k.texture = PIXI.Texture.fromFrame("shop_button_right_active.png"),
                Engine.shopFocusName = Label.shopBtns.NEXT
        },
        this.hilightPrevBtn = function () {
            this.inventory.unhilight(),
                this.unhilightBtns(),
                l.texture = PIXI.Texture.fromFrame("shop_button_left_active.png"),
                Engine.shopFocusName = Label.shopBtns.PREV
        },
        this.unhilightBtns = function () {
            j.texture = PIXI.Texture.fromFrame("shop_button_quit.png"),
                k.texture = PIXI.Texture.fromFrame("shop_button_right.png"),
                l.texture = PIXI.Texture.fromFrame("shop_button_left.png"),
                h.texture = PIXI.Texture.fromFrame("shop_button_menu.png")
        },
        this.next = function () {
            m++,
                Engine.phase = n[m],
                b()
        },
        this.prev = function () {
            m--,
                Engine.phase = n[m],
                b()
        },
        this.start = function () {
            m = 0,
                Engine.phase = n[m],
                b(),
                Gamepad.addButtons(e),
                this.visible = !0
        },
        this.close = function () {
            this.visible = !1,
                Gamepad.removeButtons(e),
                Engine.phase = Label.phase.WAITING
        },
        this.showButtons = function () {
            i.visible = !0
        },
        this.hideButtons = function () {
            i.visible = !1
        },
        this.close()
}

function ShopInventory() {
    PIXI.Container.call(this);
    var a = Game.levels[Game.levelId].inventory,
        b = [],
        c = PIXI.Sprite.fromImage("shop_title_powerups.png");
    c.position.set(66, 44),
        this.addChild(c);
    var d = {},
        e = 0;
    for (var f in a)
        a.hasOwnProperty(f) && (Engine.shopInventoryKeys.push(f),
            d[f] = new ShopInventoryItem(f),
            d[f].x = 191 + 188 * e,
            d[f].y = 131,
            this.addChild(d[f]),
            b.push(d[f]),
            e++);
    this.hilight = function () {
        this.unhilight(),
            d[Engine.shopInventoryKeys[Engine.shopInventoryKeysCount]].hilight()
    },
        this.unhilight = function () {
            for (var a in d)
                d.hasOwnProperty(a) && d[a].unhilight()
        },
        this.updateItems = function () {
            for (var b in a)
                a.hasOwnProperty(b) && d[b].updateItemState()
        },
        this.start = function () {
            for (var a in d)
                d.hasOwnProperty(a) && d[a].start();
            Gamepad.addButtons(b),
                this.visible = !0
        },
        this.close = function () {
            this.visible = !1,
                Gamepad.removeButtons(b)
        }
}

function ShopInventoryItem(a) {
    PIXI.Container.call(this);
    var b = this,
        c = Game.levels[Game.levelId].inventory[a],
        d = new PIXI.Graphics;
    d.beginFill(2378092, 1),
        d.drawRect(0, 0, 156, 100),
        d.endFill(),
        d.x = -d.width / 2,
        d.y = -10,
        this.addChild(d);
    var e = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: 15,
        fill: 16777215,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 142
    });
    this.addChild(e);
    var f = new PIXI.Sprite;
    f.anchor.set(.5),
        f.y = 96,
        this.addChild(f);
    var g = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontSize: 12,
        fill: 16777215,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 142
    });
    g.y = 160,
        this.addChild(g);
    var h = new PIXI.Container;
    h.y = 229,
        this.addChild(h);
    var i = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: 25,
        fill: 16777215
    });
    i.anchor.y = .5,
        h.addChild(i);
    var j = PIXI.Sprite.fromFrame("shop_duhak.png");
    j.anchor.y = .5,
        h.addChild(j),
        this.hilight = function () {
            d.alpha = 1
        },
        this.unhilight = function () {
            d.alpha = 0
        },
        this.start = function () {
            this.updateItemState()
        },
        this.updateItemState = function () {
            Engine.hero.money < c.price ? (f.texture = PIXI.Texture.fromFrame("shop_powerup_" + a + "_unavailable.png"),
                b.buttonType = Label.buttonType.DISABLED) : (f.texture = PIXI.Texture.fromFrame("shop_powerup_" + a + ".png"),
                b.buttonType = Label.buttonType.SHOP_INVENTORY,
                b.name = a),
                e.text = c.name,
                e.x = -Math.round(e.width / 2),
                g.text = c.description,
                g.x = -Math.round(g.width / 2),
                h.y = 220,
                i.text = c.price,
                j.x = i.width + 5,
                h.x = -Math.round(h.width / 2),
                d.height = h.y + h.height + 10
        }
}

function ShopSummary() {
    PIXI.Container.call(this);
    var a, b = {
            fontFamily: "Verdana",
            fontSize: 30,
            fill: 16777215
        },
        c = {
            fontFamily: "Verdana",
            fontSize: 30
        },
        d = {
            coin_0: 5343432,
            coin_1: 11582007,
            coin_2: 16761365,
            coin_3: 15427109,
            coin_4: 14294834
        },
        e = {
            coin_0: {},
            coin_1: {},
            coin_2: {},
            coin_3: {},
            coin_4: {}
        };
    a = 0;
    for (var f in e)
        if (e.hasOwnProperty(f)) {
            e[f] = Game.levels[Game.levelId].materials[f];
            var g = PIXI.Sprite.fromFrame("shop_summary_" + f + ".png");
            g.anchor.y = .5,
                g.x = 204,
                g.y = 90 + 70 * a,
                this.addChild(g),
                a++,
                e[f].totalCountGfx = new PIXI.Text("0", b),
                e[f].totalCountGfx.anchor.set(1, .5),
                e[f].totalCountGfx.x = 187,
                e[f].totalCountGfx.y = g.y,
                this.addChild(e[f].totalCountGfx),
                e[f].nameGfx = new PIXI.Text("", c),
                e[f].nameGfx.style.fill = d[f],
                e[f].nameGfx.anchor.set(0, .5),
                e[f].nameGfx.x = 260,
                e[f].nameGfx.y = g.y,
                this.addChild(e[f].nameGfx),
                e[f].totalMoneyGfx = new PIXI.Text("0", b),
                e[f].totalMoneyGfx.anchor.set(0, .5),
                e[f].totalMoneyGfx.x = 504,
                e[f].totalMoneyGfx.y = g.y,
                this.addChild(e[f].totalMoneyGfx)
        }
    var h;
    this.start = function () {
        var a;
        for (a in e)
            e.hasOwnProperty(a) && (e[a].totalCount = 0,
                e[a].totalMoney = 0);
        for (var b = 0; b < Engine.hero.backpack.length; b++)
            e[Engine.hero.backpack[b]].totalCount++;
        var c = 0,
            d = 0;
        for (a in e)
            if (e.hasOwnProperty(a))
                if (e[a].nameGfx.text = e[a].name,
                e[a].totalCount > 0) {
                    e[a].totalCountGfx.visible = !0,
                        e[a].totalMoneyGfx.visible = !0,
                        e[a].totalCountGfx.text = e[a].totalCount;
                    var f = e[a].totalCount * e[a].price;
                    e[a].totalMoney = f,
                        e[a].totalMoneyGfx.text = f;
                    d += .7,
                        TweenMax.to(e[a], .7, {
                            totalMoney: 0,
                            totalCount: 0,
                            delay: c,
                            onStartParams: [f, .7, e[a].totalCount],
                            onStart: function (a, b, c) {
                                h = c,
                                    Engine.hero.money += a,
                                    Display.money.updateText(b)
                            },
                            onUpdateParams: [a],
                            onUpdate: function (a) {
                                var b = Math.round(e[a].totalMoney),
                                    c = Math.ceil(e[a].totalCount);
                                0 === b ? (e[a].totalMoneyGfx.text = "",
                                    e[a].totalCountGfx.text = "") : (e[a].totalMoneyGfx.text = b,
                                    e[a].totalCountGfx.text = c),
                                h !== c && (h = c,
                                    container.audio.play("gem_" + a))
                            },
                            ease: Linear.easeNone
                        }),
                        c += .7
                } else
                    e[a].totalCountGfx.visible = !1,
                        e[a].totalMoneyGfx.visible = !1;
        Engine.hero.backpack = [],
            Display.hud.updateFullUnits(),
            TweenMax.to(this, d, {
                onComplete: Display.shop.showButtons,
                overwrite: !1
            }),
            this.visible = !0
    },
        this.close = function () {
            this.visible = !1
        }
}

function ShopUpgradeItem(a) {
    function b() {
        Object.keys(i)[f] ? (g = Game.levels[Game.levelId].upgrades[a][Object.keys(i)[f]],
            k.visible = !0,
            m.visible = !0,
            n.visible = !0,
            g.lock ? DpCont.isLocalTest ? d() : AmfConnector.getDate(c) : e()) : (g = void 0,
            q.visible = !1,
            k.visible = !1,
            m.visible = !1,
            n.visible = !1,
            l.texture = PIXI.Texture.fromFrame("shop_upgrade_" + a + "_unavailable.png"),
            h.buttonType = Label.buttonType.DISABLED)
    }

    function c(a) {
        e("OK" === a.status ? a.date : "locked")
    }

    function d() {
        e(new Date)
    }

    function e(a) {
        s = a,
            r = !1,
        a && (r = "locked" === a || a < new Date(g.lock)),
            h.updateItemState()
    }

    PIXI.Container.call(this);
    var f, g, h = this;
    this.id = null;
    var i = Game.levels[Game.levelId].upgrades[a],
        j = new PIXI.Graphics;
    j.beginFill(2378092, 1),
        j.drawRect(0, 0, 156, 280),
        j.endFill(),
        j.x = -j.width / 2,
        j.y = -10,
        this.addChild(j);
    var k = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: 15,
        fill: 16777215,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 142
    });
    this.addChild(k);
    var l = new PIXI.Sprite;
    l.anchor.set(.5),
        l.y = 96,
        this.addChild(l);
    var m = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontSize: 12,
        fill: 16777215,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 142
    });
    m.y = 160,
        this.addChild(m);
    var n = new PIXI.Container;
    n.y = 229,
        this.addChild(n);
    var o = new PIXI.Text("", {
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: 25,
        fill: 16777215
    });
    o.anchor.y = .5,
        n.addChild(o);
    var p = PIXI.Sprite.fromFrame("shop_duhak.png");
    p.anchor.y = .5,
        n.addChild(p);
    var q = new PIXI.Text("LOCK", {
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: 15,
        fill: 16777215,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 142
    });
    this.addChild(q),
        this.hilight = function () {
            j.alpha = 1
        },
        this.unhilight = function () {
            j.alpha = 0
        },
        this.nextUpgrade = function () {
            f++,
                b()
        };
    var r, s;
    this.updateItemState = function () {
        if (g ? (k.text = g.name,
            k.x = -Math.round(k.width / 2),
            Engine.hero.money < g.price || r || a === Label.upgrades.DRILL && Engine.hero.artifacts[Object.keys(i)[f - 1]].length !== Engine.artifacts[Object.keys(i)[f]].length || !Object.keys(i)[f] ? (this.id = null,
                l.texture = PIXI.Texture.fromFrame("shop_upgrade_" + a + "_unavailable.png"),
                h.buttonType = Label.buttonType.DISABLED) : (this.id = Object.keys(i)[f],
                console.log("_key", a),
                console.log("Object.keys(_groupConfig)[_itemCount]", Object.keys(i)[f]),
                l.texture = PIXI.Texture.fromFrame("shop_upgrade_" + a + "_" + Object.keys(i)[f] + ".png"),
                h.buttonType = Label.buttonType.SHOP_UPGRADE,
                h.name = a,
                h.id = Object.keys(i)[f])) : (this.id = null,
            l.texture = PIXI.Texture.fromFrame("shop_upgrade_" + a + "_unavailable.png"),
            h.buttonType = Label.buttonType.DISABLED),
            r) {
            var b = Math.abs(new Date(g.lock).getTime() - s.getTime()),
                c = Math.ceil(b / 864e5);
            switch (c) {
                case 1:
                    var d = "den";
                    break;
                case 2:
                case 3:
                case 4:
                    d = "dny";
                    break;
                default:
                    d = "dní"
            }
            q.text = "Bude vynalezena za\n" + c + " " + d,
                q.x = -Math.round(q.width / 2),
                q.y = 96 - Math.round(q.height / 2),
                q.visible = !0
        } else
            g && a === Label.upgrades.DRILL && Engine.hero.artifacts[Object.keys(i)[f - 1]].length !== Engine.artifacts[Object.keys(i)[f]].length ? (q.text = "Posbírej všechny hračky!",
                q.x = -Math.round(q.width / 2),
                q.y = 96 - Math.round(q.height / 2),
                q.visible = !0) : q.visible = !1;
        g && (m.text = g.description,
            m.x = -Math.round(m.width / 2),
            n.y = 245),
            g && 0 !== g.price && Object.keys(i)[f] ? (o.text = g.price,
                p.x = o.width + 5,
                n.x = -Math.round(n.width / 2),
                n.visible = !0) : n.visible = !1
    },
        this.start = function () {
            for (var c = 0; c < Object.keys(i).length; c++)
                if (Engine.hero.upgrades[a] === Object.keys(i)[c]) {
                    f = c + 1;
                    break
                }
            b()
        }
}

function ShopUpgrades() {
    PIXI.Container.call(this);
    var a = Game.levels[Game.levelId].upgrades,
        b = [],
        c = PIXI.Sprite.fromImage("shop_title_upgrades.png");
    c.position.set(66, 44),
        this.addChild(c),
        this.upgrades = {};
    var d = 0;
    for (var e in a)
        a.hasOwnProperty(e) && (Engine.shopUpgradeKeys.push(e),
            this.upgrades[e] = new ShopUpgradeItem(e),
            this.upgrades[e].x = 136 + 162 * d,
            this.upgrades[e].y = 131,
            this.addChild(this.upgrades[e]),
            b.push(this.upgrades[e]),
            d++);
    this.hilight = function () {
        this.unhilight(),
            this.upgrades[Engine.shopUpgradeKeys[Engine.shopUpgradeKeysCount]].hilight()
    },
        this.unhilight = function () {
            for (var a in this.upgrades)
                this.upgrades.hasOwnProperty(a) && this.upgrades[a].unhilight()
        },
        this.updateItems = function () {
            for (var b in a)
                a.hasOwnProperty(b) && this.upgrades[b].updateItemState()
        },
        this.nextUpgrade = function (a) {
            this.upgrades[a].nextUpgrade()
        },
        this.start = function () {
            for (var a in this.upgrades)
                this.upgrades.hasOwnProperty(a) && this.upgrades[a].start();
            Gamepad.addButtons(b),
                this.visible = !0
        },
        this.close = function () {
            this.visible = !1,
                Gamepad.removeButtons(b)
        }
}

function Spuntici() {
    Display.spuntici = this,
        PIXI.Container.call(this);
    var a = {
        blue: {},
        green: {},
        yellow: {},
        orange: {},
        red: {}
    };
    for (var b in a)
        a.hasOwnProperty(b) && (a[b] = new Spuntik(b),
            this.addChild(a[b]));
    this.play = function (b) {
        for (var c in a)
            a.hasOwnProperty(c) && a[c].play(b);
        Sound.lib.spunt_povidani.play()
    },
        this.stop = function () {
            for (var b in a)
                a.hasOwnProperty(b) && a[b].stop();
            Sound.lib.spunt_povidani.stop()
        }
}

function Spuntik(a) {
    function b(a) {
        switch (a) {
            case Label.follows.HERO:
                var k = Engine.hero.pos.col;
                break;
            case Label.follows.SHOP:
                k = j
        }
        var l = k * i,
            m = Math.random() * h;
        c.x >= l ? c.scale.x = -d : c.scale.x = d,
            TweenMax.to(c, g + g * Math.random(), {
                x: l + m * c.scale.x,
                ease: Power1.easeInOut,
                onComplete: function () {
                    switch (a) {
                        case Label.follows.HERO:
                            f++,
                                b(f === e ? Label.follows.SHOP : a);
                            break;
                        case Label.follows.SHOP:
                            b(a)
                    }
                }
            })
    }

    var c = this;
    PIXI.Container.call(this);
    var d = .5;
    this.scale.set(d);
    for (var e, f, g = 1, h = 150, i = Game.levels[Game.levelId].world.tile.size, j = Game.levels[Game.levelId].world.shop.col, k = [], l = 0; l <= 3; l++)
        k.push(PIXI.Texture.fromFrame("hero_" + a + "_right_" + l + ".png"));
    var m = new PIXI.extras.AnimatedSprite(k);
    m.anchor.set(.5, 0),
        m.animationSpeed = .3,
        this.addChild(m),
        this.play = function () {
            TweenMax.killTweensOf(this),
                m.play(),
                e = Math.floor(1 * Math.random()) + 3,
                f = 0;
            var a = Engine.hero.pos.col * i;
            this.x = j * i >= a ? a + Global.STAGE.center.x + i : a - Global.STAGE.center.x - i,
                b(Label.follows.HERO),
                this.visible = !0
        },
        this.stop = function () {
            TweenMax.killTweensOf(this),
                m.stop();
            var a, b = Engine.hero.pos.col * i;
            j * i >= b ? (this.scale.x = d,
                a = b + Global.STAGE.center.x + i) : (this.scale.x = -d,
                a = b - Global.STAGE.center.x - i),
                TweenMax.to(this, g + Math.random() * g, {
                    x: a,
                    ease: Power1.easeInOut,
                    onComplete: function () {
                        c.visible = !1
                    }
                })
        },
        this.visible = !1
}

function Teleport() {
    PIXI.Container.call(this);
    this.shadow = PIXI.Sprite.fromFrame("world_tile_shadow.png");
    for (var a = [], b = 0; b < 5; b++) {
        var c = PIXI.Texture.fromFrame("world_teleport_" + b + ".png");
        a.push(c)
    }
    var d = new PIXI.extras.AnimatedSprite(a);
    d.animationSpeed = .3,
        d.play(),
        this.addChild(d),
        this.addChild(this.shadow),
        this.setShadow = function (a, b, c) {
            a >= .9 && (a = 1),
                TweenMax.to(this.shadow, b, {
                    alpha: a,
                    delay: c
                })
        },
        this.reset = function () {
            this.setShadow(1, 0, 0)
        }
}

function TeleportMap() {
    Display.teleportMap = this,
        PIXI.Container.call(this);
    const a = {
        surface: 16777215,
        blue: 7048649,
        green: 11975741,
        yellow: 15649064,
        orange: 13725740,
        red: 12401717
    };
    var b = {},
        c = [];
    this.generate = function () {
        var d, e = Game.levels[Game.levelId].world,
            f = 0;
        for (d in e.layers)
            e.layers.hasOwnProperty(d) && (f += e.layers[d].rows);
        var g = 300 / e.cols,
            h = 300 / f,
            i = 0;
        for (d in e.layers)
            if (e.layers.hasOwnProperty(d)) {
                var j = new PIXI.Graphics;
                j.beginFill(a[d]),
                    j.drawRect(0, 0, 300, h * e.layers[d].rows),
                    j.endFill(),
                    j.y = i,
                    i += j.height,
                    this.addChild(j)
            }
        for (var k = 0; k <= f; k++)
            for (var l = 0; l <= e.cols; l++) {
                var m = Engine.world["row" + k]["col" + l];
                if (m.tileType === Label.tileType.TELEPORT) {
                    var n = new PIXI.Sprite.fromFrame("world_teleport_1.png");
                    n.anchor.set(.5),
                        n.width = g,
                        n.height = h,
                        n.x = m.teleport.col * g,
                        n.y = m.teleport.row * h,
                        n.buttonType = Label.buttonType.TELEPORT,
                        n.name = m.teleport.id,
                        this.addChild(n),
                        b[m.teleport.id] = n,
                        c.push(n),
                        Engine.teleports[m.teleport.id] = m.teleport
                }
            }
        this.x = Global.STAGE.width - this.width
    },
        this.show = function () {
            Gamepad.addButtons(c),
                this.visible = !0
        },
        this.hide = function () {
            Gamepad.removeButtons(c),
                this.visible = !1
        },
        this.hide()
}

function Tile() {
    PIXI.Container.call(this);
    var a, b;
    this.shadow = PIXI.Sprite.fromFrame("world_tile_shadow.png"),
        this.setSkin = function (c, d) {
            var e, f, g;
            if (c === Label.tileType.NONE || c === Label.tileType.SHOP)
                e = PIXI.Texture.fromFrame("world_tile_none.png"),
                    f = 0;
            else if (c === Label.tileType.UNBREAKABLE)
                e = PIXI.Texture.fromFrame("world_tile_" + d + "_" + c + "_" + Math.floor(16 * Engine.randomSeed()) + ".png"),
                    f = 0;
            else {
                var h, i;
                if (-1 !== c.indexOf("artifact"))
                    h = "",
                        i = h,
                        f = 0,
                        g = "world_tile_" + c + ".png";
                else if (-1 !== c.indexOf("coin"))
                    h = "_skin_" + Math.floor(3 * Engine.randomSeed()),
                        i = h,
                        f = 3,
                        g = "world_tile_" + d + "_" + c + h + ".png";
                else if (-1 !== c.indexOf("bonus"))
                    h = "",
                        i = h,
                        f = 3,
                        g = "world_tile_" + d + "_" + c + ".png";
                else {
                    switch (c) {
                        case Label.tileType.SOIL:
                            h = "_" + Math.floor(4 * Engine.randomSeed()),
                                i = "",
                                f = 2;
                            break;
                        case Label.tileType.OBSTACLE:
                            h = "_" + Math.floor(2 * Engine.randomSeed()),
                                i = h,
                                f = 2;
                            break;
                        case Label.tileType.CAVE_UP:
                        case Label.tileType.CAVE_DOWN:
                            h = "_" + Math.floor(3 * Engine.randomSeed()),
                                i = h,
                                f = 2;
                            break;
                        default:
                            console.log("Tile DEFAULT !!!", c),
                                h = ""
                    }
                    g = "world_tile_" + d + "_" + c + h + ".png"
                }
                e = PIXI.Texture.fromFrame(g)
            }
            a = [],
                a.push(e);
            for (var j = 0; j < f; j++)
                a.push(PIXI.Texture.fromFrame("world_tile_" + d + "_" + c + i + "_crack_" + j + ".png"));
            a.push(PIXI.Texture.fromFrame("world_tile_" + Label.tileType.NONE + ".png")),
                b = new PIXI.extras.AnimatedSprite(a),
                b.loop = !1,
                this.addChild(b),
                this.addChild(this.shadow)
        },
        this.crack = function (a) {
            b.animationSpeed = 1 / (15 * a),
                b.play()
        },
        this.setShadow = function (a, b, c) {
            a >= .9 && (a = 1),
                TweenMax.to(this.shadow, b, {
                    alpha: a,
                    delay: c
                })
        },
        this.reset = function () {
            this.removeChild(b),
                b.destroy(),
                this.setShadow(1, 0, 0),
                a = []
        }
}

function Vrtulka() {
    var a = Display.vrtulka = this;
    PIXI.Container.call(this);
    var b, c = [];
    for (b = 3; b <= 23; b++)
        c.push(PIXI.Texture.fromFrame("vrtulka_" + b + ".png"));
    for (b = 22; b > 1; b--)
        c.push(PIXI.Texture.fromFrame("vrtulka_" + b + ".png"));
    var d = new PIXI.extras.AnimatedSprite(c);
    d.animationSpeed = .3,
        this.addChild(d);
    var e;
    this.start = function (a) {
        e = a,
            this.visible = !0,
            TweenMax.to(this, .5, {
                x: Global.STAGE.width
            }),
            d.gotoAndPlay(1),
            d.visible = !0,
            Sound.playSpeech(e)
    },
        this.odlet = function () {
            TweenMax.to(a, 1, {
                x: Global.STAGE.width + Math.abs(a.width)
            })
        }
}

function World() {
    function a(a) {
        var b = Engine.hero.pos.col,
            d = Engine.hero.pos.row;
        switch (a) {
            case Label.key.DOWN:
                d++;
                break;
            case Label.key.UP:
                d--;
                break;
            case Label.key.RIGHT:
                b++;
                break;
            case Label.key.LEFT:
                b--
        }
        var e = Engine.worldGenerator.codeCharToTileType(Engine.worldGenerator.getTileTypeCodeChar(b, d)),
            f = Engine.tileLayerNames[d][b];
        switch (e) {
            case Label.tileType.TELEPORT:
                Engine.getTeleportConfig(b, d).visible && (container.features.isMobile ? Display.alert.startStatic("Stiskni tlačítko A.") : Display.alert.startStatic("Stiskni mezerník."),
                Engine.hero.help.firstTeleportApproach && (Display.vrtulka.start("dabing5"),
                    Engine.hero.help.firstTeleportApproach = !1),
                    Sound.lib.portal_smycka.play());
                break;
            case Label.tileType.SHOP:
                if (container.features.isMobile)
                    var g = "Stiskni tlačítko A.";
                else
                    g = "Stiskni mezerník.";
                Global.userSignedIn || (g += "\nPro uložení stavu se musíš přihlásit ke svému účtu."),
                    Display.alert.startStatic(g);
                break;
            default:
                Display.alert.static && Display.alert.hide(),
                    Sound.lib.portal_smycka.stop()
        }
        if (-1 !== e.indexOf("artifact"))
            Engine.hero.help.firstArtefakt && (Display.vrtulka.start("dabing17"),
                Engine.hero.help.firstArtefakt = !1);
        else
            switch (e) {
                case Label.tileType.UNBREAKABLE:
                    Engine.hero.help.firstUnbreakable && (Display.vrtulka.start("dabing7"),
                        Engine.hero.help.firstUnbreakable = !1)
            }
        -
            1 !== e.indexOf("bonus") && Engine.hero.help.firstBone && (Display.vrtulka.start("dabing14"),
            Engine.hero.help.firstBone = !1),
            e !== Label.tileType.UNBREAKABLE && e !== Label.tileType.HORIZON ? Game.levels[Game.levelId].upgrades.drill[Engine.hero.upgrades.drill].layers[f] ? c(a, b, d) : (Engine.hero.help.firstLockedLayer && (Display.vrtulka.start("dabing8"),
                Engine.hero.help.firstLockedLayer = !1),
                Display.alert.start("Zajeď do obchodu pro lepší vrták"),
                Display.hero.stop(a),
                container.audio.play("narazil_na_neprokopatelne")) : Display.hero.stop(a)
    }

    function b(a, b, c) {
        Sound.stopMoveSounds(),
            -1 !== a.indexOf("artifact") || a === Label.tileType.NONE || a === Label.tileType.SHOP || a === Label.tileType.TELEPORT ? (Display.hero.walk(b, c),
                Sound.playSound("chozeni")) : (Display.hero.dig(b, c),
                a === Label.tileType.OBSTACLE ? Sound.playSound("kopani_sbijeckou_do_kamene") : Sound.playSound("kopani_sbijeckou"))
    }

    function c(c, f, k) {
        Engine.phase = Label.phase.MOVE;
        var l = Engine.worldGenerator.codeCharToTileType(Engine.worldGenerator.getTileTypeCodeChar(f, k)),
            q = Engine.tileLayerNames[k][f],
            r = y[l],
            s = Game.levels[Game.levelId].upgrades.drill[Engine.hero.upgrades.drill].timeScale,
            t = Engine.hero.energyUnits,
            u = Math.round(r.resistance * s);
        Engine.hero.energyUnits -= u,
        Engine.hero.energyUnits < 0 && (Engine.hero.energyUnits = 0),
        Game.levels[Game.levelId].energyUnitsAlert > Engine.hero.energyUnits && Game.levels[Game.levelId].energyUnitsAlert <= t && container.audio.play("energie_vzdy_kdyz_dochazi");
        var C = u * x * s;
        switch (Display.hud.updateEnergy(C),
            c) {
            case Label.key.DOWN:
                Engine.hero.pos.row++,
                    n++,
                    i(n),
                    TweenMax.to([A, B], C, {
                        y: A.y - v,
                        ease: Linear.easeNone
                    }),
                    TweenMax.to(z.tilePosition, C, {
                        y: z.tilePosition.y - v * w,
                        ease: Linear.easeNone
                    });
                for (var D in Engine.layersDepth)
                    Engine.layersDepth.hasOwnProperty(D) && k > Engine.layersDepth[D].start - 3 && (Engine.hero.layersReached[D] = !0);
                break;
            case Label.key.UP:
                Engine.hero.pos.row--,
                    m--,
                    i(m),
                    TweenMax.to([A, B], C, {
                        y: A.y + v,
                        ease: Linear.easeNone
                    }),
                    TweenMax.to(z.tilePosition, C, {
                        y: z.tilePosition.y + v * w,
                        ease: Linear.easeNone
                    }),
                0 === k && Engine.surfaceReached();
                break;
            case Label.key.RIGHT:
                Engine.hero.pos.col++,
                    p++,
                    j(p),
                    TweenMax.to([A, B], C, {
                        x: A.x - v,
                        ease: Linear.easeNone
                    }),
                    TweenMax.to(z.tilePosition, C, {
                        x: z.tilePosition.x - v * w,
                        ease: Linear.easeNone
                    });
                break;
            case Label.key.LEFT:
                Engine.hero.pos.col--,
                    o--,
                    j(o),
                    TweenMax.to([A, B], C, {
                        x: A.x + v,
                        ease: Linear.easeNone
                    }),
                    TweenMax.to(z.tilePosition, C, {
                        x: z.tilePosition.x + v * w,
                        ease: Linear.easeNone
                    })
        }
        TweenMax.to(this, C, {
            onComplete: function () {
                var b = Engine.tileLayerNames[k][f];
                switch (Engine.prevLayer !== b && (Sound.changeMusic(b),
                    Display.artifacts.showLayer(b),
                    Engine.prevLayer = b),
                c !== Label.key.UP && c !== Label.key.DOWN || c === Label.key.DOWN && Achievments.hloubkovyKutak(),
                r.price && Engine.hero.backpack.length < Game.levels[Game.levelId].upgrades.backpack[Engine.hero.upgrades.backpack].units && (Engine.hero.backpack.push(l),
                    Display.hud.updateFullUnits(),
                Engine.hero.help.firstGem && (Display.vrtulka.start("dabing2"),
                    Engine.hero.help.firstGem = !1)),
                r.bonus && (Engine.hero.money += r.bonus,
                    Display.money.updateText(.5),
                    Display.alert.start(r.bonus)),
                    l) {
                    case Label.tileType.COIN_0:
                        container.audio.play("gem_coin_0"),
                            Achievments.objemovyAchievment(l);
                        break;
                    case Label.tileType.COIN_1:
                        container.audio.play("gem_coin_1"),
                            Achievments.objemovyAchievment(l);
                        break;
                    case Label.tileType.COIN_2:
                        container.audio.play("gem_coin_2"),
                            Achievments.objemovyAchievment(l);
                        break;
                    case Label.tileType.COIN_3:
                        container.audio.play("gem_coin_3"),
                            Achievments.objemovyAchievment(l);
                        break;
                    case Label.tileType.COIN_4:
                        container.audio.play("gem_coin_4"),
                            Achievments.objemovyAchievment(l);
                        break;
                    case Label.tileType.OBSTACLE:
                        Achievments.objemovyAchievment(l);
                        break;
                    default:
                        if (-1 !== l.indexOf("bonus"))
                            container.audio.play("sebrani_kosti"),
                                Achievments.sberatelKosti(l);
                        else if (-1 !== l.indexOf("artifact")) {
                            Display.artifacts.artifactCollected(q, l),
                                Engine.hero.artifacts[q].push(l);
                            var d = !0;
                            Engine.hero.help.firstLayerArtifactsColected && Engine.hero.artifacts[Label.layerName.LAYER_0].length === Engine.artifacts[Label.layerName.LAYER_0].length && (Display.vrtulka.start("dabing16"),
                                Engine.hero.help.firstLayerArtifactsColected = !1);
                            for (var e in Engine.hero.artifacts)
                                if (Engine.hero.artifacts.hasOwnProperty(e) && Engine.hero.artifacts[e].length !== Engine.artifacts[e].length) {
                                    d = !1;
                                    break
                                }
                            d && Engine.showWinscreen(),
                                container.audio.play("sebrani_artefaktu"),
                                Achievments.objemovyAchievment()
                        } else
                            l !== Label.tileType.SOIL && l !== Label.tileType.CAVE_DOWN && l !== Label.tileType.CAVE_UP || Achievments.objemovyAchievment()
                }
                if (Engine.hero.energyUnits > 0) {
                    switch (c) {
                        case Label.key.DOWN:
                            g(m),
                                m++;
                            break;
                        case Label.key.UP:
                            g(n),
                                n--;
                            break;
                        case Label.key.RIGHT:
                            h(o),
                                o++;
                            break;
                        case Label.key.LEFT:
                            h(p),
                                p--
                    }
                    Engine.dir ? a(Engine.dir) : Display.hero.stop(c)
                } else
                    Engine.rescue(),
                    Engine.hero.help.firstDeath && (Display.vrtulka.start("dabing15"),
                        Engine.hero.help.firstDeath = !1)
            },
            overwrite: !1
        }),
            d(f, k, C),
            e(C),
            b(l, c, C)
    }

    function d(a, b, c) {
        var d = Engine.worldGenerator.codeCharToTileType(Engine.worldGenerator.getTileTypeCodeChar(a, b));
        d !== Label.tileType.TELEPORT && d !== Label.tileType.NONE && d !== Label.tileType.SHOP && (A.tiles["row" + b]["col" + a].crack(c),
            TweenMax.to(this, c, {
                onComplete: function () {
                    d = Label.tileType.NONE,
                        A.tiles["row" + b]["col" + a].setSkin(d),
                        Engine.worldGenerator.setTileTypeCodeChar(a, b, Engine.worldGenerator.tileTypeToTypeCodeChar(Label.tileType.NONE))
                },
                overwrite: !1
            }))
    }

    function e(a) {
        a || (a = x);
        for (var b = Game.levels[Game.levelId].upgrades.flashlight[Engine.hero.upgrades.flashlight].radius, c = Game.levels[Game.levelId].upgrades.flashlight[Engine.hero.upgrades.flashlight].treshold, d = Engine.hero.pos.col, e = Engine.hero.pos.row, f = d - b, g = d + b, h = e - b, i = e + b, j = h; j <= i; j++) {
            var k = Math.abs(j - e);
            if (k <= c)
                var l = 0;
            else
                l = k / b;
            for (var m = f; m <= g; m++) {
                var n = Math.abs(m - d);
                if (n <= c)
                    var o = 0;
                else
                    o = n / b;
                var p = Math.round(10 * Math.sqrt(Math.pow(o, 2) + Math.pow(l, 2))) / 10;
                p > .9 && (p = .9),
                Engine.worldGenerator.tileExists(m, j) && p < Engine.worldGenerator.getShadowValue(m, j) / 10 && (Engine.worldGenerator.setShadowValue(m, j, 10 * p),
                A.tiles["row" + j] && A.tiles["row" + j]["col" + m] && A.tiles["row" + j]["col" + m].setShadow(p, a, 0))
            }
        }
    }

    function f(a, b) {
        if (A.tiles["row" + b] && A.tiles["row" + b]["col" + a]) {
            var c = A.tiles["row" + b]["col" + a];
            A.removeChild(c),
                c.reset(),
            -1 === b && q--;
            var d = Engine.worldGenerator.codeCharToTileType(Engine.worldGenerator.getTileTypeCodeChar(a, b));
            d === Label.tileType.HORIZON ? Engine.horizonsPool.push(c) : d === Label.tileType.TELEPORT ? Engine.teleportsPool.push(c) : Engine.tilesPool.push(c),
                delete A.tiles["row" + b]["col" + a]
        }
    }

    function g(a) {
        var b;
        if (-1 !== a) {
            if (1 === a)
                for (b = o; b <= p; b++)
                    f(b, -1);
            for (b = o; b <= p; b++)
                f(b, a);
            delete A.tiles["row" + a]
        }
    }

    function h(a) {
        for (var b = m; b <= n; b++)
            -
                1 !== b && (1 === b && f(a, -1),
                f(a, b))
    }

    function i(a) {
        var b;
        if (-1 !== a) {
            if (1 === a)
                for (b = o; b <= p; b++)
                    l(b, -1);
            for (b = o; b <= p; b++)
                l(b, a)
        }
    }

    function j(a) {
        for (var b = m; b <= n; b++)
            -
                1 !== b && (1 === b && l(a, -1),
                l(a, b))
    }

    function k() {
        m = Engine.hero.pos.row - Math.floor(u / 2),
            n = Engine.hero.pos.row + Math.floor(u / 2),
            o = Engine.hero.pos.col - Math.floor(t / 2),
            p = Engine.hero.pos.col + Math.floor(t / 2);
        for (var a = m; a <= n; a++)
            i(a);
        A.x = Global.STAGE.center.x - Engine.hero.pos.col * v,
            A.y = Global.STAGE.center.y - Engine.hero.pos.row * v,
            B.x = A.x,
            B.y = A.y,
            e(x)
    }

    function l(a, b) {
        var c, d = Engine.worldGenerator.codeCharToTileType(Engine.worldGenerator.getTileTypeCodeChar(a, b)),
            e = Engine.worldGenerator.getShadowValue(a, b) / 10,
            f = Engine.tileLayerNames[b][a];
        if (d !== Label.tileType.INVISIBLE) {
            if (d === Label.tileType.HORIZON)
                0 === Engine.horizonsPool.length ? c = new Horizon : (c = Engine.horizonsPool[0],
                    Engine.horizonsPool.splice(0, 1)),
                    c.setSkin(a);
            else if (d === Label.tileType.TELEPORT) {
                0 === Engine.teleportsPool.length ? c = new Teleport : (c = Engine.teleportsPool[0],
                    Engine.teleportsPool.splice(0, 1));
                var g = Engine.getTeleportConfig(a, b);
                c.visible = g.visible,
                    c.setShadow(e, 0, 0)
            } else
                0 === Engine.tilesPool.length ? c = new Tile : (c = Engine.tilesPool[0],
                    Engine.tilesPool.splice(0, 1)),
                    c.setSkin(d, f),
                    c.setShadow(e, 0, 0);
            c.x = v * (a - .5),
                c.y = v * (b - .5),
                -1 === b ? (A.addChildAt(c, 0),
                    q++) : a === o ? 1 === b ? A.addChildAt(c, q) : A.addChildAt(c, 0) : A.addChild(c),
            A.tiles["row" + b] || (A.tiles["row" + b] = {}),
                A.tiles["row" + b]["col" + a] = c
        }
    }

    Display.world = this;
    var m, n, o, p, q, r = this.cont = new PIXI.Container,
        s = Game.levels[Game.levelId].world,
        t = s.view.cols,
        u = s.view.rows,
        v = s.tile.size,
        w = s.bg.paralaxRatio,
        x = Game.levels[Game.levelId].materials.defaultMoveTime,
        y = Game.levels[Game.levelId].materials,
        z = new PIXI.extras.TilingSprite(PIXI.Texture.fromFrame("world_background.png"), Global.STAGE.width, Global.STAGE.height);
    r.addChild(z);
    var A = new PIXI.Container;
    A.tiles = {},
        r.addChild(A);
    var B = new Spuntici;
    r.addChild(B),
        this.start = function () {
            q = 0,
                k()
        },
        this.close = function () {
            TweenMax.killAll()
        },
        this.moveKeyPressed = function (b) {
            Engine.phase === Label.phase.WAITING && a(b)
        },
        this.tnt = function (a) {
            a || (a = x);
            for (var b = Game.levels[Game.levelId].inventory.tnt.radius, c = Engine.hero.pos.col, e = Engine.hero.pos.row, f = c - b, g = c + b, h = e - b, i = e + b, j = h; j <= i; j++)
                for (var k = Math.abs(j - e), l = k / b, m = f; m <= g; m++) {
                    var n = Math.abs(m - c),
                        o = n / b,
                        p = Math.sqrt(Math.pow(o, 2) + Math.pow(l, 2));
                    if (p < 1 && Engine.worldGenerator.tileExists(m, j)) {
                        var q = Engine.worldGenerator.codeCharToTileType(Engine.worldGenerator.getTileTypeCodeChar(m, j)),
                            r = Engine.tileLayerNames[j][m];
                        Game.levels[Game.levelId].upgrades.drill[Engine.hero.upgrades.drill].layers[r] && (Engine.worldGenerator.setShadowValue(m, j, 0),
                        A.tiles["row" + j] && A.tiles["row" + j]["col" + m] && A.tiles["row" + j]["col" + m].setShadow(0, p * a, 0),
                        q !== Label.tileType.OBSTACLE && q !== Label.tileType.SOIL && q !== Label.tileType.CAVE_UP && q !== Label.tileType.CAVE_DOWN || d(m, j, p * a))
                    }
                }
        },
        this.updateShadows = e,
        this.sonar = function (a) {
            a || (a = x);
            for (var b = Game.levels[Game.levelId].inventory.sonar.radius, c = Engine.hero.pos.col, d = Engine.hero.pos.row, e = c - b, f = c + b, g = d - b, h = d + b, i = g; i <= h; i++)
                for (var j = Math.abs(i - d), k = j / b, l = e; l <= f; l++) {
                    var m = Math.abs(l - c),
                        n = m / b,
                        o = Math.sqrt(Math.pow(n, 2) + Math.pow(k, 2));
                    o < 1 && Engine.worldGenerator.tileExists(l, i) && 0 < Engine.worldGenerator.getShadowValue(l, i) / 10 && (Engine.worldGenerator.setShadowValue(l, i, 0),
                    A.tiles["row" + i] && A.tiles["row" + i]["col" + l] && A.tiles["row" + i]["col" + l].setShadow(0, a, o * a))
                }
        },
        this.removeAll = function () {
            for (var a = m; a <= n; a++)
                g(a)
        },
        this.teleport = function (a) {
            Sound.lib.portal_smycka.stop(),
                Engine.phase = Label.phase.TELEPORT;
            var b = s.teleport.time / 4;
            Display.hero.startTeleport(b),
                Display.level.worldShadow.visible = !0,
                TweenMax.to(Display.level.worldShadow, b, {
                    alpha: 1,
                    delay: b,
                    onComplete: function () {
                        if (Display.world.removeAll(),
                        "main" === a) {
                            var c = Engine.hero.lastUsedTeleport;
                            Engine.hero.pos.row = Engine.teleports[c].row,
                                Engine.hero.pos.col = Engine.teleports[c].col,
                                Display.spuntici.stop()
                        } else
                            c = "main",
                            "" !== a && (Engine.hero.mainTeleportVisible = !0,
                                Engine.teleports[c].visible = !0,
                                Engine.surfaceReached(),
                                Engine.hero.lastUsedTeleport = a),
                                Engine.hero.pos.row = Engine.teleports[c].jumpRow,
                                Engine.hero.pos.col = Engine.teleports[c].jumpCol,
                                Display.spuntici.play();
                        k(),
                            TweenMax.to(Display.level.worldShadow, b, {
                                alpha: 0,
                                onComplete: function () {
                                    Display.level.worldShadow.visible = !1,
                                        Display.hero.endTeleport(b, c)
                                }
                            })
                    }
                })
        }
}

function Winscreen() {
    function a(b) {
        var c = 30 * Math.random() + 30,
            d = c / 200;
        TweenMax.to(b, d, {
            y: b.startY - c,
            repeat: 1,
            yoyo: !0,
            onComplete: a,
            onCompleteParams: [b]
        })
    }

    Display.winscreen = this,
        PIXI.Container.call(this);
    var b = PIXI.Sprite.fromFrame("screen_outro_background.png");
    this.addChild(b);
    var c = PIXI.Sprite.fromFrame("screen_outro_spunt_red.png");
    c.x = 847,
        c.y = 213,
        c.startY = 213,
        this.addChild(c);
    var d = PIXI.Sprite.fromFrame("screen_outro_spunt_blue.png");
    d.x = 19,
        d.y = 368,
        d.startY = 368,
        this.addChild(d);
    var e = new Candle;
    e.x = 443,
        e.y = 281,
        this.addChild(e);
    var f = new Candle;
    f.x = 507,
        f.y = 146,
        this.addChild(f);
    var g = new Candle;
    g.x = 614,
        g.y = 188,
        this.addChild(g);
    var h = new Candle;
    h.x = 538,
        h.y = 343,
        this.addChild(h);
    var i = PIXI.Sprite.fromFrame("menu_btn_continue_1.png");
    i.buttonType = Label.buttonType.WINSCREEN,
        i.x = 820,
        i.y = 500,
        this.addChild(i),
        this.show = function () {
            this.visible = !0,
                this.alpha = 0,
                TweenMax.to(this, 1.5, {
                    alpha: 1,
                    onComplete: function () {
                        Engine.phase = Label.phase.INACTIVE
                    }
                }),
            !DpCont.isLocalTest && container.isContestActive() && container.showContestForm(),
                e.start(),
                f.start(),
                g.start(),
                h.start(),
                a(c),
                a(d),
                Gamepad.addButtons(i)
        },
        this.hide = function () {
            this.visible = !1,
                e.stop(),
                f.stop(),
                g.stop(),
                h.stop(),
                TweenMax.killTweensOf([c, d]),
                c.y = c.startY,
                d.y = d.startY,
                Gamepad.removeButtons(i)
        },
        this.hide()
}

function Candle() {
    function a() {
        for (var c = 0; c < 3; c++)
            b[c].visible = !1;
        b[Math.floor(Math.random() * b.length)].visible = !0,
            TweenMax.to(this, .1, {
                onComplete: a,
                overwrite: !1
            })
    }

    PIXI.Container.call(this);
    for (var b = [], c = 0; c < 3; c++) {
        var d = PIXI.Sprite.fromFrame("screen_outro_candlelight_" + c + ".png");
        d.anchor.set(.5, 1),
            this.addChild(d),
            b.push(d),
            d.visible = !1
    }
    this.start = function () {
        a()
    },
        this.stop = function () {
            TweenMax.killTweensOf(this)
        }
}

function SaveLoad() {
    function a(a, b) {
        for (var c = "", d = 0; d < a.length; d++)
            a[d] === b[d] ? c += h : c += b[d];
        return c
    }

    function b(a) {
        console.log("loadSeedCallback", a),
            "OK" === a.status ? (Engine.startSeed = Number(a.state),
                Engine.seed = Engine.startSeed,
                AmfConnector.loadAppState(c, 0, "hero", "text")) : g()
    }

    function c(a) {
        if (console.log("loadHeroCallback", a),
        "OK" === a.status) {
            var b = LZString.decompressFromUTF16(a.state);
            Engine.hero = JSON.parse(b),
                TweenMax.delayedCall(.1, function () {
                    Engine.worldGenerator.generateWorldConfig(),
                        AmfConnector.loadAppState(d, 0, "shadowMap", "text")
                })
        } else
            g()
    }

    function d(a) {
        if (console.log("loadShadowMapCallback", a),
        "OK" === a.status) {
            var b = LZString.decompressFromUTF16(a.state);
            Engine.shadowMap = e(Engine.shadowMap, b),
                AmfConnector.loadAppState(f, 0, "tileTypeCodeMap", "text")
        } else
            g()
    }

    function e(a, b) {
        for (var c = 0; c < b.length; c++)
            b[c] !== h && (a = a.replaceAt(c, b[c]));
        return a
    }

    function f(a) {
        if (console.log("loadTileTypeCodeMapCallback", a),
        "OK" === a.status) {
            var b = LZString.decompressFromUTF16(a.state);
            Engine.tileTypeCodeMap = e(Engine.tileTypeCodeMap, b),
                TweenMax.delayedCall(.1, function () {
                    Display.alert.start("Nahráno"),
                        Engine.startLevel()
                })
        } else
            g()
    }

    function g() {
        Display.alert.start("Hru se nepodařilo nahrát"),
            Display.menu.hideContinue(),
            Engine.phase = Label.phase.MENU
    }

    Engine.saveLoad = this;
    var h = "#";
    this.save = function (b, c) {
        var d = LZString.compressToUTF16(JSON.stringify(Engine.hero)),
            e = a(Engine.generatedShadowMap, Engine.shadowMap),
            f = a(Engine.generatedTileTypeCodeMap, Engine.tileTypeCodeMap),
            g = LZString.compressToUTF16(e),
            h = LZString.compressToUTF16(f);
        DpCont.isLocalTest ? c() : TweenMax.delayedCall(.1, function () {
            AmfConnector.saveAppState(b, Engine.slotNum, "v4.0", [{
                name: "startSeed",
                state: String(Engine.startSeed)
            }, {
                name: "hero",
                state: d
            }, {
                name: "shadowMap",
                state: g
            }, {
                name: "tileTypeCodeMap",
                state: h
            }])
        })
    },
        this.load = function () {
            AmfConnector.loadAppState(b, 0, "startSeed", "text")
        }
}

function WorldGenerator() {
    function a() {
        var a, b = [];
        for (a = 0; a < Game.levels[Game.levelId].world.artifacts; a++)
            b.push(a);
        Engine.artifacts.surface = [];
        var c = Game.levels[Game.levelId].world.layers;
        for (var d in c)
            if (c.hasOwnProperty(d) && c[d].artifacts)
                for (Engine.artifacts[d] = [],
                         a = 0; a < c[d].artifacts; a++) {
                    var e = Math.floor(Engine.randomSeed() * b.length),
                        f = "artifact_" + b[e];
                    Engine.artifacts[d].push(f),
                        b.splice(e, 1)
                }
    }

    function b() {
        var a, b = 65;
        A = [],
            B = [];
        for (a in Label.tileType)
            Label.tileType.hasOwnProperty(a) && (A.push(Label.tileType[a]),
                B.push(String.fromCharCode(b)),
            91 === ++b && (b = 97));
        console.log(A),
            console.log(B),
            Engine.tileTypeCodeMap = "",
            r = 2 * p.rows;
        for (a in o.layers)
            o.layers.hasOwnProperty(a) && (r += o.layers[a].rows);
        Engine.tileTypeCodeMap = new Array(r * q + 1).join("#")
    }

    function c(a, b) {
        return (b + p.rows) * q + a + p.cols
    }

    function d() {
        Engine.shadowMap = "";
        for (var a in Engine.tileLayerNames)
            if (Engine.tileLayerNames.hasOwnProperty(a))
                for (var b in Engine.tileLayerNames[a])
                    Engine.tileLayerNames[a].hasOwnProperty(b) && (Engine.shadowMap.length / q > 8 ? Engine.shadowMap += 9 : Engine.shadowMap += 0)
    }

    function e(a, b) {
        var c = t[b].possibilityInterval[a].intEnd - t[b].possibilityInterval[a].intStart;
        w += c;
        var d = c * v + u;
        u = d - Math.floor(d),
            d = Math.floor(d),
            x += d;
        for (var e = 0; e < d; e++)
            t[b].content.push(a)
    }

    function f(a, b) {
        var c;
        if (b.artifacts)
            for (var d = g(b), e = 0; e < b.artifacts; e++)
                if (d.length > 0) {
                    var f = Math.floor(Engine.randomSeed() * d.length),
                        h = d[f],
                        i = h[0],
                        j = h[1];
                    d.splice(f, 1),
                        c = C.tileTypeToTypeCodeChar(Engine.artifacts[a][e]),
                        C.setTileTypeCodeChar(i, j + s, c),
                        Engine.tileLayerNames[j + s][i] = a;
                    for (var k = i - 1; k <= i + 1; k++) {
                        var l = j - 1;
                        c = C.tileTypeToTypeCodeChar(Label.tileType.CAVE_UP),
                            C.setTileTypeCodeChar(k, l + s, c),
                            Engine.tileLayerNames[l + s][k] = a,
                            l = j + 1,
                            c = C.tileTypeToTypeCodeChar(Label.tileType.CAVE_DOWN),
                            C.setTileTypeCodeChar(k, l + s, c),
                            Engine.tileLayerNames[l + s][k] = a
                    }
                    c = C.tileTypeToTypeCodeChar(Label.tileType.NONE),
                        C.setTileTypeCodeChar(i - 1, j + s, c),
                        Engine.tileLayerNames[j + s][i - 1] = a,
                        c = C.tileTypeToTypeCodeChar(Label.tileType.NONE),
                        C.setTileTypeCodeChar(i + 1, j + s, c),
                        Engine.tileLayerNames[j + s][i + 1] = a
                } else
                    console.log("Neni misto pro artefakt")
    }

    function g(a) {
        for (var b, c = [], d = a.artifacts, e = Math.floor(o.cols / d), f = [], g = 0; g < d; g++)
            f.push(g);
        for (g = 0; g < d; g++) {
            b = Math.floor(Engine.randomSeed() * f.length);
            var h = f[b];
            f.splice(b, 1);
            var i = h * e + 2,
                j = i + e - 4,
                k = Math.floor(Engine.randomSeed() * (j - i)) + i,
                l = Math.floor(Engine.randomSeed() * (a.rows - 4)) + 2;
            c.push([k, l])
        }
        return c
    }

    function h(a) {
        for (var b = [], c = 0; c < o.cols; c++)
            for (var d = 0; d < a.rows; d++)
                i(c, d) || C.getTileTypeCodeChar(c, d + s) !== C.tileTypeToTypeCodeChar(Label.tileType.SOIL) || b.push([c, d]);
        return b
    }

    function i(a, b) {
        for (var c = a - 3; c < a + 3; c++)
            for (var d = b - 3; d < b + 3; d++)
                if (C.tileExists(c, d + s) && C.isArtifactCodeChar(C.getTileTypeCodeChar(c, d + s)))
                    return !0;
        return !1
    }

    function j(a, b) {
        for (var c = h(b), d = 0; d < b.teleports; d++)
            if (c.length > 0) {
                var e = Math.floor(Engine.randomSeed() * c.length),
                    f = c[e];
                c.splice(e, 1);
                var g = f[0],
                    i = f[1];
                C.setTileTypeCodeChar(g, i + s, C.tileTypeToTypeCodeChar(Label.tileType.TELEPORT)),
                    Engine.tileLayerNames[i + s][g] = a,
                    Engine.teleports[y] = {
                        id: y,
                        row: i + s,
                        col: g,
                        visible: !0
                    },
                    y++
            } else
                console.log(a, "neni kam umistit teleport");
        k(c, a, b)
    }

    function k(a, b, c) {
        for (var d = c.bonuses, e = 0; e < d; e++)
            if (a.length > 0) {
                var f = Math.floor(Engine.randomSeed() * a.length),
                    g = a[f];
                a.splice(f, 1);
                var h = g[0],
                    i = g[1];
                C.setTileTypeCodeChar(h, i + s, C.tileTypeToTypeCodeChar(Label.tileType.BONUS))
            } else
                console.log(b, "neni kam umistit bonus")
    }

    function l() {
        for (var a, b = -p.rows; b < 0; b++) {
            Engine.tileLayerNames[b] = {};
            var c;
            for (c = -p.cols; c < 0; c++)
                C.setTileTypeCodeChar(c, b, C.tileTypeToTypeCodeChar(Label.tileType.UNBREAKABLE)),
                    Engine.tileLayerNames[b][c] = Label.layerName.LAYER_0;
            for (c = 0; c < o.cols; c++)
                a = -1 === b ? C.tileTypeToTypeCodeChar(Label.tileType.HORIZON) : C.tileTypeToTypeCodeChar(Label.tileType.INVISIBLE),
                    C.setTileTypeCodeChar(c, b, a),
                    Engine.tileLayerNames[b][c] = Label.layerName.LAYER_0;
            for (c = o.cols; c <= o.cols + p.cols; c++)
                C.setTileTypeCodeChar(c, b, C.tileTypeToTypeCodeChar(Label.tileType.UNBREAKABLE)),
                    Engine.tileLayerNames[b][c] = Label.layerName.LAYER_0
        }
    }

    function m() {
        for (var a = s; a < s + p.rows; a++) {
            Engine.tileLayerNames[a] = {};
            for (var b = -p.cols; b <= o.cols + p.cols; b++)
                C.setTileTypeCodeChar(b, a, C.tileTypeToTypeCodeChar(Label.tileType.UNBREAKABLE)),
                    Engine.tileLayerNames[a][b] = Label.layerName.LAYER_4
        }
    }

    function n(a) {
        for (var b = a.length; b; b--) {
            var c = Math.floor(Engine.randomSeed() * b),
                d = a[b - 1];
            a[b - 1] = a[c],
                a[c] = d
        }
    }

    var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C = Engine.worldGenerator = this;
    this.generateWorldConfig = function () {
        Engine.artifacts = {},
            Engine.tileLayerNames = {},
            Engine.layersDepth = {},
            Engine.teleports = {},
            a(),
            z = 0,
            o = Game.levels[Game.levelId].world,
            p = {
                cols: (o.view.cols - 1) / 2,
                rows: (o.view.rows - 1) / 2
            },
            q = o.cols + 2 * p.cols,
            b(),
            l(),
            s = 0,
            y = 0;
        var c, g, h;
        for (var i in o.layers)
            if (o.layers.hasOwnProperty(i)) {
                var k = o.layers[i];
                if (Engine.layersDepth[i] = {},
                    Engine.layersDepth[i].depth = k.rows,
                    Engine.layersDepth[i].start = z,
                    z += k.rows,
                    Engine.layersDepth[i].end = z,
                "surface" === i)
                    for (c = 0; c < k.rows; c++)
                        for (Engine.tileLayerNames[c + s] = {},
                                 g = -p.cols; g <= o.cols + p.cols; g++)
                            h = g < 0 || g >= o.cols ? this.tileTypeToTypeCodeChar(Label.tileType.UNBREAKABLE) : c + s === 0 ? g === o.shop.col ? this.tileTypeToTypeCodeChar(Label.tileType.SHOP) : this.tileTypeToTypeCodeChar(Label.tileType.NONE) : this.tileTypeToTypeCodeChar(Label.tileType.SOIL),
                                this.setTileTypeCodeChar(g, c + s, h),
                                Engine.tileLayerNames[c + s][g] = i;
                else {
                    for (t = {},
                             c = 0; c < k.rows; c++)
                        t[c] = {
                            possibilityInterval: {},
                            content: []
                        };
                    var r = {};
                    for (var A in k.content)
                        if (k.content.hasOwnProperty(A)) {
                            var B = k.content[A].lastRowQuantityRatio,
                                C = (B - 1) / (k.rows - 1);
                            r[A] = 0;
                            for (var D in t)
                                if (t.hasOwnProperty(D)) {
                                    var E = 1 + C * D;
                                    t[D].possibilityInterval[A] = {
                                        intStart: r[A],
                                        intEnd: r[A] + E
                                    },
                                        r[A] += E
                                }
                        }
                    var F = {};
                    for (A in k.content)
                        if (k.content.hasOwnProperty(A))
                            for (F[A] = 0,
                                     c = 0; c < k.rows; c++)
                                t[c].possibilityInterval[A].intStart /= r[A],
                                    t[c].possibilityInterval[A].intEnd /= r[A],
                                    F[A] += t[c].possibilityInterval[A].intEnd - t[c].possibilityInterval[A].intStart;
                    var G = o.cols * k.rows;
                    for (A in k.content)
                        if (k.content.hasOwnProperty(A))
                            if (v = Math.ceil(k.content[A].possibility * G),
                                w = 0,
                                x = 0,
                                u = 0,
                            k.content[A].lastRowQuantityRatio >= 1)
                                for (D = 0; D < k.rows; D++)
                                    e(A, D);
                            else
                                for (D = k.rows - 1; D >= 0; D--)
                                    e(A, D);
                    for (D in t)
                        if (t.hasOwnProperty(D))
                            for (var H = 0; H < o.cols; H++)
                                t[D].content[H] || (t[D].content[H] = Label.tileType.SOIL);
                    for (c = 0; c < k.rows; c++)
                        for (n(t[c].content),
                                 Engine.tileLayerNames[c + s] = {},
                                 g = -p.cols; g <= o.cols + p.cols; g++) {
                            if (c === k.rows - 1)
                                switch (i) {
                                    case Label.layerName.LAYER_0:
                                        var I = Label.layerName.LAYER_1;
                                        break;
                                    case Label.layerName.LAYER_1:
                                        I = Label.layerName.LAYER_2;
                                        break;
                                    case Label.layerName.LAYER_2:
                                        I = Label.layerName.LAYER_3;
                                        break;
                                    case Label.layerName.LAYER_3:
                                        I = Label.layerName.LAYER_4
                                }
                            if (I && Engine.randomSeed() < .5)
                                var J = I;
                            else
                                J = i;
                            h = g < 0 || g >= o.cols ? this.tileTypeToTypeCodeChar(Label.tileType.UNBREAKABLE) : t[c].content[g] ? this.tileTypeToTypeCodeChar(t[c].content[g]) : this.tileTypeToTypeCodeChar(Label.tileType.SOIL),
                                this.setTileTypeCodeChar(g, c + s, h),
                                Engine.tileLayerNames[c + s][g] = J
                        }
                    f(i, k),
                        j(i, k)
                }
                s += k.rows
            }
        h = this.tileTypeToTypeCodeChar(Label.tileType.TELEPORT),
            this.setTileTypeCodeChar(o.layers.surface.mainTeleportCol, 0, h),
            Engine.teleports.main = {
                id: "main",
                row: 0,
                col: o.layers.surface.mainTeleportCol,
                visible: Engine.hero.mainTeleportVisible,
                jumpRow: 0,
                jumpCol: o.layers.surface.mainTeleportJumpCol
            },
            y++,
            m(),
            d(),
            Engine.generatedShadowMap = Engine.shadowMap,
            Engine.generatedTileTypeCodeMap = Engine.tileTypeCodeMap
    },
        this.isArtifactCodeChar = function (a) {
            for (var b = 0; b < B.length; b++)
                if (a === B[b] && -1 !== A[b].indexOf("artifact"))
                    return !0;
            return !1
        },
        this.tileExists = function (a, b) {
            return c(a, b) <= q * r
        },
        this.tileTypeToTypeCodeChar = function (a) {
            for (var b = 0; b < A.length; b++)
                if (A[b] === a)
                    return B[b];
            return null
        },
        this.codeCharToTileType = function (a) {
            for (var b = 0; b < B.length; b++)
                if (B[b] === a)
                    return A[b];
            return null
        },
        this.setTileTypeCodeChar = function (a, b, d) {
            Engine.tileTypeCodeMap = Engine.tileTypeCodeMap.replaceAt(c(a, b), String(d))
        },
        this.getTileTypeCodeChar = function (a, b) {
            return Engine.tileTypeCodeMap[c(a, b)]
        },
        this.getShadowValue = function (a, b) {
            return Engine.shadowMap[c(a, b)]
        },
        this.setShadowValue = function (a, b, d) {
            Engine.shadowMap = Engine.shadowMap.replaceAt(c(a, b), String(d))
        },
        String.prototype.replaceAt = function (a, b) {
            return this.substr(0, a) + b + this.substr(a + b.length)
        }
}

function Application() {
    this.VERSION = "0.1.0",
        this.prefix = {},
        console.log("%c ► Kutej dárky, špunte! " + this.VERSION + " ◄ [ template " + TEMPLATE_VERSION + " ] ", "background: #000000; color: #FFFFFF; font-size: 20px;")
}

var LZString = function () {
    function a(a, b) {
        if (!e[a]) {
            e[a] = {};
            for (var c = 0; c < a.length; c++)
                e[a][a.charAt(c)] = c
        }
        return e[a][b]
    }

    var b = String.fromCharCode,
        c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
        e = {},
        f = {
            compressToBase64: function (a) {
                if (null == a)
                    return "";
                var b = f._compress(a, 6, function (a) {
                    return c.charAt(a)
                });
                switch (b.length % 4) {
                    default:
                    case 0:
                        return b;
                    case 1:
                        return b + "===";
                    case 2:
                        return b + "==";
                    case 3:
                        return b + "="
                }
            },
            decompressFromBase64: function (b) {
                return null == b ? "" : "" == b ? null : f._decompress(b.length, 32, function (d) {
                    return a(c, b.charAt(d))
                })
            },
            compressToUTF16: function (a) {
                return null == a ? "" : f._compress(a, 15, function (a) {
                    return b(a + 32)
                }) + " "
            },
            decompressFromUTF16: function (a) {
                return null == a ? "" : "" == a ? null : f._decompress(a.length, 16384, function (b) {
                    return a.charCodeAt(b) - 32
                })
            },
            compressToUint8Array: function (a) {
                for (var b = f.compress(a), c = new Uint8Array(2 * b.length), d = 0, e = b.length; e > d; d++) {
                    var g = b.charCodeAt(d);
                    c[2 * d] = g >>> 8,
                        c[2 * d + 1] = g % 256
                }
                return c
            },
            decompressFromUint8Array: function (a) {
                if (null === a || void 0 === a)
                    return f.decompress(a);
                for (var c = new Array(a.length / 2), d = 0, e = c.length; e > d; d++)
                    c[d] = 256 * a[2 * d] + a[2 * d + 1];
                var g = [];
                return c.forEach(function (a) {
                    g.push(b(a))
                }),
                    f.decompress(g.join(""))
            },
            compressToEncodedURIComponent: function (a) {
                return null == a ? "" : f._compress(a, 6, function (a) {
                    return d.charAt(a)
                })
            },
            decompressFromEncodedURIComponent: function (b) {
                return null == b ? "" : "" == b ? null : (b = b.replace(/ /g, "+"),
                    f._decompress(b.length, 32, function (c) {
                        return a(d, b.charAt(c))
                    }))
            },
            compress: function (a) {
                return f._compress(a, 16, function (a) {
                    return b(a)
                })
            },
            _compress: function (a, b, c) {
                if (null == a)
                    return "";
                var d, e, f, g = {},
                    h = {},
                    i = "",
                    j = "",
                    k = "",
                    l = 2,
                    m = 3,
                    n = 2,
                    o = [],
                    p = 0,
                    q = 0;
                for (f = 0; f < a.length; f += 1)
                    if (i = a.charAt(f),
                    Object.prototype.hasOwnProperty.call(g, i) || (g[i] = m++,
                        h[i] = !0),
                        j = k + i,
                        Object.prototype.hasOwnProperty.call(g, j))
                        k = j;
                    else {
                        if (Object.prototype.hasOwnProperty.call(h, k)) {
                            if (k.charCodeAt(0) < 256) {
                                for (d = 0; n > d; d++)
                                    p <<= 1,
                                        q == b - 1 ? (q = 0,
                                            o.push(c(p)),
                                            p = 0) : q++;
                                for (e = k.charCodeAt(0),
                                         d = 0; 8 > d; d++)
                                    p = p << 1 | 1 & e,
                                        q == b - 1 ? (q = 0,
                                            o.push(c(p)),
                                            p = 0) : q++,
                                        e >>= 1
                            } else {
                                for (e = 1,
                                         d = 0; n > d; d++)
                                    p = p << 1 | e,
                                        q == b - 1 ? (q = 0,
                                            o.push(c(p)),
                                            p = 0) : q++,
                                        e = 0;
                                for (e = k.charCodeAt(0),
                                         d = 0; 16 > d; d++)
                                    p = p << 1 | 1 & e,
                                        q == b - 1 ? (q = 0,
                                            o.push(c(p)),
                                            p = 0) : q++,
                                        e >>= 1
                            }
                            l--,
                            0 == l && (l = Math.pow(2, n),
                                n++),
                                delete h[k]
                        } else
                            for (e = g[k],
                                     d = 0; n > d; d++)
                                p = p << 1 | 1 & e,
                                    q == b - 1 ? (q = 0,
                                        o.push(c(p)),
                                        p = 0) : q++,
                                    e >>= 1;
                        l--,
                        0 == l && (l = Math.pow(2, n),
                            n++),
                            g[j] = m++,
                            k = String(i)
                    }
                if ("" !== k) {
                    if (Object.prototype.hasOwnProperty.call(h, k)) {
                        if (k.charCodeAt(0) < 256) {
                            for (d = 0; n > d; d++)
                                p <<= 1,
                                    q == b - 1 ? (q = 0,
                                        o.push(c(p)),
                                        p = 0) : q++;
                            for (e = k.charCodeAt(0),
                                     d = 0; 8 > d; d++)
                                p = p << 1 | 1 & e,
                                    q == b - 1 ? (q = 0,
                                        o.push(c(p)),
                                        p = 0) : q++,
                                    e >>= 1
                        } else {
                            for (e = 1,
                                     d = 0; n > d; d++)
                                p = p << 1 | e,
                                    q == b - 1 ? (q = 0,
                                        o.push(c(p)),
                                        p = 0) : q++,
                                    e = 0;
                            for (e = k.charCodeAt(0),
                                     d = 0; 16 > d; d++)
                                p = p << 1 | 1 & e,
                                    q == b - 1 ? (q = 0,
                                        o.push(c(p)),
                                        p = 0) : q++,
                                    e >>= 1
                        }
                        l--,
                        0 == l && (l = Math.pow(2, n),
                            n++),
                            delete h[k]
                    } else
                        for (e = g[k],
                                 d = 0; n > d; d++)
                            p = p << 1 | 1 & e,
                                q == b - 1 ? (q = 0,
                                    o.push(c(p)),
                                    p = 0) : q++,
                                e >>= 1;
                    0 == --l && (l = Math.pow(2, n),
                        n++)
                }
                for (e = 2,
                         d = 0; n > d; d++)
                    p = p << 1 | 1 & e,
                        q == b - 1 ? (q = 0,
                            o.push(c(p)),
                            p = 0) : q++,
                        e >>= 1;
                for (; ;) {
                    if (p <<= 1,
                    q == b - 1) {
                        o.push(c(p));
                        break
                    }
                    q++
                }
                return o.join("")
            },
            decompress: function (a) {
                return null == a ? "" : "" == a ? null : f._decompress(a.length, 32768, function (b) {
                    return a.charCodeAt(b)
                })
            },
            _decompress: function (a, c, d) {
                var e, f, g, h, i, j, k, l = [],
                    m = 4,
                    n = 4,
                    o = 3,
                    p = "",
                    q = [],
                    r = {
                        val: d(0),
                        position: c,
                        index: 1
                    };
                for (e = 0; 3 > e; e += 1)
                    l[e] = e;
                for (g = 0,
                         i = Math.pow(2, 2),
                         j = 1; j != i;)
                    h = r.val & r.position,
                        r.position >>= 1,
                    0 == r.position && (r.position = c,
                        r.val = d(r.index++)),
                        g |= (h > 0 ? 1 : 0) * j,
                        j <<= 1;
                switch (g) {
                    case 0:
                        for (g = 0,
                                 i = Math.pow(2, 8),
                                 j = 1; j != i;)
                            h = r.val & r.position,
                                r.position >>= 1,
                            0 == r.position && (r.position = c,
                                r.val = d(r.index++)),
                                g |= (h > 0 ? 1 : 0) * j,
                                j <<= 1;
                        k = b(g);
                        break;
                    case 1:
                        for (g = 0,
                                 i = Math.pow(2, 16),
                                 j = 1; j != i;)
                            h = r.val & r.position,
                                r.position >>= 1,
                            0 == r.position && (r.position = c,
                                r.val = d(r.index++)),
                                g |= (h > 0 ? 1 : 0) * j,
                                j <<= 1;
                        k = b(g);
                        break;
                    case 2:
                        return ""
                }
                for (l[3] = k,
                         f = k,
                         q.push(k); ;) {
                    if (r.index > a)
                        return "";
                    for (g = 0,
                             i = Math.pow(2, o),
                             j = 1; j != i;)
                        h = r.val & r.position,
                            r.position >>= 1,
                        0 == r.position && (r.position = c,
                            r.val = d(r.index++)),
                            g |= (h > 0 ? 1 : 0) * j,
                            j <<= 1;
                    switch (k = g) {
                        case 0:
                            for (g = 0,
                                     i = Math.pow(2, 8),
                                     j = 1; j != i;)
                                h = r.val & r.position,
                                    r.position >>= 1,
                                0 == r.position && (r.position = c,
                                    r.val = d(r.index++)),
                                    g |= (h > 0 ? 1 : 0) * j,
                                    j <<= 1;
                            l[n++] = b(g),
                                k = n - 1,
                                m--;
                            break;
                        case 1:
                            for (g = 0,
                                     i = Math.pow(2, 16),
                                     j = 1; j != i;)
                                h = r.val & r.position,
                                    r.position >>= 1,
                                0 == r.position && (r.position = c,
                                    r.val = d(r.index++)),
                                    g |= (h > 0 ? 1 : 0) * j,
                                    j <<= 1;
                            l[n++] = b(g),
                                k = n - 1,
                                m--;
                            break;
                        case 2:
                            return q.join("")
                    }
                    if (0 == m && (m = Math.pow(2, o),
                        o++),
                        l[k])
                        p = l[k];
                    else {
                        if (k !== n)
                            return null;
                        p = f + f.charAt(0)
                    }
                    q.push(p),
                        l[n++] = f + p.charAt(0),
                        m--,
                        f = p,
                    0 == m && (m = Math.pow(2, o),
                        o++)
                }
            }
        };
    return f
}();
"function" == typeof define && define.amd ? define(function () {
    return LZString
}) : "undefined" != typeof module && null != module && (module.exports = LZString);
var Gamepad = function () {
        function a(a, b, c) {
            d(),
                J.buttons = void 0 === a.length ? [a] : a,
                J.callback = b,
            void 0 !== c && null !== c || (c = {});
            for (var f = 0; f < J.buttons.length; f++)
                e(J.buttons[f], b, c)
        }

        function b(a, b, c) {
            a = void 0 === a.length ? [a] : a,
            void 0 !== b && null !== b && (J.callback = b),
            void 0 !== c && null !== c || (c = {});
            for (var d = 0; d < a.length; d++)
                e(a[d], J.callback, c);
            J.buttons = J.buttons.concat(a)
        }

        function c(a) {
            a = void 0 === a.length ? [a] : a;
            for (var b = 0; b < a.length; b++)
                for (var c = 0; c < J.buttons.length; c++)
                    a[b] === J.buttons[c] && (f(J.buttons[c]),
                        J.buttons.splice(c, 1))
        }

        function d() {
            for (var a = 0; a < J.buttons.length; a++)
                f(J.buttons[a]);
            J.buttons = []
        }

        function e(a, b, c) {
            a.interactive = !0,
                a.buttonMode = !0,
                a.pointerdown = g,
                a.pointerup = j,
                a.pointerupoutside = k,
                a.pointerover = h,
                a.pointerout = i,
            c.hasOwnProperty("forceGlobalCallback") || (c.forceGlobalCallback = !1),
            a.hasOwnProperty(F) || (a.params = {}),
                a.params.hasOwnProperty(I) || void 0 === b ? a.params.hasOwnProperty(I) && void 0 !== b && c.forceGlobalCallback && (a.params.callback = b) : a.params.callback = b,
            a.params.hasOwnProperty(G) && (a.pointermove = l,
                a.params.dragged = !1,
            a.params.hasOwnProperty(H) || (a.params.auto = !1))
        }

        function f(a) {
            a.interactive = !1,
                a.buttonMode = !1,
                a.pointerdown = null,
                a.pointerup = null,
                a.pointerupoutside = null,
                a.pointerover = null,
                a.pointerout = null,
                a = null
        }

        function g(a) {
            Gamepad.VERBOSE && console.log("Gamepad.buttonPressHandler() event:", a),
            this.params.hasOwnProperty(G) && (this.params.dragged = !0,
            this.params.auto && (this.x = a.data.global.x,
                this.y = a.data.global.y)),
                m(this, Gamepad.PRESS, this.name, a.data.global)
        }

        function h(a) {
            Gamepad.VERBOSE && console.log("Gamepad.buttonOverHandler() event:", a),
                m(this, Gamepad.ROLL_OVER, this.name, a.data.global)
        }

        function i(a) {
            Gamepad.VERBOSE && console.log("Gamepad.buttonOutHandler() event:", a),
                m(this, Gamepad.ROLL_OUT, this.name, a.data.global)
        }

        function j(a) {
            Gamepad.VERBOSE && console.log("Gamepad.buttonReleaseHandler() event:", a),
            this.params.hasOwnProperty(G) && (this.params.dragged = !1,
            this.params.auto && (this.x = a.data.global.x,
                this.y = a.data.global.y)),
                m(this, Gamepad.RELEASE, this.name, a.data.global)
        }

        function k(a) {
            Gamepad.VERBOSE && console.log("Gamepad.buttonReleaseOutsideHandler() event:", a),
            this.params.hasOwnProperty(G) && (this.params.dragged = !1,
            this.params.auto && (this.x = a.data.global.x,
                this.y = a.data.global.y)),
                m(this, Gamepad.RELEASE_OUTSIDE, this.name, a.data.global)
        }

        function l(a) {
            Gamepad.VERBOSE && console.log("Gamepad.buttonMoveHandler() event:", a),
            this.params.hasOwnProperty(G) && this.params.dragged && this.params.auto && (this.x = a.data.global.x,
                this.y = a.data.global.y),
                m(this, Gamepad.MOVE, this.name, a.data.global)
        }

        function m(a, b, c, d) {
            var e = {
                target: a,
                type: b,
                name: c,
                coords: {
                    button: {
                        x: a.x,
                        y: a.y
                    },
                    pointer: {
                        x: d.x,
                        y: d.y
                    }
                },
                params: a.params
            };
            Gamepad.VERBOSE && console.log("Button.buttonCallback() result:", e),
            a.hasOwnProperty("params") && a.params.hasOwnProperty(I) && "function" == typeof a.params.callback && a.params.callback(e)
        }

        function n(a, b) {
            N.callback = "function" == typeof a ? a : null,
            void 0 === b && null === b || (N.onscreen = (void 0 !== b.onscreen || void 0 !== b.onscreen) && b.onscreen,
                N.container = b.container,
                N.stage = b.stage,
                N.triggers = b.triggers,
                N.directions = b.directions,
                void 0 !== b.coordinates && null !== b.coordinates ? N.coordinates = b.coordinates : N.coordinates = N.defaultCoordinates,
                void 0 !== b.region && null !== b.region ? N.region = b.region : N.region = N.defaultRegion,
            isNaN(b.threshold) || (N.rudder.threshold = b.threshold)),
                window.addEventListener(K, o, !1),
                window.addEventListener(L, p, !1),
            N.onscreen && (C(),
                N.stage.interactive = !0,
                N.stage.buttonMode = !1,
                N.stage.pointerdown = s,
                N.stage.pointermove = t,
                N.stage.pointerup = N.stage.pointerupoutside = u,
                x())
        }

        function o(a) {
            var b = a.which;
            O.code[b] && (O.keys[b] || (O.keys[b] = !0,
                O.pressed++,
                E(),
                v()))
        }

        function p(a) {
            var b = a.which;
            32 === b && (M.primary = !1),
            13 === b && (M.secondary = !1),
            O.keys[b] && (delete O.keys[b],
                O.pressed--,
                E(),
                v()),
            O.code[b] && 0 === O.pressed && D()
        }

        function q() {
            M[this.name] = !0,
                N.skin.primary_hit.visible = M.primary,
                N.skin.secondary_hit.visible = M.secondary,
                v()
        }

        function r() {
            M[this.name] = !1,
                N.skin.primary_hit.visible = M.primary,
                N.skin.secondary_hit.visible = M.secondary,
                v()
        }

        function s(a) {
            -1 === N.touchId && a.data.global.x >= N.region.left && a.data.global.x <= N.region.right && a.data.global.y >= N.region.top && a.data.global.y <= N.region.bottom && (y("on"),
                N.touchId = a.data.identifier,
                N.skin.rudder_hit.position.set(a.data.global.x, a.data.global.y),
                N.rudder.active = !0,
                N.rudder.coordinates.x = a.data.global.x,
                N.rudder.coordinates.y = a.data.global.y,
                N.skin.rudder_hit.visible = N.rudder.active)
        }

        function t(a) {
            if (N.rudder.active && N.touchId === a.data.identifier) {
                if (N.skin.rudder_hit.position.set(a.data.global.x, a.data.global.y),
                    B(N.rudder.coordinates, a.data.global, N.rudder.threshold)) {
                    y("arrow");
                    var b = A(a.data.global),
                        c = b / (2 * Math.PI) * 360;
                    switch (N.directions) {
                        case Gamepad.EIGHT:
                            c >= 337.5 && c < 360 || c >= 0 && c < 22.5 ? (M.horizontal = "",
                                M.vertical = Gamepad.UP) : c >= 22.5 && c < 67.5 ? (M.horizontal = Gamepad.RIGHT,
                                M.vertical = Gamepad.UP) : c >= 67.5 && c < 112.5 ? (M.horizontal = Gamepad.RIGHT,
                                M.vertical = "") : c >= 112.5 && c < 157.5 ? (M.horizontal = Gamepad.RIGHT,
                                M.vertical = Gamepad.DOWN) : c >= 157.5 && c < 202.5 ? (M.horizontal = "",
                                M.vertical = Gamepad.DOWN) : c >= 202.5 && c < 247.5 ? (M.horizontal = Gamepad.LEFT,
                                M.vertical = Gamepad.DOWN) : c >= 247.5 && c < 292.5 ? (M.horizontal = Gamepad.LEFT,
                                M.vertical = "") : c >= 292.5 && c < 337.5 && (M.horizontal = Gamepad.LEFT,
                                M.vertical = Gamepad.UP);
                            break;
                        case Gamepad.FOUR:
                            c >= 315 && c < 360 || c >= 0 && c < 45 ? (M.horizontal = "",
                                M.vertical = Gamepad.UP) : c >= 45 && c < 135 ? (M.horizontal = Gamepad.RIGHT,
                                M.vertical = "") : c >= 135 && c < 225 ? (M.horizontal = "",
                                M.vertical = Gamepad.DOWN) : c >= 225 && c < 315 && (M.horizontal = Gamepad.LEFT,
                                M.vertical = "");
                            break;
                        case Gamepad.HORIZONTAL:
                            c >= 0 && c < 180 ? (M.horizontal = Gamepad.RIGHT,
                                M.vertical = "") : c >= 180 && c < 360 && (M.horizontal = Gamepad.LEFT,
                                M.vertical = "");
                            break;
                        case Gamepad.VERTICAL:
                            c >= 270 && c < 360 || c >= 0 && c < 90 ? (M.horizontal = "",
                                M.vertical = Gamepad.UP) : c >= 90 && c < 270 && (M.horizontal = "",
                                M.vertical = Gamepad.DOWN)
                    }
                } else
                    M.horizontal = "",
                        M.vertical = "",
                        y("on");
                v()
            }
        }

        function u(a) {
            N.touchId === a.data.identifier && (y("off"),
                N.touchId = -1,
                N.rudder.active = !1,
                M.horizontal = "",
                M.vertical = "",
                v())
        }

        function v() {
            var a = {
                active: "" !== M.horizontal || "" !== M.vertical || M.primary || M.secondary,
                horizontal: M.horizontal,
                vertical: M.vertical,
                primary: M.primary,
                secondary: M.secondary
            };
            N.callback(a),
                z()
        }

        function w() {
            if (N.onscreen) {
                N.container.removeChild(N.skin.rudder),
                    N.container.removeChild(N.skin.rudder_arrow),
                    N.container.removeChild(N.skin.rudder_hit),
                    N.container.removeChild(N.skin.rudder_on),
                    N.container.removeChild(N.skin.rudder_off),
                null !== N.skin.primary && (N.skin.primary.interactive = !1,
                    N.skin.primary.buttonMode = !1,
                    N.container.removeChild(N.skin.primary),
                    N.container.removeChild(N.skin.primary_hit)),
                null !== N.skin.secondary && (N.skin.secondary.interactive = !1,
                    N.skin.secondary.buttonMode = !1,
                    N.container.removeChild(N.skin.secondary),
                    N.container.removeChild(N.skin.secondary_hit));
                for (var a in N.skin)
                    N.skin.hasOwnProperty(a) && (N.skin[a].destroy(),
                        N.skin[a] = null);
                N.stage.removeChild(N.rectangle)
            }
            N.callback = null,
                window.removeEventListener(K, o, !1),
                window.removeEventListener(L, p, !1)
        }

        function x() {
            N.skin = {
                rudder: new PIXI.Sprite.fromFrame("Gamepad_rudder_background_0000"),
                rudder_arrow: new PIXI.Sprite.fromFrame("Gamepad_rudder_arrow_0000"),
                rudder_hit: new PIXI.Sprite.fromFrame("Gamepad_rudder_hit_0000"),
                rudder_on: new PIXI.Sprite.fromFrame("Gamepad_rudder_on_0000"),
                rudder_off: new PIXI.Sprite.fromFrame("Gamepad_rudder_off_0000"),
                primary: new PIXI.Sprite.fromFrame("Gamepad_trigger_primary_0000"),
                primary_hit: new PIXI.Sprite.fromFrame("Gamepad_trigger_primary_hit_0000"),
                secondary: new PIXI.Sprite.fromFrame("Gamepad_trigger_secondary_0000"),
                secondary_hit: new PIXI.Sprite.fromFrame("Gamepad_trigger_secondary_hit_0000")
            };
            for (var a in N.skin)
                N.skin.hasOwnProperty(a) && N.skin[a].anchor.set(.5);
            var b = N.coordinates;
            N.skin.rudder.position.set(b.rudder.x, b.rudder.y),
                N.skin.rudder_arrow.position.set(b.rudder.x, b.rudder.y),
                N.skin.rudder_hit.position.set(b.rudder.x, b.rudder.y),
                N.skin.rudder_on.position.set(b.rudder.x, b.rudder.y),
                N.skin.rudder_off.position.set(b.rudder.x, b.rudder.y),
                N.skin.primary.position.set(b.primary.x, b.primary.y),
                N.skin.primary_hit.position.set(b.primary.x, b.primary.y),
                N.skin.secondary.position.set(b.secondary.x, b.secondary.y),
                N.skin.secondary_hit.position.set(b.secondary.x, b.secondary.y),
                N.container.addChild(N.skin.rudder),
                N.container.addChild(N.skin.rudder_arrow),
                N.container.addChild(N.skin.rudder_hit),
                N.container.addChild(N.skin.rudder_on),
                N.container.addChild(N.skin.rudder_off),
            N.triggers > 0 && (N.container.addChild(N.skin.primary),
                N.container.addChild(N.skin.primary_hit),
                N.skin.primary.name = Gamepad.PRIMARY,
                N.skin.primary.interactive = !0,
                N.skin.primary.buttonMode = !0,
                N.skin.primary.pointerdown = q,
                N.skin.primary.pointerup = N.skin.primary.pointerupoutside = r,
                N.skin.primary_hit.visible = !1),
            N.triggers > 1 && (N.container.addChild(N.skin.secondary),
                N.container.addChild(N.skin.secondary_hit),
                N.skin.secondary.name = Gamepad.SECONDARY,
                N.skin.secondary.interactive = !0,
                N.skin.secondary.buttonMode = !0,
                N.skin.secondary.pointerdown = q,
                N.skin.secondary.pointerup = N.skin.secondary.pointerupoutside = r,
                N.skin.secondary_hit.visible = !1),
                y("off"),
                z()
        }

        function y(a) {
            switch (a) {
                case "on":
                    N.skin.rudder_on.visible = !0,
                        N.skin.rudder_off.visible = !1,
                        N.skin.rudder_arrow.visible = !1;
                    break;
                case "off":
                    N.skin.rudder_on.visible = !1,
                        N.skin.rudder_off.visible = !0,
                        N.skin.rudder_arrow.visible = !1;
                    break;
                case "arrow":
                    N.skin.rudder_on.visible = !1,
                        N.skin.rudder_off.visible = !1,
                        N.skin.rudder_arrow.visible = !0
            }
        }

        function z() {
            if (N.onscreen) {
                N.skin.rudder_hit.visible = N.rudder.active;
                var a = 0;
                M.horizontal === Gamepad.LEFT && "" === M.vertical && (a = -Math.PI / 2),
                M.horizontal === Gamepad.RIGHT && "" === M.vertical && (a = Math.PI / 2),
                "" === M.horizontal && M.vertical === Gamepad.UP && (a = 0),
                "" === M.horizontal && M.vertical === Gamepad.DOWN && (a = Math.PI),
                M.horizontal === Gamepad.LEFT && M.vertical === Gamepad.UP && (a = -Math.PI / 4),
                M.horizontal === Gamepad.RIGHT && M.vertical === Gamepad.UP && (a = Math.PI / 4),
                M.horizontal === Gamepad.LEFT && M.vertical === Gamepad.DOWN && (a = -Math.PI / 4 * 3),
                M.horizontal === Gamepad.RIGHT && M.vertical === Gamepad.DOWN && (a = Math.PI / 4 * 3),
                    N.skin.rudder_arrow.rotation = a
            }
        }

        function A(a) {
            var b = N.rudder.coordinates.x - a.x,
                c = N.rudder.coordinates.y - a.y,
                d = Math.atan2(-b, c);
            return d >= -Math.PI && d < 0 && (d = Math.PI - Math.abs(d) + Math.PI),
                d
        }

        function B(a, b, c) {
            var d = a.x - b.x,
                e = a.y - b.y;
            return Math.sqrt(Math.pow(d, 2) + Math.pow(e, 2)) > c
        }

        function C() {
            N.rectangle = new PIXI.Graphics,
                N.rectangle.beginFill(65280),
                N.rectangle.drawRect(0, 0, 1088, 612),
                N.rectangle.endFill(),
                N.rectangle.alpha = 0,
                N.rectangle.name = "controller events placeholder",
                N.stage.addChildAt(N.rectangle, 0)
        }

        function D() {
            M.active = !1,
                M.horizontal = "",
                M.vertical = "",
                M.primary = !1,
                M.secondary = !1
        }

        function E() {
            !O.keys[37] && !O.keys[65] || O.keys[39] || O.keys[68] ? !O.keys[39] && !O.keys[68] || O.keys[37] || O.keys[65] ? O.keys[37] || O.keys[39] || O.keys[65] || O.keys[68] || (M.horizontal = "") : M.horizontal = Gamepad.RIGHT : M.horizontal = Gamepad.LEFT,
                !O.keys[38] && !O.keys[87] || O.keys[40] || O.keys[83] ? !O.keys[40] && !O.keys[83] || O.keys[38] || O.keys[87] ? O.keys[38] || O.keys[40] || O.keys[87] || O.keys[83] || (M.vertical = "") : M.vertical = Gamepad.DOWN : M.vertical = Gamepad.UP,
                M.primary = !0 === O.keys[32],
                M.secondary = !0 === O.keys[13]
        }

        var F = "params",
            G = "draggable",
            H = "auto",
            I = "callback",
            J = {
                buttons: [],
                callback: null
            },
            K = "keydown",
            L = "keyup",
            M = {
                active: !1,
                horizontal: "",
                vertical: "",
                primary: !1,
                secondary: !1
            },
            N = {
                callback: null,
                onscreen: !1,
                container: null,
                stage: null,
                triggers: 0,
                directions: "",
                skin: {},
                rudder: {
                    active: !1,
                    coordinates: {
                        x: 0,
                        y: 0
                    },
                    threshold: 13
                },
                touchId: -1,
                defaultCoordinates: {
                    rudder: {
                        x: 70,
                        y: 540
                    },
                    primary: {
                        x: 1030,
                        y: 563
                    },
                    secondary: {
                        x: 950,
                        y: 563
                    }
                },
                coordinates: {},
                defaultRegion: {
                    left: 0,
                    right: 544,
                    top: 306,
                    bottom: 612
                },
                region: {},
                rectangle: null
            },
            O = {
                code: {
                    37: !0,
                    38: !0,
                    39: !0,
                    40: !0,
                    65: !0,
                    87: !0,
                    68: !0,
                    83: !0,
                    32: !0,
                    13: !0
                },
                keys: [],
                pressed: 0
            };
        return {
            VERBOSE: !1,
            VERSION: "3.1.2",
            PRESS: "press",
            RELEASE: "release",
            RELEASE_OUTSIDE: "release outside",
            ROLL_OVER: "roll over",
            ROLL_OUT: "roll out",
            MOVE: "move",
            LEFT: "left",
            RIGHT: "right",
            UP: "up",
            DOWN: "down",
            EIGHT: "eight",
            FOUR: "four",
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical",
            PRIMARY: "primary",
            SECONDARY: "secondary",
            initButtons: function (b, c, d) {
                Gamepad.VERBOSE && console.log("Gamepad.initButtons() buttons:", b, c, d),
                    a(b, c, d)
            },
            addButtons: function (a, c, d) {
                Gamepad.VERBOSE && console.log("Gamepad.addButtons() buttons:", a, c, d),
                    b(a, c, d)
            },
            removeButtons: function (a) {
                Gamepad.VERBOSE && console.log("Gamepad.removeImage() buttons:", a),
                    c(a)
            },
            removeAllButtons: function () {
                Gamepad.VERBOSE && console.log("Gamepad.removeAllButtons()"),
                    d()
            },
            initController: function (a, b) {
                Gamepad.VERBOSE && console.log("Button.removeAllButtons()", a, b),
                    n(a, b)
            },
            triggerVisible: function (a, b) {
                a === Gamepad.PRIMARY && null !== N.skin.primary && (N.skin.primary.visible = b,
                b || (N.skin.primary_hit.visible = !1)),
                a === Gamepad.SECONDARY && null !== N.skin.secondary && (N.skin.secondary.visible = b,
                b || (N.skin.secondary_hit.visible = !1))
            },
            destroyController: function () {
                w()
            }
        }
    }(),
    GameConfig = function () {
        return {
            version: 0,
            levels: [{
                id: 0,
                energyUnitsAlert: 10,
                rescueMaxPrice: 1e3,
                energyUnitPrice: 1,
                hero: {
                    pos: {
                        col: 50,
                        row: 0,
                        dir: "left"
                    },
                    color: "",
                    money: 1e3,
                    energyUnits: 50,
                    backpack: ["modrinec"],
                    upgrades: {
                        backpack: "blue",
                        energystorage: "blue",
                        flashlight: "blue",
                        drill: "red"
                    },
                    inventory: {
                        sonar: 20,
                        tnt: 20,
                        energy: 100
                    },
                    lastUsedTeleport: "main",
                    music: "surface",
                    help: {
                        intro: !0,
                        firstGem: !0,
                        firstFullCargo: !0,
                        firstFuelAlert: !0,
                        firstTeleportApproach: !0,
                        firstShop: !0,
                        firstUnbreakable: !0,
                        firstLockedLayer: !0,
                        firstArtefakt: !0,
                        secondArtefakt: !0,
                        thirdArtefakt: !0,
                        fourthArtefakt: !0,
                        fifthArtefakt: !0,
                        firstBone: !0,
                        firstDeath: !0
                    }
                },
                upgrades: {
                    drill: {
                        blue: {
                            name: "Modřincová Sbíječka",
                            description: "Prokopeme se až na dno! Na každou barvu je třeba nový, lepší vrták!",
                            layers: {
                                surface: !0,
                                blue: !0
                            },
                            timeScale: 1,
                            price: 0
                        },
                        green: {
                            name: "Zelenitová Sbíječka",
                            description: "Prokopeme se až na dno! Na každou barvu je třeba nový, lepší vrták!",
                            layers: {
                                surface: !0,
                                blue: !0,
                                green: !0
                            },
                            timeScale: .98,
                            price: 10
                        },
                        yellow: {
                            name: "Žluťolínová Sbíječka",
                            description: "Prokopeme se až na dno! Na každou barvu je třeba nový, lepší vrták!",
                            layers: {
                                surface: !0,
                                blue: !0,
                                green: !0,
                                yellow: !0
                            },
                            timeScale: .96,
                            price: 20
                        },
                        orange: {
                            name: "Oranžálová Sbíječka",
                            description: "Prokopeme se až na dno! Na každou barvu je třeba nový, lepší vrták!",
                            layers: {
                                surface: !0,
                                blue: !0,
                                green: !0,
                                yellow: !0,
                                orange: !0
                            },
                            timeScale: .9,
                            price: 30
                        },
                        red: {
                            name: "Červenexová Sbíječka",
                            description: "Prokopeme se až na dno! Na každou barvu je třeba nový, lepší vrták!",
                            layers: {
                                surface: !0,
                                blue: !0,
                                green: !0,
                                yellow: !0,
                                orange: !0,
                                red: !0
                            },
                            timeScale: .84,
                            price: 40
                        }
                    },
                    backpack: {
                        blue: {
                            name: "Základní batoh",
                            description: "Čím lepší, tím víc pojme krystalů.  Nebudeš muset chodit často na povrch.",
                            units: 10,
                            price: 0
                        },
                        green: {
                            name: "Vylepšený batoh",
                            description: "Čím lepší, tím víc pojme krystalů.  Nebudeš muset chodit často na povrch.",
                            units: 15,
                            price: 10
                        },
                        yellow: {
                            name: "Zátěžový batoh",
                            description: "Čím lepší, tím víc pojme krystalů.  Nebudeš muset chodit často na povrch.",
                            units: 20,
                            price: 20
                        },
                        orange: {
                            name: "Armádní batoh",
                            description: "Čím lepší, tím víc pojme krystalů.  Nebudeš muset chodit často na povrch.",
                            units: 25,
                            price: 30
                        },
                        red: {
                            name: "U.L.T.R.A batoh",
                            description: "Čím lepší, tím víc pojme krystalů.  Nebudeš muset chodit často na povrch.",
                            units: 30,
                            price: 40
                        }
                    },
                    energystorage: {
                        blue: {
                            name: "Základní zásobník energie",
                            description: "Díky němu můžeš v podzemí déle kutat chodby!",
                            units: 50,
                            price: 0
                        },
                        green: {
                            name: "Vylepšený zásobník energie",
                            description: "Díky němu můžeš v podzemí déle kutat chodby!",
                            units: 100,
                            price: 10
                        },
                        yellow: {
                            name: "Zátěžový zásobník energie",
                            description: "Díky němu můžeš v podzemí déle kutat chodby!",
                            units: 150,
                            price: 20
                        },
                        orange: {
                            name: "Armádní zásobník energie",
                            description: "Díky němu můžeš v podzemí déle kutat chodby!",
                            units: 200,
                            price: 30
                        },
                        red: {
                            name: "U.L.T.R.A zásobník energie",
                            description: "Díky němu můžeš v podzemí déle kutat chodby!",
                            units: 250,
                            price: 40
                        }
                    },
                    flashlight: {
                        blue: {
                            name: "Základní svítilna",
                            description: "Kup si lepší svítilnu, uvidíš víc do dálky a krystaly lépe uvidíš!",
                            radius: 4,
                            treshold: 1,
                            price: 0
                        },
                        green: {
                            name: "Vylepšená svítilna",
                            description: "Kup si lepší svítilnu, uvidíš víc do dálky a krystaly lépe uvidíš!",
                            radius: 6,
                            treshold: 1,
                            price: 10
                        },
                        yellow: {
                            name: "Zátěžová svítilna",
                            description: "Kup si lepší svítilnu, uvidíš víc do dálky a krystaly lépe uvidíš!",
                            radius: 8,
                            treshold: 1,
                            price: 20
                        },
                        orange: {
                            name: "Armádní svítilna",
                            description: "Kup si lepší svítilnu, uvidíš víc do dálky a krystaly lépe uvidíš!",
                            radius: 8,
                            treshold: 1,
                            price: 30
                        },
                        red: {
                            name: "U.L.T.R.A svítilna",
                            description: "Kup si lepší svítilnu, uvidíš víc do dálky a krystaly lépe uvidíš!",
                            radius: 8,
                            treshold: 1,
                            price: 40
                        }
                    }
                },
                inventory: {
                    tnt: {
                        name: "1x dynamit",
                        description: "Umí odpálit kostky kolem tebe",
                        radius: 4,
                        price: 100
                    },
                    sonar: {
                        name: "1x sonar",
                        description: "Po použití odkryje mapu",
                        radius: 11,
                        price: 100
                    },
                    energy: {
                        name: "1x energie",
                        description: "Dokáže dobít energii",
                        unitsIncrement: 10,
                        price: 100
                    }
                },
                world: {
                    shop: {
                        col: 54
                    },
                    teleport: {
                        time: 2
                    },
                    view: {
                        cols: 23,
                        rows: 13
                    },
                    tile: {
                        size: 50
                    },
                    bg: {
                        paralaxRatio: .8
                    },
                    cols: 100,
                    layers: {
                        surface: {
                            rows: 2,
                            mainTeleportCol: 49,
                            mainTeleportJumpCol: 51
                        },
                        blue: {
                            rows: 4,
                            teleports: 20,
                            content: {
                                modrinec: {
                                    possibility: .2,
                                    lastRowQuantityRatio: 10
                                },
                                zelenit: {
                                    possibility: .02,
                                    lastRowQuantityRatio: 10
                                },
                                rock: {
                                    possibility: .1,
                                    lastRowQuantityRatio: 10
                                }
                            }
                        },
                        green: {
                            rows: 4,
                            teleports: 2,
                            content: {
                                modrinec: {
                                    possibility: .1,
                                    lastRowQuantityRatio: .1
                                },
                                zelenit: {
                                    possibility: .2,
                                    lastRowQuantityRatio: 10
                                },
                                zlutolin: {
                                    possibility: .02,
                                    lastRowQuantityRatio: 10
                                },
                                rock: {
                                    possibility: .2,
                                    lastRowQuantityRatio: 4
                                }
                            }
                        },
                        yellow: {
                            rows: 4,
                            teleports: 2,
                            content: {
                                zelenit: {
                                    possibility: .1,
                                    lastRowQuantityRatio: .1
                                },
                                zlutolin: {
                                    possibility: .2,
                                    lastRowQuantityRatio: 10
                                },
                                oranzal: {
                                    possibility: .02,
                                    lastRowQuantityRatio: 10
                                },
                                rock: {
                                    possibility: .3,
                                    lastRowQuantityRatio: 3
                                }
                            }
                        },
                        orange: {
                            rows: 4,
                            teleports: 2,
                            content: {
                                zlutolin: {
                                    possibility: .1,
                                    lastRowQuantityRatio: .1
                                },
                                oranzal: {
                                    possibility: .2,
                                    lastRowQuantityRatio: 10
                                },
                                cervenex: {
                                    possibility: .02,
                                    lastRowQuantityRatio: 10
                                },
                                rock: {
                                    possibility: .4,
                                    lastRowQuantityRatio: 2
                                }
                            }
                        },
                        red: {
                            rows: 4,
                            teleports: 2,
                            content: {
                                oranzal: {
                                    possibility: .1,
                                    lastRowQuantityRatio: .1
                                },
                                cervenex: {
                                    possibility: .2,
                                    lastRowQuantityRatio: 10
                                },
                                rock: {
                                    possibility: .5,
                                    lastRowQuantityRatio: 2
                                }
                            }
                        }
                    }
                },
                materials: {
                    defaultMoveTime: .2,
                    none: {
                        resistance: 1
                    },
                    shop: {
                        resistance: 1
                    },
                    teleport: {
                        resistance: 1
                    },
                    rock: {
                        resistance: 5
                    },
                    soil: {
                        resistance: 2
                    },
                    bone_0: {
                        bonus: 100,
                        resistance: 2
                    },
                    bone_1: {
                        bonus: 100,
                        resistance: 2
                    },
                    bone_2: {
                        bonus: 100,
                        resistance: 2
                    },
                    bone_3: {
                        bonus: 100,
                        resistance: 2
                    },
                    bone_4: {
                        bonus: 100,
                        resistance: 2
                    },
                    duholebka: {
                        bonus: 100,
                        resistance: 2
                    },
                    duhokostka: {
                        bonus: 100,
                        resistance: 2
                    },
                    duhoicko: {
                        bonus: 100,
                        resistance: 2
                    },
                    duhoryb: {
                        bonus: 100,
                        resistance: 2
                    },
                    petiklic: {
                        bonus: 100,
                        resistance: 2
                    },
                    stalaktit: {
                        resistance: 2
                    },
                    stalagmit: {
                        resistance: 2
                    },
                    cave: {
                        resistance: 2
                    },
                    modrinec: {
                        name: "Modřinec",
                        price: 10,
                        resistance: 2
                    },
                    zelenit: {
                        name: "Zelenit",
                        price: 20,
                        resistance: 2
                    },
                    zlutolin: {
                        name: "Žlutolín",
                        price: 30,
                        resistance: 2
                    },
                    oranzal: {
                        name: "Oranžál",
                        price: 40,
                        resistance: 2
                    },
                    cervenex: {
                        name: "Červenex",
                        price: 50,
                        resistance: 2
                    }
                }
            }]
        }
    }();
TestMenu.constructor = TestMenu,
    TestMenu.prototype = Object.create(PIXI.Container.prototype),
    Alert.constructor = Alert,
    Alert.prototype = Object.create(PIXI.Container.prototype),
    Artifacts.constructor = Artifacts,
    Artifacts.prototype = Object.create(PIXI.Container.prototype),
    ArtifactCollected.constructor = ArtifactCollected,
    ArtifactCollected.prototype = Object.create(PIXI.Container.prototype);
var Display = function () {
    function a() {
        j.renderer = PIXI.autoDetectRenderer(Global.STAGE.width, Global.STAGE.height, {
            backgroundColor: Global.config.integrativeContainer.backgroundColor.replace("#", "0x"),
            antialias: !0
        }),
            j.stage = new PIXI.Container,
            document.body.appendChild(j.renderer.view)
    }

    function b() {
        e = new Level,
            f = new Menu,
            g = new Alert,
            h = new Winscreen,
            i = new PIXI.Container
    }

    function c() {
        j.stage.addChild(e),
            j.stage.addChild(f),
            j.stage.addChild(g),
            j.stage.addChild(h),
            j.stage.addChild(i)
    }

    function d() {
        requestAnimationFrame(d),
            j.renderer.render(j.stage)
    }

    var e, f, g, h, i, j = {
        stage: {},
        renderer: {}
    };
    return {
        menu: null,
        level: null,
        winscreen: null,
        world: null,
        inventory: null,
        hud: null,
        artifacts: null,
        money: null,
        shop: null,
        vrtulka: null,
        spuntici: null,
        alert: null,
        hero: null,
        init: function () {
            Global.VERBOSE,
                a(),
                d()
        },
        start: function () {
            Global.VERBOSE,
                b(),
                c()
        },
        getStage: function () {
            return j.stage
        },
        getRenderer: function () {
            return j.renderer
        },
        getControllerContainer: function () {
            return i
        }
    }
}();
ElasticButton.constructor = ElasticButton,
    ElasticButton.prototype = Object.create(PIXI.Container.prototype),
    Hero.constructor = Hero,
    Hero.prototype = Object.create(PIXI.Container.prototype),
    Horizon.constructor = Horizon,
    Horizon.prototype = Object.create(PIXI.Container.prototype),
    HUD.constructor = HUD,
    HUD.prototype = Object.create(PIXI.Container.prototype),
    Inventory.constructor = Inventory,
    Inventory.prototype = Object.create(PIXI.Container.prototype),
    InventoryItem.constructor = InventoryItem,
    InventoryItem.prototype = Object.create(PIXI.Container.prototype),
    Level.constructor = Level,
    Level.prototype = Object.create(PIXI.Container.prototype),
    Menu.constructor = Menu,
    Menu.prototype = Object.create(PIXI.Container.prototype),
    Money.constructor = Money,
    Money.prototype = Object.create(PIXI.Container.prototype),
    Shop.constructor = Shop,
    Shop.prototype = Object.create(PIXI.Container.prototype),
    ShopInventory.constructor = ShopInventory,
    ShopInventory.prototype = Object.create(PIXI.Container.prototype),
    ShopInventoryItem.constructor = ShopInventoryItem,
    ShopInventoryItem.prototype = Object.create(PIXI.Container.prototype),
    ShopSummary.constructor = ShopSummary,
    ShopSummary.prototype = Object.create(PIXI.Container.prototype),
    ShopUpgradeItem.constructor = ShopUpgradeItem,
    ShopUpgradeItem.prototype = Object.create(PIXI.Container.prototype),
    ShopUpgrades.constructor = ShopUpgrades,
    ShopUpgrades.prototype = Object.create(PIXI.Container.prototype),
    Spuntici.constructor = Spuntici,
    Spuntici.prototype = Object.create(PIXI.Container.prototype),
    Spuntik.constructor = Spuntik,
    Spuntik.prototype = Object.create(PIXI.Container.prototype),
    Teleport.constructor = Teleport,
    Teleport.prototype = Object.create(PIXI.Container.prototype),
    TeleportMap.constructor = TeleportMap,
    TeleportMap.prototype = Object.create(PIXI.Container.prototype),
    Tile.constructor = Tile,
    Tile.prototype = Object.create(PIXI.Container.prototype),
    Vrtulka.constructor = Vrtulka,
    Vrtulka.prototype = Object.create(PIXI.Container.prototype),
    Winscreen.constructor = Winscreen,
    Winscreen.prototype = Object.create(PIXI.Container.prototype),
    Candle.constructor = Candle,
    Candle.prototype = Object.create(PIXI.Container.prototype);
var Sound = function () {
        var a, b;
        return {
            lib: null,
            init: function () {
                Sound.lib = {
                    kopani_sbijeckou: container.audio.add("kopani_sbijeckou"),
                    kopani_sbijeckou_do_kamene: container.audio.add("kopani_sbijeckou_do_kamene"),
                    chozeni: container.audio.add("chozeni"),
                    pocitani_prachu: container.audio.add("pocitani_prachu"),
                    portal_smycka: container.audio.add("portal_smycka"),
                    spunt_povidani: container.audio.add("spunt_povidani")
                }
            },
            playSound: function (a) {
                Sound.lib[a].play()
            },
            stopSound: function (a) {
                Sound.lib[a].stop()
            },
            stopMoveSounds: function () {
                Sound.lib.kopani_sbijeckou.stop(),
                    Sound.lib.kopani_sbijeckou_do_kamene.stop(),
                    Sound.lib.chozeni.stop()
            },
            playMusic: function (a) {
                b = container.audio.addSound(a, Global.prefix.application.snd + "music/" + a, {
                    loop: !0,
                    volume: .1
                }).play(),
                "win" !== a && (Engine.hero.music = a)
            },
            changeMusic: function (a) {
                a !== Engine.hero.music && (Sound.stopMusic(),
                    Sound.playMusic(a))
            },
            stopMusic: function () {
                b && b.stop()
            },
            playSpeech: function (b) {
                Sound.stopSpeech(),
                    a = container.audio.addSound(b, Global.prefix.application.snd + "stream/" + b, {
                        volume: .8
                    }).play(),
                    a.on("complete", Display.vrtulka.odlet)
            },
            stopSpeech: function () {
                a && a.stop()
            }
        }
    }(),
    Global = function () {
        return {
            VERBOSE: !0,
            DEVELOPMENT: !1,
            STAGE: {
                width: 1088,
                height: 612,
                center: {
                    x: 544,
                    y: 306
                }
            },
            urlVariables: null,
            userSignedIn: !1,
            config: {},
            prefix: {
                application: {
                    root: "",
                    dat: "",
                    img: "",
                    snd: "",
                    fnt: ""
                },
                data: {
                    root: "",
                    dat: "",
                    img: "",
                    snd: "",
                    fnt: ""
                }
            },
            parseConfig: function (a, b, c, d) {
                Global.VERBOSE,
                    Global.config = a,
                    Global.prefix.application.root = b + c,
                    Global.prefix.data.root = b + d,
                    Global.prefix.application.dat = b + c + "dat/",
                    Global.prefix.application.img = b + c + "img/",
                    Global.prefix.application.snd = b + c + "snd/",
                    Global.prefix.application.fnt = c + "fnt/",
                    Global.prefix.application.vid = b + c + "vid/",
                    Global.prefix.data.dat = b + d + "dat/",
                    Global.prefix.data.img = b + d + "img/",
                    Global.prefix.data.snd = b + d + "snd/",
                    Global.prefix.data.fnt = d + "fnt/",
                    Global.prefix.data.vid = b + d + "vid/",
                    Global.userSignedIn = !(void 0 === a.player || !a.player.logged)
            },
            readUrlVariables: function () {
                Global.VERBOSE;
                try {
                    var a = window.top.location.hash.substring(1);
                    if (a.length > 0) {
                        var b = JSON.parse(a);
                        b.hasOwnProperty("level") ? (Global.urlVariables = b,
                            Global.VERBOSE) : Global.VERBOSE
                    }
                } catch (a) {
                    Global.VERBOSE,
                        1
                }
            },
            updateWindowSize: function () {
                container.winSizeUpdate()
            },
            isContestActive: function () {
                return container.isContestActive()
            },
            showContestForm: function (a) {
                container.showContestForm(a)
            },
            isContestFormVisible: function () {
                return container.isContestFormVisible()
            },
            analytics: function (a, b) {
                var c = "Game_v" + Game.version + "_" + a;
                Global.DEVELOPMENT || container.stats.trackEvent(c, b),
                    Global.VERBOSE
            },
            getDate: function (a) {
                Global.VERBOSE,
                    Global.DEVELOPMENT ? a({
                        status: "error",
                        error: "Application is in local development mode!"
                    }) : AmfConnector.getDate(a)
            },
            removeAppState: function (a, b) {
                Global.VERBOSE,
                    b = void 0 === b || null === b ? 0 : b,
                    !Global.DEVELOPMENT && Global.userSignedIn ? AmfConnector.removeAppState(a, b) : a({
                        status: "error",
                        error: "Application is in local development mode, or user is not signed in!"
                    })
            },
            saveRank: function (a, b, c, d, e, f, g) {
                Global.VERBOSE,
                    c = void 0 === c || null === c ? 0 : c,
                    d = void 0 === d || null === d ? 0 : d,
                    e = void 0 === e || null === e ? 0 : e,
                    f = void 0 === f || null === f || f,
                    g = void 0 === g || null === g ? "" : g,
                    Global.DEVELOPMENT || !Global.userSignedIn || void 0 === b && null === b ? a({
                        status: "error",
                        error: "Application is in local development mode, user is not signed in, or score is not defined!"
                    }) : AmfConnector.saveRank(a, b, c, d, e, f, g)
            },
            preparePlaceholderRankingState: function (a) {
                function b(b) {
                    "OK" === b.status ? b.slots.length > 0 ? a(b) : AmfConnector.saveAppState(a, 0, "score", [{
                        name: "placeholder",
                        state: "just score"
                    }]) : a(b)
                }

                Global.VERBOSE,
                    !Global.DEVELOPMENT && Global.userSignedIn ? AmfConnector.getAppStates(b) : a({
                        status: "error",
                        error: "Application is in local development mode, user is not signed in!"
                    })
            }
        }
    }(),
    Game = function () {
        return {
            mediaConfig: null,
            gameConfig: null,
            version: 0,
            levels: null,
            levelId: 0,
            level: null
        }
    }(),
    Loader = function () {
        function a() {
            Global.VERBOSE && D && console.log("Loader.loadMediaConfig()", C.dat + "MediaConfig.json"),
                v.add("mediaConfig", C.dat + "MediaConfig.json").load(b)
        }

        function b(a) {
            Global.VERBOSE && D && console.log("Loader.loadMediaConfigCallback()", a),
                Game.mediaConfig = a.resources.mediaConfig.data.media,
                c()
        }

        function c() {
            Global.VERBOSE && D && console.log("Loader.loadGameConfig()", C.dat + Game.mediaConfig.global.config),
                v.add("gameConfig", C.dat + Game.mediaConfig.global.config).load(d)
        }

        function d(a) {
            Global.VERBOSE && D && console.log("Loader.loadGameConfigCallback()", a),
                Game.gameConfig = a.resources.gameConfig.data,
                Game.version = Game.gameConfig.version,
                Game.levels = Game.gameConfig.levels,
                Game.mediaConfig.global.fonts.length > 0 ? e() : g(!0)
        }

        function e() {
            for (var a = [], b = 0; b < Game.mediaConfig.global.fonts.length; b++)
                a[b] = {
                    src: C.fnt + Game.mediaConfig.global.fonts[b].css,
                    names: Game.mediaConfig.global.fonts[b].names,
                    type: "webFonts"
                };
            container.signals.mainCall.add(f, this),
                container.assetLoader.loadAssets(a)
        }

        function f(a, b) {
            Global.VERBOSE && D && console.log("Loader.fontsLoaded()", a, b),
            "AssetsLoadingDone" === a && (container.signals.mainCall.remove(f, this),
                g(!0))
        }

        function g(a) {
            Global.VERBOSE && D && console.log("Loader.loadMedia()"),
                x.showComp(),
                z = s(),
                A = s(),
                y = t(),
            a && h(Game.mediaConfig.common, !1),
                h(Game.mediaConfig.level[Game.levelId], !0),
                i()
        }

        function h(a, b) {
            Global.VERBOSE && D && console.log("Loader.prepareQueue mediaList:", a);
            var c, d, e;
            for (c = 0; c < a.graphics.sheet.length; c++)
                d = a.graphics.sheet[c],
                    e = q(C.img, d),
                    z.graphics.push(e),
                b && A.graphics.push(e),
                    y.total += 2,
                Global.VERBOSE && D && console.log("Loader.prepareQueue sheet:", JSON.stringify(e));
            for (c = 0; c < a.graphics.image.length; c++)
                d = a.graphics.image[c],
                    e = q(C.img, d),
                    z.graphics.push(e),
                    B.push(e),
                b && A.graphics.push(e),
                    y.total += 1,
                Global.VERBOSE && D && console.log("Loader.prepareQueue image:", JSON.stringify(e));
            for (c = 0; c < a.sound.cache.length; c++)
                d = a.sound.cache[c],
                    e = r(C.snd, d),
                    z.sound.push(e),
                b && A.sound.push(e),
                Global.VERBOSE && D && console.log("Loader.prepareQueue sound:", JSON.stringify(e))
        }

        function i() {
            Global.VERBOSE && D && console.log("Loader.loadGraphics()", z.graphics.length);
            for (var a = 0; a < z.graphics.length; a++)
                v.add(z.graphics[a].id, z.graphics[a].src);
            v.on("progress", j),
                v.load(k)
        }

        function j() {
            y.current++;
            var a = y.current / y.total * .7;
            x.updateProgress(a),
            Global.VERBOSE && D && E && console.log("Loader.loadGraphicsProgress() current:", y.current, " / total:" + y.total, "percent:", a)
        }

        function k() {
            Global.VERBOSE && D && console.log("Loader.loadGraphicsComplete() resources:", z.graphics),
                v.off("progress", j),
                z.sound.length > 0 ? l() : (u(),
                    x.hideComp())
        }

        function l() {
            Global.VERBOSE && D && console.log("Loader.loadSound()", z.sound),
                w.loader.on("progress", m),
                w.loader.on("complete", n),
                w.loader.load(z.sound)
        }

        function m(a) {
            var b = .3 * a.progress + .7;
            x.updateProgress(b),
            Global.VERBOSE && D && E && console.log("Loader.loadSoundProgress() sound progress:", a.progress, "percent:", b)
        }

        function n() {
            Global.VERBOSE && D && console.log("Loader.loadSoundComplete() resources:", w),
                x.updateProgress(1),
                x.hideComp(),
                w.loader.off("progress", m),
                w.loader.off("complete", n),
                u()
        }

        function o() {
            if (void 0 !== A && A.graphics.length + A.sound.length !== 0) {
                var a;
                for (a = 0; a < A.graphics.length; a++)
                    Global.VERBOSE && D && console.log("Loader.removeMedia() graphics:", A.graphics[a].id),
                        p(A.graphics[a].id),
                        delete v.resources[A.graphics[a].id];
                for (a = 0; a < A.sound.length; a++)
                    Global.VERBOSE && D && console.log("Loader.removeMedia() sound:", A.sound[a].id),
                        w.destroy(A.sound[a].id)
            } else
                Global.VERBOSE && D && console.log("Loader.removeMedia() There is nothing to remove!")
        }

        function p(a) {
            for (var b = 0; b < B.length; b++)
                a === B[b].id && B.splice(b, 1)
        }

        function q(a, b) {
            var c = {
                id: "",
                src: ""
            };
            return c.id = b.id,
                c.src = a + b.src,
                c
        }

        function r(a, b) {
            var c = {
                id: "",
                src: "",
                settings: {
                    volume: 0,
                    loop: !0
                }
            };
            return c.id = b.id.split(".")[0],
                c.src = a + b.src,
                c.settings.volume = b.settings.volume,
                c.settings.loop = b.settings.loop,
                c
        }

        function s() {
            return {
                graphics: [],
                sound: []
            }
        }

        function t() {
            return {
                current: 0,
                total: 0
            }
        }

        var u, v, w, x, y, z, A, B, C, D = !1,
            E = !1;
        return {
            init: function (a) {
                C = a,
                    v = new PIXI.loaders.Loader,
                    w = container.audio,
                    x = container.preloaderComp,
                    B = []
            },
            loadFirstData: function (b) {
                Global.VERBOSE && D && console.log("Loader.loadConfig()"),
                    u = b,
                    a()
            },
            loadNextData: function (a) {
                Global.VERBOSE && D && console.log("Loader.loadConfig()"),
                    u = a,
                    o(),
                    g(!1)
            },
            getImageUrlById: function (a) {
                for (var b, c = 0; c < B.length; c++)
                    a === B[c].id && (b = B[c].src);
                return b
            }
        }
    }(),
    Achievments = function () {
        function a(a) {
            ++Engine.hero.achievments[a].unitsCount === b[a].units && (Engine.hero.achievments[a].masteryLevel++,
                Engine.hero.achievments[a].unitsCount = 0,
                Engine.hero.money += b[a].bonus,
                Display.money.updateText(c),
                Display.alert.start(b[a].text + Engine.hero.achievments[a].masteryLevel + "\n" + b[a].bonus),
                container.audio.play("sebrani_artefaktu"))
        }

        var b, c = .5;
        return {
            init: function () {
                b = Game.levels[Game.levelId].achievments
            },
            hloubkovyKutak: function () {
                var a = "hloubkovyKutak";
                Engine.hero.achievments[a].maxDepth < Engine.hero.pos.row && (Engine.hero.achievments[a].maxDepth = Engine.hero.pos.row,
                Engine.hero.achievments[a].maxDepth % b[a].units || (Engine.hero.money += b[a].bonus,
                    Display.money.updateText(c),
                    Engine.hero.achievments[a].masteryLevel++,
                    Display.alert.start(b[a].text + Engine.hero.achievments[a].masteryLevel + "\n" + b[a].bonus),
                    container.audio.play("sebrani_artefaktu")))
            },
            sberatelKosti: function (a) {
                var d = "sberatelKosti";
                Engine.hero.achievments[d].push(a);
                var e, f,
                    g = [Label.tileType.BONUS_0, Label.tileType.BONE_1, Label.tileType.BONE_2, Label.tileType.BONE_3, Label.tileType.BONE_4],
                    h = [];
                for (e = 0; e < g.length; e++)
                    for (f = 0; f < Engine.hero.achievments[d].length; f++)
                        if (g[e] === Engine.hero.achievments[d][f]) {
                            h.push(f);
                            break
                        }
                if (h.length === g.length) {
                    for (e = h.length - 1; e >= 0; e--)
                        Engine.hero.achievments[d].splice(e, 1);
                    Engine.hero.money += b[d].bonus,
                        Display.money.updateText(c),
                        Display.alert.start(b[d].text + "\n" + b[d].bonus),
                        container.audio.play("sebrani_artefaktu")
                }
            },
            objemovyAchievment: function (b) {
                a("objemovyKutak"),
                b && (b !== Label.tileType.COIN_0 && b !== Label.tileType.COIN_1 && b !== Label.tileType.COIN_2 && b !== Label.tileType.COIN_3 && b !== Label.tileType.COIN_4 || a("koloritovyKutak"),
                    a(b))
            },
            dynamitak: function () {
                a("dynamitak")
            }
        }
    }(),
    Engine = function () {
        function a() {
            Display.level.visible = !0,
                Engine.phase = Label.phase.WAITING,
                Engine.changeMusic(Engine.hero.pos.row)
        }

        function b() {
            Sound.stopMusic(),
            Engine.firstTimeInMenu || Display.spuntici.stop(),
                Display.shop.close(),
                Display.level.close(),
                Display.menu.start(),
                Engine.phase = Label.phase.MENU,
                Sound.stopMusic()
        }

        function c() {
            Display.world.removeAll(),
                Engine.hero = JSON.parse(JSON.stringify(Game.levels[Game.levelId].hero)),
                Engine.startSeed = Math.random(),
                Engine.seed = Engine.startSeed,
                console.log("Engine.seed", Engine.seed),
                Engine.worldGenerator.generateWorldConfig(),
                console.log("---------------------"),
                console.log("SEED GENERATED - NO NEED TO SAVE ---------"),
                console.log("Engine.artifacts", Engine.artifacts),
                console.log("Engine.tileLayerNames", Engine.tileLayerNames),
                console.log("Engine.layersDepth", Engine.layersDepth),
                console.log("Engine.teleports", Engine.teleports),
                console.log("SEED GENERATED - SAVE ---------"),
                console.log("Engine.hero", Engine.hero),
                console.log("SEED GENERATED - SAVE DIFF ---------"),
                console.log("Engine.shadowMap", Engine.shadowMap),
                console.log("Engine.tileTypeCodeMap", Engine.tileTypeCodeMap),
                e(),
                container.features.isMobile ? Display.alert.start("Kutej špuntem pomocí posuvníku pod levým palcem") : Display.alert.start("Kutej špuntem pomocí šipek na klávesnici"),
                Engine.firstTimeInMenu = !1
        }

        function d() {
            console.log("continueClicked"),
            Global.userSignedIn && (Engine.firstTimeInMenu ? (Engine.phase = Label.phase.INACTIVE,
                Display.alert.startStatic("Nahrávám"),
                Engine.saveLoad.load()) : (Display.menu.close(),
                Display.level.continue(),
                Sound.playMusic(Engine.hero.music)),
                Engine.firstTimeInMenu = !1)
        }

        function e() {
            Display.menu.close(),
                Display.artifacts.init(),
                Display.level.start(),
                Sound.playMusic(Engine.hero.music)
        }

        function f() {
            Engine.hero.help.firstShop && (Display.vrtulka.start("dabing6"),
                Engine.hero.help.firstShop = !1),
                Engine.shopSelectLayer = 1,
                Engine.shopUpgradeKeysCount = 0,
                Engine.shopInventoryKeysCount = 0,
                Display.shop.start()
        }

        function g(a) {
            Engine.hero.energyUnits = Game.levels[Game.levelId].upgrades.energystorage[Engine.hero.upgrades.energystorage].units,
                Display.money.updateText(a),
                Display.hud.updateEnergy(a)
        }

        function h() {
            Display.shop.close()
        }

        function i(a, b) {
            var c = Game.levels[Game.levelId].upgrades[a][b].price;
            if (Engine.hero.money >= c) {
                switch (container.audio.play("kdyz_cokoli_koupim"),
                    Display.shop.upgrades.nextUpgrade(a),
                    Engine.hero.money -= c,
                    Display.money.updateText(.3),
                    a) {
                    case Label.upgrades.DRILL:
                        Engine.hero.upgrades.drill = b;
                        break;
                    case Label.upgrades.BACKPACK:
                        Engine.hero.upgrades.backpack = b,
                            Display.hud.updatePocketSize();
                        break;
                    case Label.upgrades.ENERGY_STORAGE:
                        Engine.hero.upgrades.energystorage = b,
                            Display.hud.updateEnergyBarWidth(!1),
                            Engine.hero.energyUnits = Game.levels[Game.levelId].upgrades.energystorage[Engine.hero.upgrades.energystorage].units,
                            Display.hud.updateEnergy(.5);
                        break;
                    case Label.upgrades.FLASHLIGHT:
                        Engine.hero.upgrades.flashlight = b,
                            Display.world.updateShadows()
                }
                Display.shop.upgrades.updateItems()
            }
        }

        function j(a) {
            var b = Game.levels[Game.levelId].inventory[a].price;
            Engine.hero.money >= b && (container.audio.play("kdyz_cokoli_koupim"),
                Engine.hero.money -= b,
                Display.money.updateText(.3),
                Engine.hero.inventory[a]++,
                Display.inventory.update(a),
                Display.shop.inventory.updateItems(),
                container.features.isMobile ? Display.alert.start("Ty turbo! Pro použití stiskni při kutání tlačítko B.") : Display.alert.start("Ty turbo! Pro použití stiskni při kutání ENTER."))
        }

        function k(a) {
            if (Engine.hero.inventory[a] > 0) {
                switch (a) {
                    case Label.inventory.ENERGY:
                        container.audio.play("pouziti_jednorazove_energie"),
                            Engine.hero.energyUnits += Game.levels[Game.levelId].inventory.energy.unitsIncrement,
                        Engine.hero.energyUnits > Game.levels[Game.levelId].upgrades.energystorage[Engine.hero.upgrades.energystorage].units && (Engine.hero.energyUnits = Game.levels[Game.levelId].upgrades.energystorage[Engine.hero.upgrades.energystorage].units),
                            Display.hud.updateEnergy(Game.levels[Game.levelId].materials.defaultMoveTime);
                        break;
                    case Label.inventory.SONAR:
                        container.audio.play("po_pouziti_sonaru"),
                            Display.world.sonar();
                        break;
                    case Label.inventory.TNT:
                        container.audio.play("dynamit_vybuch"),
                            Display.world.tnt(),
                            Achievments.dynamitak()
                }
                Engine.hero.inventory[a]--,
                    Display.inventory.update(a)
            }
        }

        function l(a) {
            Display.world.teleport(a)
        }

        function m() {
            Global.userSignedIn ? Engine.saveLoad.save(n, f) : f()
            Engine.saveLoad.save((result) => {
                console.log("Result:", result)
            }, () => {
                console.log("Local test")
            })
        }

        function n(a) {
            console.log("saveAppStateCallback", a),
                "OK" === a.status ? Display.alert.start("Hra byla uložena") : Display.alert.start("Hru se nepodařilo uložit"),
                f()
        }

        function o(a) {
            console.log(a)
        }

        function p(a) {
            switch (a.type) {
                case Gamepad.ROLL_OVER:
                case Gamepad.ROLL_OUT:
                case Gamepad.PRESS:
                    break;
                case Gamepad.RELEASE:
                    if (Engine.phase !== Label.phase.INACTIVE)
                        switch (a.target.buttonType) {
                            case "remove app state":
                                Global.removeAppState(o, Engine.slotNum);
                                break;
                            case Label.buttonType.MENU:
                                switch (a.name) {
                                    case Label.menuBtns.NEW:
                                        c();
                                        break;
                                    case Label.menuBtns.CONTINUE:
                                        d()
                                }
                                break;
                            case Label.buttonType.SHOP:
                                switch (a.name) {
                                    case Label.shopBtns.QUIT:
                                        h();
                                        break;
                                    case Label.shopBtns.NEXT:
                                        Display.shop.next();
                                        break;
                                    case Label.shopBtns.PREV:
                                        Display.shop.prev();
                                        break;
                                    case Label.shopBtns.MENU:
                                        b()
                                }
                                break;
                            case Label.buttonType.SHOP_UPGRADE:
                                i(a.name, a.target.id);
                                break;
                            case Label.buttonType.SHOP_INVENTORY:
                                j(a.name);
                                break;
                            case Label.buttonType.USE_INVENTORY_ITEM:
                                k(a.name)
                        }
                    else
                        switch (a.target.buttonType) {
                            case Label.buttonType.WINSCREEN:
                                Engine.hideWinscreen()
                        }
                    break;
                case Gamepad.RELEASE_OUTSIDE:
            }
        }

        function q(a) {
            var c;
            if (Engine.phase !== Label.phase.INACTIVE)
                if (Engine.phase === Label.phase.SHOP_SUMMARY || Engine.phase === Label.phase.SHOP_UPGRADES || Engine.phase === Label.phase.SHOP_INVENTORY) {
                    if (a.active)
                        if ("" !== a.horizontal && (c = a.horizontal),
                        "" !== a.vertical && (c = a.vertical),
                            c)
                            Display.shop.keyPressed(a);
                        else if (a.primary)
                            switch (Engine.shopFocusName) {
                                case Label.shopBtns.QUIT:
                                    h();
                                    break;
                                case Label.shopBtns.NEXT:
                                    Display.shop.next();
                                    break;
                                case Label.shopBtns.PREV:
                                    Display.shop.prev();
                                    break;
                                case Label.shopBtns.MENU:
                                    b();
                                    break;
                                default:
                                    switch (Engine.phase) {
                                        case Label.phase.SHOP_UPGRADES:
                                            Display.shop.upgrades.upgrades[Engine.shopFocusName].id && i(Engine.shopFocusName, Display.shop.upgrades.upgrades[Engine.shopFocusName].id);
                                            break;
                                        case Label.phase.SHOP_INVENTORY:
                                            j(Engine.shopFocusName)
                                    }
                            }
                } else
                    switch (Engine.phase) {
                        case Label.phase.MENU:
                            break;
                        default:
                            if (a.active)
                                if ("" !== a.horizontal && (c = a.horizontal),
                                "" !== a.vertical && (c = a.vertical),
                                Engine.phase === Label.phase.WAITING)
                                    if (c)
                                        Display.world.moveKeyPressed(c);
                                    else if (a.primary) {
                                        var d = Engine.worldGenerator.codeCharToTileType(Engine.worldGenerator.getTileTypeCodeChar(Engine.hero.pos.col, Engine.hero.pos.row));
                                        if (d === Label.tileType.TELEPORT) {
                                            var e = Engine.getTeleportConfig(Engine.hero.pos.col, Engine.hero.pos.row);
                                            e.visible && l(e.id)
                                        } else
                                            d === Label.tileType.SHOP && m();
                                        Display.alert.hide()
                                    } else
                                        a.secondary && (Display.inventory.hilight(),
                                            Engine.phase = Label.phase.INVENTORY,
                                            container.features.isMobile ? Display.alert.startStatic("Potvrď volbu tlačítkem A\nnebo stiskni tlačítko B a vrať se do hry.") : Display.alert.startStatic("Potvrď volbu mezerníkem\nnebo stiskni ENTER a vrať se do hry."));
                                else
                                    Engine.phase === Label.phase.INVENTORY && ("" !== a.vertical && Display.inventory.keyPressed(c),
                                        a.primary ? k(Engine.inventoryKeys[Engine.inventoryKeysCount]) : a.secondary && (Display.inventory.unhilight(),
                                            Engine.phase = Label.phase.WAITING,
                                            Display.alert.hide()));
                            else
                                c = void 0;
                            Engine.dir = c
                    }
        }

        return {
            loaded: !1,
            slotNum: 0,
            phase: null,
            dir: null,
            firstTimeInMenu: !0,
            colors: ["blue", "green", "yellow", "orange", "red"],
            prevLayer: null,
            shopSelectLayer: null,
            shopFocusName: null,
            shopUpgradeKeys: [],
            shopUpgradeKeysCount: 0,
            shopInventoryKeys: [],
            shopInventoryKeysCount: 0,
            inventoryKeys: [],
            inventoryKeysCount: 0,
            worldGenerator: null,
            artifacts: null,
            tileLayerNames: null,
            teleports: null,
            layersDepth: null,
            saveLoad: null,
            startSeed: null,
            seed: null,
            hero: null,
            generatedShadowMap: null,
            generatedTileTypeCodeMap: null,
            shadowMap: null,
            tileTypeCodeMap: null,
            tilesPool: [],
            teleportsPool: [],
            horizonsPool: [],
            getTeleportConfig: function (a, b) {
                for (var c in Engine.teleports)
                    if (Engine.teleports.hasOwnProperty(c)) {
                        var d = Engine.teleports[c];
                        if (d.col === a && d.row === b)
                            return d
                    }
            },
            init: function () {
                Global.VERBOSE,
                    Display.init(),
                    Engine.worldGenerator = new WorldGenerator,
                    Engine.saveLoad = new SaveLoad
            },
            startGame: function () {
                Global.VERBOSE,
                    Sound.init(),
                    Achievments.init(),
                    Display.start(),
                    Gamepad.initButtons([], p),
                    Gamepad.initController(q, {
                        onscreen: container.features.isMobile,
                        container: Display.getControllerContainer(),
                        stage: Display.getStage(),
                        triggers: 2,
                        directions: Gamepad.FOUR
                    }),
                    b()
            },
            startLevel: function () {
                e()
            },
            startNextLevel: function () {
                Global.VERBOSE,
                    1
            },
            randomSeed: function () {
                var a = 1e4 * Math.sin(Engine.seed++);
                return a - Math.floor(a)
            },
            changeMusic: function (a) {
                for (var b in Engine.layersDepth)
                    if (Engine.layersDepth.hasOwnProperty(b) && a >= Engine.layersDepth[b].start && a < Engine.layersDepth[b].end) {
                        Sound.changeMusic(b);
                        break
                    }
            },
            rescue: function () {
                Sound.stopMoveSounds(),
                    container.audio.play("chcipnuti"),
                    Engine.hero.color = Engine.colors[Math.floor(Math.random() * Engine.colors.length)],
                    Engine.hero.backpack = [],
                    Display.hud.updateFullUnits();
                var a = 0;
                for (var b in Game.levels[Game.levelId].world.layers)
                    Game.levels[Game.levelId].world.layers.hasOwnProperty(b) && b !== Label.layerName.SURFACE && (a += Game.levels[Game.levelId].world.layers[b].rows);
                var c = Game.levels[Game.levelId].world.teleport.time,
                    d = Game.levels[Game.levelId].upgrades.energystorage[Engine.hero.upgrades.energystorage].units,
                    e = d * Game.levels[Game.levelId].energyUnitPrice,
                    f = Math.round(Game.levels[Game.levelId].rescueMaxPrice * Engine.hero.pos.row / a);
                Engine.hero.money -= e + f,
                    g(c),
                    Display.world.teleport("")
            },
            surfaceReached: function () {
                container.audio.play("dobiti_energie_v_shopu");
                var a = Game.levels[Game.levelId].upgrades.energystorage[Engine.hero.upgrades.energystorage].units - Engine.hero.energyUnits;
                Engine.hero.money -= a * Game.levels[Game.levelId].energyUnitPrice,
                    g(1)
            },
            showWinscreen: function () {
                Display.shop.close(),
                    Display.level.close(),
                    Display.winscreen.show(),
                    Display.vrtulka.start("dabing18"),
                    Sound.changeMusic("win")
            },
            hideWinscreen: function () {
                Display.winscreen.hide(),
                    b(),
                    Engine.phase = Label.phase.MENU
            },
            playVideo: function () {
                if (DpCont.isLocalTest)
                    ;
                else {
                    Display.level.visible = !1,
                        Engine.phase = Label.phase.INACTIVE,
                        Sound.stopMusic();
                    "B" !== "BO-29114" [0] ? container.playVideo("BO-29114", this, a, {
                        type: "iBonus"
                    }) : container.playVideo("BO-29114", this, a)
                }
            }
        }
    }(),
    Timer = function () {
        function a(a) {
            Global.VERBOSE && d && console.log("Timer.delayHandler()"),
                e[a].finishCallback(),
                Timer.stopDelay()
        }

        function b(a) {
            f[a].timer = setTimeout(c, f[a].clockTickInterval, a)
        }

        function c(a) {
            f[a].tickAccumulator += f[a].clockTickInterval,
            Global.VERBOSE && d && console.log("Timer.clockHandler() time:", f[a].tickAccumulator),
                f[a].tickAccumulator >= 1e3 * f[a].delayDuration ? (f[a].tickCallback(1, f[a].callbackParameters),
                    f[a].finishCallback(f[a].callbackParameters)) : (f[a].tickCallback(f[a].tickAccumulator / (1e3 * f[a].delayDuration), f[a].callbackParameters),
                    b(a))
        }

        var d = !1,
            e = {},
            f = {};
        return {
            startDelay: function (b, c, f) {
                Global.VERBOSE && d && console.log("Timer.startDelay() duration:", c),
                    e[b] = {
                        timer: setTimeout(a, 1e3 * c, b),
                        finishCallback: f
                    }
            },
            stopDelay: function (a) {
                Global.VERBOSE && d && console.log("Timer.stopDelay()"),
                null != e[a] && null != e[a].timer && (clearInterval(e[a].timer),
                    e[a].timer = null,
                    e[a] = null,
                    delete e[a])
            },
            clockTickInterval: 30,
            startClock: function (a, c, e, g, h) {
                Global.VERBOSE && d && console.log("Timer.startClock()", a, c, e.name, g.name, h),
                    f[a] = {
                        timer: null,
                        tickAccumulator: 0,
                        clockTickInterval: Timer.clockTickInterval,
                        delayDuration: c,
                        tickCallback: e,
                        finishCallback: g,
                        callbackParameters: h
                    },
                    b(a)
            },
            stopClock: function (a) {
                Global.VERBOSE && d && console.log("Timer.stopClock()", a),
                null != f[a] && null != f[a].timer && (clearInterval(f[a].timer),
                    f[a].timer = null,
                    f[a] = null,
                    delete f[a])
            },
            pauseClock: function (a) {
                Global.VERBOSE && d && console.log("Timer.pauseClock()", a),
                null != f[a] && null != f[a].timer && clearInterval(f[a].timer)
            },
            resumeClock: function (a) {
                Global.VERBOSE && d && console.log("Timer.resumeClock()", a),
                null != f[a] && null != f[a].timer && b(a)
            },
            getClockProgress: function (a) {
                return f[a].tickAccumulator / (1e3 * f[a].delayDuration)
            }
        }
    }(),
    Label = function () {
        return {
            user: {
                MEMBER: "member",
                ANONYMOUS: "anonymous",
                EVERYONE: "everyone"
            },
            action: {},
            screen: {
                HOME: "home",
                FINAL: "final",
                INSTRUCTIONS: "instructions",
                TYPE_IMAGE: "type_image",
                TYPE_BUTTON: "type_button"
            },
            buttonType: {
                DISABLED: "disabled",
                MENU: "menu",
                WINSCREEN: "winscreen",
                SHOP: "shop",
                SHOP_UPGRADE: "shop upgrade",
                SHOP_INVENTORY: "shop inventory",
                UPGRADE_POCKET: "upgrade backpack",
                UPGRADE_ENERGY: "upgrade energy",
                UPGRADE_FLASHLIGHT: "upgrade flashlight",
                UPGRADE_DRILL: "upgrade drill",
                USE_INVENTORY_ITEM: "use inventory item"
            },
            menuBtns: {
                NEW: "new",
                CONTINUE: "continue"
            },
            shopBtns: {
                MENU: "menu",
                QUIT: "quit",
                NEXT: "next",
                PREV: "prev"
            },
            follows: {
                HERO: "hero",
                SHOP: "shop"
            },
            inventory: {
                TNT: "tnt",
                SONAR: "sonar",
                ENERGY: "energy"
            },
            upgrades: {
                DRILL: "drill",
                BACKPACK: "backpack",
                ENERGY_STORAGE: "energystorage",
                FLASHLIGHT: "flashlight"
            },
            phase: {
                INACTIVE: "inactive",
                WAITING: "waiting",
                MOVE: "move",
                TELEPORT: "teleport",
                SHOP_SUMMARY: "shop summary",
                SHOP_UPGRADES: "shop upgrades",
                SHOP_INVENTORY: "shop inventory",
                INVENTORY: "inventory",
                MENU: "menu"
            },
            layerName: {
                SURFACE: "surface",
                LAYER_0: "layer_0",
                LAYER_1: "layer_1",
                LAYER_2: "layer_2",
                LAYER_3: "layer_3",
                LAYER_4: "layer_4"
            },
            tileType: {
                NONE: "none",
                SHOP: "shop",
                INVISIBLE: "invisible",
                HORIZON: "horizon",
                UNBREAKABLE: "unbreakable",
                TELEPORT: "teleport",
                COIN_0: "coin_0",
                COIN_1: "coin_1",
                COIN_2: "coin_2",
                COIN_3: "coin_3",
                COIN_4: "coin_4",
                BONUS: "bonus",
                ARTIFACT_0: "artifact_0",
                ARTIFACT_1: "artifact_1",
                ARTIFACT_2: "artifact_2",
                ARTIFACT_3: "artifact_3",
                ARTIFACT_4: "artifact_4",
                ARTIFACT_5: "artifact_5",
                ARTIFACT_6: "artifact_6",
                ARTIFACT_7: "artifact_7",
                ARTIFACT_8: "artifact_8",
                ARTIFACT_9: "artifact_9",
                ARTIFACT_10: "artifact_10",
                ARTIFACT_11: "artifact_11",
                ARTIFACT_12: "artifact_12",
                ARTIFACT_13: "artifact_13",
                ARTIFACT_14: "artifact_14",
                ARTIFACT_15: "artifact_15",
                ARTIFACT_16: "artifact_16",
                ARTIFACT_17: "artifact_17",
                ARTIFACT_18: "artifact_18",
                ARTIFACT_19: "artifact_19",
                ARTIFACT_20: "artifact_20",
                ARTIFACT_21: "artifact_21",
                ARTIFACT_22: "artifact_22",
                ARTIFACT_23: "artifact_23",
                ARTIFACT_24: "artifact_24",
                ARTIFACT_25: "artifact_25",
                ARTIFACT_26: "artifact_26",
                ARTIFACT_27: "artifact_27",
                ARTIFACT_28: "artifact_28",
                ARTIFACT_29: "artifact_29",
                ARTIFACT_30: "artifact_30",
                ARTIFACT_31: "artifact_31",
                ARTIFACT_32: "artifact_32",
                ARTIFACT_33: "artifact_33",
                ARTIFACT_34: "artifact_34",
                OBSTACLE: "obstacle",
                SOIL: "soil",
                CAVE_UP: "cave_up",
                CAVE_DOWN: "cave_down"
            },
            key: {
                UP: "up",
                RIGHT: "right",
                DOWN: "down",
                LEFT: "left"
            }
        }
    }(),
    Tools = function () {
        return {
            fillZeros: function (a, b, c) {
                for (var d = "", e = 0; e < c - String(b).length; e++)
                    d += "0";
                return a + d + b
            },
            getEmpty1DArray: function (a, b) {
                for (var c = [], d = 0; d < a; d++)
                    c[d] = b;
                return c
            },
            getEmpty2DArray: function (a, b, c) {
                for (var d = [], e = 0; e < a; e++) {
                    d[e] = [];
                    for (var f = 0; f < b; f++)
                        d[e][f] = c
                }
                return d
            },
            getRandom: function (a, b, c) {
                var d = Math.random() * (b - a) + a,
                    e = Math.pow(10, c);
                return Math.round(d * e) / e
            },
            hexToRgb: function (a) {
                -1 !== a.indexOf("#") ? a = a.substr(1) : -1 !== a.indexOf("0x") && (a = a.substr(2));
                var b = parseInt(a, 16);
                return {
                    r: b >> 16 & 255,
                    g: b >> 8 & 255,
                    b: 255 & b
                }
            },
            rgbToHex: function (a, b, c, d) {
                d = null === d ? "0x" : d;
                var e = a.toString(16);
                e = 1 === e.length ? "0" + e : e;
                var f = b.toString(16);
                f = 1 === f.length ? "0" + f : f;
                var g = c.toString(16);
                return g = 1 === g.length ? "0" + g : g,
                d + e + f + g
            },
            getPointsDistance: function (a, b) {
                var c = a.x - b.x,
                    d = a.y - b.y;
                return Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2))
            },
            getCircleIntersections: function (a, b, c, d, e, f) {
                var g = {
                    first: {
                        x: 0,
                        y: 0
                    },
                    second: {
                        x: 0,
                        y: 0
                    }
                };
                if (!(c < 0 || f < 0)) {
                    var h = f,
                        i = c,
                        j = Math.sqrt(Math.pow(a - d, 2) + Math.pow(b - e, 2)),
                        k = (Math.pow(i, 2) + Math.pow(j, 2) - Math.pow(h, 2)) / (2 * j),
                        l = Math.sqrt(Math.pow(i, 2) - Math.pow(k, 2));
                    return g.first.x = (d - a) * k / j + (e - b) * l / j + a,
                        g.first.y = (e - b) * k / j - (d - a) * l / j + b,
                        g.second.x = (d - a) * k / j - (e - b) * l / j + a,
                        g.second.y = (e - b) * k / j + (d - a) * l / j + b,
                        g
                }
            },
            calculateCircleAngles: function (a, b) {
                var c = {
                    alpha: 0,
                    beta: 0
                };
                return c.alpha = Math.atan2(a.first.y - b.y, a.first.x - b.x),
                    c.beta = Math.atan2(a.second.y - b.y, a.second.x - b.x),
                    c
            },
            pushCoordinatesToBoundary: function (a, b) {
                var c = {
                    x: a.x,
                    y: a.y
                };
                return a.x < b.x && (c.x = b.x),
                a.x > b.width && (c.x = b.width),
                a.y < b.y && (c.y = b.y),
                a.y > b.height && (c.y = b.height),
                    c
            },
            arrayShuffle: function (a) {
                for (var b = a.length; b; b--) {
                    var c = Math.floor(Math.random() * b),
                        d = a[b - 1];
                    a[b - 1] = a[c],
                        a[c] = d
                }
            },
            arrayRandomSelect: function (a, b) {
                for (; a.length > b;)
                    a.splice(Tools.getRandom(0, a.length, 0), 1)
            },
            arrayCopy: function (a) {
                for (var b = [], c = 0; c < a.length; c++)
                    b[c] = a[c];
                return b
            },
            isOdd: function (a) {
                return a / 2 !== Math.floor(a / 2)
            },
            isEven: function (a) {
                return !(a / 2 !== Math.floor(a / 2))
            },
            destroySingleGraphicObject: function (a, b) {
                a.removeChild(single),
                    b.filters = null,
                    b.mask = null,
                    b.interactive = !1,
                    b.buttonMode = !1,
                    b.destroy(),
                    b = null
            },
            destroyArrayOfGraphicObjects: function (a, b) {
                for (var c = 0; c < b.length; c++)
                    null !== b[c] && (a[c].removeChild(b[c]),
                        b[c].filters = null,
                        b[c].mask = null,
                        b[c].interactive = !1,
                        b[c].buttonMode = !1,
                        b[c].destroy(),
                        b[c] = null);
                return []
            }
        }
    }(),
    Core = function () {
        function a() {
            Global.VERBOSE && c && console.log("Core.loadFirstDataCallback()"),
                Engine.startGame(),
                Global.updateWindowSize()
        }

        function b() {
            Global.VERBOSE && c && console.log("Core.loadNextLevelCallback()"),
                Engine.startNextLevel()
        }

        var c = !1;
        return {
            init: function (b, c, d, e) {
                Global.parseConfig(b, c, d, e),
                    Global.readUrlVariables(),
                    Engine.init(),
                    Loader.init(Global.prefix.application),
                    Loader.loadFirstData(a)
            },
            loadNextLevel: function () {
                Loader.loadNextData(b)
            }
        }
    }();
Application.prototype.initializeApp = function () {
    Core.init(container.appConfig, container.appConfig.integrativeContainer.urnServiceUrl, container.appConfig["template"].appUrnPath, container.appConfig["template"].dataUrnPath),
        $(window).focus(),
        container.signals.resizeCall.add(this.appResize, this),
        container.winSizeUpdate()
},
    Application.prototype.appResize = function (a, b) {
    };
var TEMPLATE_VERSION = "3.1.0",
    application = new Application,
    container = new DpCont.AppComp(application).iCont,
    dpApp = new DpCont.AppComp(application);
dpApp.appClass.initializeApp();
