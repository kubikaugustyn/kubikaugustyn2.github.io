import "./strings.m.js";
import { Polymer, dom, html, Base, afterNextRender, beforeNextRender, useShadow, Templatizer, OptionalMutableDataBehavior, animationFrame, microTask, idlePeriod, flush, Debouncer, enqueueDebouncer, matches, translate } from "./polymer_bundled.min.js";
import { isIOS, addSingletonGetter, isWindows, isMac, addWebUIListener, removeWebUIListener } from "./cr.m.js";
import { loadTimeData } from "./load_time_data.m.js";
import "./mojo_bindings_lite.js";
import "./downloads.mojom-lite.js";
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class IronMeta {
    constructor(options) {
        IronMeta[" "](options);
        this.type = options && options.type || "default";
        this.key = options && options.key;
        if (options && "value" in options)
        {
            this.value = options.value
        }
    }
    get value() {
        var type = this.type;
        var key = this.key;
        if (type && key)
        {
            return IronMeta.types[type] && IronMeta.types[type][key]
        }
    }
    set value(value) {
        var type = this.type;
        var key = this.key;
        if (type && key)
        {
            type = IronMeta.types[type] = IronMeta.types[type] ||
            {};
            if (value == null)
            {
                delete type[key]
            }
            else
            {
                type[key] = value
            }
        }
    }
    get list() {
        var type = this.type;
        if (type)
        {
            var items = IronMeta.types[this.type];
            if (!items)
            {
                return []
            }
            return Object.keys(items).map(function(key)
            {
                return metaDatas[this.type][key]
            }, this)
        }
    }
    byKey(key) {
        this.key = key;
        return this.value
    }
}
IronMeta[" "] = function() {};
IronMeta.types = {};
var metaDatas = IronMeta.types;
Polymer({
    is: "iron-meta",
    properties: {
        type: {
            type: String,
            value: "default"
        },
        key: {
            type: String
        },
        value: {
            type: String,
            notify: true
        },
        self: {
            type: Boolean,
            observer: "_selfChanged"
        },
        __meta: {
            type: Boolean,
            computed: "__computeMeta(type, key, value)"
        }
    },
    hostAttributes: {
        hidden: true
    },
    __computeMeta: function(type, key, value) {
        var meta = new IronMeta({
            type: type,
            key: key
        });
        if (value !== undefined && value !== meta.value) {
            meta.value = value
        }
        else if (this.value !== meta.value) {
            this.value = meta.value
        }
        return meta
    },
    get list() {
        return this.__meta && this.__meta.list
    },
    _selfChanged: function(self) {
        if (self)
        {
            this.value = this
        }
    },
    byKey: function(key) {
        return new IronMeta(
        {
            type: this.type,
            key: key
        }).value
    }
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Polymer(
{
    is: "iron-iconset-svg",
    properties:
    {
        name:
        {
            type: String,
            observer: "_nameChanged"
        },
        size:
        {
            type: Number,
            value: 24
        },
        rtlMirroring:
        {
            type: Boolean,
            value: false
        },
        useGlobalRtlAttribute:
        {
            type: Boolean,
            value: false
        }
    },
    created: function()
    {
        this._meta = new IronMeta(
        {
            type: "iconset",
            key: null,
            value: null
        })
    },
    attached: function()
    {
        this.style.display = "none"
    },
    getIconNames: function()
    {
        this._icons = this._createIconMap();
        return Object.keys(this._icons).map(function(n)
        {
            return this.name + ":" + n
        }, this)
    },
    applyIcon: function(element, iconName)
    {
        this.removeIcon(element);
        var svg = this._cloneIcon(iconName, this.rtlMirroring && this._targetIsRTL(element));
        if (svg)
        {
            var pde = dom(element.root || element);
            pde.insertBefore(svg, pde.childNodes[0]);
            return element._svgIcon = svg
        }
        return null
    },
    createIcon: function(iconName, targetIsRTL)
    {
        return this._cloneIcon(iconName, this.rtlMirroring && targetIsRTL)
    },
    removeIcon: function(element)
    {
        if (element._svgIcon)
        {
            dom(element.root || element).removeChild(element._svgIcon);
            element._svgIcon = null
        }
    },
    _targetIsRTL: function(target)
    {
        if (this.__targetIsRTL == null)
        {
            if (this.useGlobalRtlAttribute)
            {
                var globalElement = document.body && document.body.hasAttribute("dir") ? document.body : document.documentElement;
                this.__targetIsRTL = globalElement.getAttribute("dir") === "rtl"
            }
            else
            {
                if (target && target.nodeType !== Node.ELEMENT_NODE)
                {
                    target = target.host
                }
                this.__targetIsRTL = target && window.getComputedStyle(target)["direction"] === "rtl"
            }
        }
        return this.__targetIsRTL
    },
    _nameChanged: function()
    {
        this._meta.value = null;
        this._meta.key = this.name;
        this._meta.value = this;
        this.async(function()
        {
            this.fire("iron-iconset-added", this,
            {
                node: window
            })
        })
    },
    _createIconMap: function()
    {
        var icons = Object.create(null);
        dom(this).querySelectorAll("[id]").forEach(function(icon)
        {
            icons[icon.id] = icon
        });
        return icons
    },
    _cloneIcon: function(id, mirrorAllowed)
    {
        this._icons = this._icons || this._createIconMap();
        return this._prepareSvgClone(this._icons[id], this.size, mirrorAllowed)
    },
    _prepareSvgClone: function(sourceSvg, size, mirrorAllowed)
    {
        if (sourceSvg)
        {
            var content = sourceSvg.cloneNode(true),
                svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                viewBox = content.getAttribute("viewBox") || "0 0 " + size + " " + size,
                cssText = "pointer-events: none; display: block; width: 100%; height: 100%;";
            if (mirrorAllowed && content.hasAttribute("mirror-in-rtl"))
            {
                cssText += "-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"
            }
            svg.setAttribute("viewBox", viewBox);
            svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
            svg.setAttribute("focusable", "false");
            svg.style.cssText = cssText;
            svg.appendChild(content).removeAttribute("id");
            return svg
        }
        return null
    }
}); // Copyright 2019 The Chromium Authors. All rights reserved.
const template = html `<!--_html_template_start_--><iron-iconset-svg name="downloads" size="24">
  <svg>
    <defs>
      <!--
      These icons are copied from Polymer's iron-icons and kept in sorted order.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="remove-circle">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
<!--_html_template_end_-->`;
document.head.appendChild(template.content); // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CLASS_NAME = "focus-outline-visible";
const docsToManager = new Map;
class FocusOutlineManager {
    constructor(doc)
    {
        this.focusByKeyboard_ = true;
        this.classList_ = doc.documentElement.classList;
        const onEvent = function(focusByKeyboard, e)
        {
            if (this.focusByKeyboard_ === focusByKeyboard)
            {
                return
            }
            this.focusByKeyboard_ = focusByKeyboard;
            this.updateVisibility()
        };
        doc.addEventListener("keydown", onEvent.bind(this, true), true);
        doc.addEventListener("mousedown", onEvent.bind(this, false), true);
        this.updateVisibility()
    }
    updateVisibility() {
        this.visible = this.focusByKeyboard_
    }
    set visible(visible)
    {
        this.classList_.toggle(CLASS_NAME, visible)
    }
    get visible()
    {
        return this.classList_.contains(CLASS_NAME)
    }
    static forDocument(doc)
    {
        let manager = docsToManager.get(doc);
        if (!manager)
        {
            manager = new FocusOutlineManager(doc);
            docsToManager.set(doc, manager)
        }
        return manager
    }
}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var KEY_IDENTIFIER = {
    "U+0008": "backspace",
    "U+0009": "tab",
    "U+001B": "esc",
    "U+0020": "space",
    "U+007F": "del"
};
var KEY_CODE = {
    8: "backspace",
    9: "tab",
    13: "enter",
    27: "esc",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    32: "space",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    46: "del",
    106: "*"
};
var MODIFIER_KEYS = {
    shift: "shiftKey",
    ctrl: "ctrlKey",
    alt: "altKey",
    meta: "metaKey"
};
var KEY_CHAR = /[a-z0-9*]/;
var IDENT_CHAR = /U\+/;
var ARROW_KEY = /^arrow/;
var SPACE_KEY = /^space(bar)?/;
var ESC_KEY = /^escape$/;

function transformKey(key, noSpecialChars) {
    var validKey = "";
    if (key)
    {
        var lKey = key.toLowerCase();
        if (lKey === " " || SPACE_KEY.test(lKey))
        {
            validKey = "space"
        }
        else if (ESC_KEY.test(lKey))
        {
            validKey = "esc"
        }
        else if (lKey.length == 1)
        {
            if (!noSpecialChars || KEY_CHAR.test(lKey))
            {
                validKey = lKey
            }
        }
        else if (ARROW_KEY.test(lKey))
        {
            validKey = lKey.replace("arrow", "")
        }
        else if (lKey == "multiply")
        {
            validKey = "*"
        }
        else
        {
            validKey = lKey
        }
    }
    return validKey
}

function transformKeyIdentifier(keyIdent) {
    var validKey = "";
    if (keyIdent)
    {
        if (keyIdent in KEY_IDENTIFIER)
        {
            validKey = KEY_IDENTIFIER[keyIdent]
        }
        else if (IDENT_CHAR.test(keyIdent))
        {
            keyIdent = parseInt(keyIdent.replace("U+", "0x"), 16);
            validKey = String.fromCharCode(keyIdent).toLowerCase()
        }
        else
        {
            validKey = keyIdent.toLowerCase()
        }
    }
    return validKey
}

function transformKeyCode(keyCode) {
    var validKey = "";
    if (Number(keyCode))
    {
        if (keyCode >= 65 && keyCode <= 90)
        {
            validKey = String.fromCharCode(32 + keyCode)
        }
        else if (keyCode >= 112 && keyCode <= 123)
        {
            validKey = "f" + (keyCode - 112 + 1)
        }
        else if (keyCode >= 48 && keyCode <= 57)
        {
            validKey = String(keyCode - 48)
        }
        else if (keyCode >= 96 && keyCode <= 105)
        {
            validKey = String(keyCode - 96)
        }
        else
        {
            validKey = KEY_CODE[keyCode]
        }
    }
    return validKey
}

function normalizedKeyForEvent(keyEvent, noSpecialChars) {
    if (keyEvent.key)
    {
        return transformKey(keyEvent.key, noSpecialChars)
    }
    if (keyEvent.detail && keyEvent.detail.key)
    {
        return transformKey(keyEvent.detail.key, noSpecialChars)
    }
    return transformKeyIdentifier(keyEvent.keyIdentifier) || transformKeyCode(keyEvent.keyCode) || ""
}

function keyComboMatchesEvent(keyCombo, event) {
    var keyEvent = normalizedKeyForEvent(event, keyCombo.hasModifiers);
    return keyEvent === keyCombo.key && (!keyCombo.hasModifiers || !!event.shiftKey === !!keyCombo.shiftKey && !!event.ctrlKey === !!keyCombo.ctrlKey && !!event.altKey === !!keyCombo.altKey && !!event.metaKey === !!keyCombo.metaKey)
}

function parseKeyComboString(keyComboString) {
    if (keyComboString.length === 1)
    {
        return {
            combo: keyComboString,
            key: keyComboString,
            event: "keydown"
        }
    }
    return keyComboString.split("+").reduce(function(parsedKeyCombo, keyComboPart)
    {
        var eventParts = keyComboPart.split(":");
        var keyName = eventParts[0];
        var event = eventParts[1];
        if (keyName in MODIFIER_KEYS)
        {
            parsedKeyCombo[MODIFIER_KEYS[keyName]] = true;
            parsedKeyCombo.hasModifiers = true
        }
        else
        {
            parsedKeyCombo.key = keyName;
            parsedKeyCombo.event = event || "keydown"
        }
        return parsedKeyCombo
    },
    {
        combo: keyComboString.split(":").shift()
    })
}

function parseEventString(eventString) {
    return eventString.trim().split(" ").map(function(keyComboString)
    {
        return parseKeyComboString(keyComboString)
    })
}
const IronA11yKeysBehavior = {
    properties: {
        keyEventTarget:
        {
            type: Object,
            value: function()
            {
                return this
            }
        },
        stopKeyboardEventPropagation:
        {
            type: Boolean,
            value: false
        },
        _boundKeyHandlers:
        {
            type: Array,
            value: function() {
                return []
            }
        },
        _imperativeKeyBindings:
        {
            type: Object,
            value: function()
            {
                return {}
            }
        }
    },
    observers: ["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],
    keyBindings: {},
    registered: function() {
        this._prepKeyBindings()
    },
    attached: function() {
        this._listenKeyEventListeners()
    },
    detached: function() {
        this._unlistenKeyEventListeners()
    },
    addOwnKeyBinding: function(eventString, handlerName) {
        this._imperativeKeyBindings[eventString] = handlerName;
        this._prepKeyBindings();
        this._resetKeyEventListeners()
    },
    removeOwnKeyBindings: function() {
        this._imperativeKeyBindings = {};
        this._prepKeyBindings();
        this._resetKeyEventListeners()
    },
    keyboardEventMatchesKeys: function(event, eventString) {
        var keyCombos = parseEventString(eventString);
        for (var i = 0; i < keyCombos.length; ++i)
        {
            if (keyComboMatchesEvent(keyCombos[i], event))
            {
                return true
            }
        }
        return false
    },
    _collectKeyBindings: function() {
        var keyBindings = this.behaviors.map(function(behavior)
        {
            return behavior.keyBindings
        });
        if (keyBindings.indexOf(this.keyBindings) === -1)
        {
            keyBindings.push(this.keyBindings)
        }
        return keyBindings
    },
    _prepKeyBindings: function() {
        this._keyBindings = {};
        this._collectKeyBindings().forEach(function(keyBindings)
        {
            for (var eventString in keyBindings)
            {
                this._addKeyBinding(eventString, keyBindings[eventString])
            }
        }, this);
        for (var eventString in this._imperativeKeyBindings)
        {
            this._addKeyBinding(eventString, this._imperativeKeyBindings[eventString])
        }
        for (var eventName in this._keyBindings)
        {
            this._keyBindings[eventName].sort(function(kb1, kb2)
            {
                var b1 = kb1[0].hasModifiers;
                var b2 = kb2[0].hasModifiers;
                return b1 === b2 ? 0 : b1 ? -1 : 1
            })
        }
    },
    _addKeyBinding: function(eventString, handlerName) {
        parseEventString(eventString).forEach(function(keyCombo)
        {
            this._keyBindings[keyCombo.event] = this._keyBindings[keyCombo.event] || [];
            this._keyBindings[keyCombo.event].push([keyCombo, handlerName])
        }, this)
    },
    _resetKeyEventListeners: function() {
        this._unlistenKeyEventListeners();
        if (this.isAttached)
        {
            this._listenKeyEventListeners()
        }
    },
    _listenKeyEventListeners: function() {
        if (!this.keyEventTarget)
        {
            return
        }
        Object.keys(this._keyBindings).forEach(function(eventName)
        {
            var keyBindings = this._keyBindings[eventName];
            var boundKeyHandler = this._onKeyBindingEvent.bind(this, keyBindings);
            this._boundKeyHandlers.push([this.keyEventTarget, eventName, boundKeyHandler]);
            this.keyEventTarget.addEventListener(eventName, boundKeyHandler)
        }, this)
    },
    _unlistenKeyEventListeners: function() {
        var keyHandlerTuple;
        var keyEventTarget;
        var eventName;
        var boundKeyHandler;
        while (this._boundKeyHandlers.length)
        {
            keyHandlerTuple = this._boundKeyHandlers.pop();
            keyEventTarget = keyHandlerTuple[0];
            eventName = keyHandlerTuple[1];
            boundKeyHandler = keyHandlerTuple[2];
            keyEventTarget.removeEventListener(eventName, boundKeyHandler)
        }
    },
    _onKeyBindingEvent: function(keyBindings, event) {
        if (this.stopKeyboardEventPropagation) {
            event.stopPropagation()
        }
        if (event.defaultPrevented) {
            return
        }
        for (var i = 0; i < keyBindings.length; i++) {
            var keyCombo = keyBindings[i][0];
            var handlerName = keyBindings[i][1];
            if (keyComboMatchesEvent(keyCombo, event)) {
                this._triggerKeyHandler(keyCombo, handlerName, event);
                if (event.defaultPrevented)
                {
                    return
                }
            }
        }
    },
    _triggerKeyHandler: function(keyCombo, handlerName, keyboardEvent) {
        var detail = Object.create(keyCombo);
        detail.keyboardEvent = keyboardEvent;
        var event = new CustomEvent(keyCombo.event, {
            detail: detail,
            cancelable: true
        });
        this[handlerName].call(this, event);
        if (event.defaultPrevented) {
            keyboardEvent.preventDefault()
        }
    }
};
var MAX_RADIUS_PX = 300;
var MIN_DURATION_MS = 800;
var distance = function(x1, y1, x2, y2) {
    var xDelta = x1 - x2;
    var yDelta = y1 - y2;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta)
};
Polymer({
    _template: html `<!--css-build:shadow--><style scope="paper-ripple">:host {
  border-radius: inherit;
        bottom: 0;
        display: block;
        left: 0;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        
        transform: translate3d(0, 0, 0);
}

.ripple {
  background-color: currentcolor;
        left: 0;
        opacity: var(--paper-ripple-opacity, 0.25);
        pointer-events: none;
        position: absolute;
        will-change: height, transform, width;
}

.ripple, :host(.circle) {
  border-radius: 50%;
}

</style>
`,
    is: "paper-ripple",
    behaviors: [IronA11yKeysBehavior],
    properties:
    {
        center:
        {
            type: Boolean,
            value: false
        },
        holdDown:
        {
            type: Boolean,
            value: false,
            observer: "_holdDownChanged"
        },
        recenters:
        {
            type: Boolean,
            value: false
        },
        noink:
        {
            type: Boolean,
            value: false
        }
    },
    keyBindings:
    {
        "enter:keydown": "_onEnterKeydown",
        "space:keydown": "_onSpaceKeydown",
        "space:keyup": "_onSpaceKeyup"
    },
    created: function()
    {
        this.ripples = []
    },
    attached: function()
    {
        this.keyEventTarget = this.parentNode.nodeType == 11 ? dom(this).getOwnerRoot().host : this.parentNode;
        this.keyEventTarget = this.keyEventTarget;
        this.listen(this.keyEventTarget, "up", "uiUpAction");
        this.listen(this.keyEventTarget, "down", "uiDownAction")
    },
    detached: function()
    {
        this.unlisten(this.keyEventTarget, "up", "uiUpAction");
        this.unlisten(this.keyEventTarget, "down", "uiDownAction");
        this.keyEventTarget = null
    },
    simulatedRipple: function()
    {
        this.downAction();
        this.async(function()
        {
            this.upAction()
        }.bind(this), 1)
    },
    uiDownAction: function(e)
    {
        if (!this.noink) this.downAction(e)
    },
    downAction: function(e)
    {
        if (this.ripples.length && this.holdDown) return;
        this.debounce("show ripple", function()
        {
            this.__showRipple(e)
        }, 1)
    },
    clear: function()
    {
        this.__hideRipple();
        this.holdDown = false
    },
    showAndHoldDown: function()
    {
        this.ripples.forEach(ripple =>
        {
            ripple.remove()
        });
        this.ripples = [];
        this.holdDown = true
    },
    __showRipple: function(e)
    {
        var rect = this.getBoundingClientRect();
        var roundedCenterX = function()
        {
            return Math.round(rect.width / 2)
        };
        var roundedCenterY = function()
        {
            return Math.round(rect.height / 2)
        };
        var centered = !e || this.center;
        if (centered)
        {
            var x = roundedCenterX();
            var y = roundedCenterY()
        }
        else
        {
            var sourceEvent = e.detail.sourceEvent;
            var x = Math.round(sourceEvent.clientX - rect.left);
            var y = Math.round(sourceEvent.clientY - rect.top)
        }
        var corners = [
        {
            x: 0,
            y: 0
        },
        {
            x: rect.width,
            y: 0
        },
        {
            x: 0,
            y: rect.height
        },
        {
            x: rect.width,
            y: rect.height
        }];
        var cornerDistances = corners.map(function(corner)
        {
            return Math.round(distance(x, y, corner.x, corner.y))
        });
        var radius = Math.min(MAX_RADIUS_PX, Math.max.apply(Math, cornerDistances));
        var startTranslate = x - radius + "px, " + (y - radius) + "px";
        if (this.recenters && !centered)
        {
            var endTranslate = roundedCenterX() - radius + "px, " + (roundedCenterY() - radius) + "px"
        }
        else
        {
            var endTranslate = startTranslate
        }
        var ripple = document.createElement("div");
        ripple.classList.add("ripple");
        ripple.style.height = ripple.style.width = 2 * radius + "px";
        this.ripples.push(ripple);
        this.shadowRoot.appendChild(ripple);
        ripple.animate(
        {
            transform: ["translate(" + startTranslate + ") scale(0)", "translate(" + endTranslate + ") scale(1)"]
        },
        {
            duration: Math.max(MIN_DURATION_MS, Math.log(radius) * radius) || 0,
            easing: "cubic-bezier(.2, .9, .1, .9)",
            fill: "forwards"
        })
    },
    uiUpAction: function(e)
    {
        if (!this.noink) this.upAction()
    },
    upAction: function(e)
    {
        if (!this.holdDown) this.debounce("hide ripple", function()
        {
            this.__hideRipple()
        }, 1)
    },
    __hideRipple: function()
    {
        Promise.all(this.ripples.map(function(ripple)
        {
            return new Promise(function(resolve)
            {
                var removeRipple = function()
                {
                    ripple.remove();
                    resolve()
                };
                var opacity = getComputedStyle(ripple).opacity;
                if (!opacity.length)
                {
                    removeRipple()
                }
                else
                {
                    var animation = ripple.animate(
                    {
                        opacity: [opacity, 0]
                    },
                    {
                        duration: 150,
                        fill: "forwards"
                    });
                    animation.addEventListener("finish", removeRipple);
                    animation.addEventListener("cancel", removeRipple)
                }
            })
        })).then(function()
        {
            this.fire("transitionend")
        }.bind(this));
        this.ripples = []
    },
    _onEnterKeydown: function()
    {
        this.uiDownAction();
        this.async(this.uiUpAction, 1)
    },
    _onSpaceKeydown: function()
    {
        this.uiDownAction()
    },
    _onSpaceKeyup: function()
    {
        this.uiUpAction()
    },
    _holdDownChanged: function(newHoldDown, oldHoldDown)
    {
        if (oldHoldDown === undefined) return;
        if (newHoldDown) this.downAction();
        else this.upAction()
    }
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const IronButtonStateImpl = {
    properties:
    {
        pressed:
        {
            type: Boolean,
            readOnly: true,
            value: false,
            reflectToAttribute: true,
            observer: "_pressedChanged"
        },
        toggles:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        active:
        {
            type: Boolean,
            value: false,
            notify: true,
            reflectToAttribute: true
        },
        pointerDown:
        {
            type: Boolean,
            readOnly: true,
            value: false
        },
        receivedFocusFromKeyboard:
        {
            type: Boolean,
            readOnly: true
        },
        ariaActiveAttribute:
        {
            type: String,
            value: "aria-pressed",
            observer: "_ariaActiveAttributeChanged"
        }
    },
    listeners:
    {
        down: "_downHandler",
        up: "_upHandler",
        tap: "_tapHandler"
    },
    observers: ["_focusChanged(focused)", "_activeChanged(active, ariaActiveAttribute)"],
    keyBindings:
    {
        "enter:keydown": "_asyncClick",
        "space:keydown": "_spaceKeyDownHandler",
        "space:keyup": "_spaceKeyUpHandler"
    },
    _mouseEventRe: /^mouse/,
    _tapHandler: function()
    {
        if (this.toggles)
        {
            this._userActivate(!this.active)
        }
        else
        {
            this.active = false
        }
    },
    _focusChanged: function(focused)
    {
        this._detectKeyboardFocus(focused);
        if (!focused)
        {
            this._setPressed(false)
        }
    },
    _detectKeyboardFocus: function(focused)
    {
        this._setReceivedFocusFromKeyboard(!this.pointerDown && focused)
    },
    _userActivate: function(active)
    {
        if (this.active !== active)
        {
            this.active = active;
            this.fire("change")
        }
    },
    _downHandler: function(event)
    {
        this._setPointerDown(true);
        this._setPressed(true);
        this._setReceivedFocusFromKeyboard(false)
    },
    _upHandler: function()
    {
        this._setPointerDown(false);
        this._setPressed(false)
    },
    _spaceKeyDownHandler: function(event)
    {
        var keyboardEvent = event.detail.keyboardEvent;
        var target = dom(keyboardEvent).localTarget;
        if (this.isLightDescendant(target)) return;
        keyboardEvent.preventDefault();
        keyboardEvent.stopImmediatePropagation();
        this._setPressed(true)
    },
    _spaceKeyUpHandler: function(event)
    {
        var keyboardEvent = event.detail.keyboardEvent;
        var target = dom(keyboardEvent).localTarget;
        if (this.isLightDescendant(target)) return;
        if (this.pressed)
        {
            this._asyncClick()
        }
        this._setPressed(false)
    },
    _asyncClick: function()
    {
        this.async(function()
        {
            this.click()
        }, 1)
    },
    _pressedChanged: function(pressed)
    {
        this._changedButtonState()
    },
    _ariaActiveAttributeChanged: function(value, oldValue)
    {
        if (oldValue && oldValue != value && this.hasAttribute(oldValue))
        {
            this.removeAttribute(oldValue)
        }
    },
    _activeChanged: function(active, ariaActiveAttribute)
    {
        if (this.toggles)
        {
            this.setAttribute(this.ariaActiveAttribute, active ? "true" : "false")
        }
        else
        {
            this.removeAttribute(this.ariaActiveAttribute)
        }
        this._changedButtonState()
    },
    _controlStateChanged: function()
    {
        if (this.disabled)
        {
            this._setPressed(false)
        }
        else
        {
            this._changedButtonState()
        }
    },
    _changedButtonState: function()
    {
        if (this._buttonStateChanged)
        {
            this._buttonStateChanged()
        }
    }
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const PaperRippleBehavior = {
    properties:
    {
        noink:
        {
            type: Boolean,
            observer: "_noinkChanged"
        },
        _rippleContainer:
        {
            type: Object
        }
    },
    _buttonStateChanged: function()
    {
        if (this.focused)
        {
            this.ensureRipple()
        }
    },
    _downHandler: function(event)
    {
        IronButtonStateImpl._downHandler.call(this, event);
        if (this.pressed)
        {
            this.ensureRipple(event)
        }
    },
    ensureRipple: function(optTriggeringEvent)
    {
        if (!this.hasRipple())
        {
            this._ripple = this._createRipple();
            this._ripple.noink = this.noink;
            var rippleContainer = this._rippleContainer || this.root;
            if (rippleContainer)
            {
                dom(rippleContainer).appendChild(this._ripple)
            }
            if (optTriggeringEvent)
            {
                var domContainer = dom(this._rippleContainer || this);
                var target = dom(optTriggeringEvent).rootTarget;
                if (domContainer.deepContains(target))
                {
                    this._ripple.uiDownAction(optTriggeringEvent)
                }
            }
        }
    },
    getRipple: function()
    {
        this.ensureRipple();
        return this._ripple
    },
    hasRipple: function()
    {
        return Boolean(this._ripple)
    },
    _createRipple: function()
    {
        var element = document.createElement("paper-ripple");
        return element
    },
    _noinkChanged: function(noink)
    {
        if (this.hasRipple())
        {
            this._ripple.noink = noink
        }
    }
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const template$1 = html `<custom-style>
  <style is="custom-style" css-build="shadow">html {
  --google-red-100-rgb: 244, 199, 195;  
      --google-red-100: rgb(var(--google-red-100-rgb));
      --google-red-300-rgb: 230, 124, 115;  
      --google-red-300: rgb(var(--google-red-300-rgb));
      --google-red-500-rgb: 219, 68, 55;  
      --google-red-500: rgb(var(--google-red-500-rgb));
      --google-red-700-rgb: 197, 57, 41;  
      --google-red-700: rgb(var(--google-red-700-rgb));

      --google-blue-100-rgb: 198, 218, 252;  
      --google-blue-100: rgb(var(--google-blue-100-rgb));
      --google-blue-300-rgb: 123, 170, 247;  
      --google-blue-300: rgb(var(--google-blue-300-rgb));
      --google-blue-500-rgb: 66, 133, 244;  
      --google-blue-500: rgb(var(--google-blue-500-rgb));
      --google-blue-700-rgb: 51, 103, 214;  
      --google-blue-700: rgb(var(--google-blue-700-rgb));

      --google-green-100-rgb: 183, 225, 205;  
      --google-green-100: rgb(var(--google-green-100-rgb));
      --google-green-300-rgb: 87, 187, 138;  
      --google-green-300: rgb(var(--google-green-300-rgb));
      --google-green-500-rgb: 15, 157, 88;  
      --google-green-500: rgb(var(--google-green-500-rgb));
      --google-green-700-rgb: 11, 128, 67;  
      --google-green-700: rgb(var(--google-green-700-rgb));

      --google-yellow-100-rgb: 252, 232, 178;  
      --google-yellow-100: rgb(var(--google-yellow-100-rgb));
      --google-yellow-300-rgb: 247, 203, 77;  
      --google-yellow-300: rgb(var(--google-yellow-300-rgb));
      --google-yellow-500-rgb: 244, 180, 0;  
      --google-yellow-500: rgb(var(--google-yellow-500-rgb));
      --google-yellow-700-rgb: 240, 147, 0;  
      --google-yellow-700: rgb(var(--google-yellow-700-rgb));

      --google-grey-100-rgb: 245, 245, 245;  
      --google-grey-100: rgb(var(--google-grey-100-rgb));
      --google-grey-300-rgb: 224, 224, 224;  
      --google-grey-300: rgb(var(--google-grey-300-rgb));
      --google-grey-500-rgb: 158, 158, 158;  
      --google-grey-500: rgb(var(--google-grey-500-rgb));
      --google-grey-700-rgb: 97, 97, 97;  
      --google-grey-700: rgb(var(--google-grey-700-rgb));

      

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; 
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; 
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;
}

</style>
</custom-style>
`;
template$1.setAttribute("style", "display: none;");
document.head.appendChild(template$1.content);
const template$2 = document.createElement("template");
template$2.innerHTML = `<dom-module id="cr-hidden-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-hidden-style">[hidden], :host([hidden]) {\n  display: none !important;\n}\n\n</style>\n  </template>\n</dom-module>\n`;
document.body.appendChild(template$2.content.cloneNode(true));
const $_documentContainer = document.createElement("template");
$_documentContainer.innerHTML = `<custom-style>\n<style is="custom-style" css-build="shadow">html {\n  --google-blue-50-rgb: 232, 240, 254;  \n    --google-blue-50: rgb(var(--google-blue-50-rgb));\n    --google-blue-200-rgb: 174, 203, 250;  \n    --google-blue-200: rgb(var(--google-blue-200-rgb));\n    --google-blue-600-rgb: 26, 115, 232;  \n    --google-blue-600: rgb(var(--google-blue-600-rgb));\n\n    --google-grey-200-rgb: 232, 234, 237;  \n    --google-grey-200: rgb(var(--google-grey-200-rgb));\n    --google-grey-400-rgb: 189, 193, 198;  \n    --google-grey-400: rgb(var(--google-grey-400-rgb));\n    --google-grey-600-rgb: 128, 134, 139;  \n    --google-grey-600: rgb(var(--google-grey-600-rgb));\n    --google-grey-800-rgb: 60, 64, 67;  \n    --google-grey-800: rgb(var(--google-grey-800-rgb));\n    --google-grey-900-rgb: 32, 33, 36;  \n    --google-grey-900: rgb(var(--google-grey-900-rgb));\n    \n    --google-grey-900-white-4-percent: #292a2d;\n\n    --google-red-600-rgb: 217, 48, 37;  \n    --google-red-600: rgb(var(--google-red-600-rgb));\n\n    \n    --google-blue-refresh-100-rgb: 210, 227, 252;  \n    --google-blue-refresh-100: rgb(var(--google-blue-refresh-100-rgb));\n    --google-blue-refresh-300-rgb: 138, 180, 248;  \n    --google-blue-refresh-300: rgb(var(--google-blue-refresh-300-rgb));\n    --google-blue-refresh-500-rgb: 66, 133, 244;  \n    --google-blue-refresh-500: rgb(var(--google-blue-refresh-500-rgb));\n    --google-blue-refresh-700-rgb: 25, 103, 210;  \n    --google-blue-refresh-700: rgb(var(--google-blue-refresh-700-rgb));\n\n    --google-green-refresh-300-rgb: 129, 201, 149;  \n    --google-green-refresh-300: rgb(var(--google-green-refresh-300-rgb));\n    --google-green-refresh-700-rgb: 24, 128, 56;  \n    --google-green-refresh-700: rgb(var(--google-green-refresh-700-rgb));\n\n    --google-grey-refresh-100-rgb: 241, 243, 244;  \n    --google-grey-refresh-100: rgb(var(--google-grey-refresh-100-rgb));\n    --google-grey-refresh-300-rgb: 218, 220, 224;  \n    --google-grey-refresh-300: rgb(var(--google-grey-refresh-300-rgb));\n    --google-grey-refresh-500-rgb: 154, 160, 166;  \n    --google-grey-refresh-500: rgb(var(--google-grey-refresh-500-rgb));\n    --google-grey-refresh-700-rgb: 95, 99, 104;  \n    --google-grey-refresh-700: rgb(var(--google-grey-refresh-700-rgb));\n\n    --google-red-refresh-300-rgb: 242, 139, 130;  \n    --google-red-refresh-300: rgb(var(--google-red-refresh-300-rgb));\n\n    --google-yellow-refresh-300-rgb: 253, 214, 51;  \n    --google-yellow-refresh-300: rgb(var(--google-yellow-refresh-300-rgb));\n\n    --cr-primary-text-color: var(--google-grey-900);\n    --cr-secondary-text-color: var(--google-grey-refresh-700);\n\n    --cr-card-background-color: white;\n    --cr-card-shadow-color-rgb: var(--google-grey-800-rgb);\n\n    --cr-card-shadow: rgba(var(--cr-card-shadow-color-rgb), .3) 0 1px 2px 0,\n                      rgba(var(--cr-card-shadow-color-rgb), .15) 0 1px 3px 1px;\n\n    \n    --cr-card-elevation_-_box-shadow:  var(--cr-card-shadow);\n\n    --cr-checked-color: var(--google-blue-600);\n    --cr-focused-item-color: var(--google-grey-300);\n    --cr-form-field-label-color: var(--google-grey-refresh-700);\n    --cr-hairline-rgb: 0, 0, 0;\n    --cr-link-color: var(--google-blue-700);\n    --cr-menu-background-color: white;\n    --cr-menu-background-focus-color: var(--google-grey-200);\n    --cr-menu-shadow: 0 2px 6px var(--paper-grey-500);\n    --cr-separator-color: rgba(0, 0, 0, .06);\n    --cr-title-text-color: rgb(90, 90, 90);\n    --cr-toggle-color: var(--google-blue-500);\n    --cr-toolbar-background-color: var(--google-blue-700);\n}\n\n@media (prefers-color-scheme: dark) {\nhtml {\n  --cr-primary-text-color: var(--google-grey-200);\n      --cr-secondary-text-color: var(--google-grey-refresh-500);\n\n      --cr-card-background-color: var(--google-grey-900-white-4-percent);\n      --cr-card-shadow-color-rgb: 0, 0, 0;\n\n      --cr-checked-color: var(--google-blue-refresh-300);\n      --cr-form-field-label-color: var(--dark-secondary-color);\n      --cr-hairline-rgb: 255, 255, 255;\n      --cr-link-color: var(--google-blue-refresh-300);\n      --cr-menu-background-color: var(--google-grey-900);\n      --cr-menu-background-focus-color: rgba(var(--google-grey-800-rgb), .6);\n      --cr-menu-background-sheen: rgba(255, 255, 255, .06);  \n      --cr-menu-shadow: rgba(0, 0, 0, .3) 0 1px 2px 0,\n                        rgba(0, 0, 0, .15) 0 3px 6px 2px;\n      --cr-separator-color: rgba(255, 255, 255, .1);\n      \n      --cr-title-text-color: var(--cr-primary-text-color);\n      --cr-toolbar-background-color: var(--google-grey-900-white-4-percent);\n}\n\n}\n\nhtml {\n  --cr-button-edge-spacing: 12px;\n    --cr-button-height: 32px;\n\n    \n    --cr-controlled-by-spacing: 24px;\n\n    \n    --cr-default-input-max-width: 264px;\n\n    \n    --cr-icon-ripple-size: 36px;\n    --cr-icon-ripple-padding: 8px;\n\n    --cr-icon-size: 20px;\n\n    --cr-icon-height-width_-_height:  var(--cr-icon-size); --cr-icon-height-width_-_width:  var(--cr-icon-size);\n\n    --cr-icon-button-margin-start: 16px;\n\n    --cr-icon-ripple-margin: calc(var(--cr-icon-ripple-padding) * -1);\n\n    --cr-paper-icon-button-margin_-_margin-inline-end:  var(--cr-icon-ripple-margin); --cr-paper-icon-button-margin_-_margin-inline-start:  var(--cr-icon-button-margin-start);\n\n    --cr-secondary-text_-_color:  var(--cr-secondary-text-color); --cr-secondary-text_-_font-weight:  400;\n\n    \n    \n    --cr-section-min-height: 48px;\n    --cr-section-two-line-min-height: 64px;\n    --cr-section-three-line-min-height: 84px;\n\n    --cr-section-padding: 20px;\n    --cr-section-vertical-padding: 12px;\n    --cr-section-indent-width: 40px;\n    --cr-section-indent-padding: calc(\n        var(--cr-section-padding) + var(--cr-section-indent-width));\n\n    --cr-section_-_align-items:  center; --cr-section_-_border-top:  var(--cr-separator-line); --cr-section_-_display:  flex; --cr-section_-_min-height:  var(--cr-section-min-height); --cr-section_-_padding:  0 var(--cr-section-padding);\n\n    --cr-section-vertical-margin: 21px;\n\n    --cr-centered-card-max-width: 680px;\n    --cr-centered-card-width-percentage: 0.96;\n    --cr-centered-card-container_-_box-sizing:  border-box; --cr-centered-card-container_-_display:  block; --cr-centered-card-container_-_height: apply-shim-inherit; --cr-centered-card-container_-_margin:  0 auto; --cr-centered-card-container_-_max-width:  var(--cr-centered-card-max-width); --cr-centered-card-container_-_min-width:  550px; --cr-centered-card-container_-_position:  relative; --cr-centered-card-container_-_width:  calc(100% * var(--cr-centered-card-width-percentage));\n\n    --cr-text-elide_-_overflow:  hidden; --cr-text-elide_-_text-overflow:  ellipsis; --cr-text-elide_-_white-space:  nowrap;\n\n    --cr-tooltip_-_font-size:  92.31%; --cr-tooltip_-_font-weight:  500; --cr-tooltip_-_max-width:  330px; --cr-tooltip_-_min-width:  200px; --cr-tooltip_-_padding:  10px 8px;\n\n    --cr-selectable-focus_-_background-color:  var(--cr-focused-item-color); --cr-selectable-focus_-_outline:  none;\n\n    --cr-hairline: 1px solid rgba(var(--cr-hairline-rgb), .14);\n\n    --cr-separator-height: 1px;\n    --cr-separator-line: var(--cr-separator-height) solid\n        var(--cr-separator-color);\n\n    --cr-toolbar-overlay-animation-duration: 150ms;\n    --cr-toolbar-height: 56px;\n\n    --cr-container-shadow-height: 6px;\n    --cr-container-shadow-margin: calc(-1 * var(--cr-container-shadow-height));\n\n    --cr-container-shadow-max-opacity: 1;\n\n    \n    --cr-card-border-radius: 4px;\n    --cr-disabled-opacity: .38;\n    --cr-form-field-bottom-spacing: 16px;\n    --cr-form-field-label-font-size: .625rem;\n    --cr-form-field-label-height: 1em;\n    --cr-form-field-label-line-height: 1em;\n}\n\n</style>\n</custom-style>\n`;
document.head.appendChild($_documentContainer.content); // Copyright 2019 The Chromium Authors. All rights reserved.
Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="cr-button">:host {
  --active-shadow-rgb: var(--google-grey-800-rgb);
        --active-shadow-action-rgb: var(--google-blue-refresh-500-rgb);
        --bg-action: var(--google-blue-600);
        --border-color: var(--google-grey-refresh-300);
        --disabled-bg-action: var(--google-grey-refresh-100);
        --disabled-bg: white;
        --disabled-border-color: var(--google-grey-refresh-100);
        --focus-shadow-color: rgba(var(--google-blue-600-rgb), .4);
        --hover-bg-action: rgba(var(--google-blue-600-rgb), .9);
        --hover-bg-color: rgba(var(--google-blue-refresh-500-rgb), .04);
        --hover-border-color: var(--google-blue-refresh-100);
        --hover-shadow-action-rgb: var(--google-blue-refresh-500-rgb);
        --ink-color-action: white;
        
        --ink-color: var(--google-blue-600);
        --ripple-opacity-action: .32;
        --ripple-opacity: .1;
        --text-color-action: white;
        --text-color: var(--google-blue-600);
}

@media (prefers-color-scheme: dark) {
:host {
  --active-bg: black linear-gradient(rgba(255, 255, 255, .06),
                                             rgba(255, 255, 255, .06));
          --active-shadow-rgb: 0, 0, 0;
          --active-shadow-action-rgb: var(--google-blue-refresh-500-rgb);
          --bg-action: var(--google-blue-refresh-300);
          --border-color: var(--google-grey-refresh-700);
          --disabled-bg-action: var(--google-grey-800);
          
          --disabled-bg: transparent;
          --disabled-border-color: var(--google-grey-800);
          --focus-shadow-color: rgba(var(--google-blue-refresh-300-rgb), .5);
          --hover-bg-action: var(--bg-action)
              linear-gradient(rgba(0, 0, 0, .08), rgba(0, 0, 0, .08));
          --hover-bg-color: rgba(var(--google-blue-refresh-300-rgb), .08);
          --ink-color-action: black;
          --ink-color: var(--google-blue-refresh-300);
          --ripple-opacity-action: .16;
          --ripple-opacity: .16;
          --text-color-action: var(--google-grey-900);
          --text-color: var(--google-blue-refresh-300);
}

}

:host {
  --paper-ripple-opacity: var(--ripple-opacity);
        -webkit-tap-highlight-color: transparent;
        align-items: center;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--text-color);
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        font-weight: 500;
        height: var(--cr-button-height);
        justify-content: center;
        min-width: 5.14em;
        outline-width: 0;
        padding: 8px 16px;
        position: relative;
        user-select: none;
}

:host-context(.focus-outline-visible):host(:focus) {
  box-shadow: 0 0 0 2px var(--focus-shadow-color);
}

:host(:active) {
  background: var(--active-bg);
        box-shadow:
            0 1px 2px 0 rgba(var(--active-shadow-rgb), .3),
            0 3px 6px 2px rgba(var(--active-shadow-rgb), .15);
}

:host(:hover) {
  background-color: var(--hover-bg-color);
}

@media (prefers-color-scheme: light) {
:host(:hover) {
  border-color: var(--hover-border-color);
}

}

:host(.action-button) {
  --ink-color: var(--ink-color-action);
        --paper-ripple-opacity: var(--ripple-opacity-action);
        background-color: var(--bg-action);
        border: none;
        color: var(--text-color-action);
}

:host(.action-button:active) {
  box-shadow:
            0 1px 2px 0 rgba(var(--active-shadow-action-rgb), .3),
            0 3px 6px 2px rgba(var(--active-shadow-action-rgb), .15);
}

:host(.action-button:hover) {
  background: var(--hover-bg-action);
}

@media (prefers-color-scheme: light) {
:host(.action-button:not(:active):hover) {
  box-shadow:
              0 1px 2px 0 rgba(var(--hover-shadow-action-rgb), .3),
              0 1px 3px 1px rgba(var(--hover-shadow-action-rgb), .15);
}

}

:host([disabled]) {
  background-color: var(--disabled-bg);
        border-color: var(--disabled-border-color);
        color: var(--google-grey-600);
        cursor: auto;
        pointer-events: none;
}

:host(.action-button[disabled]) {
  background-color: var(--disabled-bg-action);
        border-color: transparent;
}

:host(.cancel-button) {
  margin-inline-end: 8px;
}

:host(.action-button), :host(.cancel-button) {
  line-height: 154%;
}

paper-ripple {
  color: var(--ink-color);
        height: var(--paper-ripple-height);
        width: var(--paper-ripple-width);
        
        left: var(--paper-ripple-left, 0);
        top: var(--paper-ripple-top, 0);
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,
    is: "cr-button",
    behaviors: [PaperRippleBehavior],
    properties:
    {
        disabled:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            observer: "disabledChanged_"
        },
        circleRipple:
        {
            type: Boolean,
            value: false
        }
    },
    hostAttributes:
    {
        "aria-disabled": "false",
        role: "button",
        tabindex: 0
    },
    listeners:
    {
        click: "onClick_",
        keydown: "onKeyDown_",
        keyup: "onKeyUp_",
        pointerdown: "onPointerDown_",
        tap: "onTap_"
    },
    timeoutIds_: null,
    ready()
    {
        FocusOutlineManager.forDocument(document);
        this.timeoutIds_ = new Set
    },
    detached()
    {
        this.timeoutIds_.forEach(clearTimeout);
        this.timeoutIds_.clear()
    },
    setTimeout_(fn, delay)
    {
        if (!this.isConnected)
        {
            return
        }
        const id = setTimeout(() =>
        {
            this.timeoutIds_.delete(id);
            fn()
        }, delay);
        this.timeoutIds_.add(id)
    },
    disabledChanged_(newValue, oldValue)
    {
        if (!newValue && oldValue === undefined)
        {
            return
        }
        if (this.disabled)
        {
            this.blur()
        }
        this.setAttribute("aria-disabled", Boolean(this.disabled));
        this.setAttribute("tabindex", this.disabled ? -1 : 0)
    },
    onClick_(e)
    {
        if (this.disabled)
        {
            e.stopImmediatePropagation()
        }
    },
    onKeyDown_(e)
    {
        if (e.key !== " " && e.key !== "Enter")
        {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        if (e.repeat)
        {
            return
        }
        this.getRipple().uiDownAction();
        if (e.key === "Enter")
        {
            this.click();
            this.setTimeout_(() => this.getRipple().uiUpAction(), 100)
        }
    },
    onKeyUp_(e)
    {
        if (e.key !== " " && e.key !== "Enter")
        {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        if (e.key === " ")
        {
            this.click();
            this.getRipple().uiUpAction()
        }
    },
    onPointerDown_()
    {
        this.ensureRipple()
    },
    onTap_()
    {},
    _createRipple()
    {
        const ripple = PaperRippleBehavior._createRipple();
        if (this.circleRipple)
        {
            ripple.setAttribute("center", "");
            ripple.classList.add("circle")
        }
        return ripple
    }
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const template$3 = html `<custom-style>
  <style is="custom-style" css-build="shadow">[hidden] {
  display: none !important;
}

</style>
</custom-style>
<custom-style>
  <style is="custom-style" css-build="shadow">html {
  --layout_-_display:  flex;;

      --layout-inline_-_display:  inline-flex;;

      --layout-horizontal_-_display:  var(--layout_-_display); --layout-horizontal_-_flex-direction:  row;;

      --layout-horizontal-reverse_-_display:  var(--layout_-_display); --layout-horizontal-reverse_-_flex-direction:  row-reverse;;

      --layout-vertical_-_display:  var(--layout_-_display); --layout-vertical_-_flex-direction:  column;;

      --layout-vertical-reverse_-_display:  var(--layout_-_display); --layout-vertical-reverse_-_flex-direction:  column-reverse;;

      --layout-wrap_-_flex-wrap:  wrap;;

      --layout-wrap-reverse_-_flex-wrap:  wrap-reverse;;

      --layout-flex-auto_-_flex:  1 1 auto;;

      --layout-flex-none_-_flex:  none;;

      --layout-flex_-_flex:  1; --layout-flex_-_flex-basis:  0.000000001px;;

      --layout-flex-2_-_flex:  2;;

      --layout-flex-3_-_flex:  3;;

      --layout-flex-4_-_flex:  4;;

      --layout-flex-5_-_flex:  5;;

      --layout-flex-6_-_flex:  6;;

      --layout-flex-7_-_flex:  7;;

      --layout-flex-8_-_flex:  8;;

      --layout-flex-9_-_flex:  9;;

      --layout-flex-10_-_flex:  10;;

      --layout-flex-11_-_flex:  11;;

      --layout-flex-12_-_flex:  12;;

      

      --layout-start_-_align-items:  flex-start;;

      --layout-center_-_align-items:  center;;

      --layout-end_-_align-items:  flex-end;;

      --layout-baseline_-_align-items:  baseline;;

      

      --layout-start-justified_-_justify-content:  flex-start;;

      --layout-center-justified_-_justify-content:  center;;

      --layout-end-justified_-_justify-content:  flex-end;;

      --layout-around-justified_-_justify-content:  space-around;;

      --layout-justified_-_justify-content:  space-between;;

      --layout-center-center_-_align-items:  var(--layout-center_-_align-items); --layout-center-center_-_justify-content:  var(--layout-center-justified_-_justify-content);;

      

      --layout-self-start_-_align-self:  flex-start;;

      --layout-self-center_-_align-self:  center;;

      --layout-self-end_-_align-self:  flex-end;;

      --layout-self-stretch_-_align-self:  stretch;;

      --layout-self-baseline_-_align-self:  baseline;;

      

      --layout-start-aligned_-_align-content:  flex-start;;

      --layout-end-aligned_-_align-content:  flex-end;;

      --layout-center-aligned_-_align-content:  center;;

      --layout-between-aligned_-_align-content:  space-between;;

      --layout-around-aligned_-_align-content:  space-around;;

      

      --layout-block_-_display:  block;;

      --layout-invisible_-_visibility:  hidden !important;;

      --layout-relative_-_position:  relative;;

      --layout-fit_-_position:  absolute; --layout-fit_-_top:  0; --layout-fit_-_right:  0; --layout-fit_-_bottom:  0; --layout-fit_-_left:  0;;

      --layout-scroll_-_-webkit-overflow-scrolling:  touch; --layout-scroll_-_overflow:  auto;;

      --layout-fullbleed_-_margin:  0; --layout-fullbleed_-_height:  100vh;;

      

      --layout-fixed-top_-_position:  fixed; --layout-fixed-top_-_top:  0; --layout-fixed-top_-_left:  0; --layout-fixed-top_-_right:  0;;

      --layout-fixed-right_-_position:  fixed; --layout-fixed-right_-_top:  0; --layout-fixed-right_-_right:  0; --layout-fixed-right_-_bottom:  0;;

      --layout-fixed-bottom_-_position:  fixed; --layout-fixed-bottom_-_right:  0; --layout-fixed-bottom_-_bottom:  0; --layout-fixed-bottom_-_left:  0;;

      --layout-fixed-left_-_position:  fixed; --layout-fixed-left_-_top:  0; --layout-fixed-left_-_bottom:  0; --layout-fixed-left_-_left:  0;;
}

</style>
</custom-style>`;
template$3.setAttribute("style", "display: none;");
document.head.appendChild(template$3.content);
var style = document.createElement("style");
style.textContent = "[hidden] { display: none !important; }";
document.head.appendChild(style);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Polymer({
    _template: html `<!--css-build:shadow--><style scope="iron-icon">:host {
  display: var(--layout-inline_-_display);
        align-items: var(--layout-center-center_-_align-items); justify-content: var(--layout-center-center_-_justify-content);
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        ;
}

:host([hidden]) {
  display: none;
}

</style>
`,
    is: "iron-icon",
    properties:
    {
        icon:
        {
            type: String
        },
        theme:
        {
            type: String
        },
        src:
        {
            type: String
        },
        _meta:
        {
            value: Base.create("iron-meta",
            {
                type: "iconset"
            })
        }
    },
    observers: ["_updateIcon(_meta, isAttached)", "_updateIcon(theme, isAttached)", "_srcChanged(src, isAttached)", "_iconChanged(icon, isAttached)"],
    _DEFAULT_ICONSET: "icons",
    _iconChanged: function(icon)
    {
        var parts = (icon || "").split(":");
        this._iconName = parts.pop();
        this._iconsetName = parts.pop() || this._DEFAULT_ICONSET;
        this._updateIcon()
    },
    _srcChanged: function(src)
    {
        this._updateIcon()
    },
    _usesIconset: function()
    {
        return this.icon || !this.src
    },
    _updateIcon: function()
    {
        if (this._usesIconset())
        {
            if (this._img && this._img.parentNode)
            {
                dom(this.root).removeChild(this._img)
            }
            if (this._iconName === "")
            {
                if (this._iconset)
                {
                    this._iconset.removeIcon(this)
                }
            }
            else if (this._iconsetName && this._meta)
            {
                this._iconset = this._meta.byKey(this._iconsetName);
                if (this._iconset)
                {
                    this._iconset.applyIcon(this, this._iconName, this.theme);
                    this.unlisten(window, "iron-iconset-added", "_updateIcon")
                }
                else
                {
                    this.listen(window, "iron-iconset-added", "_updateIcon")
                }
            }
        }
        else
        {
            if (this._iconset)
            {
                this._iconset.removeIcon(this)
            }
            if (!this._img)
            {
                this._img = document.createElement("img");
                this._img.style.width = "100%";
                this._img.style.height = "100%";
                this._img.draggable = false
            }
            this._img.src = this.src;
            dom(this.root).appendChild(this._img)
        }
    }
}); // Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-icon-button">:host {
  --cr-icon-button-fill-color: var(--google-grey-refresh-700);
        --cr-icon-button-fill-color-focus: white;
        --cr-icon-button-icon-start-offset: 0;
        --cr-icon-button-icon-size: 20px;
        --cr-icon-button-size: 36px;
        --cr-icon-button-height: var(--cr-icon-button-size);
        --cr-icon-button-transition: 150ms ease-in-out;
        --cr-icon-button-width: var(--cr-icon-button-size);
        
        -webkit-tap-highlight-color: transparent;
        border-radius: 4px;
        color: var(--cr-icon-button-stroke-color,
            var(--cr-icon-button-fill-color));
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        height: var(--cr-icon-button-height);
        margin-inline-end: var(--cr-icon-button-margin-end,
            var(--cr-icon-ripple-margin));
        margin-inline-start: var(--cr-icon-button-margin-start);
        outline: none;
        user-select: none;
        vertical-align: middle;
        width: var(--cr-icon-button-width);
}

:host([disabled]) {
  cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
}

:host(.no-overlap) {
  --cr-icon-button-margin-end: 0;
        --cr-icon-button-margin-start: 0;
}

:host-context([dir=rtl]) {
  transform: scaleX(-1);
}

:host(:not([iron-icon])) #maskedImage {
  -webkit-mask-image: var(--cr-icon-image);
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: var(--cr-icon-button-icon-size);
        background-color: var(--cr-icon-button-fill-color);
        height: 100%;
        transition: background-color var(--cr-icon-button-transition);
        width: 100%;
        z-index: 1;
}

:host-context([a11y-enhanced]):host([ripple-showing_]) #maskedImage {
  background-color: var(--cr-icon-button-fill-color-focus);
}

#icon {
  align-items: center;
        border-radius: 4px;
        display: flex;
        height: 100%;
        justify-content: center;
        padding-inline-start: var(--cr-icon-button-icon-start-offset);
        
        position: relative;
        width: 100%;
}

iron-icon {
  --iron-icon-fill-color: var(--cr-icon-button-fill-color);
        --iron-icon-stroke-color: var(--cr-icon-button-stroke-color, none);
        --iron-icon-height: var(--cr-icon-button-icon-size);
        --iron-icon-width: var(--cr-icon-button-icon-size);
        transition: fill var(--cr-icon-button-transition),
            stroke var(--cr-icon-button-transition);
        z-index: 1;
}

:host-context([a11y-enhanced]):host([ripple-showing_]) iron-icon {
  --iron-icon-fill-color: var(--cr-icon-button-fill-color-focus);
        --iron-icon-stroke-color: var(--cr-icon-button-stroke-color-focus,
            none);
}

paper-ripple {
  --paper-ripple-opacity: var(--cr-icon-button-ripple-opacity, .21);
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-icon-button-fill-color: var(--google-grey-refresh-500);
          --cr-icon-button-fill-color-focus: var(--google-grey-900);
}

paper-ripple {
  --paper-ripple-opacity: var(--cr-icon-button-ripple-opacity, .4);
}

}

:host-context([a11y-enhanced]) paper-ripple {
  --paper-ripple-opacity: 1;
        opacity: 0;
        transition: opacity var(--cr-icon-button-transition);
}

:host-context([a11y-enhanced]):host([ripple-showing_]) paper-ripple {
  opacity: 1;
}

</style>
    <div id="icon">
      <div id="maskedImage"></div>
    </div>
<!--_html_template_end_-->`,
    is: "cr-icon-button",
    behaviors: [PaperRippleBehavior],
    properties:
    {
        disabled:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            observer: "disabledChanged_"
        },
        ironIcon:
        {
            type: String,
            observer: "onIronIconChanged_",
            reflectToAttribute: true
        },
        rippleShowing_:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        }
    },
    hostAttributes:
    {
        "aria-disabled": "false",
        role: "button",
        tabindex: 0
    },
    listeners:
    {
        blur: "hideRipple_",
        click: "onClick_",
        down: "showRipple_",
        focus: "showRipple_",
        keydown: "onKeyDown_",
        keyup: "onKeyUp_",
        pointerdown: "ensureRipple",
        up: "hideRipple_"
    },
    hideRipple_()
    {
        if (this.hasRipple())
        {
            this.getRipple().clear();
            this.rippleShowing_ = false
        }
    },
    showRipple_()
    {
        if (!this.noink && !this.disabled)
        {
            this.getRipple().showAndHoldDown();
            this.rippleShowing_ = true
        }
    },
    disabledChanged_(newValue, oldValue)
    {
        if (!newValue && oldValue === undefined)
        {
            return
        }
        if (this.disabled)
        {
            this.blur()
        }
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
        this.setAttribute("tabindex", this.disabled ? "-1" : "0")
    },
    onClick_(e)
    {
        if (this.disabled)
        {
            e.stopImmediatePropagation()
        }
    },
    onIronIconChanged_()
    {
        this.shadowRoot.querySelectorAll("iron-icon").forEach(el => el.remove());
        if (!this.ironIcon)
        {
            return
        }
        const icons = (this.ironIcon || "").split(",");
        icons.forEach(icon =>
        {
            const element = document.createElement("iron-icon");
            element.icon = icon;
            this.$.icon.appendChild(element)
        });
        if (!this.hasRipple())
        {
            return
        }
        if (icons.length > 1)
        {
            this.getRipple().classList.remove("circle")
        }
        else
        {
            this.getRipple().classList.add("circle")
        }
    },
    onKeyDown_(e)
    {
        if (e.key !== " " && e.key !== "Enter")
        {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        if (e.repeat)
        {
            return
        }
        if (e.key === "Enter")
        {
            this.click()
        }
    },
    onKeyUp_(e)
    {
        if (e.key === " " || e.key === "Enter")
        {
            e.preventDefault();
            e.stopPropagation()
        }
        if (e.key === " ")
        {
            this.click()
        }
    },
    _createRipple()
    {
        this._rippleContainer = this.$.icon;
        const ripple = PaperRippleBehavior._createRipple();
        ripple.id = "ink";
        ripple.setAttribute("recenters", "");
        if (!(this.ironIcon || "").includes(","))
        {
            ripple.classList.add("circle")
        }
        return ripple
    }
});
const template$4 = document.createElement("template");
template$4.innerHTML = `<dom-module id="cr-icons" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-icons">.icon-arrow-back {\n  --cr-icon-image: url(../images/icon_arrow_back.svg);\n}\n\n.icon-arrow-dropdown {\n  --cr-icon-image: url(../images/icon_arrow_dropdown.svg);\n}\n\n.icon-cancel {\n  --cr-icon-image: url(../images/icon_cancel.svg);\n}\n\n.icon-clear {\n  --cr-icon-image: url(../images/icon_clear.svg);\n}\n\n.icon-copy-content {\n  --cr-icon-image: url(../images/icon_copy_content.svg);\n}\n\n.icon-delete-gray {\n  --cr-icon-image: url(../images/icon_delete_gray.svg);\n}\n\n.icon-picture-delete {\n  --cr-icon-image: url(../images/icon_picture_delete.svg);\n}\n\n.icon-expand-less {\n  --cr-icon-image: url(../images/icon_expand_less.svg);\n}\n\n.icon-expand-more {\n  --cr-icon-image: url(../images/icon_expand_more.svg);\n}\n\n.icon-external {\n  --cr-icon-image: url(../images/open_in_new.svg);\n}\n\n.icon-more-vert {\n  --cr-icon-image: url(../images/icon_more_vert.svg);\n}\n\n.icon-refresh {\n  --cr-icon-image: url(../images/icon_refresh.svg);\n}\n\n.icon-search {\n  --cr-icon-image: url(../images/icon_search.svg);\n}\n\n.icon-settings {\n  --cr-icon-image: url(../images/icon_settings.svg);\n}\n\n.icon-visibility {\n  --cr-icon-image: url(../images/icon_visibility.svg);\n}\n\n.icon-visibility-off {\n  --cr-icon-image: url(../images/icon_visibility_off.svg);\n}\n\n.subpage-arrow {\n  --cr-icon-image: url(../images/arrow_right.svg);\n}\n\n.cr-icon {\n  margin-inline-end: var(--cr-paper-icon-button-margin_-_margin-inline-end); margin-inline-start: var(--cr-paper-icon-button-margin_-_margin-inline-start);\n        -webkit-mask-image: var(--cr-icon-image);\n        -webkit-mask-position: center;\n        -webkit-mask-repeat: no-repeat;\n        -webkit-mask-size: var(--cr-icon-size);\n        background-color: var(--google-grey-refresh-700);\n        flex-shrink: 0;\n        height: var(--cr-icon-ripple-size);\n        user-select: none;\n        width: var(--cr-icon-ripple-size);\n}\n\n:host-context([dir=rtl]) .cr-icon {\n  transform: scaleX(-1);\n}\n\n.cr-icon.no-overlap {\n  margin-inline-end: 0;\n        margin-inline-start: 0;\n}\n\n@media (prefers-color-scheme: dark) {\n.cr-icon {\n  background-color: var(--google-grey-refresh-500);\n}\n\n}\n\n</style>\n  </template>\n</dom-module>\n`;
document.body.appendChild(template$4.content.cloneNode(true));
const template$5 = html `<iron-iconset-svg name="cr20" size="20">
  <svg>
    <defs>
      <!--
      Keep these in sorted order by id="". See also http://goo.gl/Y1OdAq
      -->
      <g id="domain">
        <path d="M2,3 L2,17 L11.8267655,17 L13.7904799,17 L18,17 L18,7 L12,7 L12,3 L2,3 Z M8,13 L10,13 L10,15 L8,15 L8,13 Z M4,13 L6,13 L6,15 L4,15 L4,13 Z M8,9 L10,9 L10,11 L8,11 L8,9 Z M4,9 L6,9 L6,11 L4,11 L4,9 Z M12,9 L16,9 L16,15 L12,15 L12,9 Z M12,11 L14,11 L14,13 L12,13 L12,11 Z M8,5 L10,5 L10,7 L8,7 L8,5 Z M4,5 L6,5 L6,7 L4,7 L4,5 Z"></path>
      </g>
      <g id="kite">
        <path d="M 10.32 2 L 4.63 8 l 4.92 7.5 l -0.4 0.6 c -0.04 0.07 -0.09 0.12 -0.14 0.18 c -0.24 0.25 -0.56 0.39 -0.9 0.39 c -0.34 0 -0.65 -0.13 -0.9 -0.39 a 1.35 1.35 0 0 1 -0.37 -0.94 a 2.72 2.72 0 0 0 -0.74 -1.88 a 2.44 2.44 0 0 0 -1.78 -0.78 H 4 v 1.38 h 0.33 c 0.34 0 0.65 0.14 0.9 0.39 c 0.24 0.26 0.37 0.59 0.37 0.95 c 0 0.71 0.26 1.38 0.74 1.88 c 0.48 0.5 1.11 0.78 1.78 0.78 c 0.67 0 1.31 -0.28 1.78 -0.78 c 0.11 -0.11 0.2 -0.23 0.28 -0.35 l 1.27 -1.94 L 16 8 L 10.32 2 z"></path>
      </g>
      <g id="menu">
        <path d="M2 4h16v2H2zM2 9h16v2H2zM2 14h16v2H2z"></path>
      </g>
  </defs></svg>
</iron-iconset-svg>
<iron-iconset-svg name="cr" size="24">
  <svg>
    <defs>
      <!--
      These icons are copied from Polymer's iron-icons and kept in sorted order.
      See http://goo.gl/Y1OdAq for instructions on adding additional icons.
      -->
      <g id="account-child-invert" viewBox="0 0 48 48"><path d="M24 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"></path><path fill="none" d="M0 0h48v48H0V0z"></path><circle fill="none" cx="24" cy="26" r="4"></circle><path d="M24 18c-6.16 0-13 3.12-13 7.23v11.54c0 2.32 2.19 4.33 5.2 5.63 2.32 1 5.12 1.59 7.8 1.59.66 0 1.33-.06 2-.14v-5.2c-.67.08-1.34.14-2 .14-2.63 0-5.39-.57-7.68-1.55.67-2.12 4.34-3.65 7.68-3.65.86 0 1.75.11 2.6.29 2.79.62 5.2 2.15 5.2 4.04v4.47c3.01-1.31 5.2-3.31 5.2-5.63V25.23C37 21.12 30.16 18 24 18zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path></g>
      <g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
      <g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
      <g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
      <g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
      <g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
      <g id="arrow-right"><path d="M10 7l5 5-5 5z"></path></g>

      <g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
      <g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
      <g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
      <g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
      <g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
      <g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
      <g id="computer"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"></path></g>
      <g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
      <g id="domain"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></g>
      <g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
      <g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
      <g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
      <g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
      <g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
      <g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>

      <g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
      <g id="group"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></g>
      <g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
      <g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
      <g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
      <g id="insert-drive-file"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></g>
      <g id="location-on"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
      <g id="mic"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
      <g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
      <g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
      <g id="person"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g>
      <g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
      <g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
      <g id="security"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path></g>

      <!-- The <g> IDs are exposed as global variables in Vulcanized mode, which
        conflicts with the "settings" namespace of MD Settings. Using an "_icon"
        suffix prevents the naming conflict. -->
      <g id="settings_icon"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
      <g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
      <g id="supervisor-account" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"></path><path d="M33 24c2.76 0 4.98-2.24 4.98-5s-2.22-5-4.98-5c-2.76 0-5 2.24-5 5s2.24 5 5 5zm-15-2c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm15 6c-3.67 0-11 1.84-11 5.5V38h22v-4.5c0-3.66-7.33-5.5-11-5.5zm-15-2c-4.67 0-14 2.34-14 7v5h14v-4.5c0-1.7.67-4.67 4.74-6.94C21 26.19 19.31 26 18 26z"></path></g>
      <g id="sync"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"></path></g>
      <g id="videocam"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></g>
      <g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
    </defs>
  </svg>
</iron-iconset-svg>
`;
document.head.appendChild(template$5.content); // Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class ActionLink extends HTMLAnchorElement {
    connectedCallback()
    {
        this.tabIndex = this.disabled ? -1 : 0;
        if (!this.hasAttribute("role"))
        {
            this.setAttribute("role", "link")
        }
        this.addEventListener("keydown", function(e)
        {
            if (!this.disabled && e.key === "Enter" && !this.href)
            {
                window.setTimeout(this.click.bind(this), 0)
            }
        });

        function preventDefault(e)
        {
            e.preventDefault()
        }

        function removePreventDefault()
        {
            document.removeEventListener("selectstart", preventDefault);
            document.removeEventListener("mouseup", removePreventDefault)
        }
        this.addEventListener("mousedown", function()
        {
            document.addEventListener("selectstart", preventDefault);
            document.addEventListener("mouseup", removePreventDefault);
            if (document.activeElement !== this)
            {
                this.classList.add("no-outline")
            }
        });
        this.addEventListener("blur", function()
        {
            this.classList.remove("no-outline")
        })
    }
    set disabled(disabled)
    {
        if (disabled)
        {
            HTMLAnchorElement.prototype.setAttribute.call(this, "disabled", "")
        }
        else
        {
            HTMLAnchorElement.prototype.removeAttribute.call(this, "disabled")
        }
        this.tabIndex = disabled ? -1 : 0
    }
    get disabled()
    {
        return this.hasAttribute("disabled")
    }
    setAttribute(attr, val)
    {
        if (attr.toLowerCase() === "disabled")
        {
            this.disabled = true
        }
        else
        {
            HTMLAnchorElement.prototype.setAttribute.apply(this, arguments)
        }
    }
    removeAttribute(attr)
    {
        if (attr.toLowerCase() === "disabled")
        {
            this.disabled = false
        }
        else
        {
            HTMLAnchorElement.prototype.removeAttribute.apply(this, arguments)
        }
    }
}
customElements.define("action-link", ActionLink,
{
    extends: "a"
});
const template$6 = document.createElement("template");
template$6.innerHTML = `<dom-module id="action-link" assetpath="chrome://resources/" css-build="shadow">\n  <template css-build="shadow">\n    <style scope="action-link">[is='action-link'] {\n  cursor: pointer;\n        display: inline-block;\n        text-decoration: none;\n}\n\n[is='action-link'], [is='action-link']:active, [is='action-link']:hover, [is='action-link']:visited {\n  color: var(--cr-link-color);\n}\n\n[is='action-link'][disabled] {\n  color: var(--paper-grey-600);  \n        cursor: default;\n        opacity: 0.65;\n        pointer-events: none;\n}\n\n[is='action-link'].no-outline {\n  outline: none;\n}\n\n</style>\n  </template>\n</dom-module>\n`;
document.body.appendChild(template$6.content.cloneNode(true));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const IronRangeBehavior = {
    properties:
    {
        value:
        {
            type: Number,
            value: 0,
            notify: true,
            reflectToAttribute: true
        },
        min:
        {
            type: Number,
            value: 0,
            notify: true
        },
        max:
        {
            type: Number,
            value: 100,
            notify: true
        },
        step:
        {
            type: Number,
            value: 1,
            notify: true
        },
        ratio:
        {
            type: Number,
            value: 0,
            readOnly: true,
            notify: true
        }
    },
    observers: ["_update(value, min, max, step)"],
    _calcRatio: function(value)
    {
        return (this._clampValue(value) - this.min) / (this.max - this.min)
    },
    _clampValue: function(value)
    {
        return Math.min(this.max, Math.max(this.min, this._calcStep(value)))
    },
    _calcStep: function(value)
    {
        value = parseFloat(value);
        if (!this.step)
        {
            return value
        }
        var numSteps = Math.round((value - this.min) / this.step);
        if (this.step < 1)
        {
            return numSteps / (1 / this.step) + this.min
        }
        else
        {
            return numSteps * this.step + this.min
        }
    },
    _validateValue: function()
    {
        var v = this._clampValue(this.value);
        this.value = this.oldValue = isNaN(v) ? this.oldValue : v;
        return this.value !== v
    },
    _update: function()
    {
        this._validateValue();
        this._setRatio(this._calcRatio(this.value) * 100)
    }
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Polymer({
    _template: html `<!--css-build:shadow--><style scope="paper-progress">:host {
  display: block;
        width: 200px;
        position: relative;
        overflow: hidden;
}

:host([hidden]), [hidden] {
  display: none !important;
}

#progressContainer {
  ;
        position: relative;
}

#progressContainer, .indeterminate::after {
  height: var(--paper-progress-height, 4px);
}

#primaryProgress, #secondaryProgress, .indeterminate::after {
  position: var(--layout-fit_-_position); top: var(--layout-fit_-_top); right: var(--layout-fit_-_right); bottom: var(--layout-fit_-_bottom); left: var(--layout-fit_-_left);
}

#progressContainer, .indeterminate::after {
  background: var(--paper-progress-container-color, var(--google-grey-300));
}

:host(.transiting) #primaryProgress, :host(.transiting) #secondaryProgress {
  transition-property: transform;

        
        transition-duration: var(--paper-progress-transition-duration, 0.08s);

        
        transition-timing-function: var(--paper-progress-transition-timing-function, ease);

        
        transition-delay: var(--paper-progress-transition-delay, 0s);
}

#primaryProgress, #secondaryProgress {
  position: var(--layout-fit_-_position); top: var(--layout-fit_-_top); right: var(--layout-fit_-_right); bottom: var(--layout-fit_-_bottom); left: var(--layout-fit_-_left);
        transform-origin: left center;
        transform: scaleX(0);
        will-change: transform;
}

#primaryProgress {
  background: var(--paper-progress-active-color, var(--google-green-500));
}

#secondaryProgress {
  background: var(--paper-progress-secondary-color, var(--google-green-100));
}

:host([disabled]) #primaryProgress {
  background: var(--paper-progress-disabled-active-color, var(--google-grey-500));
}

:host([disabled]) #secondaryProgress {
  background: var(--paper-progress-disabled-secondary-color, var(--google-grey-300));
}

:host(:not([disabled])) #primaryProgress.indeterminate {
  transform-origin: right center;
        animation: indeterminate-bar var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
}

:host(:not([disabled])) #primaryProgress.indeterminate::after {
  content: "";
        transform-origin: center center;

        animation: indeterminate-splitter var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
}

@keyframes indeterminate-bar {
0% {
  transform: scaleX(1) translateX(-100%);
}

50% {
  transform: scaleX(1) translateX(0%);
}

75% {
  transform: scaleX(1) translateX(0%);
          animation-timing-function: cubic-bezier(.28,.62,.37,.91);
}

100% {
  transform: scaleX(0) translateX(0%);
}

}

@keyframes indeterminate-splitter {
0% {
  transform: scaleX(.75) translateX(-125%);
}

30% {
  transform: scaleX(.75) translateX(-125%);
          animation-timing-function: cubic-bezier(.42,0,.6,.8);
}

90% {
  transform: scaleX(.75) translateX(125%);
}

100% {
  transform: scaleX(.75) translateX(125%);
}

}

</style>

    <div id="progressContainer">
      <div id="secondaryProgress" hidden$="[[_hideSecondaryProgress(secondaryRatio)]]"></div>
      <div id="primaryProgress"></div>
    </div>
`,
    is: "paper-progress",
    behaviors: [IronRangeBehavior],
    properties:
    {
        secondaryProgress:
        {
            type: Number,
            value: 0
        },
        secondaryRatio:
        {
            type: Number,
            value: 0,
            readOnly: true
        },
        indeterminate:
        {
            type: Boolean,
            value: false,
            observer: "_toggleIndeterminate"
        },
        disabled:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            observer: "_disabledChanged"
        }
    },
    observers: ["_progressChanged(secondaryProgress, value, min, max, indeterminate)"],
    hostAttributes:
    {
        role: "progressbar"
    },
    _toggleIndeterminate: function(indeterminate)
    {
        this.toggleClass("indeterminate", indeterminate, this.$.primaryProgress)
    },
    _transformProgress: function(progress, ratio)
    {
        var transform = "scaleX(" + ratio / 100 + ")";
        progress.style.transform = progress.style.webkitTransform = transform
    },
    _mainRatioChanged: function(ratio)
    {
        this._transformProgress(this.$.primaryProgress, ratio)
    },
    _progressChanged: function(secondaryProgress, value, min, max, indeterminate)
    {
        secondaryProgress = this._clampValue(secondaryProgress);
        value = this._clampValue(value);
        var secondaryRatio = this._calcRatio(secondaryProgress) * 100;
        var mainRatio = this._calcRatio(value) * 100;
        this._setSecondaryRatio(secondaryRatio);
        this._transformProgress(this.$.secondaryProgress, secondaryRatio);
        this._transformProgress(this.$.primaryProgress, mainRatio);
        this.secondaryProgress = secondaryProgress;
        if (indeterminate)
        {
            this.removeAttribute("aria-valuenow")
        }
        else
        {
            this.setAttribute("aria-valuenow", value)
        }
        this.setAttribute("aria-valuemin", min);
        this.setAttribute("aria-valuemax", max)
    },
    _disabledChanged: function(disabled)
    {
        this.setAttribute("aria-disabled", disabled ? "true" : "false")
    },
    _hideSecondaryProgress: function(secondaryRatio)
    {
        return secondaryRatio === 0
    }
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var IronA11yAnnouncer = Polymer({
    _template: html `<!--css-build:shadow--><style scope="iron-a11y-announcer">:host {
  display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
}

</style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,
    is: "iron-a11y-announcer",
    properties:
    {
        mode:
        {
            type: String,
            value: "polite"
        },
        _text:
        {
            type: String,
            value: ""
        }
    },
    created: function() {
        if (!IronA11yAnnouncer.instance) {
            IronA11yAnnouncer.instance = this
        }
        document.body.addEventListener("iron-announce", this._onIronAnnounce.bind(this))
    },
    announce: function(text) {
        this._text = "";
        this.async(function()
        {
            this._text = text
        }, 100)
    },
    _onIronAnnounce: function(event) {
        if (event.detail && event.detail.text) {
            this.announce(event.detail.text)
        }
    }
});
IronA11yAnnouncer.instance = null;
IronA11yAnnouncer.requestAvailability = function() {
    if (!IronA11yAnnouncer.instance)
    {
        IronA11yAnnouncer.instance = document.createElement("iron-a11y-announcer")
    }
    document.body.appendChild(IronA11yAnnouncer.instance)
}; // Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function assert(condition, opt_message) {
    if (!condition)
    {
        let message = "Assertion failed";
        if (opt_message)
        {
            message = message + ": " + opt_message
        }
        const error = new Error(message);
        const global = function()
        {
            const thisOrSelf = this || self;
            thisOrSelf.traceAssertionsForTesting;
            return thisOrSelf
        }();
        if (global.traceAssertionsForTesting)
        {
            console.warn(error.stack)
        }
        throw error
    }
    return condition
}

function assertNotReached(opt_message) {
    assert(false, opt_message || "Unreachable code hit")
}

function assertInstanceof(value, type, opt_message) {
    if (!(value instanceof type))
    {
        assertNotReached(opt_message || "Value " + value + " is not a[n] " + (type.name || typeof type))
    }
    return value
} // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var EventTracker = class {
    constructor()
    {
        this.listeners_ = []
    }
    add(target, eventType, listener, opt_capture)
    {
        const capture = !!opt_capture;
        const h = {
            target: target,
            eventType: eventType,
            listener: listener,
            capture: capture
        };
        this.listeners_.push(h);
        target.addEventListener(eventType, listener, capture)
    }
    remove(target, eventType)
    {
        this.listeners_ = this.listeners_.filter(listener =>
        {
            if (listener.target === target && (!eventType || listener.eventType === eventType))
            {
                EventTracker.removeEventListener(listener);
                return false
            }
            return true
        })
    }
    removeAll()
    {
        this.listeners_.forEach(listener => EventTracker.removeEventListener(listener));
        this.listeners_ = []
    }
    static removeEventListener(entry)
    {
        entry.target.removeEventListener(entry.eventType, entry.listener, entry.capture)
    }
}; // Copyright 2017 The Chromium Authors. All rights reserved.
Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-toast">:host {
  --cr-toast-background: #323232;
        --cr-toast-button-color: var(--google-blue-300);
        --cr-toast-text-color: #fff;
}

@media (prefers-color-scheme: dark) {
:host {
  --cr-toast-background: var(--google-grey-900)
              linear-gradient(rgba(255, 255, 255, .06), rgba(255, 255, 255, .06));
          --cr-toast-button-color: var(--google-blue-refresh-300);
          --cr-toast-text-color: var(--google-grey-200);
}

}

:host {
  align-items: center;
        background: var(--cr-toast-background);
        border-radius: 4px;
        bottom: 0;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.28);
        box-sizing: border-box;
        display: flex;
        margin: 24px;
        max-width: 568px;
        min-height: 52px;
        min-width: 288px;
        opacity: 0;
        padding: 0 24px;
        position: fixed;
        transform: translateY(100px);
        transition: opacity 300ms, transform 300ms, visibility 300ms;
        visibility: hidden;
        z-index: 1;
}

:host([open]) {
  opacity: 1;
        transform: translateY(0);
        visibility: visible;
}

:host ::slotted(*) {
  color: var(--cr-toast-text-color);
}

:host ::slotted(cr-button) {
  background-color: transparent !important;
        border: none !important;
        color: var(--cr-toast-button-color) !important;
        margin-inline-start: 32px !important;
        min-width: 52px !important;
        padding: 8px !important;
}

:host ::slotted(cr-button:hover) {
  background-color: transparent !important;
}

</style>
    <slot></slot>
<!--_html_template_end_-->`,
    is: "cr-toast",
    properties:
    {
        duration:
        {
            type: Number,
            value: 0
        },
        open:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        }
    },
    hostAttributes:
    {
        role: "alert"
    },
    observers: ["resetAutoHide_(duration, open)"],
    hideTimeoutId_: null,
    resetAutoHide_()
    {
        if (this.hideTimeoutId_ !== null)
        {
            window.clearTimeout(this.hideTimeoutId_);
            this.hideTimeoutId_ = null
        }
        if (this.open && this.duration !== 0)
        {
            this.hideTimeoutId_ = window.setTimeout(() =>
            {
                this.open = false
            }, this.duration)
        }
    },
    show(duration)
    {
        let shouldResetAutoHide = true;
        if (typeof duration !== "undefined" && duration >= 0 && this.duration !== duration)
        {
            this.duration = duration;
            shouldResetAutoHide = false
        }
        if (!this.open)
        {
            this.open = true;
            shouldResetAutoHide = false
        }
        if (shouldResetAutoHide)
        {
            this.resetAutoHide_()
        }
    },
    hide()
    {
        this.open = false
    }
}); // Copyright 2019 The Chromium Authors. All rights reserved.
let toastManagerInstance = null;

function getToastManager() {
    return assert(toastManagerInstance)
}

function setInstance(instance) {
    assert(!instance || !toastManagerInstance);
    toastManagerInstance = instance
}
let CrToastManagerElement = Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-toast-manager">#content {
  display: flex;
        flex: 1;
}

.collapsible {
  overflow: hidden;
        text-overflow: ellipsis;
}

span {
  white-space: pre;
}

.elided-text {
  overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
}

</style>
    <cr-toast id="toast" duration="[[duration]]">
      <div id="content" class="elided-text"></div>
      <slot></slot>
    </cr-toast>
<!--_html_template_end_-->`,
    is: "cr-toast-manager",
    properties:
    {
        duration:
        {
            type: Number,
            value: 0
        }
    },
    get isToastOpen()
    {
        return this.$.toast.open
    },
    attached()
    {
        setInstance(this)
    },
    detached()
    {
        setInstance(null)
    },
    show(label)
    {
        this.$.content.textContent = label;
        this.showInternal_()
    },
    showForStringPieces(pieces)
    {
        const content = this.$.content;
        content.textContent = "";
        pieces.forEach(function(p)
        {
            if (p.value.length === 0)
            {
                return
            }
            const span = document.createElement("span");
            span.textContent = p.value;
            if (p.collapsible)
            {
                span.classList.add("collapsible")
            }
            content.appendChild(span)
        });
        this.showInternal_()
    },
    showInternal_()
    {
        IronA11yAnnouncer.requestAvailability();
        this.fire("iron-announce",
        {
            text: this.$.content.textContent
        });
        this.$.toast.show()
    },
    hide()
    {
        this.$.toast.hide()
    }
}); // Copyright 2017 The Chromium Authors. All rights reserved.
let hideInk = false;
assert(!isIOS, "pointerdown doesn't work on iOS");
document.addEventListener("pointerdown", function() {
    hideInk = true
}, true);
document.addEventListener("keydown", function() {
    hideInk = false
}, true);
const focusWithoutInk = function(toFocus) {
    if (!("noink" in toFocus) || !hideInk)
    {
        toFocus.focus();
        return
    }
    assert(document === toFocus.ownerDocument);
    const
    {
        noink: noink
    } = toFocus;
    toFocus.noink = true;
    toFocus.focus();
    toFocus.noink = noink
}; // Copyright (c) 2012 The Chromium Authors. All rights reserved.
function getDeepActiveElement() {
    let a = document.activeElement;
    while (a && a.shadowRoot && a.shadowRoot.activeElement)
    {
        a = a.shadowRoot.activeElement
    }
    return a
}

function isRTL() {
    return document.documentElement.dir === "rtl"
}

function HTMLEscape(original) {
    return original.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
} //   /* is_ios */
function hasKeyModifiers(e) {
    return !!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
}

function isTextInputElement(el) {
    return el.tagName === "INPUT" || el.tagName === "TEXTAREA"
} // Copyright 2014 The Chromium Authors. All rights reserved.
class FocusRow {
    constructor(root, boundary, delegate)
    {
        this.root = root;
        this.boundary_ = boundary || document.documentElement;
        this.delegate = delegate;
        this.eventTracker = new EventTracker
    }
    static isFocusable(element)
    {
        if (!element || element.disabled)
        {
            return false
        }
        let current = element;
        while (true)
        {
            assertInstanceof(current, Element);
            const style = window.getComputedStyle(current);
            if (style.visibility === "hidden" || style.display === "none")
            {
                return false
            }
            const parent = current.parentNode;
            if (!parent)
            {
                return false
            }
            if (parent === current.ownerDocument || parent instanceof DocumentFragment)
            {
                return true
            }
            current = parent
        }
    }
    static getFocusableElement(element)
    {
        if (element.getFocusableElement)
        {
            return element.getFocusableElement()
        }
        return element
    }
    addItem(type, selectorOrElement)
    {
        assert(type);
        let element;
        if (typeof selectorOrElement === "string")
        {
            element = this.root.querySelector(selectorOrElement)
        }
        else
        {
            element = selectorOrElement
        }
        if (!element)
        {
            return false
        }
        element.setAttribute("focus-type", type);
        element.tabIndex = this.isActive() ? 0 : -1;
        this.eventTracker.add(element, "blur", this.onBlur_.bind(this));
        this.eventTracker.add(element, "focus", this.onFocus_.bind(this));
        this.eventTracker.add(element, "keydown", this.onKeydown_.bind(this));
        this.eventTracker.add(element, "mousedown", this.onMousedown_.bind(this));
        return true
    }
    destroy()
    {
        this.eventTracker.removeAll()
    }
    getCustomEquivalent(sampleElement)
    {
        return assert(this.getFirstFocusable())
    }
    getElements()
    {
        return Array.from(this.root.querySelectorAll("[focus-type]")).map(FocusRow.getFocusableElement)
    }
    getEquivalentElement(sampleElement)
    {
        if (this.getFocusableElements().indexOf(sampleElement) >= 0)
        {
            return sampleElement
        }
        const sampleFocusType = this.getTypeForElement(sampleElement);
        if (sampleFocusType)
        {
            const sameType = this.getFirstFocusable(sampleFocusType);
            if (sameType)
            {
                return sameType
            }
        }
        return this.getCustomEquivalent(sampleElement)
    }
    getFirstFocusable(opt_type)
    {
        const element = this.getFocusableElements().find(el => !opt_type || el.getAttribute("focus-type") === opt_type);
        return element || null
    }
    getFocusableElements()
    {
        return this.getElements().filter(FocusRow.isFocusable)
    }
    getTypeForElement(element)
    {
        return element.getAttribute("focus-type") || ""
    }
    isActive()
    {
        return this.root.classList.contains(FocusRow.ACTIVE_CLASS)
    }
    makeActive(active)
    {
        if (active === this.isActive())
        {
            return
        }
        this.getElements().forEach(function(element)
        {
            element.tabIndex = active ? 0 : -1
        });
        this.root.classList.toggle(FocusRow.ACTIVE_CLASS, active)
    }
    onBlur_(e)
    {
        if (!this.boundary_.contains(e.relatedTarget))
        {
            return
        }
        const currentTarget = e.currentTarget;
        if (this.getFocusableElements().indexOf(currentTarget) >= 0)
        {
            this.makeActive(false)
        }
    }
    onFocus_(e)
    {
        if (this.delegate)
        {
            this.delegate.onFocus(this, e)
        }
    }
    onMousedown_(e)
    {
        if (e.button)
        {
            return
        }
        if (!e.currentTarget.disabled)
        {
            e.currentTarget.tabIndex = 0
        }
    }
    onKeydown_(e)
    {
        const elements = this.getFocusableElements();
        const currentElement = FocusRow.getFocusableElement(e.currentTarget);
        const elementIndex = elements.indexOf(currentElement);
        assert(elementIndex >= 0);
        if (this.delegate && this.delegate.onKeydown(this, e))
        {
            return
        }
        const isShiftTab = !e.altKey && !e.ctrlKey && !e.metaKey && e.shiftKey && e.key === "Tab";
        if (hasKeyModifiers(e) && !isShiftTab)
        {
            return
        }
        let index = -1;
        let shouldStopPropagation = true;
        if (isShiftTab)
        {
            index = elementIndex - 1;
            if (index < 0)
            {
                return
            }
        }
        else if (e.key === "ArrowLeft")
        {
            index = elementIndex + (isRTL() ? 1 : -1)
        }
        else if (e.key === "ArrowRight")
        {
            index = elementIndex + (isRTL() ? -1 : 1)
        }
        else if (e.key === "Home")
        {
            index = 0
        }
        else if (e.key === "End")
        {
            index = elements.length - 1
        }
        else
        {
            shouldStopPropagation = false
        }
        const elementToFocus = elements[index];
        if (elementToFocus)
        {
            this.getEquivalentElement(elementToFocus).focus();
            e.preventDefault()
        }
        if (shouldStopPropagation)
        {
            e.stopPropagation()
        }
    }
}
FocusRow.ACTIVE_CLASS = "focus-row-active"; // Copyright 2017 The Chromium Authors. All rights reserved.
class FocusRowBehaviorDelegate {
    constructor(listItem)
    {
        this.listItem_ = listItem
    }
    onFocus(row, e)
    {
        const element = e.path[0];
        const focusableElement = FocusRow.getFocusableElement(element);
        if (element !== focusableElement)
        {
            focusableElement.focus()
        }
        this.listItem_.lastFocused = focusableElement
    }
    onKeydown(row, e)
    {
        if (e.key === "Enter")
        {
            e.stopPropagation()
        }
        return false
    }
    getCustomEquivalent(sampleElement)
    {
        return this.listItem_.overrideCustomEquivalent ? this.listItem_.getCustomEquivalent(sampleElement) : null
    }
}
class VirtualFocusRow extends FocusRow {
    constructor(root, delegate)
    {
        super(root, null, delegate)
    }
    getCustomEquivalent(sampleElement)
    {
        return this.delegate.getCustomEquivalent(sampleElement) || super.getCustomEquivalent(sampleElement)
    }
}
const FocusRowBehavior = {
    properties:
    {
        row_: Object,
        mouseFocused_: Boolean,
        id:
        {
            type: String,
            reflectToAttribute: true
        },
        focusRowIndex:
        {
            type: Number,
            observer: "focusRowIndexChanged"
        },
        lastFocused:
        {
            type: Object,
            notify: true
        },
        ironListTabIndex:
        {
            type: Number,
            observer: "ironListTabIndexChanged_"
        },
        listBlurred:
        {
            type: Boolean,
            notify: true
        }
    },
    computeId_(index)
    {
        return index !== undefined ? `frb${index}` : undefined
    },
    focusRowIndexChanged(newIndex, oldIndex)
    {
        this.setAttribute("aria-rowindex", newIndex + 1);
        if (this.id === this.computeId_(oldIndex))
        {
            this.id = this.computeId_(newIndex)
        }
    },
    firstControl_: null,
    controlObservers_: [],
    attached()
    {
        this.classList.add("no-outline");
        afterNextRender(this, function()
        {
            const rowContainer = this.root.querySelector("[focus-row-container]");
            assert(rowContainer);
            this.row_ = new VirtualFocusRow(rowContainer, new FocusRowBehaviorDelegate(this));
            this.addItems_();
            this.listen(this, "focus", "onFocus_");
            this.listen(this, "dom-change", "addItems_");
            this.listen(this, "mousedown", "onMouseDown_");
            this.listen(this, "blur", "onBlur_")
        })
    },
    detached()
    {
        this.unlisten(this, "focus", "onFocus_");
        this.unlisten(this, "dom-change", "addItems_");
        this.unlisten(this, "mousedown", "onMouseDown_");
        this.unlisten(this, "blur", "onBlur_");
        this.removeObservers_();
        if (this.firstControl_)
        {
            this.unlisten(this.firstControl_, "keydown", "onFirstControlKeydown_")
        }
        if (this.row_)
        {
            this.row_.destroy()
        }
    },
    getFocusRow()
    {
        return assert(this.row_)
    },
    updateFirstControl_()
    {
        const newFirstControl = this.row_.getFirstFocusable();
        if (newFirstControl === this.firstControl_)
        {
            return
        }
        if (this.firstControl_)
        {
            this.unlisten(this.firstControl_, "keydown", "onFirstControlKeydown_")
        }
        this.firstControl_ = newFirstControl;
        if (this.firstControl_)
        {
            this.listen(this.firstControl_, "keydown", "onFirstControlKeydown_")
        }
    },
    removeObservers_()
    {
        if (this.controlObservers_.length > 0)
        {
            this.controlObservers_.forEach(observer =>
            {
                observer.disconnect()
            })
        }
        this.controlObservers_ = []
    },
    addItems_()
    {
        this.ironListTabIndexChanged_();
        if (this.row_)
        {
            this.removeObservers_();
            this.row_.destroy();
            const controls = this.root.querySelectorAll("[focus-row-control]");
            controls.forEach(control =>
            {
                this.row_.addItem(control.getAttribute("focus-type"), FocusRow.getFocusableElement(control));
                this.addMutationObservers_(assert(control))
            });
            this.updateFirstControl_()
        }
    },
    createObserver_()
    {
        return new MutationObserver(mutations =>
        {
            const mutation = mutations[0];
            if (mutation.attributeName === "style" && mutation.oldValue)
            {
                const newStyle = window.getComputedStyle(mutation.target);
                const oldDisplayValue = mutation.oldValue.match(/^display:(.*)(?=;)/);
                const oldVisibilityValue = mutation.oldValue.match(/^visibility:(.*)(?=;)/);
                if (oldDisplayValue && newStyle.display === oldDisplayValue[1].trim() && oldVisibilityValue && newStyle.visibility === oldVisibilityValue[1].trim())
                {
                    return
                }
            }
            this.updateFirstControl_()
        })
    },
    addMutationObservers_(control)
    {
        let current = control;
        while (current && current !== this.root)
        {
            const currentObserver = this.createObserver_();
            currentObserver.observe(current,
            {
                attributes: true,
                attributeFilter: ["hidden", "disabled", "style"],
                attributeOldValue: true
            });
            this.controlObservers_.push(currentObserver);
            current = current.parentNode
        }
    },
    onFocus_(e)
    {
        if (this.mouseFocused_)
        {
            this.mouseFocused_ = false;
            return
        }
        const restoreFocusToFirst = this.listBlurred && e.composedPath()[0] === this;
        if (this.lastFocused && !restoreFocusToFirst)
        {
            focusWithoutInk(this.row_.getEquivalentElement(this.lastFocused))
        }
        else
        {
            const firstFocusable = assert(this.firstControl_);
            focusWithoutInk(firstFocusable)
        }
        this.listBlurred = false
    },
    onFirstControlKeydown_(e)
    {
        if (e.shiftKey && e.key === "Tab")
        {
            this.focus()
        }
    },
    ironListTabIndexChanged_()
    {
        if (this.row_)
        {
            this.row_.makeActive(this.ironListTabIndex === 0)
        }
        if (this.ironListTabIndex === 0)
        {
            this.listBlurred = false
        }
    },
    onMouseDown_()
    {
        this.mouseFocused_ = true
    },
    onBlur_(e)
    {
        this.mouseFocused_ = false;
        const node = e.relatedTarget ? e.relatedTarget : null;
        if (!this.parentNode.contains(node))
        {
            this.listBlurred = true
        }
    }
}; // Copyright 2017 The Chromium Authors. All rights reserved.
class BrowserProxy {
    constructor()
    {
        this.callbackRouter = new downloads.mojom.PageCallbackRouter;
        this.handler = new downloads.mojom.PageHandlerRemote;
        const factory = downloads.mojom.PageHandlerFactory.getRemote(true);
        factory.createPageHandler(this.callbackRouter.$.bindNewPipeAndPassRemote(), this.handler.$.bindNewPipeAndPassReceiver())
    }
}
addSingletonGetter(BrowserProxy); // Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const DangerType = {
    NOT_DANGEROUS: "NOT_DANGEROUS",
    DANGEROUS_FILE: "DANGEROUS_FILE",
    DANGEROUS_URL: "DANGEROUS_URL",
    DANGEROUS_CONTENT: "DANGEROUS_CONTENT",
    UNCOMMON_CONTENT: "UNCOMMON_CONTENT",
    DANGEROUS_HOST: "DANGEROUS_HOST",
    POTENTIALLY_UNWANTED: "POTENTIALLY_UNWANTED",
    DEEP_SCANNED_SAFE: "DEEP_SCANNED_SAFE",
    DEEP_SCANNED_OPENED_DANGEROUS: "DEEP_SCANNED_OPENED_DANGEROUS",
    SENSITIVE_CONTENT_WARNING: "SENSITIVE_CONTENT_WARNING",
    SENSITIVE_CONTENT_BLOCK: "SENSITIVE_CONTENT_BLOCK",
    BLOCKED_TOO_LARGE: "BLOCKED_TOO_LARGE",
    BLOCKED_PASSWORD_PROTECTED: "BLOCKED_PASSWORD_PROTECTED"
};
const States = {
    IN_PROGRESS: "IN_PROGRESS",
    CANCELLED: "CANCELLED",
    COMPLETE: "COMPLETE",
    PAUSED: "PAUSED",
    DANGEROUS: "DANGEROUS",
    INTERRUPTED: "INTERRUPTED",
    MIXED_CONTENT: "MIXED_CONTENT"
}; // Copyright 2016 The Chromium Authors. All rights reserved.
function getFileIconUrl(filePath) {
    const url = new URL("chrome://fileicon/");
    url.searchParams.set("path", filePath);
    url.searchParams.set("scale", window.devicePixelRatio + "x");
    return url.toString()
} // Copyright 2016 The Chromium Authors. All rights reserved.
var PromiseResolver = class {
    constructor()
    {
        this.resolve_;
        this.reject_;
        this.isFulfilled_ = false;
        this.promise_ = new Promise((resolve, reject) =>
        {
            this.resolve_ = (resolution =>
            {
                resolve(resolution);
                this.isFulfilled_ = true
            });
            this.reject_ = (reason =>
            {
                reject(reason);
                this.isFulfilled_ = true
            })
        })
    }
    get isFulfilled()
    {
        return this.isFulfilled_
    }
    set isFulfilled(i)
    {
        assertNotReached()
    }
    get promise()
    {
        return this.promise_
    }
    set promise(p)
    {
        assertNotReached()
    }
    get resolve()
    {
        return this.resolve_
    }
    set resolve(r)
    {
        assertNotReached()
    }
    get reject()
    {
        return this.reject_
    }
    set reject(s)
    {
        assertNotReached()
    }
}; // Copyright 2018 The Chromium Authors. All rights reserved.
class IconLoader {
    constructor()
    {
        this.iconResolvers_ = {};
        this.listeningImages_ = new Set
    }
    loadIcon(imageEl, filePath)
    {
        const url = getFileIconUrl(filePath);
        if (!this.iconResolvers_[url])
        {
            this.iconResolvers_[url] = new PromiseResolver
        }
        if (!this.listeningImages_.has(imageEl))
        {
            imageEl.addEventListener("load", this.finishedLoading_.bind(this));
            imageEl.addEventListener("error", this.finishedLoading_.bind(this));
            this.listeningImages_.add(imageEl)
        }
        imageEl.src = url;
        return assert(this.iconResolvers_[url]).promise
    }
    finishedLoading_(e)
    {
        const resolver = assert(this.iconResolvers_[e.currentTarget.src]);
        if (!resolver.isFulfilled)
        {
            resolver.resolve(e.type === "load")
        }
    }
}
addSingletonGetter(IconLoader); // Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({
    is: "downloads-item",
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style include="action-link cr-hidden-style cr-icons" scope="downloads-item">:host {
  --controlled-by-active-color: #333;
    --controlled-by-active-link-color: var(--google-blue-600);
    --controlled-by-inactive-color: #5a5a5a;
    display: flex;
    flex-direction: column;
    outline: none;
}

@media (prefers-color-scheme: dark) {
:host {
  --controlled-by-active-color: inherit;
      --controlled-by-active-link-color: var(--cr-link-color);
      --controlled-by-inactive-color: inherit;
}

}

cr-button {
  font-weight: 500;
    margin: 0;
    min-width: auto;
}

#date {
  font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: .25px;
    margin: 21px auto 6px;
    padding-bottom: 4px;
    padding-top: 8px;
    width: var(--downloads-card-width);
}

#date:empty {
  display: none;
}

#content {
  border-radius: var(--cr-card-border-radius);
    display: flex;
    flex: none;
    margin: 6px auto;
    min-height: 103px;
    position: relative;
    width: var(--downloads-card-width);
}

#content.is-active {
  box-shadow: var(--cr-card-elevation_-_box-shadow);
}

@media (prefers-color-scheme: light) {
#content.is-active {
  background-color: var(--cr-card-background-color);
}

}

#content:not(.is-active) {
  background: rgba(255, 255, 255, .6);
    border: 1px var(--google-grey-300) solid;
}

@media (prefers-color-scheme: dark) {
#content:not(.is-active) {
  background: none;  
      border-color: var(--google-grey-800);
}

}

#details {
  border-inline-start: 1px #d8d8d8 solid;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;  
    padding-bottom: 12px;
    padding-inline-end: 16px;
    padding-inline-start: var(--downloads-card-margin);
    padding-top: 16px;
}

@media (prefers-color-scheme: dark) {
#details {
  border-color: rgba(var(--google-grey-800-rgb), .8);
}

}

#content:not(.is-active) #details {
  color: rgba(27, 27, 27, .6);
}

@media (prefers-color-scheme: dark) {
#content:not(.is-active) #details {
  color: rgba(var(--google-grey-refresh-500-rgb), .6);
}

}

#content:not(.is-active) #name {
  text-decoration: line-through;
}

@media (prefers-color-scheme: dark) {
#content:not(.is-active) :-webkit-any(#name, #tag) {
  color: var(--google-grey-refresh-500);
}

}

.icon-wrapper {
  align-self: center;
    flex: none;
    justify-content: center;
    margin: 0 24px;
}

.icon, #file-icon-wrapper {
  height: 32px;
    width: 32px;
}

#file-icon-wrapper {
  overflow: hidden;
}

#content:-webkit-any(.show-progress, .dangerous) #file-icon-wrapper {
  align-self: flex-start;
    padding-top: 16px;
}

#content:not(.is-active) .icon {
  -webkit-filter: grayscale(100%);
    opacity: .5;
}

#file-icon-wrapper iron-icon[icon='cr:insert-drive-file'] {
  color: var(--paper-grey-400);
}

#file-icon-wrapper iron-icon[icon='cr:warning'], .dangerous #description {
  color: var(--google-red-700);
}

#file-icon-wrapper iron-icon[icon='cr:error'], .dangerous #description {
  color: var(--google-yellow-500);
}

@media (prefers-color-scheme: dark) {
#file-icon-wrapper iron-icon[icon='cr:warning'], .dangerous #description {
  color: var(--google-red-refresh-300);
}

}

#name, #file-link, #url {
  max-width: 100%;
}

div[role='gridcell'] {
  display: inline;
}

#name, #file-link {
  font-weight: 500;
    word-break: break-all;
}

@media (prefers-color-scheme: light) {
.is-active :-webkit-any(#name, #file-link, #show) {
  color: var(--google-blue-600);
}

}

#name {
  margin-inline-end: 12px;
}

#tag {
  color: #5a5a5a;
    font-weight: 500;
}

#url {
  color: inherit;
    display: block;
    margin-top: 6px;
    min-height: 0;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.is-active #url {
  color: var(--cr-secondary-text-color);
}

#progress, #description:not(:empty), .controls {
  margin-top: 16px;
}

@media (prefers-color-scheme: light) {
.is-active #description {
  color: #616161;
}

}

#progress {
  --paper-progress-active-color: var(--google-blue-600);
    --paper-progress-container-color: rgb(223, 222, 223);
    width: auto;
}

@media (prefers-color-scheme: dark) {
#progress {
  --paper-progress-active-color: var(--google-blue-refresh-300);
      --paper-progress-container-color: var(--google-grey-800);
}

}

#show {
  margin: .7em 0;
}

#controlled-by, #controlled-by a {
  color: var(--controlled-by-inactive-color);
}

.is-active #controlled-by {
  color: var(--controlled-by-active-color);
    margin-inline-start: 8px;
}

.is-active #controlled-by a {
  color: var(--controlled-by-active-link-color);
}

cr-icon-button {
  --cr-icon-button-icon-size: 16px;
    --cr-icon-button-margin-end: 8px;
    margin-top: 8px;
}

#incognito {
  -webkit-mask-image: url(images/incognito_marker.svg);
    background-color: var(--cr-secondary-text-color);
    bottom: 20px;
    height: 16px;
    position: absolute;
    right: 16px;
    width: 16px;
}

:host-context([dir='rtl']) #incognito {
  left: 16px;
    right: initial;
}

#pauseOrResume, #dangerous .action-button {
  margin-inline-end: 8px;
}

</style>

<div id="date" role="heading" aria-level="2">[[computeDate_(data.hideDate,
    data.sinceString,
    data.dateString)]]</div>

<div id="content" on-dragstart="onDragStart_" class$="[[computeClass_(isActive_, isDangerous_, showProgress_)]]" focus-row-container="">
  <!--
    TODO(hcarmona): Investigate displaying danger level as text in alt
    attribute and remove aria-hidden="true" from #file-icon-wrapper
  -->
  <div id="file-icon-wrapper" class="icon-wrapper" aria-hidden="true">
    <img class="icon" id="file-icon" alt="" hidden="[[!useFileIcon_]]">
    <iron-icon class="icon" icon$="[[computeIcon_(
        isDangerous_, data.dangerType, useFileIcon_)]]" hidden="[[useFileIcon_]]"></iron-icon>
  </div>

  <div id="details">
    <div id="title-area" role="gridcell"><!--
      Can't have any line breaks.
      --><a is="action-link" id="file-link" href="[[data.url]]" on-click="onFileLinkTap_" focus-row-control="" focus-type="fileLink" hidden="[[!completelyOnDisk_]]">[[data.fileName]]</a><!--
      Before #name.
      --><span id="name" hidden="[[completelyOnDisk_]]">[[data.fileName]]</span>
      <span id="tag">[[computeTag_(data.state,
                                   data.lastReasonText,
                                   data.fileExternallyRemoved)]]</span>
    </div>

    <div role="gridcell">
      <a id="url" target="_blank" on-click="onUrlTap_" focus-row-control="" focus-type="url">[[chopUrl_(data.url)]]</a>
    </div>

    <div id="description" role="gridcell" hidden$="[[!computeDescriptionVisible_(data.*)]]">
      [[computeDescription_(
          data.state,
          data.dangerType,
          data.fileName,
          data.progressStatusText)]]
    </div>

    <template is="dom-if" if="[[showProgress_]]">
      <div role="gridcell">
        <paper-progress id="progress" indeterminate="[[isIndeterminate_(data.percent)]]" value="[[data.percent]]"></paper-progress>
      </div>
    </template>

    <div id="safe" class="controls" hidden="[[isDangerous_]]">
      <div role="gridcell">
        <a is="action-link" id="show" on-click="onShowTap_" hidden="[[!completelyOnDisk_]]" focus-row-control="" focus-type="show">Zobrazit ve složce</a>
      </div>
      <template is="dom-if" if="[[data.retry]]">
        <div role="gridcell">
          <cr-button class="action-button" on-click="onRetryTap_" focus-row-control="" focus-type="retry">
            Opakovat
          </cr-button>
        </div>
      </template>
      <template is="dom-if" if="[[pauseOrResumeText_]]">
        <div role="gridcell">
          <cr-button on-click="onPauseOrResumeTap_" id="pauseOrResume" focus-row-control="" focus-type="pauseOrResume">
            [[pauseOrResumeText_]]
          </cr-button>
        </div>
      </template>
      <template is="dom-if" if="[[showCancel_]]">
        <div role="gridcell">
          <cr-button on-click="onCancelTap_" focus-row-control="" focus-type="cancel">
            Zrušit
          </cr-button>
        </div>
      </template>
      <span id="controlled-by"><!-- Text populated dynamically. --></span>
    </div>

    <template is="dom-if" if="[[isDangerous_]]">
      <div id="dangerous" class="controls">
        <!-- Dangerous file types (e.g. .exe, .jar). -->
        <template is="dom-if" if="[[!isMalware_]]">
          <div role="gridcell">
            <cr-button on-click="onDiscardDangerousTap_" class="action-button" focus-row-control="" focus-type="discard">Zahodit</cr-button>
          </div>
          <div role="gridcell">
            <cr-button on-click="onSaveDangerousTap_" focus-row-control="" focus-type="save">
              Uložit</cr-button>
          </div>
        </template>

        <!-- Things that safe browsing has determined to be dangerous. -->
        <template is="dom-if" if="[[isMalware_]]">
          <div role="gridcell">
            <cr-button on-click="onDiscardDangerousTap_" class="action-button" focus-row-control="" focus-type="discard">
              Odstranit ze seznamu</cr-button>
          </div>
          <div role="gridcell">
            <cr-button on-click="onSaveDangerousTap_" focus-row-control="" focus-type="save">
              Ponechat nebezpečný soubor</cr-button>
          </div>
        </template>
      </div>
    </template>
  </div>
  <div role="gridcell">
    <cr-icon-button class="icon-clear" style$="[[computeRemoveStyle_(isDangerous_, showCancel_)]]" id="remove" title="Odstranit ze seznamu" aria-label$="[[controlRemoveFromListAriaLabel_]]" on-click="onRemoveTap_" focus-row-control="" focus-type="remove">
    </cr-icon-button>
  </div>
  <div id="incognito" title="Staženo v anonymním režimu" hidden="[[!data.otr]]">
  </div>
</div>
<!--_html_template_end_-->`,
    behaviors: [FocusRowBehavior],
    overrideCustomEquivalent: true,
    properties:
    {
        data: Object,
        completelyOnDisk_:
        {
            computed: "computeCompletelyOnDisk_(" + "data.state, data.fileExternallyRemoved)",
            type: Boolean,
            value: true
        },
        controlledBy_:
        {
            computed: "computeControlledBy_(data.byExtId, data.byExtName)",
            type: String,
            value: ""
        },
        controlRemoveFromListAriaLabel_:
        {
            type: String,
            computed: "computeControlRemoveFromListAriaLabel_(data.fileName)"
        },
        isActive_:
        {
            computed: "computeIsActive_(" + "data.state, data.fileExternallyRemoved)",
            type: Boolean,
            value: true
        },
        isDangerous_:
        {
            computed: "computeIsDangerous_(data.state)",
            type: Boolean,
            value: false
        },
        isMalware_:
        {
            computed: "computeIsMalware_(isDangerous_, data.dangerType)",
            type: Boolean,
            value: false
        },
        isInProgress_:
        {
            computed: "computeIsInProgress_(data.state)",
            type: Boolean,
            value: false
        },
        pauseOrResumeText_:
        {
            computed: "computePauseOrResumeText_(isInProgress_, data.resume)",
            type: String,
            observer: "updatePauseOrResumeClass_"
        },
        showCancel_:
        {
            computed: "computeShowCancel_(data.state)",
            type: Boolean,
            value: false
        },
        showProgress_:
        {
            computed: "computeShowProgress_(showCancel_, data.percent)",
            type: Boolean,
            value: false
        },
        useFileIcon_: Boolean
    },
    hostAttributes:
    {
        role: "row"
    },
    observers: ["observeControlledBy_(controlledBy_)", "observeIsDangerous_(isDangerous_, data)", "restoreFocusAfterCancelIfNeeded_(data)"],
    mojoHandler_: null,
    restoreFocusAfterCancel_: false,
    attached()
    {
        afterNextRender(this, function()
        {
            IronA11yAnnouncer.requestAvailability()
        })
    },
    ready()
    {
        this.mojoHandler_ = BrowserProxy.getInstance().handler;
        this.content = this.$.content
    },
    focusOnRemoveButton()
    {
        focusWithoutInk(this.$.remove)
    },
    getCustomEquivalent(sampleElement)
    {
        if (sampleElement.getAttribute("focus-type") === "cancel")
        {
            return this.$$('[focus-type="retry"]')
        }
        if (sampleElement.getAttribute("focus-type") === "retry")
        {
            return this.$$('[focus-type="pauseOrResume"]')
        }
        return null
    },
    getFileIcon()
    {
        return this.$["file-icon"]
    },
    chopUrl_(url)
    {
        return url.slice(0, 300)
    },
    computeClass_()
    {
        const classes = [];
        if (this.isActive_)
        {
            classes.push("is-active")
        }
        if (this.isDangerous_)
        {
            classes.push("dangerous")
        }
        if (this.showProgress_)
        {
            classes.push("show-progress")
        }
        return classes.join(" ")
    },
    computeCompletelyOnDisk_()
    {
        return this.data.state === States.COMPLETE && !this.data.fileExternallyRemoved
    },
    computeControlledBy_()
    {
        if (!this.data.byExtId || !this.data.byExtName)
        {
            return ""
        }
        const url = `chrome://extensions/?id=${this.data.byExtId}`;
        const name = this.data.byExtName;
        return loadTimeData.getStringF("controlledByUrl", url, HTMLEscape(name))
    },
    computeControlRemoveFromListAriaLabel_()
    {
        return loadTimeData.getStringF("controlRemoveFromListAriaLabel", this.data.fileName)
    },
    computeDate_()
    {
        assert(typeof this.data.hideDate === "boolean");
        if (this.data.hideDate)
        {
            return ""
        }
        return assert(this.data.sinceString || this.data.dateString)
    },
    computeDescriptionVisible_()
    {
        return this.computeDescription_() !== ""
    },
    computeDescription_()
    {
        const data = this.data;
        switch (data.state)
        {
            case States.COMPLETE:
                switch (data.dangerType)
                {
                    case DangerType.DEEP_SCANNED_SAFE:
                        return loadTimeData.getString("deepScannedSafeDesc");
                    case DangerType.DEEP_SCANNED_OPENED_DANGEROUS:
                        return loadTimeData.getString("deepScannedOpenedDangerousDesc")
                }
                break;
            case States.MIXED_CONTENT:
                return loadTimeData.getString("mixedContentDownloadDesc");
            case States.DANGEROUS:
                const fileName = data.fileName;
                switch (data.dangerType)
                {
                    case DangerType.DANGEROUS_FILE:
                        return loadTimeData.getString("dangerFileDesc");
                    case DangerType.DANGEROUS_URL:
                    case DangerType.DANGEROUS_CONTENT:
                    case DangerType.DANGEROUS_HOST:
                        return loadTimeData.getString("dangerDownloadDesc");
                    case DangerType.UNCOMMON_CONTENT:
                        return loadTimeData.getString("dangerUncommonDesc");
                    case DangerType.POTENTIALLY_UNWANTED:
                        return loadTimeData.getString("dangerSettingsDesc");
                    case DangerType.SENSITIVE_CONTENT_WARNING:
                        return loadTimeData.getString("sensitiveContentWarningDesc")
                }
                break;
            case States.IN_PROGRESS:
            case States.PAUSED:
                return data.progressStatusText;
            case States.INTERRUPTED:
                switch (data.dangerType)
                {
                    case DangerType.SENSITIVE_CONTENT_BLOCK:
                        return loadTimeData.getString("sensitiveContentBlockedDesc");
                    case DangerType.BLOCKED_TOO_LARGE:
                        return loadTimeData.getString("blockedTooLargeDesc");
                    case DangerType.BLOCKED_PASSWORD_PROTECTED:
                        return loadTimeData.getString("blockedPasswordProtectedDesc")
                }
        }
        return ""
    },
    computeIcon_()
    {
        if (this.data)
        {
            const dangerType = this.data.dangerType;
            if (loadTimeData.getBoolean("requestsApVerdicts") && dangerType === DangerType.UNCOMMON_CONTENT || dangerType === DangerType.SENSITIVE_CONTENT_WARNING)
            {
                return "cr:error"
            }
            const WARNING_TYPES = [DangerType.SENSITIVE_CONTENT_BLOCK, DangerType.BLOCKED_TOO_LARGE, DangerType.BLOCKED_PASSWORD_PROTECTED];
            if (WARNING_TYPES.includes(dangerType))
            {
                return "cr:warning"
            }
        }
        if (this.isDangerous_)
        {
            return "cr:warning"
        }
        if (!this.useFileIcon_)
        {
            return "cr:insert-drive-file"
        }
        return ""
    },
    computeIsActive_()
    {
        return this.data.state !== States.CANCELLED && this.data.state !== States.INTERRUPTED && !this.data.fileExternallyRemoved
    },
    computeIsDangerous_()
    {
        return this.data.state === States.DANGEROUS || this.data.state === States.MIXED_CONTENT
    },
    computeIsInProgress_()
    {
        return this.data.state === States.IN_PROGRESS
    },
    computeIsMalware_()
    {
        return this.isDangerous_ && (this.data.dangerType === DangerType.DANGEROUS_CONTENT || this.data.dangerType === DangerType.DANGEROUS_HOST || this.data.dangerType === DangerType.DANGEROUS_URL || this.data.dangerType === DangerType.POTENTIALLY_UNWANTED)
    },
    toggleButtonClass_()
    {
        this.$$("#pauseOrResume").classList.toggle("action-button", this.pauseOrResumeText_ === loadTimeData.getString("controlResume"))
    },
    updatePauseOrResumeClass_()
    {
        if (!this.pauseOrResumeText_)
        {
            return
        }
        beforeNextRender(this, () => this.toggleButtonClass_())
    },
    computePauseOrResumeText_()
    {
        if (this.data === undefined)
        {
            return ""
        }
        if (this.isInProgress_)
        {
            return loadTimeData.getString("controlPause")
        }
        if (this.data.resume)
        {
            return loadTimeData.getString("controlResume")
        }
        return ""
    },
    computeRemoveStyle_()
    {
        const canDelete = loadTimeData.getBoolean("allowDeletingHistory");
        const hideRemove = this.isDangerous_ || this.showCancel_ || !canDelete;
        return hideRemove ? "visibility: hidden" : ""
    },
    computeShowCancel_()
    {
        return this.data.state === States.IN_PROGRESS || this.data.state === States.PAUSED
    },
    computeShowProgress_()
    {
        return this.showCancel_ && this.data.percent >= -1
    },
    computeTag_()
    {
        switch (this.data.state)
        {
            case States.CANCELLED:
                return loadTimeData.getString("statusCancelled");
            case States.INTERRUPTED:
                return this.data.lastReasonText;
            case States.COMPLETE:
                return this.data.fileExternallyRemoved ? loadTimeData.getString("statusRemoved") : ""
        }
        return ""
    },
    isIndeterminate_()
    {
        return this.data.percent === -1
    },
    observeControlledBy_()
    {
        this.$["controlled-by"].innerHTML = this.controlledBy_;
        if (this.controlledBy_)
        {
            const link = this.$$("#controlled-by a");
            link.setAttribute("focus-row-control", "");
            link.setAttribute("focus-type", "controlledBy")
        }
    },
    observeIsDangerous_()
    {
        if (!this.data)
        {
            return
        }
        const OVERRIDDEN_ICON_TYPES = [DangerType.SENSITIVE_CONTENT_BLOCK, DangerType.BLOCKED_TOO_LARGE, DangerType.BLOCKED_PASSWORD_PROTECTED];
        if (this.isDangerous_)
        {
            this.$.url.removeAttribute("href");
            this.useFileIcon_ = false
        }
        else if (OVERRIDDEN_ICON_TYPES.includes(this.data.dangerType))
        {
            this.useFileIcon_ = false
        }
        else
        {
            this.$.url.href = assert(this.data.url);
            const path = this.data.filePath;
            IconLoader.getInstance().loadIcon(this.$["file-icon"], path).then(success =>
            {
                if (path === this.data.filePath)
                {
                    this.useFileIcon_ = success
                }
            })
        }
    },
    onCancelTap_()
    {
        this.restoreFocusAfterCancel_ = true;
        this.mojoHandler_.cancel(this.data.id)
    },
    onDiscardDangerousTap_()
    {
        this.mojoHandler_.discardDangerous(this.data.id)
    },
    onDragStart_(e)
    {
        e.preventDefault();
        this.mojoHandler_.drag(this.data.id)
    },
    onFileLinkTap_(e)
    {
        e.preventDefault();
        this.mojoHandler_.openFileRequiringGesture(this.data.id)
    },
    onUrlTap_()
    {
        chrome.send("metricsHandler:recordAction", ["Downloads_OpenUrlOfDownloadedItem"])
    },
    onPauseOrResumeTap_()
    {
        if (this.isInProgress_)
        {
            this.mojoHandler_.pause(this.data.id)
        }
        else
        {
            this.mojoHandler_.resume(this.data.id)
        }
    },
    onRemoveTap_()
    {
        const pieces = loadTimeData.getSubstitutedStringPieces(loadTimeData.getString("toastRemovedFromList"), this.data.fileName);
        pieces.forEach(p =>
        {
            p.collapsible = !!p.arg
        });
        getToastManager().showForStringPieces(pieces);
        this.fire("iron-announce",
        {
            text: loadTimeData.getString("undoDescription")
        });
        this.mojoHandler_.remove(this.data.id)
    },
    onRetryTap_()
    {
        this.mojoHandler_.retryDownload(this.data.id)
    },
    onSaveDangerousTap_()
    {
        this.mojoHandler_.saveDangerousRequiringGesture(this.data.id)
    },
    onShowTap_()
    {
        this.mojoHandler_.show(this.data.id)
    },
    restoreFocusAfterCancelIfNeeded_()
    {
        if (!this.restoreFocusAfterCancel_)
        {
            return
        }
        this.restoreFocusAfterCancel_ = false;
        setTimeout(() =>
        {
            const element = this.getFocusRow().getFirstFocusable("retry");
            if (element)
            {
                element.focus()
            }
        })
    }
}); // Copyright 2016 The Chromium Authors. All rights reserved.
const AnchorAlignment = {
    BEFORE_START: -2,
    AFTER_START: -1,
    CENTER: 0,
    BEFORE_END: 1,
    AFTER_END: 2
};
const DROPDOWN_ITEM_CLASS = "dropdown-item";
const AFTER_END_OFFSET = 10;

function getStartPointWithAnchor(start, end, menuLength, anchorAlignment, min, max) {
    let startPoint = 0;
    switch (anchorAlignment)
    {
        case AnchorAlignment.BEFORE_START:
            startPoint = -menuLength;
            break;
        case AnchorAlignment.AFTER_START:
            startPoint = start;
            break;
        case AnchorAlignment.CENTER:
            startPoint = (start + end - menuLength) / 2;
            break;
        case AnchorAlignment.BEFORE_END:
            startPoint = end - menuLength;
            break;
        case AnchorAlignment.AFTER_END:
            startPoint = end;
            break
    }
    if (startPoint + menuLength > max)
    {
        startPoint = end - menuLength
    }
    if (startPoint < min)
    {
        startPoint = start
    }
    startPoint = Math.max(min, Math.min(startPoint, max - menuLength));
    return startPoint
}

function getDefaultShowConfig() {
    return {
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        anchorAlignmentX: AnchorAlignment.AFTER_START,
        anchorAlignmentY: AnchorAlignment.AFTER_START,
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0
    }
}
Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style scope="cr-action-menu">:host dialog {
  background-color: var(--cr-menu-background-color);
        border: none;
        border-radius: 4px;
        box-shadow: var(--cr-menu-shadow);
        margin: 0;
        min-width: 128px;
        outline: none;
        padding: 0;
}

:host dialog::backdrop {
  background-color: transparent;
}

:host ::slotted(.dropdown-item) {
  -webkit-tap-highlight-color: transparent;
        background: none;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        color: var(--cr-primary-text-color);
        font: inherit;
        min-height: 32px;
        padding: 0 24px;
        text-align: start;
        user-select: none;
        width: 100%;
}

:host ::slotted(.dropdown-item:not([hidden])) {
  align-items: center;
        display: flex;
}

:host ::slotted(.dropdown-item[disabled]) {
  opacity: var(--cr-action-menu-disabled-item-opacity, 0.65);
}

:host ::slotted(.dropdown-item:not([disabled])) {
  cursor: pointer;
}

:host ::slotted(.dropdown-item:focus) {
  background-color: var(--cr-menu-background-focus-color);
        outline: none;
}

.item-wrapper {
  background: var(--cr-menu-background-sheen);
        outline: none;
        padding: 8px 0;
}

</style>
    <dialog id="dialog" on-close="onNativeDialogClose_" role="application" aria-roledescription$="[[roleDescription]]">
      <div id="wrapper" class="item-wrapper" role="menu" tabindex="-1">
        <slot id="contentNode"></slot>
      </div>
    </dialog>
<!--_html_template_end_-->`,
    is: "cr-action-menu",
    anchorElement_: null,
    boundClose_: null,
    hasMousemoveListener_: false,
    contentObserver_: null,
    resizeObserver_: null,
    lastConfig_: null,
    properties:
    {
        autoReposition:
        {
            type: Boolean,
            value: false
        },
        open:
        {
            type: Boolean,
            value: false
        },
        roleDescription: String
    },
    listeners:
    {
        keydown: "onKeyDown_",
        mouseover: "onMouseover_",
        click: "onClick_"
    },
    detached()
    {
        this.removeListeners_()
    },
    getDialog()
    {
        return this.$.dialog
    },
    removeListeners_()
    {
        window.removeEventListener("resize", this.boundClose_);
        window.removeEventListener("popstate", this.boundClose_);
        if (this.contentObserver_)
        {
            dom(this.$.contentNode).unobserveNodes(this.contentObserver_);
            this.contentObserver_ = null
        }
        if (this.resizeObserver_)
        {
            this.resizeObserver_.disconnect();
            this.resizeObserver_ = null
        }
    },
    onNativeDialogClose_(e)
    {
        if (e.target !== this.$.dialog)
        {
            return
        }
        e.stopPropagation();
        this.fire("close")
    },
    onClick_(e)
    {
        if (e.target === this)
        {
            this.close();
            e.stopPropagation()
        }
    },
    onKeyDown_(e)
    {
        e.stopPropagation();
        if (e.key === "Tab" || e.key === "Escape")
        {
            this.close();
            e.preventDefault();
            return
        }
        if (e.key !== "Enter" && e.key !== "ArrowUp" && e.key !== "ArrowDown")
        {
            return
        }
        const query = ".dropdown-item:not([disabled]):not([hidden])";
        const options = Array.from(this.querySelectorAll(query));
        if (options.length === 0)
        {
            return
        }
        const focused = getDeepActiveElement();
        const index = options.findIndex(option => FocusRow.getFocusableElement(option) === focused);
        if (e.key === "Enter")
        {
            if (index !== -1)
            {
                return
            }
            if (isWindows || isMac)
            {
                this.close();
                e.preventDefault();
                return
            }
        }
        e.preventDefault();
        this.updateFocus_(options, index, e.key !== "ArrowUp");
        if (!this.hasMousemoveListener_)
        {
            this.hasMousemoveListener_ = true;
            this.addEventListener("mousemove", e =>
            {
                this.onMouseover_(e);
                this.hasMousemoveListener_ = false
            },
            {
                once: true
            })
        }
    },
    onMouseover_(e)
    {
        const query = ".dropdown-item:not([disabled])";
        const item = e.composedPath().find(el => el.matches && el.matches(query));
        (item || this.$.wrapper).focus()
    },
    updateFocus_(options, focusedIndex, next)
    {
        const numOptions = options.length;
        assert(numOptions > 0);
        let index;
        if (focusedIndex === -1)
        {
            index = next ? 0 : numOptions - 1
        }
        else
        {
            const delta = next ? 1 : -1;
            index = (numOptions + focusedIndex + delta) % numOptions
        }
        options[index].focus()
    },
    close()
    {
        this.removeListeners_();
        this.$.dialog.close();
        this.open = false;
        if (this.anchorElement_)
        {
            focusWithoutInk(assert(this.anchorElement_));
            this.anchorElement_ = null
        }
        if (this.lastConfig_)
        {
            this.lastConfig_ = null
        }
    },
    showAt(anchorElement, opt_config)
    {
        this.anchorElement_ = anchorElement;
        this.anchorElement_.scrollIntoViewIfNeeded();
        const rect = this.anchorElement_.getBoundingClientRect();
        let height = rect.height;
        if (opt_config && opt_config.anchorAlignmentY === AnchorAlignment.AFTER_END)
        {
            height -= AFTER_END_OFFSET
        }
        this.showAtPosition(Object.assign(
        {
            top: rect.top,
            left: rect.left,
            height: height,
            width: rect.width,
            anchorAlignmentX: AnchorAlignment.BEFORE_END
        }, opt_config));
        this.$.wrapper.focus()
    },
    showAtPosition(config)
    {
        const doc = document.scrollingElement;
        const scrollLeft = doc.scrollLeft;
        const scrollTop = doc.scrollTop;
        this.resetStyle_();
        this.$.dialog.showModal();
        this.open = true;
        config.top += scrollTop;
        config.left += scrollLeft;
        this.positionDialog_(Object.assign(
        {
            minX: scrollLeft,
            minY: scrollTop,
            maxX: scrollLeft + doc.clientWidth,
            maxY: scrollTop + doc.clientHeight
        }, config));
        doc.scrollTop = scrollTop;
        doc.scrollLeft = scrollLeft;
        this.addListeners_()
    },
    resetStyle_()
    {
        this.$.dialog.style.left = "";
        this.$.dialog.style.right = "";
        this.$.dialog.style.top = "0"
    },
    positionDialog_(config)
    {
        this.lastConfig_ = config;
        const c = Object.assign(getDefaultShowConfig(), config);
        const top = c.top;
        const left = c.left;
        const bottom = top + c.height;
        const right = left + c.width;
        const rtl = getComputedStyle(this).direction === "rtl";
        if (rtl)
        {
            c.anchorAlignmentX *= -1
        }
        const offsetWidth = this.$.dialog.offsetWidth;
        const menuLeft = getStartPointWithAnchor(left, right, offsetWidth, c.anchorAlignmentX, c.minX, c.maxX);
        if (rtl)
        {
            const menuRight = document.scrollingElement.clientWidth - menuLeft - offsetWidth;
            this.$.dialog.style.right = menuRight + "px"
        }
        else
        {
            this.$.dialog.style.left = menuLeft + "px"
        }
        const menuTop = getStartPointWithAnchor(top, bottom, this.$.dialog.offsetHeight, c.anchorAlignmentY, c.minY, c.maxY);
        this.$.dialog.style.top = menuTop + "px"
    },
    addListeners_()
    {
        this.boundClose_ = this.boundClose_ || function()
        {
            if (this.$.dialog.open)
            {
                this.close()
            }
        }.bind(this);
        window.addEventListener("resize", this.boundClose_);
        window.addEventListener("popstate", this.boundClose_);
        this.contentObserver_ = dom(this.$.contentNode).observeNodes(info =>
        {
            info.addedNodes.forEach(node =>
            {
                if (node.classList && node.classList.contains(DROPDOWN_ITEM_CLASS) && !node.getAttribute("role"))
                {
                    node.setAttribute("role", "menuitem")
                }
            })
        });
        if (this.autoReposition)
        {
            this.resizeObserver_ = new ResizeObserver(() =>
            {
                if (this.lastConfig_)
                {
                    this.positionDialog_(this.lastConfig_);
                    this.fire("cr-action-menu-repositioned")
                }
            });
            this.resizeObserver_.observe(this.$.dialog)
        }
    }
}); // Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CrSearchFieldBehavior = {
    properties:
    {
        label:
        {
            type: String,
            value: ""
        },
        clearLabel:
        {
            type: String,
            value: ""
        },
        hasSearchText:
        {
            type: Boolean,
            reflectToAttribute: true,
            value: false
        }
    },
    effectiveValue_: "",
    searchDelayTimer_: -1,
    getSearchInput()
    {},
    getValue()
    {
        return this.getSearchInput().value
    },
    setValue(value, opt_noEvent)
    {
        const updated = this.updateEffectiveValue_(value);
        this.getSearchInput().value = this.effectiveValue_;
        if (!updated)
        {
            if (value === "" && this.hasSearchText)
            {
                this.hasSearchText = false
            }
            return
        }
        this.onSearchTermInput();
        if (!opt_noEvent)
        {
            this.fire("search-changed", this.effectiveValue_)
        }
    },
    scheduleSearch_()
    {
        if (this.searchDelayTimer_ >= 0)
        {
            clearTimeout(this.searchDelayTimer_)
        }
        const length = this.getValue().length;
        const timeoutMs = length > 0 ? 500 - 100 * (Math.min(length, 4) - 1) : 0;
        this.searchDelayTimer_ = setTimeout(() =>
        {
            this.getSearchInput().dispatchEvent(new CustomEvent("search",
            {
                composed: true,
                detail: this.getValue()
            }));
            this.searchDelayTimer_ = -1
        }, timeoutMs)
    },
    onSearchTermSearch()
    {
        this.onValueChanged_(this.getValue(), false)
    },
    onSearchTermInput()
    {
        this.hasSearchText = this.$.searchInput.value !== "";
        this.scheduleSearch_()
    },
    onValueChanged_(newValue, noEvent)
    {
        const updated = this.updateEffectiveValue_(newValue);
        if (updated && !noEvent)
        {
            this.fire("search-changed", this.effectiveValue_)
        }
    },
    updateEffectiveValue_(value)
    {
        const effectiveValue = value.replace(/\s+/g, " ").replace(/^\s/, "");
        if (effectiveValue === this.effectiveValue_)
        {
            return false
        }
        this.effectiveValue_ = effectiveValue;
        return true
    }
};
const template$7 = document.createElement("template");
template$7.innerHTML = `<dom-module id="cr-shared-style" assetpath="chrome://resources/">\n  <template>\n    <style include="cr-hidden-style cr-icons" scope="cr-shared-style">html, :host {\n  --scrollable-border-color: var(--google-grey-refresh-300);\n}\n\n@media (prefers-color-scheme: dark) {\nhtml, :host {\n  --scrollable-border-color: var(--google-grey-refresh-700);\n}\n\n}\n\n[actionable] {\n  cursor: pointer;\n}\n\n.hr {\n  border-top: var(--cr-separator-line);\n}\n\niron-list.cr-separators > *:not([first]) {\n  border-top: var(--cr-separator-line);\n}\n\n[scrollable] {\n  border-color: transparent;\n        border-style: solid;\n        border-width: 1px 0;\n        overflow-y: auto;\n}\n\n[scrollable].is-scrolled {\n  border-top-color: var(--scrollable-border-color);\n}\n\n[scrollable].can-scroll:not(.scrolled-to-bottom) {\n  border-bottom-color: var(--scrollable-border-color);\n}\n\n[scrollable] iron-list > :not(.no-outline):focus {\n  ;\n        background-color: var(--cr-selectable-focus_-_background-color); outline: var(--cr-selectable-focus_-_outline);\n}\n\n.scroll-container {\n  display: flex;\n        flex-direction: column;\n        min-height: 1px;\n}\n\n[selectable]:focus, [selectable] > :focus {\n  background-color: var(--cr-selectable-focus_-_background-color); outline: var(--cr-selectable-focus_-_outline);\n}\n\n[selectable] > * {\n  cursor: pointer;\n}\n\n.cr-container-shadow {\n  box-shadow: inset 0 5px 6px -3px rgba(0, 0, 0, .4);\n        height: var(--cr-container-shadow-height);\n        left: 0;\n        margin: 0 0 var(--cr-container-shadow-margin);\n        opacity: 0;\n        pointer-events: none;\n        position: relative;\n        right: 0;\n        top: 0;\n        transition: opacity 500ms;\n        z-index: 1;\n}\n\n#cr-container-shadow-bottom {\n  margin-bottom: 0;\n        margin-top: var(--cr-container-shadow-margin);\n        transform: scaleY(-1);\n}\n\n#cr-container-shadow-top.has-shadow, #cr-container-shadow-bottom.has-shadow {\n  opacity: var(--cr-container-shadow-max-opacity);\n}\n\n.cr-title-text {\n  color: var(--cr-title-text-color);\n        font-size: 107.6923%; \n        font-weight: 500;\n}\n\n.cr-form-field-label {\n  color: var(--cr-form-field-label-color);\n        display: block;\n        font-size: var(--cr-form-field-label-font-size);\n        font-weight: 500;\n        letter-spacing: .4px;\n        line-height: var(--cr-form-field-label-line-height);\n        margin-bottom: 8px;\n}\n\n</style>\n  </template>\n</dom-module>\n`;
document.body.appendChild(template$7.content.cloneNode(true));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const $_documentContainer$1 = document.createElement("template");
$_documentContainer$1.setAttribute("style", "display: none;");
$_documentContainer$1.innerHTML = `<dom-module id="paper-spinner-styles">\n  <template>\n    <style scope="paper-spinner-styles">:host {\n  display: inline-block;\n        position: relative;\n        width: 28px;\n        height: 28px;\n\n        \n        --paper-spinner-container-rotation-duration: 1568ms;\n\n        \n        --paper-spinner-expand-contract-duration: 1333ms;\n\n        \n        --paper-spinner-full-cycle-duration: 5332ms;\n\n        \n        --paper-spinner-cooldown-duration: 400ms;\n}\n\n#spinnerContainer {\n  width: 100%;\n        height: 100%;\n\n        \n        direction: ltr;\n}\n\n#spinnerContainer.active {\n  animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;\n}\n\n@-webkit-keyframes container-rotate {\nto {\n  -webkit-transform: rotate(360deg)\n}\n\n}\n\n@keyframes container-rotate {\nto {\n  transform: rotate(360deg)\n}\n\n}\n\n.spinner-layer {\n  position: absolute;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        white-space: nowrap;\n        color: var(--paper-spinner-color, var(--google-blue-500));\n}\n\n.layer-1 {\n  color: var(--paper-spinner-layer-1-color, var(--google-blue-500));\n}\n\n.layer-2 {\n  color: var(--paper-spinner-layer-2-color, var(--google-red-500));\n}\n\n.layer-3 {\n  color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));\n}\n\n.layer-4 {\n  color: var(--paper-spinner-layer-4-color, var(--google-green-500));\n}\n\n.active .spinner-layer {\n  animation-name: fill-unfill-rotate;\n        animation-duration: var(--paper-spinner-full-cycle-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n        opacity: 1;\n}\n\n.active .spinner-layer.layer-1 {\n  animation-name: fill-unfill-rotate, layer-1-fade-in-out;\n}\n\n.active .spinner-layer.layer-2 {\n  animation-name: fill-unfill-rotate, layer-2-fade-in-out;\n}\n\n.active .spinner-layer.layer-3 {\n  animation-name: fill-unfill-rotate, layer-3-fade-in-out;\n}\n\n.active .spinner-layer.layer-4 {\n  animation-name: fill-unfill-rotate, layer-4-fade-in-out;\n}\n\n@-webkit-keyframes fill-unfill-rotate {\n12.5% {\n  -webkit-transform: rotate(135deg)\n}\n\n25% {\n  -webkit-transform: rotate(270deg)\n}\n\n37.5% {\n  -webkit-transform: rotate(405deg)\n}\n\n50% {\n  -webkit-transform: rotate(540deg)\n}\n\n62.5% {\n  -webkit-transform: rotate(675deg)\n}\n\n75% {\n  -webkit-transform: rotate(810deg)\n}\n\n87.5% {\n  -webkit-transform: rotate(945deg)\n}\n\nto {\n  -webkit-transform: rotate(1080deg)\n}\n\n}\n\n@keyframes fill-unfill-rotate {\n12.5% {\n  transform: rotate(135deg)\n}\n\n25% {\n  transform: rotate(270deg)\n}\n\n37.5% {\n  transform: rotate(405deg)\n}\n\n50% {\n  transform: rotate(540deg)\n}\n\n62.5% {\n  transform: rotate(675deg)\n}\n\n75% {\n  transform: rotate(810deg)\n}\n\n87.5% {\n  transform: rotate(945deg)\n}\n\nto {\n  transform: rotate(1080deg)\n}\n\n}\n\n@-webkit-keyframes layer-1-fade-in-out {\n0% {\n  opacity: 1\n}\n\n25% {\n  opacity: 1\n}\n\n26% {\n  opacity: 0\n}\n\n89% {\n  opacity: 0\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 1\n}\n\n}\n\n@keyframes layer-1-fade-in-out {\n0% {\n  opacity: 1\n}\n\n25% {\n  opacity: 1\n}\n\n26% {\n  opacity: 0\n}\n\n89% {\n  opacity: 0\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 1\n}\n\n}\n\n@-webkit-keyframes layer-2-fade-in-out {\n0% {\n  opacity: 0\n}\n\n15% {\n  opacity: 0\n}\n\n25% {\n  opacity: 1\n}\n\n50% {\n  opacity: 1\n}\n\n51% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes layer-2-fade-in-out {\n0% {\n  opacity: 0\n}\n\n15% {\n  opacity: 0\n}\n\n25% {\n  opacity: 1\n}\n\n50% {\n  opacity: 1\n}\n\n51% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@-webkit-keyframes layer-3-fade-in-out {\n0% {\n  opacity: 0\n}\n\n40% {\n  opacity: 0\n}\n\n50% {\n  opacity: 1\n}\n\n75% {\n  opacity: 1\n}\n\n76% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes layer-3-fade-in-out {\n0% {\n  opacity: 0\n}\n\n40% {\n  opacity: 0\n}\n\n50% {\n  opacity: 1\n}\n\n75% {\n  opacity: 1\n}\n\n76% {\n  opacity: 0\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@-webkit-keyframes layer-4-fade-in-out {\n0% {\n  opacity: 0\n}\n\n65% {\n  opacity: 0\n}\n\n75% {\n  opacity: 1\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes layer-4-fade-in-out {\n0% {\n  opacity: 0\n}\n\n65% {\n  opacity: 0\n}\n\n75% {\n  opacity: 1\n}\n\n90% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n.circle-clipper {\n  display: inline-block;\n        position: relative;\n        width: 50%;\n        height: 100%;\n        overflow: hidden;\n}\n\n.spinner-layer::after {\n  content: '';\n        left: 45%;\n        width: 10%;\n        border-top-style: solid;\n}\n\n.spinner-layer::after, .circle-clipper .circle {\n  box-sizing: border-box;\n        position: absolute;\n        top: 0;\n        border-width: var(--paper-spinner-stroke-width, 3px);\n        border-radius: 50%;\n}\n\n.circle-clipper .circle {\n  bottom: 0;\n        width: 200%;\n        border-style: solid;\n        border-bottom-color: transparent !important;\n}\n\n.circle-clipper.left .circle {\n  left: 0;\n        border-right-color: transparent !important;\n        transform: rotate(129deg);\n}\n\n.circle-clipper.right .circle {\n  left: -100%;\n        border-left-color: transparent !important;\n        transform: rotate(-129deg);\n}\n\n.active .gap-patch::after, .active .circle-clipper .circle {\n  animation-duration: var(--paper-spinner-expand-contract-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n}\n\n.active .circle-clipper.left .circle {\n  animation-name: left-spin;\n}\n\n.active .circle-clipper.right .circle {\n  animation-name: right-spin;\n}\n\n@-webkit-keyframes left-spin {\n0% {\n  -webkit-transform: rotate(130deg)\n}\n\n50% {\n  -webkit-transform: rotate(-5deg)\n}\n\nto {\n  -webkit-transform: rotate(130deg)\n}\n\n}\n\n@keyframes left-spin {\n0% {\n  transform: rotate(130deg)\n}\n\n50% {\n  transform: rotate(-5deg)\n}\n\nto {\n  transform: rotate(130deg)\n}\n\n}\n\n@-webkit-keyframes right-spin {\n0% {\n  -webkit-transform: rotate(-130deg)\n}\n\n50% {\n  -webkit-transform: rotate(5deg)\n}\n\nto {\n  -webkit-transform: rotate(-130deg)\n}\n\n}\n\n@keyframes right-spin {\n0% {\n  transform: rotate(-130deg)\n}\n\n50% {\n  transform: rotate(5deg)\n}\n\nto {\n  transform: rotate(-130deg)\n}\n\n}\n\n#spinnerContainer.cooldown {\n  animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);\n}\n\n@-webkit-keyframes fade-out {\n0% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n@keyframes fade-out {\n0% {\n  opacity: 1\n}\n\nto {\n  opacity: 0\n}\n\n}\n\n</style>\n  </template>\n</dom-module>`;
document.head.appendChild($_documentContainer$1.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const PaperSpinnerBehavior = {
    properties:
    {
        active:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            observer: "__activeChanged"
        },
        alt:
        {
            type: String,
            value: "loading",
            observer: "__altChanged"
        },
        __coolingDown:
        {
            type: Boolean,
            value: false
        }
    },
    __computeContainerClasses: function(active, coolingDown)
    {
        return [active || coolingDown ? "active" : "", coolingDown ? "cooldown" : ""].join(" ")
    },
    __activeChanged: function(active, old)
    {
        this.__setAriaHidden(!active);
        this.__coolingDown = !active && old
    },
    __altChanged: function(alt)
    {
        if (alt === "loading")
        {
            this.alt = this.getAttribute("aria-label") || alt
        }
        else
        {
            this.__setAriaHidden(alt === "");
            this.setAttribute("aria-label", alt)
        }
    },
    __setAriaHidden: function(hidden)
    {
        var attr = "aria-hidden";
        if (hidden)
        {
            this.setAttribute(attr, "true")
        }
        else
        {
            this.removeAttribute(attr)
        }
    },
    __reset: function()
    {
        this.active = false;
        this.__coolingDown = false
    }
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const template$8 = html `<style include="paper-spinner-styles"></style>

  <div id="spinnerContainer" class-name="[[__computeContainerClasses(active, __coolingDown)]]" on-animationend="__reset" on-webkit-animation-end="__reset">
    <div class="spinner-layer">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`;
template$8.setAttribute("strip-whitespace", "");
Polymer({
    _template: template$8,
    is: "paper-spinner-lite",
    behaviors: [PaperSpinnerBehavior]
}); // Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style cr-icons" scope="cr-toolbar-search-field">:host {
  align-items: center;
        display: flex;
        height: 40px;
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
            width 150ms cubic-bezier(0.4, 0, 0.2, 1);
        width: 44px;
}

[hidden] {
  display: none !important;
}

cr-icon-button {
  --cr-icon-button-fill-color-focus: var(
            --cr-toolbar-search-field-input-bg-color,
            var(--cr-toolbar-background-color));
        --cr-icon-button-size: 32px;
        margin: 6px;
}

@media (prefers-color-scheme: light) {
cr-icon-button {
  --cr-icon-button-fill-color: var(
              --cr-toolbar-search-field-input-color,
              white);
}

}

@media (prefers-color-scheme: dark) {
cr-icon-button {
  --cr-icon-button-fill-color: var(
              --cr-toolbar-search-field-input-color,
              var(--google-grey-refresh-500));
}

}

#icon {
  transition: margin 150ms, opacity 200ms;
}

#prompt {
  --cr-toolbar-search-field-prompt-opacity: .7;
        opacity: 0;
}

@media (prefers-color-scheme: dark) {
#prompt {
  --cr-toolbar-search-field-prompt-opacity: 1;
}

}

paper-spinner-lite {
  height: var(--cr-icon-height-width_-_height); width: var(--cr-icon-height-width_-_width);
        --paper-spinner-color:
            var(--cr-toolbar-search-field-input-color, white);
        margin: 0 6px;
        opacity: 0;
        padding: 6px;
        position: absolute;
}

paper-spinner-lite[active] {
  opacity: 1;
}

#prompt, paper-spinner-lite {
  transition: opacity 200ms;
}

#searchTerm {
  -webkit-font-smoothing: antialiased;
        flex: 1;
        line-height: 185%;
        margin-inline-end: 2px;
        margin-inline-start: 2px;
        position: relative;
}

label {
  bottom: 0;
        cursor: text;
        left: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 0;
        white-space: nowrap;
}

:host([has-search-text]) label {
  visibility: hidden;
}

input {
  -webkit-appearance: none;
        background: transparent;
        border: none;
        color: var(--cr-toolbar-search-field-input-color, white);
        font: inherit;
        outline: none;
        padding: 0;
        position: relative;
        width: 100%;
}

input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
        margin: 0;
}

:host(:not([narrow])) {
  background:
            var(--cr-toolbar-search-field-background, rgba(0, 0, 0, 0.22));
        border-radius:
            var(--cr-toolbar-search-field-border-radius, 2px);
        cursor: text;
        padding-inline-end: 0;
        width: var(--cr-toolbar-field-width, 680px);
}

:host(:not([narrow]):not([showing-search])) #icon {
  opacity: .7;
}

:host(:not([narrow])) #prompt {
  opacity: var(--cr-toolbar-search-field-prompt-opacity);
}

:host([narrow]:not([showing-search])) #searchTerm {
  display: none;
}

:host([showing-search][spinner-active]) #icon {
  opacity: 0;
}

:host([narrow][showing-search]) {
  width: 100%;
}

:host([narrow][showing-search]) #icon, :host([narrow][showing-search]) paper-spinner-lite {
  margin-inline-start: 18px;
}

</style>
    <template is="dom-if" id="spinnerTemplate">
      <paper-spinner-lite active="[[isSpinnerShown_]]">
      </paper-spinner-lite>
    </template>
    <cr-icon-button id="icon" iron-icon="cr:search" title="[[label]]" tabindex$="[[computeIconTabIndex_(narrow, hasSearchText)]]" aria-hidden$="[[computeIconAriaHidden_(narrow, hasSearchText)]]">
    </cr-icon-button>
    <div id="searchTerm">
      <label id="prompt" for="searchInput" aria-hidden="true">[[label]]</label>
      <input id="searchInput" aria-labelledby="prompt" type="search" on-input="onSearchTermInput" on-search="onSearchTermSearch" on-keydown="onSearchTermKeydown_" on-focus="onInputFocus_" on-blur="onInputBlur_" autofocus="" spellcheck="false">
    </div>
    <template is="dom-if" if="[[hasSearchText]]">
      <cr-icon-button id="clearSearch" iron-icon="cr:cancel" title="[[clearLabel]]" on-click="clearSearch_"></cr-icon-button>
    </template>
<!--_html_template_end_-->`,
    is: "cr-toolbar-search-field",
    behaviors: [CrSearchFieldBehavior],
    properties:
    {
        narrow:
        {
            type: Boolean,
            reflectToAttribute: true
        },
        showingSearch:
        {
            type: Boolean,
            value: false,
            notify: true,
            observer: "showingSearchChanged_",
            reflectToAttribute: true
        },
        label: String,
        clearLabel: String,
        spinnerActive:
        {
            type: Boolean,
            reflectToAttribute: true
        },
        isSpinnerShown_:
        {
            type: Boolean,
            computed: "computeIsSpinnerShown_(spinnerActive, showingSearch)"
        },
        searchFocused_:
        {
            type: Boolean,
            value: false
        }
    },
    listeners:
    {
        click: "showSearch_"
    },
    getSearchInput()
    {
        return this.$.searchInput
    },
    isSearchFocused()
    {
        return this.searchFocused_
    },
    showAndFocus()
    {
        this.showingSearch = true;
        this.focus_()
    },
    onSearchTermInput()
    {
        CrSearchFieldBehavior.onSearchTermInput.call(this);
        this.showingSearch = this.hasSearchText || this.isSearchFocused()
    },
    focus_()
    {
        this.getSearchInput().focus()
    },
    computeIconTabIndex_(narrow)
    {
        return narrow && !this.hasSearchText ? 0 : -1
    },
    computeIconAriaHidden_(narrow)
    {
        return Boolean(!narrow || this.hasSearchText).toString()
    },
    computeIsSpinnerShown_()
    {
        const showSpinner = this.spinnerActive && this.showingSearch;
        if (showSpinner)
        {
            this.$.spinnerTemplate.if = true
        }
        return showSpinner
    },
    onInputFocus_()
    {
        this.searchFocused_ = true
    },
    onInputBlur_()
    {
        this.searchFocused_ = false;
        if (!this.hasSearchText)
        {
            this.showingSearch = false
        }
    },
    onSearchTermKeydown_(e)
    {
        if (e.key === "Escape")
        {
            this.showingSearch = false
        }
    },
    showSearch_(e)
    {
        if (e.target !== this.$.clearSearch)
        {
            this.showingSearch = true
        }
    },
    clearSearch_(e)
    {
        this.setValue("");
        this.focus_();
        this.spinnerActive = false
    },
    showingSearchChanged_(current, previous)
    {
        if (previous === undefined)
        {
            return
        }
        if (this.showingSearch)
        {
            this.focus_();
            return
        }
        this.setValue("");
        this.getSearchInput().blur()
    }
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Polymer({
    is: "iron-media-query",
    properties:
    {
        queryMatches:
        {
            type: Boolean,
            value: false,
            readOnly: true,
            notify: true
        },
        query:
        {
            type: String,
            observer: "queryChanged"
        },
        full:
        {
            type: Boolean,
            value: false
        },
        _boundMQHandler:
        {
            value: function()
            {
                return this.queryHandler.bind(this)
            }
        },
        _mq:
        {
            value: null
        }
    },
    attached: function()
    {
        this.style.display = "none";
        this.queryChanged()
    },
    detached: function()
    {
        this._remove()
    },
    _add: function()
    {
        if (this._mq)
        {
            this._mq.addListener(this._boundMQHandler)
        }
    },
    _remove: function()
    {
        if (this._mq)
        {
            this._mq.removeListener(this._boundMQHandler)
        }
        this._mq = null
    },
    queryChanged: function()
    {
        this._remove();
        var query = this.query;
        if (!query)
        {
            return
        }
        if (!this.full && query[0] !== "(")
        {
            query = "(" + query + ")"
        }
        this._mq = window.matchMedia(query);
        this._add();
        this.queryHandler(this._mq)
    },
    queryHandler: function(mq)
    {
        this._setQueryMatches(mq.matches)
    }
}); // Copyright 2016 The Chromium Authors. All rights reserved.
Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style include="cr-icons cr-hidden-style" scope="cr-toolbar">:host {
  align-items: center;
        background-color: var(--cr-toolbar-background-color);
        color: #fff;
        display: flex;
        height: var(--cr-toolbar-height);
}

@media (prefers-color-scheme: dark) {
:host {
  border-bottom: var(--cr-separator-line);
          box-sizing: border-box;
          color: var(--cr-secondary-text-color);
}

}

h1 {
  flex: 1;
        font-size: 123%;
        font-weight: var(--cr-toolbar-header-font-weight, 400);
        letter-spacing: .25px;
        line-height: normal;
        margin-inline-start: 6px;
        padding-inline-end: 12px;
}

@media (prefers-color-scheme: dark) {
h1 {
  color: var(--cr-primary-text-color);
}

}

#leftContent {
  position: relative;
        transition: opacity 100ms;
}

#leftSpacer {
  align-items: center;
        box-sizing: border-box;
        display: flex;
        
        padding-inline-start: calc(12px + 6px);
        width: var(--cr-toolbar-left-spacer-width, auto);
}

cr-icon-button {
  --cr-icon-button-fill-color-focus: var(--cr-toolbar-background-color);
        --cr-icon-button-size: 32px;
        min-width: 32px;
}

@media (prefers-color-scheme: light) {
cr-icon-button {
  --cr-icon-button-fill-color: currentColor;
}

}

#centeredContent {
  display: flex;
        flex: 1 1 0;
        justify-content: center;
}

#rightSpacer {
  padding-inline-end: 12px;
}

:host([narrow]) #centeredContent {
  justify-content: flex-end;
}

:host([has-overlay]) {
  transition: visibility var(--cr-toolbar-overlay-animation-duration);
        visibility: hidden;
}

:host([narrow][showing-search_]) #leftContent {
  opacity: 0;
        position: absolute;
}

:host(:not([narrow])) #leftContent {
  flex: 1 1 var(--cr-toolbar-field-margin, 0);
}

:host(:not([narrow])) #centeredContent {
  flex-basis: var(--cr-toolbar-center-basis, 0);
}

:host(:not([narrow])) #rightContent {
  flex: 1 1 0;
        text-align: end;
}

#menuPromo {
  align-items: center;
        background: #616161;
        border-radius: 2px;
        color: white;
        display: flex;
        font-size: 92.3%;
        font-weight: 500;
        opacity: 0;
        padding-bottom: 6px;
        padding-inline-end: 12px;
        padding-inline-start: 8px;
        padding-top: 6px;
        position: absolute;
        top: var(--cr-toolbar-height);
        white-space: nowrap;
        z-index: 2;
}

#menuPromo::before {
  background: inherit;
        
        clip-path: polygon(0 105%, 100% 105%, 50% 0);
        content: '';
        display: block;
        height: 6px;
        left: 10px;
        position: absolute;
        top: -6px;
        width: 12px;
}

:host-context([dir=rtl]) #menuPromo::before {
  left: auto;
        right: 10px;
}

#closePromo {
  -webkit-appearance: none;
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;  
        line-height: 20px;
        margin-inline-start: 12px;
        padding: 0;
        width: 20px;
}

</style>
    <div id="leftContent">
      <div id="leftSpacer">
        <!-- Note: showing #menuPromo relies on this dom-if being [restamp]. -->
        <template is="dom-if" if="[[showMenu]]" restamp="">
          <cr-icon-button id="menuButton" class="no-overlap" iron-icon="cr20:menu" on-click="onMenuTap_" aria-label$="[[menuLabel]]" title="[[titleIfNotShowMenuPromo_(menuLabel, showMenuPromo)]]">
          </cr-icon-button>
          <template is="dom-if" if="[[showMenuPromo]]">
            <div id="menuPromo" role="tooltip">
              [[menuPromo]]
              <button id="closePromo" on-click="onClosePromoTap_" aria-label$="[[closeMenuPromo]]">✕</button>
            
          </div></template>
        </template>
        <h1>[[pageName]]</h1>
      </div>
    </div>

    <div id="centeredContent" hidden$="[[!showSearch]]">
      <cr-toolbar-search-field id="search" narrow="[[narrow]]" label="[[searchPrompt]]" clear-label="[[clearLabel]]" spinner-active="[[spinnerActive]]" showing-search="{{showingSearch_}}">
      </cr-toolbar-search-field>
      <iron-media-query query="(max-width: [[narrowThreshold]]px)" query-matches="{{narrow}}">
      </iron-media-query>
    </div>

    <div id="rightContent">
      <div id="rightSpacer">
        <slot></slot>
      </div>
    </div>
<!--_html_template_end_-->`,
    is: "cr-toolbar",
    properties:
    {
        pageName: String,
        searchPrompt: String,
        clearLabel: String,
        menuLabel: String,
        menuPromo: String,
        spinnerActive: Boolean,
        showMenu:
        {
            type: Boolean,
            value: false
        },
        showMenuPromo:
        {
            type: Boolean,
            value: false
        },
        showSearch:
        {
            type: Boolean,
            value: true
        },
        narrow:
        {
            type: Boolean,
            reflectToAttribute: true,
            readonly: true,
            notify: true
        },
        narrowThreshold:
        {
            type: Number,
            value: 900
        },
        closeMenuPromo: String,
        showingSearch_:
        {
            type: Boolean,
            reflectToAttribute: true
        }
    },
    observers: ["possiblyShowMenuPromo_(showMenu, showMenuPromo, showingSearch_)"],
    getSearchField()
    {
        return this.$.search
    },
    onClosePromoTap_()
    {
        this.fire("cr-toolbar-menu-promo-close")
    },
    onMenuTap_()
    {
        this.fire("cr-toolbar-menu-tap")
    },
    possiblyShowMenuPromo_()
    {
        afterNextRender(this, function()
        {
            if (this.showMenu && this.showMenuPromo && !this.showingSearch_)
            {
                this.$$("#menuPromo").animate([
                {
                    opacity: 0
                },
                {
                    opacity: .9
                }],
                {
                    duration: 500,
                    fill: "forwards"
                });
                this.fire("cr-toolbar-menu-promo-shown")
            }
        }.bind(this))
    },
    titleIfNotShowMenuPromo_(title, showMenuPromo)
    {
        return showMenuPromo ? "" : title
    }
}); // Copyright 2015 The Chromium Authors. All rights reserved.
class SearchService {
    constructor()
    {
        this.searchTerms_ = [];
        this.mojoHandler_ = BrowserProxy.getInstance().handler
    }
    static splitTerms(searchText)
    {
        return searchText.split(/"([^"]*)"/).map(s => s.trim()).filter(s => !!s)
    }
    clearAll()
    {
        if (loadTimeData.getBoolean("allowDeletingHistory"))
        {
            this.mojoHandler_.clearAll();
            this.search("")
        }
    }
    loadMore()
    {
        this.mojoHandler_.getDownloads(this.searchTerms_)
    }
    isSearching()
    {
        return this.searchTerms_.length > 0
    }
    search(searchText)
    {
        const searchTerms = SearchService.splitTerms(searchText);
        let sameTerms = searchTerms.length === this.searchTerms_.length;
        for (let i = 0; sameTerms && i < searchTerms.length; ++i)
        {
            if (searchTerms[i] !== this.searchTerms_[i])
            {
                sameTerms = false
            }
        }
        if (sameTerms)
        {
            return false
        }
        this.searchTerms_ = searchTerms;
        this.loadMore();
        return true
    }
}
addSingletonGetter(SearchService); // Copyright 2015 The Chromium Authors. All rights reserved.
Polymer({
    is: "downloads-toolbar",
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="downloads-toolbar">:host {
  align-items: center;
    display: flex;
    min-height: 56px;
}

#toolbar {
  flex: 1;
}

cr-icon-button {
  --cr-icon-button-fill-color-focus: var(--cr-toolbar-background-color);
    justify-content: flex-end;
    margin: 4px;
}

@media (prefers-color-scheme: light) {
cr-icon-button {
  --cr-icon-button-fill-color: currentColor;
}

}

</style>
<cr-toolbar id="toolbar" page-name="Stažené soubory" search-prompt="Hledat stažené soubory" clear-label="Vymazat vyhledávání" spinner-active="{{spinnerActive}}" on-search-changed="onSearchChanged_">
  <cr-icon-button id="moreActions" iron-icon="cr:more-vert" class="dropdown-trigger" title="Další akce" on-click="onMoreActionsTap_" aria-haspopup="menu"></cr-icon-button>
</cr-toolbar>
<cr-action-menu id="moreActionsMenu" role-description="Akce">
  <button class="dropdown-item clear-all" on-click="onClearAllTap_">
    Vymazat vše
  </button>
  <button class="dropdown-item" on-click="onOpenDownloadsFolderTap_">
    Otevřít složku stažených souborů
  </button>
</cr-action-menu>
<!--_html_template_end_-->`,
    properties:
    {
        hasClearableDownloads:
        {
            type: Boolean,
            value: false,
            observer: "updateClearAll_"
        },
        spinnerActive:
        {
            type: Boolean,
            notify: true
        }
    },
    mojoHandler_: null,
    ready()
    {
        this.mojoHandler_ = BrowserProxy.getInstance().handler
    },
    canUndo()
    {
        return !this.isSearchFocused()
    },
    canClearAll()
    {
        return this.getSearchText().length === 0 && this.hasClearableDownloads
    },
    getSearchText()
    {
        return this.$.toolbar.getSearchField().getValue()
    },
    focusOnSearchInput()
    {
        return this.$.toolbar.getSearchField().showAndFocus()
    },
    isSearchFocused()
    {
        return this.$.toolbar.getSearchField().isSearchFocused()
    },
    onClearAllTap_()
    {
        assert(this.canClearAll());
        this.mojoHandler_.clearAll();
        this.$.moreActionsMenu.close();
        getToastManager().show(loadTimeData.getString("toastClearedAll"));
        this.fire("iron-announce",
        {
            text: loadTimeData.getString("undoDescription")
        })
    },
    onMoreActionsTap_()
    {
        this.$.moreActionsMenu.showAt(this.$.moreActions)
    },
    onSearchChanged_(event)
    {
        const searchService = SearchService.getInstance();
        if (searchService.search(event.detail))
        {
            this.spinnerActive = searchService.isSearching()
        }
        this.updateClearAll_()
    },
    onOpenDownloadsFolderTap_()
    {
        this.mojoHandler_.openDownloadsFolderRequiringGesture();
        this.$.moreActionsMenu.close()
    },
    updateClearAll_()
    {
        this.$$(".clear-all").hidden = !this.canClearAll()
    }
}); // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const parseHtmlSubset = function() {
    const allowedAttributes = {
        href(node, value)
        {
            return node.tagName === "A" && (value.startsWith("chrome://") || value.startsWith("https://"))
        },
        target(node, value)
        {
            return node.tagName === "A" && value === "_blank"
        }
    };
    const allowedTags = ["A", "B", "SPAN", "STRONG"];

    function merge(var_args)
    {
        const clone = {};
        for (let i = 0; i < arguments.length; ++i)
        {
            if (typeof arguments[i] === "object")
            {
                for (const key in arguments[i])
                {
                    if (arguments[i].hasOwnProperty(key))
                    {
                        clone[key] = arguments[i][key]
                    }
                }
            }
        }
        return clone
    }

    function walk(n, f)
    {
        f(n);
        for (let i = 0; i < n.childNodes.length; i++)
        {
            walk(n.childNodes[i], f)
        }
    }

    function assertElement(tags, node)
    {
        if (tags.indexOf(node.tagName) === -1)
        {
            throw Error(node.tagName + " is not supported")
        }
    }

    function assertAttribute(attrs, attrNode, node)
    {
        const n = attrNode.nodeName;
        const v = attrNode.nodeValue;
        if (!attrs.hasOwnProperty(n) || !attrs[n](node, v))
        {
            throw Error(node.tagName + "[" + n + '="' + v + '"] is not supported')
        }
    }
    return function(s, opt_extraTags, opt_extraAttrs)
    {
        const extraTags = (opt_extraTags || []).map(function(str)
        {
            return str.toUpperCase()
        });
        const tags = allowedTags.concat(extraTags);
        const attrs = merge(allowedAttributes, opt_extraAttrs ||
        {});
        const doc = document.implementation.createHTMLDocument("");
        const r = doc.createRange();
        r.selectNode(doc.body);
        const df = r.createContextualFragment(s);
        walk(df, function(node)
        {
            switch (node.nodeType)
            {
                case Node.ELEMENT_NODE:
                    assertElement(tags, node);
                    const nodeAttrs = node.attributes;
                    for (let i = 0; i < nodeAttrs.length; ++i)
                    {
                        assertAttribute(attrs, nodeAttrs[i], node)
                    }
                    break;
                case Node.COMMENT_NODE:
                case Node.DOCUMENT_FRAGMENT_NODE:
                case Node.TEXT_NODE:
                    break;
                default:
                    throw Error("Node type " + node.nodeType + " is not supported")
            }
        });
        return df
    }
}(); // Copyright 2015 The Chromium Authors. All rights reserved.
const I18nBehavior = {
    properties:
    {
        locale:
        {
            type: String,
            value: ""
        }
    },
    i18nRaw_(id, var_args)
    {
        return arguments.length === 1 ? loadTimeData.getString(id) : loadTimeData.getStringF.apply(loadTimeData, arguments)
    },
    i18n(id, var_args)
    {
        const rawString = this.i18nRaw_.apply(this, arguments);
        return parseHtmlSubset("<b>" + rawString + "</b>").firstChild.textContent
    },
    i18nAdvanced(id, opts)
    {
        opts = opts ||
        {};
        const args = [id].concat(opts.substitutions || []);
        const rawString = this.i18nRaw_.apply(this, args);
        return loadTimeData.sanitizeInnerHtml(rawString, opts)
    },
    i18nDynamic(locale, id, var_args)
    {
        return this.i18n.apply(this, Array.prototype.slice.call(arguments, 1))
    },
    i18nRecursive(locale, id, var_args)
    {
        let args = Array.prototype.slice.call(arguments, 2);
        if (args.length > 0)
        {
            const self = this;
            args = args.map(function(str)
            {
                return self.i18nExists(str) ? loadTimeData.getString(str) : str
            })
        }
        return this.i18nDynamic.apply(this, [locale, id].concat(args))
    },
    i18nExists(id)
    {
        return loadTimeData.valueExists(id)
    },
    i18nUpdateLocale()
    {
        this.locale = undefined;
        this.locale = loadTimeData.getString("language")
    }
}; // Copyright 2016 The Chromium Authors. All rights reserved.
var WebUIListenerBehavior = {
    properties:
    {
        webUIListeners_:
        {
            type: Array,
            value()
            {
                return []
            }
        }
    },
    addWebUIListener(eventName, callback)
    {
        this.webUIListeners_.push(addWebUIListener(eventName, callback))
    },
    detached()
    {
        while (this.webUIListeners_.length > 0)
        {
            removeWebUIListener(this.webUIListeners_.pop())
        }
    }
}; // Copyright 2018 The Chromium Authors. All rights reserved.
Polymer({
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style scope="managed-footnote">:host {
  align-items: center;
        border-top: 1px solid var(--cr-separator-color);
        color: var(--cr-secondary-text-color);
        display: none;
        
        font-size: 0.8125rem;
        justify-content: center;
        padding: 0 24px;
}

:host([is-managed_]) {
  display: flex;
}

a[href] {
  color: var(--cr-link-color);
        text-decoration: none;
}

iron-icon {
  align-self: flex-start;
        flex-shrink: 0;
        height: 20px;
        padding-inline-end: var(--managed-footnote-icon-padding, 8px);
        width: 20px;
}

</style>

    <template is="dom-if" if="[[isManaged_]]">
      <iron-icon icon="cr:domain"></iron-icon>
      <div id="content" inner-h-t-m-l="[[getManagementString_(showDeviceInfo)]]">
      </div>
    </template>
<!--_html_template_end_-->`,
    is: "managed-footnote",
    behaviors: [I18nBehavior, WebUIListenerBehavior],
    properties:
    {
        isManaged_:
        {
            reflectToAttribute: true,
            type: Boolean,
            value()
            {
                return loadTimeData.getBoolean("isManaged")
            }
        },
        showDeviceInfo:
        {
            type: Boolean,
            value: false
        }
    },
    ready()
    {
        this.addWebUIListener("is-managed-changed", managed =>
        {
            loadTimeData.overrideValues(
            {
                isManaged: managed
            });
            this.isManaged_ = managed
        })
    },
    getManagementString_()
    {
        // 
        return this.i18nAdvanced("browserManagedByOrg")
    }
});
chrome.send("observeManagedUI");
const template$9 = document.createElement("template");
template$9.innerHTML = `<dom-module id="cr-page-host-style" assetpath="chrome://resources/">\n  <template>\n    <style scope="cr-page-host-style">:host {\n  color: var(--cr-primary-text-color);\n        line-height: 154%; \n        overflow: hidden; \n        user-select: text;\n}\n\n</style>\n  </template>\n</dom-module>\n`;
document.body.appendChild(template$9.content.cloneNode(true));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var ORPHANS = new Set;
const IronResizableBehavior = {
    properties:
    {
        _parentResizable:
        {
            type: Object,
            observer: "_parentResizableChanged"
        },
        _notifyingDescendant:
        {
            type: Boolean,
            value: false
        }
    },
    listeners:
    {
        "iron-request-resize-notifications": "_onIronRequestResizeNotifications"
    },
    created: function()
    {
        this._interestedResizables = [];
        this._boundNotifyResize = this.notifyResize.bind(this);
        this._boundOnDescendantIronResize = this._onDescendantIronResize.bind(this)
    },
    attached: function()
    {
        this._requestResizeNotifications()
    },
    detached: function()
    {
        if (this._parentResizable)
        {
            this._parentResizable.stopResizeNotificationsFor(this)
        }
        else
        {
            ORPHANS.delete(this);
            window.removeEventListener("resize", this._boundNotifyResize)
        }
        this._parentResizable = null
    },
    notifyResize: function()
    {
        if (!this.isAttached)
        {
            return
        }
        this._interestedResizables.forEach(function(resizable)
        {
            if (this.resizerShouldNotify(resizable))
            {
                this._notifyDescendant(resizable)
            }
        }, this);
        this._fireResize()
    },
    assignParentResizable: function(parentResizable)
    {
        if (this._parentResizable)
        {
            this._parentResizable.stopResizeNotificationsFor(this)
        }
        this._parentResizable = parentResizable;
        if (parentResizable && parentResizable._interestedResizables.indexOf(this) === -1)
        {
            parentResizable._interestedResizables.push(this);
            parentResizable._subscribeIronResize(this)
        }
    },
    stopResizeNotificationsFor: function(target)
    {
        var index = this._interestedResizables.indexOf(target);
        if (index > -1)
        {
            this._interestedResizables.splice(index, 1);
            this._unsubscribeIronResize(target)
        }
    },
    _subscribeIronResize: function(target)
    {
        target.addEventListener("iron-resize", this._boundOnDescendantIronResize)
    },
    _unsubscribeIronResize: function(target)
    {
        target.removeEventListener("iron-resize", this._boundOnDescendantIronResize)
    },
    resizerShouldNotify: function(element)
    {
        return true
    },
    _onDescendantIronResize: function(event)
    {
        if (this._notifyingDescendant)
        {
            event.stopPropagation();
            return
        }
        if (!useShadow)
        {
            this._fireResize()
        }
    },
    _fireResize: function()
    {
        this.fire("iron-resize", null,
        {
            node: this,
            bubbles: false
        })
    },
    _onIronRequestResizeNotifications: function(event)
    {
        var target = dom(event).rootTarget;
        if (target === this)
        {
            return
        }
        target.assignParentResizable(this);
        this._notifyDescendant(target);
        event.stopPropagation()
    },
    _parentResizableChanged: function(parentResizable)
    {
        if (parentResizable)
        {
            window.removeEventListener("resize", this._boundNotifyResize)
        }
    },
    _notifyDescendant: function(descendant)
    {
        if (!this.isAttached)
        {
            return
        }
        this._notifyingDescendant = true;
        descendant.notifyResize();
        this._notifyingDescendant = false
    },
    _requestResizeNotifications: function()
    {
        if (!this.isAttached)
        {
            return
        }
        if (document.readyState === "loading")
        {
            var _requestResizeNotifications = this._requestResizeNotifications.bind(this);
            document.addEventListener("readystatechange", function readystatechanged()
            {
                document.removeEventListener("readystatechange", readystatechanged);
                _requestResizeNotifications()
            })
        }
        else
        {
            this._findParent();
            if (!this._parentResizable)
            {
                ORPHANS.forEach(function(orphan)
                {
                    if (orphan !== this)
                    {
                        orphan._findParent()
                    }
                }, this);
                window.addEventListener("resize", this._boundNotifyResize);
                this.notifyResize()
            }
            else
            {
                this._parentResizable._interestedResizables.forEach(function(resizable)
                {
                    if (resizable !== this)
                    {
                        resizable._findParent()
                    }
                }, this)
            }
        }
    },
    _findParent: function()
    {
        this.assignParentResizable(null);
        this.fire("iron-request-resize-notifications", null,
        {
            node: this,
            bubbles: true,
            cancelable: true
        });
        if (!this._parentResizable)
        {
            ORPHANS.add(this)
        }
        else
        {
            ORPHANS.delete(this)
        }
    }
};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const IronScrollTargetBehavior = {
    properties:
    {
        scrollTarget:
        {
            type: HTMLElement,
            value: function()
            {
                return this._defaultScrollTarget
            }
        }
    },
    observers: ["_scrollTargetChanged(scrollTarget, isAttached)"],
    _shouldHaveListener: true,
    _scrollTargetChanged: function(scrollTarget, isAttached)
    {
        if (this._oldScrollTarget)
        {
            this._toggleScrollListener(false, this._oldScrollTarget);
            this._oldScrollTarget = null
        }
        if (!isAttached)
        {
            return
        }
        if (scrollTarget === "document")
        {
            this.scrollTarget = this._doc
        }
        else if (typeof scrollTarget === "string")
        {
            var domHost = this.domHost;
            this.scrollTarget = domHost && domHost.$ ? domHost.$[scrollTarget] : dom(this.ownerDocument).querySelector("#" + scrollTarget)
        }
        else if (this._isValidScrollTarget())
        {
            this._oldScrollTarget = scrollTarget;
            this._toggleScrollListener(this._shouldHaveListener, scrollTarget)
        }
    },
    _scrollHandler: function scrollHandler()
    {},
    get _defaultScrollTarget()
    {
        return this._doc
    },
    get _doc()
    {
        return this.ownerDocument.documentElement
    },
    get _scrollTop()
    {
        if (this._isValidScrollTarget())
        {
            return this.scrollTarget === this._doc ? window.pageYOffset : this.scrollTarget.scrollTop
        }
        return 0
    },
    get _scrollLeft()
    {
        if (this._isValidScrollTarget())
        {
            return this.scrollTarget === this._doc ? window.pageXOffset : this.scrollTarget.scrollLeft
        }
        return 0
    },
    set _scrollTop(top)
    {
        if (this.scrollTarget === this._doc)
        {
            window.scrollTo(window.pageXOffset, top)
        }
        else if (this._isValidScrollTarget())
        {
            this.scrollTarget.scrollTop = top
        }
    },
    set _scrollLeft(left)
    {
        if (this.scrollTarget === this._doc)
        {
            window.scrollTo(left, window.pageYOffset)
        }
        else if (this._isValidScrollTarget())
        {
            this.scrollTarget.scrollLeft = left
        }
    },
    scroll: function(leftOrOptions, top)
    {
        var left;
        if (typeof leftOrOptions === "object")
        {
            left = leftOrOptions.left;
            top = leftOrOptions.top
        }
        else
        {
            left = leftOrOptions
        }
        left = left || 0;
        top = top || 0;
        if (this.scrollTarget === this._doc)
        {
            window.scrollTo(left, top)
        }
        else if (this._isValidScrollTarget())
        {
            this.scrollTarget.scrollLeft = left;
            this.scrollTarget.scrollTop = top
        }
    },
    get _scrollTargetWidth()
    {
        if (this._isValidScrollTarget())
        {
            return this.scrollTarget === this._doc ? window.innerWidth : this.scrollTarget.offsetWidth
        }
        return 0
    },
    get _scrollTargetHeight()
    {
        if (this._isValidScrollTarget())
        {
            return this.scrollTarget === this._doc ? window.innerHeight : this.scrollTarget.offsetHeight
        }
        return 0
    },
    _isValidScrollTarget: function()
    {
        return this.scrollTarget instanceof HTMLElement
    },
    _toggleScrollListener: function(yes, scrollTarget)
    {
        var eventTarget = scrollTarget === this._doc ? window : scrollTarget;
        if (yes)
        {
            if (!this._boundScrollHandler)
            {
                this._boundScrollHandler = this._scrollHandler.bind(this);
                eventTarget.addEventListener("scroll", this._boundScrollHandler)
            }
        }
        else
        {
            if (this._boundScrollHandler)
            {
                eventTarget.removeEventListener("scroll", this._boundScrollHandler);
                this._boundScrollHandler = null
            }
        }
    },
    toggleScrollListener: function(yes)
    {
        this._shouldHaveListener = yes;
        this._toggleScrollListener(yes, this.scrollTarget)
    }
};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var IOS = navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/);
var IOS_TOUCH_SCROLLING = IOS && IOS[1] >= 8;
var DEFAULT_PHYSICAL_COUNT = 3;
var HIDDEN_Y = "-10000px";
var SECRET_TABINDEX = -100;
Polymer(
{
    _template: html `<!--css-build:shadow--><style scope="iron-list">:host {
  display: block;
}

@media only screen and (-webkit-max-device-pixel-ratio: 1) {
:host {
  will-change: transform;
}

}

#items {
  ;
        position: relative;
}

:host(:not([grid])) #items > ::slotted(*) {
  width: 100%;
}

#items > ::slotted(*) {
  box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: 0;
        will-change: transform;
}

</style>

    <array-selector id="selector" items="{{items}}" selected="{{selectedItems}}" selected-item="{{selectedItem}}"></array-selector>

    <div id="items">
      <slot></slot>
    </div>
`,
    is: "iron-list",
    properties:
    {
        items:
        {
            type: Array
        },
        as:
        {
            type: String,
            value: "item"
        },
        indexAs:
        {
            type: String,
            value: "index"
        },
        selectedAs:
        {
            type: String,
            value: "selected"
        },
        grid:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            observer: "_gridChanged"
        },
        selectionEnabled:
        {
            type: Boolean,
            value: false
        },
        selectedItem:
        {
            type: Object,
            notify: true
        },
        selectedItems:
        {
            type: Object,
            notify: true
        },
        multiSelection:
        {
            type: Boolean,
            value: false
        },
        scrollOffset:
        {
            type: Number,
            value: 0
        },
        preserveFocus:
        {
            type: Boolean,
            value: false
        }
    },
    observers: ["_itemsChanged(items.*)", "_selectionEnabledChanged(selectionEnabled)", "_multiSelectionChanged(multiSelection)", "_setOverflow(scrollTarget, scrollOffset)"],
    behaviors: [Templatizer, IronResizableBehavior, IronScrollTargetBehavior, OptionalMutableDataBehavior],
    _ratio: .5,
    _scrollerPaddingTop: 0,
    _scrollPosition: 0,
    _physicalSize: 0,
    _physicalAverage: 0,
    _physicalAverageCount: 0,
    _physicalTop: 0,
    _virtualCount: 0,
    _estScrollHeight: 0,
    _scrollHeight: 0,
    _viewportHeight: 0,
    _viewportWidth: 0,
    _physicalItems: null,
    _physicalSizes: null,
    _firstVisibleIndexVal: null,
    _lastVisibleIndexVal: null,
    _maxPages: 2,
    _focusedItem: null,
    _focusedVirtualIndex: -1,
    _focusedPhysicalIndex: -1,
    _offscreenFocusedItem: null,
    _focusBackfillItem: null,
    _itemsPerRow: 1,
    _itemWidth: 0,
    _rowHeight: 0,
    _templateCost: 0,
    _parentModel: true,
    get _physicalBottom()
    {
        return this._physicalTop + this._physicalSize
    },
    get _scrollBottom()
    {
        return this._scrollPosition + this._viewportHeight
    },
    get _virtualEnd()
    {
        return this._virtualStart + this._physicalCount - 1
    },
    get _hiddenContentSize()
    {
        var size = this.grid ? this._physicalRows * this._rowHeight : this._physicalSize;
        return size - this._viewportHeight
    },
    get _itemsParent()
    {
        return dom(dom(this._userTemplate).parentNode)
    },
    get _maxScrollTop()
    {
        return this._estScrollHeight - this._viewportHeight + this._scrollOffset
    },
    get _maxVirtualStart()
    {
        var virtualCount = this._convertIndexToCompleteRow(this._virtualCount);
        return Math.max(0, virtualCount - this._physicalCount)
    },
    set _virtualStart(val)
    {
        val = this._clamp(val, 0, this._maxVirtualStart);
        if (this.grid)
        {
            val = val - val % this._itemsPerRow
        }
        this._virtualStartVal = val
    },
    get _virtualStart()
    {
        return this._virtualStartVal || 0
    },
    set _physicalStart(val)
    {
        val = val % this._physicalCount;
        if (val < 0)
        {
            val = this._physicalCount + val
        }
        if (this.grid)
        {
            val = val - val % this._itemsPerRow
        }
        this._physicalStartVal = val
    },
    get _physicalStart()
    {
        return this._physicalStartVal || 0
    },
    get _physicalEnd()
    {
        return (this._physicalStart + this._physicalCount - 1) % this._physicalCount
    },
    set _physicalCount(val)
    {
        this._physicalCountVal = val
    },
    get _physicalCount()
    {
        return this._physicalCountVal || 0
    },
    get _optPhysicalSize()
    {
        return this._viewportHeight === 0 ? Infinity : this._viewportHeight * this._maxPages
    },
    get _isVisible()
    {
        return Boolean(this.offsetWidth || this.offsetHeight)
    },
    get firstVisibleIndex()
    {
        var idx = this._firstVisibleIndexVal;
        if (idx == null)
        {
            var physicalOffset = this._physicalTop + this._scrollOffset;
            idx = this._iterateItems(function(pidx, vidx)
            {
                physicalOffset += this._getPhysicalSizeIncrement(pidx);
                if (physicalOffset > this._scrollPosition)
                {
                    return this.grid ? vidx - vidx % this._itemsPerRow : vidx
                }
                if (this.grid && this._virtualCount - 1 === vidx)
                {
                    return vidx - vidx % this._itemsPerRow
                }
            }) || 0;
            this._firstVisibleIndexVal = idx
        }
        return idx
    },
    get lastVisibleIndex()
    {
        var idx = this._lastVisibleIndexVal;
        if (idx == null)
        {
            if (this.grid)
            {
                idx = Math.min(this._virtualCount, this.firstVisibleIndex + this._estRowsInView * this._itemsPerRow - 1)
            }
            else
            {
                var physicalOffset = this._physicalTop + this._scrollOffset;
                this._iterateItems(function(pidx, vidx)
                {
                    if (physicalOffset < this._scrollBottom)
                    {
                        idx = vidx
                    }
                    physicalOffset += this._getPhysicalSizeIncrement(pidx)
                })
            }
            this._lastVisibleIndexVal = idx
        }
        return idx
    },
    get _defaultScrollTarget()
    {
        return this
    },
    get _virtualRowCount()
    {
        return Math.ceil(this._virtualCount / this._itemsPerRow)
    },
    get _estRowsInView()
    {
        return Math.ceil(this._viewportHeight / this._rowHeight)
    },
    get _physicalRows()
    {
        return Math.ceil(this._physicalCount / this._itemsPerRow)
    },
    get _scrollOffset()
    {
        return this._scrollerPaddingTop + this.scrollOffset
    },
    ready: function()
    {
        this.addEventListener("focus", this._didFocus.bind(this), true)
    },
    attached: function()
    {
        this._debounce("_render", this._render, animationFrame);
        this.listen(this, "iron-resize", "_resizeHandler");
        this.listen(this, "keydown", "_keydownHandler")
    },
    detached: function()
    {
        this.unlisten(this, "iron-resize", "_resizeHandler");
        this.unlisten(this, "keydown", "_keydownHandler")
    },
    _setOverflow: function(scrollTarget)
    {
        this.style.webkitOverflowScrolling = scrollTarget === this ? "touch" : "";
        this.style.overflowY = scrollTarget === this ? "auto" : "";
        this._lastVisibleIndexVal = null;
        this._firstVisibleIndexVal = null;
        this._debounce("_render", this._render, animationFrame)
    },
    updateViewportBoundaries: function()
    {
        var styles = window.getComputedStyle(this);
        this._scrollerPaddingTop = this.scrollTarget === this ? 0 : parseInt(styles["padding-top"], 10);
        this._isRTL = Boolean(styles.direction === "rtl");
        this._viewportWidth = this.$.items.offsetWidth;
        this._viewportHeight = this._scrollTargetHeight;
        this.grid && this._updateGridMetrics()
    },
    _scrollHandler: function()
    {
        var scrollTop = Math.max(0, Math.min(this._maxScrollTop, this._scrollTop));
        var delta = scrollTop - this._scrollPosition;
        var isScrollingDown = delta >= 0;
        this._scrollPosition = scrollTop;
        this._firstVisibleIndexVal = null;
        this._lastVisibleIndexVal = null;
        if (Math.abs(delta) > this._physicalSize && this._physicalSize > 0)
        {
            delta = delta - this._scrollOffset;
            var idxAdjustment = Math.round(delta / this._physicalAverage) * this._itemsPerRow;
            this._virtualStart = this._virtualStart + idxAdjustment;
            this._physicalStart = this._physicalStart + idxAdjustment;
            this._physicalTop = Math.min(Math.floor(this._virtualStart / this._itemsPerRow) * this._physicalAverage, this._scrollPosition);
            this._update()
        }
        else if (this._physicalCount > 0)
        {
            var reusables = this._getReusables(isScrollingDown);
            if (isScrollingDown)
            {
                this._physicalTop = reusables.physicalTop;
                this._virtualStart = this._virtualStart + reusables.indexes.length;
                this._physicalStart = this._physicalStart + reusables.indexes.length
            }
            else
            {
                this._virtualStart = this._virtualStart - reusables.indexes.length;
                this._physicalStart = this._physicalStart - reusables.indexes.length
            }
            this._update(reusables.indexes, isScrollingDown ? null : reusables.indexes);
            this._debounce("_increasePoolIfNeeded", this._increasePoolIfNeeded.bind(this, 0), microTask)
        }
    },
    _getReusables: function(fromTop)
    {
        var ith, lastIth, offsetContent, physicalItemHeight;
        var idxs = [];
        var protectedOffsetContent = this._hiddenContentSize * this._ratio;
        var virtualStart = this._virtualStart;
        var virtualEnd = this._virtualEnd;
        var physicalCount = this._physicalCount;
        var top = this._physicalTop + this._scrollOffset;
        var bottom = this._physicalBottom + this._scrollOffset;
        var scrollTop = this._scrollPosition;
        var scrollBottom = this._scrollBottom;
        if (fromTop)
        {
            ith = this._physicalStart;
            lastIth = this._physicalEnd;
            offsetContent = scrollTop - top
        }
        else
        {
            ith = this._physicalEnd;
            lastIth = this._physicalStart;
            offsetContent = bottom - scrollBottom
        }
        while (true)
        {
            physicalItemHeight = this._getPhysicalSizeIncrement(ith);
            offsetContent = offsetContent - physicalItemHeight;
            if (idxs.length >= physicalCount || offsetContent <= protectedOffsetContent)
            {
                break
            }
            if (fromTop)
            {
                if (virtualEnd + idxs.length + 1 >= this._virtualCount)
                {
                    break
                }
                if (top + physicalItemHeight >= scrollTop - this._scrollOffset)
                {
                    break
                }
                idxs.push(ith);
                top = top + physicalItemHeight;
                ith = (ith + 1) % physicalCount
            }
            else
            {
                if (virtualStart - idxs.length <= 0)
                {
                    break
                }
                if (top + this._physicalSize - physicalItemHeight <= scrollBottom)
                {
                    break
                }
                idxs.push(ith);
                top = top - physicalItemHeight;
                ith = ith === 0 ? physicalCount - 1 : ith - 1
            }
        }
        return {
            indexes: idxs,
            physicalTop: top - this._scrollOffset
        }
    },
    _update: function(itemSet, movingUp)
    {
        if (itemSet && itemSet.length === 0 || this._physicalCount === 0)
        {
            return
        }
        this._manageFocus();
        this._assignModels(itemSet);
        this._updateMetrics(itemSet);
        if (movingUp)
        {
            while (movingUp.length)
            {
                var idx = movingUp.pop();
                this._physicalTop -= this._getPhysicalSizeIncrement(idx)
            }
        }
        this._positionItems();
        this._updateScrollerSize()
    },
    _createPool: function(size)
    {
        this._ensureTemplatized();
        var i, inst;
        var physicalItems = new Array(size);
        for (i = 0; i < size; i++)
        {
            inst = this.stamp(null);
            physicalItems[i] = inst.root.querySelector("*");
            this._itemsParent.appendChild(inst.root)
        }
        return physicalItems
    },
    _isClientFull: function()
    {
        return this._scrollBottom != 0 && this._physicalBottom - 1 >= this._scrollBottom && this._physicalTop <= this._scrollPosition
    },
    _increasePoolIfNeeded: function(count)
    {
        var nextPhysicalCount = this._clamp(this._physicalCount + count, DEFAULT_PHYSICAL_COUNT, this._virtualCount - this._virtualStart);
        nextPhysicalCount = this._convertIndexToCompleteRow(nextPhysicalCount);
        if (this.grid)
        {
            var correction = nextPhysicalCount % this._itemsPerRow;
            if (correction && nextPhysicalCount - correction <= this._physicalCount)
            {
                nextPhysicalCount += this._itemsPerRow
            }
            nextPhysicalCount -= correction
        }
        var delta = nextPhysicalCount - this._physicalCount;
        var nextIncrease = Math.round(this._physicalCount * .5);
        if (delta < 0)
        {
            return
        }
        if (delta > 0)
        {
            var ts = window.performance.now();
            [].push.apply(this._physicalItems, this._createPool(delta));
            for (var i = 0; i < delta; i++)
            {
                this._physicalSizes.push(0)
            }
            this._physicalCount = this._physicalCount + delta;
            if (this._physicalStart > this._physicalEnd && this._isIndexRendered(this._focusedVirtualIndex) && this._getPhysicalIndex(this._focusedVirtualIndex) < this._physicalEnd)
            {
                this._physicalStart = this._physicalStart + delta
            }
            this._update();
            this._templateCost = (window.performance.now() - ts) / delta;
            nextIncrease = Math.round(this._physicalCount * .5)
        }
        if (this._virtualEnd >= this._virtualCount - 1 || nextIncrease === 0);
        else if (!this._isClientFull())
        {
            this._debounce("_increasePoolIfNeeded", this._increasePoolIfNeeded.bind(this, nextIncrease), microTask)
        }
        else if (this._physicalSize < this._optPhysicalSize)
        {
            this._debounce("_increasePoolIfNeeded", this._increasePoolIfNeeded.bind(this, this._clamp(Math.round(50 / this._templateCost), 1, nextIncrease)), idlePeriod)
        }
    },
    _render: function()
    {
        if (!this.isAttached || !this._isVisible)
        {
            return
        }
        if (this._physicalCount !== 0)
        {
            var reusables = this._getReusables(true);
            this._physicalTop = reusables.physicalTop;
            this._virtualStart = this._virtualStart + reusables.indexes.length;
            this._physicalStart = this._physicalStart + reusables.indexes.length;
            this._update(reusables.indexes);
            this._update();
            this._increasePoolIfNeeded(0)
        }
        else if (this._virtualCount > 0)
        {
            this.updateViewportBoundaries();
            this._increasePoolIfNeeded(DEFAULT_PHYSICAL_COUNT)
        }
    },
    _ensureTemplatized: function()
    {
        if (this.ctor)
        {
            return
        }
        this._userTemplate = this.queryEffectiveChildren("template");
        if (!this._userTemplate)
        {
            console.warn("iron-list requires a template to be provided in light-dom")
        }
        var instanceProps = {};
        instanceProps.__key__ = true;
        instanceProps[this.as] = true;
        instanceProps[this.indexAs] = true;
        instanceProps[this.selectedAs] = true;
        instanceProps.tabIndex = true;
        this._instanceProps = instanceProps;
        this.templatize(this._userTemplate, this.mutableData)
    },
    _gridChanged: function(newGrid, oldGrid)
    {
        if (typeof oldGrid === "undefined") return;
        this.notifyResize();
        flush();
        newGrid && this._updateGridMetrics()
    },
    _getFocusedElement: function()
    {
        function doSearch(node, query)
        {
            let result = null;
            let type = node.nodeType;
            if (type == Node.ELEMENT_NODE || type == Node.DOCUMENT_FRAGMENT_NODE) result = node.querySelector(query);
            if (result) return result;
            let child = node.firstChild;
            while (child !== null && result === null)
            {
                result = doSearch(child, query);
                child = child.nextSibling
            }
            if (result) return result;
            const shadowRoot = node.shadowRoot;
            return shadowRoot ? doSearch(shadowRoot, query) : null
        }
        const focusWithin = doSearch(this, ":focus-within");
        return focusWithin ? doSearch(focusWithin, ":focus") : null
    },
    _itemsChanged: function(change)
    {
        var rendering = /^items(\.splices){0,1}$/.test(change.path);
        var lastFocusedIndex, focusedElement;
        if (rendering && this.preserveFocus)
        {
            lastFocusedIndex = this._focusedVirtualIndex;
            focusedElement = this._getFocusedElement()
        }
        var preservingFocus = rendering && this.preserveFocus && focusedElement;
        if (change.path === "items")
        {
            this._virtualStart = 0;
            this._physicalTop = 0;
            this._virtualCount = this.items ? this.items.length : 0;
            this._physicalIndexForKey = {};
            this._firstVisibleIndexVal = null;
            this._lastVisibleIndexVal = null;
            this._physicalCount = this._physicalCount || 0;
            this._physicalItems = this._physicalItems || [];
            this._physicalSizes = this._physicalSizes || [];
            this._physicalStart = 0;
            if (this._scrollTop > this._scrollOffset && !preservingFocus)
            {
                this._resetScrollPosition(0)
            }
            this._removeFocusedItem();
            this._debounce("_render", this._render, animationFrame)
        }
        else if (change.path === "items.splices")
        {
            this._adjustVirtualIndex(change.value.indexSplices);
            this._virtualCount = this.items ? this.items.length : 0;
            var itemAddedOrRemoved = change.value.indexSplices.some(function(splice)
            {
                return splice.addedCount > 0 || splice.removed.length > 0
            });
            if (itemAddedOrRemoved)
            {
                var activeElement = this._getActiveElement();
                if (this.contains(activeElement))
                {
                    activeElement.blur()
                }
            }
            var affectedIndexRendered = change.value.indexSplices.some(function(splice)
            {
                return splice.index + splice.addedCount >= this._virtualStart && splice.index <= this._virtualEnd
            }, this);
            if (!this._isClientFull() || affectedIndexRendered)
            {
                this._debounce("_render", this._render, animationFrame)
            }
        }
        else if (change.path !== "items.length")
        {
            this._forwardItemPath(change.path, change.value)
        }
        if (preservingFocus)
        {
            flush();
            focusedElement.blur();
            this._focusPhysicalItem(Math.min(this.items.length - 1, lastFocusedIndex));
            if (!this._isIndexVisible(this._focusedVirtualIndex))
            {
                this.scrollToIndex(this._focusedVirtualIndex)
            }
        }
    },
    _forwardItemPath: function(path, value)
    {
        path = path.slice(6);
        var dot = path.indexOf(".");
        if (dot === -1)
        {
            dot = path.length
        }
        var isIndexRendered;
        var pidx;
        var inst;
        var offscreenInstance = this.modelForElement(this._offscreenFocusedItem);
        var vidx = parseInt(path.substring(0, dot), 10);
        isIndexRendered = this._isIndexRendered(vidx);
        if (isIndexRendered)
        {
            pidx = this._getPhysicalIndex(vidx);
            inst = this.modelForElement(this._physicalItems[pidx])
        }
        else if (offscreenInstance)
        {
            inst = offscreenInstance
        }
        if (!inst || inst[this.indexAs] !== vidx)
        {
            return
        }
        path = path.substring(dot + 1);
        path = this.as + (path ? "." + path : "");
        inst._setPendingPropertyOrPath(path, value, false, true);
        inst._flushProperties && inst._flushProperties();
        if (isIndexRendered)
        {
            this._updateMetrics([pidx]);
            this._positionItems();
            this._updateScrollerSize()
        }
    },
    _adjustVirtualIndex: function(splices)
    {
        splices.forEach(function(splice)
        {
            splice.removed.forEach(this._removeItem, this);
            if (splice.index < this._virtualStart)
            {
                var delta = Math.max(splice.addedCount - splice.removed.length, splice.index - this._virtualStart);
                this._virtualStart = this._virtualStart + delta;
                if (this._focusedVirtualIndex >= 0)
                {
                    this._focusedVirtualIndex = this._focusedVirtualIndex + delta
                }
            }
        }, this)
    },
    _removeItem: function(item)
    {
        this.$.selector.deselect(item);
        if (this._focusedItem && this.modelForElement(this._focusedItem)[this.as] === item)
        {
            this._removeFocusedItem()
        }
    },
    _iterateItems: function(fn, itemSet)
    {
        var pidx, vidx, rtn, i;
        if (arguments.length === 2 && itemSet)
        {
            for (i = 0; i < itemSet.length; i++)
            {
                pidx = itemSet[i];
                vidx = this._computeVidx(pidx);
                if ((rtn = fn.call(this, pidx, vidx)) != null)
                {
                    return rtn
                }
            }
        }
        else
        {
            pidx = this._physicalStart;
            vidx = this._virtualStart;
            for (; pidx < this._physicalCount; pidx++, vidx++)
            {
                if ((rtn = fn.call(this, pidx, vidx)) != null)
                {
                    return rtn
                }
            }
            for (pidx = 0; pidx < this._physicalStart; pidx++, vidx++)
            {
                if ((rtn = fn.call(this, pidx, vidx)) != null)
                {
                    return rtn
                }
            }
        }
    },
    _computeVidx: function(pidx)
    {
        if (pidx >= this._physicalStart)
        {
            return this._virtualStart + (pidx - this._physicalStart)
        }
        return this._virtualStart + (this._physicalCount - this._physicalStart) + pidx
    },
    _assignModels: function(itemSet)
    {
        this._iterateItems(function(pidx, vidx)
        {
            var el = this._physicalItems[pidx];
            var item = this.items && this.items[vidx];
            if (item != null)
            {
                var inst = this.modelForElement(el);
                inst.__key__ = null;
                this._forwardProperty(inst, this.as, item);
                this._forwardProperty(inst, this.selectedAs, this.$.selector.isSelected(item));
                this._forwardProperty(inst, this.indexAs, vidx);
                this._forwardProperty(inst, "tabIndex", this._focusedVirtualIndex === vidx ? 0 : -1);
                this._physicalIndexForKey[inst.__key__] = pidx;
                inst._flushProperties && inst._flushProperties(true);
                el.removeAttribute("hidden")
            }
            else
            {
                el.setAttribute("hidden", "")
            }
        }, itemSet)
    },
    _updateMetrics: function(itemSet)
    {
        flush();
        var newPhysicalSize = 0;
        var oldPhysicalSize = 0;
        var prevAvgCount = this._physicalAverageCount;
        var prevPhysicalAvg = this._physicalAverage;
        this._iterateItems(function(pidx, vidx)
        {
            oldPhysicalSize += this._physicalSizes[pidx];
            this._physicalSizes[pidx] = this._physicalItems[pidx].offsetHeight;
            newPhysicalSize += this._physicalSizes[pidx];
            this._physicalAverageCount += this._physicalSizes[pidx] ? 1 : 0
        }, itemSet);
        if (this.grid)
        {
            this._updateGridMetrics();
            this._physicalSize = Math.ceil(this._physicalCount / this._itemsPerRow) * this._rowHeight
        }
        else
        {
            oldPhysicalSize = this._itemsPerRow === 1 ? oldPhysicalSize : Math.ceil(this._physicalCount / this._itemsPerRow) * this._rowHeight;
            this._physicalSize = this._physicalSize + newPhysicalSize - oldPhysicalSize;
            this._itemsPerRow = 1
        }
        if (this._physicalAverageCount !== prevAvgCount)
        {
            this._physicalAverage = Math.round((prevPhysicalAvg * prevAvgCount + newPhysicalSize) / this._physicalAverageCount)
        }
    },
    _updateGridMetrics: function()
    {
        this._itemWidth = this._physicalCount > 0 ? this._physicalItems[0].getBoundingClientRect().width : 200;
        this._rowHeight = this._physicalCount > 0 ? this._physicalItems[0].offsetHeight : 200;
        this._itemsPerRow = this._itemWidth ? Math.floor(this._viewportWidth / this._itemWidth) : this._itemsPerRow
    },
    _positionItems: function()
    {
        this._adjustScrollPosition();
        var y = this._physicalTop;
        if (this.grid)
        {
            var totalItemWidth = this._itemsPerRow * this._itemWidth;
            var rowOffset = (this._viewportWidth - totalItemWidth) / 2;
            this._iterateItems(function(pidx, vidx)
            {
                var modulus = vidx % this._itemsPerRow;
                var x = Math.floor(modulus * this._itemWidth + rowOffset);
                if (this._isRTL)
                {
                    x = x * -1
                }
                this.translate3d(x + "px", y + "px", 0, this._physicalItems[pidx]);
                if (this._shouldRenderNextRow(vidx))
                {
                    y += this._rowHeight
                }
            })
        }
        else
        {
            const order = [];
            this._iterateItems(function(pidx, vidx)
            {
                const item = this._physicalItems[pidx];
                this.translate3d(0, y + "px", 0, item);
                y += this._physicalSizes[pidx];
                const itemId = item.id;
                if (itemId)
                {
                    order.push(itemId)
                }
            });
            if (order.length)
            {
                this.setAttribute("aria-owns", order.join(" "))
            }
        }
    },
    _getPhysicalSizeIncrement: function(pidx)
    {
        if (!this.grid)
        {
            return this._physicalSizes[pidx]
        }
        if (this._computeVidx(pidx) % this._itemsPerRow !== this._itemsPerRow - 1)
        {
            return 0
        }
        return this._rowHeight
    },
    _shouldRenderNextRow: function(vidx)
    {
        return vidx % this._itemsPerRow === this._itemsPerRow - 1
    },
    _adjustScrollPosition: function()
    {
        var deltaHeight = this._virtualStart === 0 ? this._physicalTop : Math.min(this._scrollPosition + this._physicalTop, 0);
        if (deltaHeight !== 0)
        {
            this._physicalTop = this._physicalTop - deltaHeight;
            var scrollTop = this._scrollPosition;
            if (!IOS_TOUCH_SCROLLING && scrollTop > 0)
            {
                this._resetScrollPosition(scrollTop - deltaHeight)
            }
        }
    },
    _resetScrollPosition: function(pos)
    {
        if (this.scrollTarget && pos >= 0)
        {
            this._scrollTop = pos;
            this._scrollPosition = this._scrollTop
        }
    },
    _updateScrollerSize: function(forceUpdate)
    {
        if (this.grid)
        {
            this._estScrollHeight = this._virtualRowCount * this._rowHeight
        }
        else
        {
            this._estScrollHeight = this._physicalBottom + Math.max(this._virtualCount - this._physicalCount - this._virtualStart, 0) * this._physicalAverage
        }
        forceUpdate = forceUpdate || this._scrollHeight === 0;
        forceUpdate = forceUpdate || this._scrollPosition >= this._estScrollHeight - this._physicalSize;
        forceUpdate = forceUpdate || this.grid && this.$.items.style.height < this._estScrollHeight;
        if (forceUpdate || Math.abs(this._estScrollHeight - this._scrollHeight) >= this._viewportHeight)
        {
            this.$.items.style.height = this._estScrollHeight + "px";
            this._scrollHeight = this._estScrollHeight
        }
    },
    scrollToItem: function(item)
    {
        return this.scrollToIndex(this.items.indexOf(item))
    },
    scrollToIndex: function(idx)
    {
        if (typeof idx !== "number" || idx < 0 || idx > this.items.length - 1)
        {
            return
        }
        flush();
        if (this._physicalCount === 0)
        {
            return
        }
        idx = this._clamp(idx, 0, this._virtualCount - 1);
        if (!this._isIndexRendered(idx) || idx >= this._maxVirtualStart)
        {
            this._virtualStart = this.grid ? idx - this._itemsPerRow * 2 : idx - 1
        }
        this._manageFocus();
        this._assignModels();
        this._updateMetrics();
        this._physicalTop = Math.floor(this._virtualStart / this._itemsPerRow) * this._physicalAverage;
        var currentTopItem = this._physicalStart;
        var currentVirtualItem = this._virtualStart;
        var targetOffsetTop = 0;
        var hiddenContentSize = this._hiddenContentSize;
        while (currentVirtualItem < idx && targetOffsetTop <= hiddenContentSize)
        {
            targetOffsetTop = targetOffsetTop + this._getPhysicalSizeIncrement(currentTopItem);
            currentTopItem = (currentTopItem + 1) % this._physicalCount;
            currentVirtualItem++
        }
        this._updateScrollerSize(true);
        this._positionItems();
        this._resetScrollPosition(this._physicalTop + this._scrollOffset + targetOffsetTop);
        this._increasePoolIfNeeded(0);
        this._firstVisibleIndexVal = null;
        this._lastVisibleIndexVal = null
    },
    _resetAverage: function()
    {
        this._physicalAverage = 0;
        this._physicalAverageCount = 0
    },
    _resizeHandler: function()
    {
        this._debounce("_render", function()
        {
            this._firstVisibleIndexVal = null;
            this._lastVisibleIndexVal = null;
            if (this._isVisible)
            {
                this.updateViewportBoundaries();
                this.toggleScrollListener(true);
                this._resetAverage();
                this._render()
            }
            else
            {
                this.toggleScrollListener(false)
            }
        }, animationFrame)
    },
    selectItem: function(item)
    {
        return this.selectIndex(this.items.indexOf(item))
    },
    selectIndex: function(index)
    {
        if (index < 0 || index >= this._virtualCount)
        {
            return
        }
        if (!this.multiSelection && this.selectedItem)
        {
            this.clearSelection()
        }
        if (this._isIndexRendered(index))
        {
            var model = this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);
            if (model)
            {
                model[this.selectedAs] = true
            }
            this.updateSizeForIndex(index)
        }
        this.$.selector.selectIndex(index)
    },
    deselectItem: function(item)
    {
        return this.deselectIndex(this.items.indexOf(item))
    },
    deselectIndex: function(index)
    {
        if (index < 0 || index >= this._virtualCount)
        {
            return
        }
        if (this._isIndexRendered(index))
        {
            var model = this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);
            model[this.selectedAs] = false;
            this.updateSizeForIndex(index)
        }
        this.$.selector.deselectIndex(index)
    },
    toggleSelectionForItem: function(item)
    {
        return this.toggleSelectionForIndex(this.items.indexOf(item))
    },
    toggleSelectionForIndex: function(index)
    {
        var isSelected = this.$.selector.isIndexSelected ? this.$.selector.isIndexSelected(index) : this.$.selector.isSelected(this.items[index]);
        isSelected ? this.deselectIndex(index) : this.selectIndex(index)
    },
    clearSelection: function()
    {
        this._iterateItems(function(pidx, vidx)
        {
            this.modelForElement(this._physicalItems[pidx])[this.selectedAs] = false
        });
        this.$.selector.clearSelection()
    },
    _selectionEnabledChanged: function(selectionEnabled)
    {
        var handler = selectionEnabled ? this.listen : this.unlisten;
        handler.call(this, this, "tap", "_selectionHandler")
    },
    _selectionHandler: function(e)
    {
        var model = this.modelForElement(e.target);
        if (!model)
        {
            return
        }
        var modelTabIndex, activeElTabIndex;
        var target = dom(e).path[0];
        var activeEl = this._getActiveElement();
        var physicalItem = this._physicalItems[this._getPhysicalIndex(model[this.indexAs])];
        if (target.localName === "input" || target.localName === "button" || target.localName === "select")
        {
            return
        }
        modelTabIndex = model.tabIndex;
        model.tabIndex = SECRET_TABINDEX;
        activeElTabIndex = activeEl ? activeEl.tabIndex : -1;
        model.tabIndex = modelTabIndex;
        if (activeEl && physicalItem !== activeEl && physicalItem.contains(activeEl) && activeElTabIndex !== SECRET_TABINDEX)
        {
            return
        }
        this.toggleSelectionForItem(model[this.as])
    },
    _multiSelectionChanged: function(multiSelection)
    {
        this.clearSelection();
        this.$.selector.multi = multiSelection
    },
    updateSizeForItem: function(item)
    {
        return this.updateSizeForIndex(this.items.indexOf(item))
    },
    updateSizeForIndex: function(index)
    {
        if (!this._isIndexRendered(index))
        {
            return null
        }
        this._updateMetrics([this._getPhysicalIndex(index)]);
        this._positionItems();
        return null
    },
    _manageFocus: function()
    {
        var fidx = this._focusedVirtualIndex;
        if (fidx >= 0 && fidx < this._virtualCount)
        {
            if (this._isIndexRendered(fidx))
            {
                this._restoreFocusedItem()
            }
            else
            {
                this._createFocusBackfillItem()
            }
        }
        else if (this._virtualCount > 0 && this._physicalCount > 0)
        {
            this._focusedPhysicalIndex = this._physicalStart;
            this._focusedVirtualIndex = this._virtualStart;
            this._focusedItem = this._physicalItems[this._physicalStart]
        }
    },
    _convertIndexToCompleteRow: function(idx)
    {
        this._itemsPerRow = this._itemsPerRow || 1;
        return this.grid ? Math.ceil(idx / this._itemsPerRow) * this._itemsPerRow : idx
    },
    _isIndexRendered: function(idx)
    {
        return idx >= this._virtualStart && idx <= this._virtualEnd
    },
    _isIndexVisible: function(idx)
    {
        return idx >= this.firstVisibleIndex && idx <= this.lastVisibleIndex
    },
    _getPhysicalIndex: function(vidx)
    {
        return (this._physicalStart + (vidx - this._virtualStart)) % this._physicalCount
    },
    focusItem: function(idx)
    {
        this._focusPhysicalItem(idx)
    },
    _focusPhysicalItem: function(idx)
    {
        if (idx < 0 || idx >= this._virtualCount)
        {
            return
        }
        this._restoreFocusedItem();
        if (!this._isIndexRendered(idx))
        {
            this.scrollToIndex(idx)
        }
        var physicalItem = this._physicalItems[this._getPhysicalIndex(idx)];
        var model = this.modelForElement(physicalItem);
        var focusable;
        model.tabIndex = SECRET_TABINDEX;
        if (physicalItem.tabIndex === SECRET_TABINDEX)
        {
            focusable = physicalItem
        }
        if (!focusable)
        {
            focusable = dom(physicalItem).querySelector('[tabindex="' + SECRET_TABINDEX + '"]')
        }
        model.tabIndex = 0;
        this._focusedVirtualIndex = idx;
        focusable && focusable.focus()
    },
    _removeFocusedItem: function()
    {
        if (this._offscreenFocusedItem)
        {
            this._itemsParent.removeChild(this._offscreenFocusedItem)
        }
        this._offscreenFocusedItem = null;
        this._focusBackfillItem = null;
        this._focusedItem = null;
        this._focusedVirtualIndex = -1;
        this._focusedPhysicalIndex = -1
    },
    _createFocusBackfillItem: function()
    {
        var fpidx = this._focusedPhysicalIndex;
        if (this._offscreenFocusedItem || this._focusedVirtualIndex < 0)
        {
            return
        }
        if (!this._focusBackfillItem)
        {
            var inst = this.stamp(null);
            this._focusBackfillItem = inst.root.querySelector("*");
            this._itemsParent.appendChild(inst.root)
        }
        this._offscreenFocusedItem = this._physicalItems[fpidx];
        this.modelForElement(this._offscreenFocusedItem).tabIndex = 0;
        this._physicalItems[fpidx] = this._focusBackfillItem;
        this._focusedPhysicalIndex = fpidx;
        this.translate3d(0, HIDDEN_Y, 0, this._offscreenFocusedItem)
    },
    _restoreFocusedItem: function()
    {
        if (!this._offscreenFocusedItem || this._focusedVirtualIndex < 0)
        {
            return
        }
        this._assignModels();
        var fpidx = this._focusedPhysicalIndex = this._getPhysicalIndex(this._focusedVirtualIndex);
        var onScreenItem = this._physicalItems[fpidx];
        if (!onScreenItem)
        {
            return
        }
        var onScreenInstance = this.modelForElement(onScreenItem);
        var offScreenInstance = this.modelForElement(this._offscreenFocusedItem);
        if (onScreenInstance[this.as] === offScreenInstance[this.as])
        {
            this._focusBackfillItem = onScreenItem;
            onScreenInstance.tabIndex = -1;
            this._physicalItems[fpidx] = this._offscreenFocusedItem;
            this.translate3d(0, HIDDEN_Y, 0, this._focusBackfillItem)
        }
        else
        {
            this._removeFocusedItem();
            this._focusBackfillItem = null
        }
        this._offscreenFocusedItem = null
    },
    _didFocus: function(e)
    {
        var targetModel = this.modelForElement(e.target);
        var focusedModel = this.modelForElement(this._focusedItem);
        var hasOffscreenFocusedItem = this._offscreenFocusedItem !== null;
        var fidx = this._focusedVirtualIndex;
        if (!targetModel)
        {
            return
        }
        if (focusedModel === targetModel)
        {
            if (!this._isIndexVisible(fidx))
            {
                this.scrollToIndex(fidx)
            }
        }
        else
        {
            this._restoreFocusedItem();
            if (focusedModel)
            {
                focusedModel.tabIndex = -1
            }
            targetModel.tabIndex = 0;
            fidx = targetModel[this.indexAs];
            this._focusedVirtualIndex = fidx;
            this._focusedPhysicalIndex = this._getPhysicalIndex(fidx);
            this._focusedItem = this._physicalItems[this._focusedPhysicalIndex];
            if (hasOffscreenFocusedItem && !this._offscreenFocusedItem)
            {
                this._update()
            }
        }
    },
    _keydownHandler: function(e)
    {
        switch (e.keyCode)
        {
            case 40:
                if (this._focusedVirtualIndex < this._virtualCount - 1) e.preventDefault();
                this._focusPhysicalItem(this._focusedVirtualIndex + (this.grid ? this._itemsPerRow : 1));
                break;
            case 39:
                if (this.grid) this._focusPhysicalItem(this._focusedVirtualIndex + (this._isRTL ? -1 : 1));
                break;
            case 38:
                if (this._focusedVirtualIndex > 0) e.preventDefault();
                this._focusPhysicalItem(this._focusedVirtualIndex - (this.grid ? this._itemsPerRow : 1));
                break;
            case 37:
                if (this.grid) this._focusPhysicalItem(this._focusedVirtualIndex + (this._isRTL ? 1 : -1));
                break;
            case 13:
                this._focusPhysicalItem(this._focusedVirtualIndex);
                if (this.selectionEnabled) this._selectionHandler(e);
                break
        }
    },
    _clamp: function(v, min, max)
    {
        return Math.min(max, Math.max(min, v))
    },
    _debounce: function(name, cb, asyncModule)
    {
        this._debouncers = this._debouncers ||
        {};
        this._debouncers[name] = Debouncer.debounce(this._debouncers[name], asyncModule, cb.bind(this));
        enqueueDebouncer(this._debouncers[name])
    },
    _forwardProperty: function(inst, name, value)
    {
        inst._setPendingProperty(name, value)
    },
    _forwardHostPropV2: function(prop, value)
    {
        (this._physicalItems || []).concat([this._offscreenFocusedItem, this._focusBackfillItem]).forEach(function(item)
        {
            if (item)
            {
                this.modelForElement(item).forwardHostProp(prop, value)
            }
        }, this)
    },
    _notifyInstancePropV2: function(inst, prop, value)
    {
        if (matches(this.as, prop))
        {
            var idx = inst[this.indexAs];
            if (prop == this.as)
            {
                this.items[idx] = value
            }
            this.notifyPath(translate(this.as, "items." + idx, prop), value)
        }
    },
    _getStampedChildren: function()
    {
        return this._physicalItems
    },
    _forwardInstancePath: function(inst, path, value)
    {
        if (path.indexOf(this.as + ".") === 0)
        {
            this.notifyPath("items." + inst.__key__ + "." + path.slice(this.as.length + 1), value)
        }
    },
    _forwardParentPath: function(path, value)
    {
        (this._physicalItems || []).concat([this._offscreenFocusedItem, this._focusBackfillItem]).forEach(function(item)
        {
            if (item)
            {
                this.modelForElement(item).notifyPath(path, value)
            }
        }, this)
    },
    _forwardParentProp: function(prop, value)
    {
        (this._physicalItems || []).concat([this._offscreenFocusedItem, this._focusBackfillItem]).forEach(function(item)
        {
            if (item)
            {
                this.modelForElement(item)[prop] = value
            }
        }, this)
    },
    _getActiveElement: function()
    {
        var itemsHost = this._itemsParent.node.domHost;
        return dom(itemsHost ? itemsHost.root : document).activeElement
    }
}); // Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class KeyboardShortcut
{
    constructor(shortcut)
    {
        this.useKeyCode_ = false;
        this.mods_ = {};
        this.key_ = null;
        this.keyCode_ = null;
        shortcut.split("|").forEach(part =>
        {
            const partLc = part.toLowerCase();
            switch (partLc)
            {
                case "alt":
                case "ctrl":
                case "meta":
                case "shift":
                    this.mods_[partLc + "Key"] = true;
                    break;
                default:
                    if (this.key_)
                    {
                        throw Error("Invalid shortcut")
                    }
                    this.key_ = part;
                    if (part.match(/^[a-z]$/))
                    {
                        this.useKeyCode_ = true;
                        this.keyCode_ = part.toUpperCase().charCodeAt(0)
                    }
            }
        })
    }
    matchesEvent(e)
    {
        if (this.useKeyCode_ && e.keyCode === this.keyCode_ || e.key === this.key_)
        {
            const mods = this.mods_;
            return ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(function(k)
            {
                return e[k] === !!mods[k]
            })
        }
        return false
    }
}
class KeyboardShortcutList
{
    constructor(shortcuts)
    {
        this.shortcuts_ = shortcuts.split(/\s+/).map(function(shortcut)
        {
            return new KeyboardShortcut(shortcut)
        })
    }
    matchesEvent(e)
    {
        return this.shortcuts_.some(function(keyboardShortcut)
        {
            return keyboardShortcut.matchesEvent(e)
        })
    }
} // Copyright 2018 The Chromium Authors. All rights reserved.
const FindShortcutManager = (() =>
{
    const listeners = [];
    let modalContextOpen = false;
    const shortcutCtrlF = new KeyboardShortcutList(isMac ? "meta|f" : "ctrl|f");
    const shortcutSlash = new KeyboardShortcutList("/");
    window.addEventListener("keydown", e =>
    {
        if (e.defaultPrevented || listeners.length === 0)
        {
            return
        }
        if (!shortcutCtrlF.matchesEvent(e) && (isTextInputElement(e.path[0]) || !shortcutSlash.matchesEvent(e)))
        {
            return
        }
        const focusIndex = listeners.findIndex(listener => listener.searchInputHasFocus());
        const index = focusIndex <= 0 ? listeners.length - 1 : focusIndex - 1;
        if (listeners[index].handleFindShortcut(modalContextOpen))
        {
            e.preventDefault()
        }
    });
    window.addEventListener("cr-dialog-open", () =>
    {
        modalContextOpen = true
    });
    window.addEventListener("cr-drawer-opened", () =>
    {
        modalContextOpen = true
    });
    window.addEventListener("close", e =>
    {
        if (["CR-DIALOG", "CR-DRAWER"].includes(e.composedPath()[0].nodeName))
        {
            modalContextOpen = false
        }
    });
    return Object.freeze(
    {
        listeners: listeners
    })
})();
const FindShortcutBehavior = {
    findShortcutListenOnAttach: true,
    attached()
    {
        if (this.findShortcutListenOnAttach)
        {
            this.becomeActiveFindShortcutListener()
        }
    },
    detached()
    {
        if (this.findShortcutListenOnAttach)
        {
            this.removeSelfAsFindShortcutListener()
        }
    },
    becomeActiveFindShortcutListener()
    {
        const listeners = FindShortcutManager.listeners;
        assert(!listeners.includes(this), "Already listening for find shortcuts.");
        listeners.push(this)
    },
    handleFindShortcut(modalContextOpen)
    {
        assertNotReached()
    },
    removeSelfAsFindShortcutListener()
    {
        const listeners = FindShortcutManager.listeners;
        const index = listeners.indexOf(this);
        assert(listeners.includes(this), "Find shortcut listener not found.");
        listeners.splice(index, 1)
    },
    searchInputHasFocus()
    {
        assertNotReached()
    }
}; // Copyright 2015 The Chromium Authors. All rights reserved.
Polymer(
{
    is: "downloads-manager",
    _template: html `<!--css-build:shadow--><!--_html_template_start_--><style include="cr-page-host-style cr-shared-style cr-hidden-style" scope="downloads-manager">:host {
  display: flex;
    flex: 1 0;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

@media (prefers-color-scheme: dark) {
:host {
  color: var(--cr-secondary-text-color);
}

}

#toolbar {
  z-index: 1;
}

:host([has-shadow_]) #drop-shadow {
  opacity: var(--cr-container-shadow-max-opacity);
}

downloads-item, #downloadsList {
  --downloads-card-margin: 24px;
    --downloads-card-width: 680px;
}

#downloadsList {
  min-width: calc(
      var(--downloads-card-width) + 2 * var(--downloads-card-margin));
}

#no-downloads, #downloadsList {
  flex: 1;
}

:host([loading]) #no-downloads, :host([loading]) #downloadsList {
  display: none;
}

#no-downloads {
  align-items: center;
    color: #6e6e6e;
    display: flex;
    font-size: 123.1%;
    font-weight: 500;
    justify-content: center;
    
    min-height: min-content;
}

@media (prefers-color-scheme: dark) {
#no-downloads {
  color: var(--cr-secondary-text-color);
}

}

#no-downloads .illustration {
  background: url(images/no_downloads.svg) no-repeat
        center center;
    background-size: contain;
    height: 144px;
    margin-bottom: 32px;
}

#mainContainer {
  display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    overflow-y: overlay;
}

managed-footnote {
  border-top: none;
    
    margin-bottom: calc(-21px - 8px);
    min-width: calc(
        var(--downloads-card-width) + 2 * var(--downloads-card-margin));
    padding-bottom: 12px;
    padding-top: 12px;
    
    z-index: 1;
}

</style>

<downloads-toolbar id="toolbar" spinner-active="{{spinnerActive_}}" role="none" on-search-changed="onSearchChanged_">
</downloads-toolbar>
<div id="drop-shadow" class="cr-container-shadow"></div>
<div id="mainContainer" on-scroll="onScroll_">
  <managed-footnote hidden="[[inSearchMode_]]"></managed-footnote>
  <iron-list id="downloadsList" items="[[items_]]" role="grid" aria-rowcount$="[[items_.length]]" hidden="[[!hasDownloads_]]" scroll-target="mainContainer" preserve-focus="">
    <template>
      <downloads-item data="[[item]]" tabindex$="[[tabIndex]]" iron-list-tab-index="[[tabIndex]]" last-focused="{{lastFocused_}}" list-blurred="{{listBlurred_}}" focus-row-index="[[index]]">
      </downloads-item>
    </template>
  </iron-list>
  <div id="no-downloads" hidden="[[hasDownloads_]]">
    <div>
      <div class="illustration"></div>
      <span>[[noDownloadsText_(inSearchMode_)]]</span>
    </div>
  </div>
</div>
<cr-toast-manager duration="10000">
  <cr-button aria-label="Stisknutím Ctrl+Z vrátíte provedenou akci zpět" on-click="onUndoClick_">
    Vrátit zpět
  </cr-button>
</cr-toast-manager>
<!--_html_template_end_-->`,
    behaviors: [FindShortcutBehavior],
    properties:
    {
        hasDownloads_:
        {
            observer: "hasDownloadsChanged_",
            type: Boolean
        },
        hasShadow_:
        {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        inSearchMode_:
        {
            type: Boolean,
            value: false
        },
        items_:
        {
            type: Array,
            value()
            {
                return []
            }
        },
        spinnerActive_:
        {
            type: Boolean,
            notify: true
        },
        lastFocused_: Object,
        listBlurred_: Boolean
    },
    hostAttributes:
    {
        loading: true
    },
    observers: ["itemsChanged_(items_.*)"],
    mojoEventTarget_: null,
    mojoHandler_: null,
    searchService_: null,
    loaded_: new PromiseResolver,
    listenerIds_: null,
    boundOnKeyDown_: null,
    created()
    {
        const browserProxy = BrowserProxy.getInstance();
        this.mojoEventTarget_ = browserProxy.callbackRouter;
        this.mojoHandler_ = browserProxy.handler;
        this.searchService_ = SearchService.getInstance();
        const CANONICAL_PATH_REGEX = /(^\/)([\/-\w]+)(\/$)/;
        const path = location.pathname.replace(CANONICAL_PATH_REGEX, "$1$2");
        if (path !== "/")
        {
            window.history.replaceState(undefined, "", "/")
        }
    },
    attached()
    {
        document.documentElement.classList.remove("loading");
        this.listenerIds_ = [this.mojoEventTarget_.clearAll.addListener(this.clearAll_.bind(this)), this.mojoEventTarget_.insertItems.addListener(this.insertItems_.bind(this)), this.mojoEventTarget_.removeItem.addListener(this.removeItem_.bind(this)), this.mojoEventTarget_.updateItem.addListener(this.updateItem_.bind(this))];
        this.boundOnKeyDown_ = (e => this.onKeyDown_(e));
        document.addEventListener("keydown", this.boundOnKeyDown_);
        this.loaded_.promise.then(() =>
        {
            requestIdleCallback(function()
            {
                chrome.send("metricsHandler:recordTime", ["Download.ResultsRenderedTime", window.performance.now()]);
                document.fonts.load("bold 12px Roboto")
            })
        });
        this.searchService_.loadMore();
        afterNextRender(this, function()
        {
            IronA11yAnnouncer.requestAvailability()
        })
    },
    detached()
    {
        this.listenerIds_.forEach(id => assert(this.mojoEventTarget_.removeListener(id)));
        document.removeEventListener("keydown", this.boundOnKeyDown_);
        this.boundOnKeyDown_ = null
    },
    clearAll_()
    {
        this.set("items_", [])
    },
    hasDownloadsChanged_()
    {
        if (this.hasDownloads_)
        {
            this.$.downloadsList.fire("iron-resize")
        }
    },
    insertItems_(index, items)
    {
        if (items.length > 0)
        {
            this.items_.splice.apply(this.items_, [index, 0].concat(items));
            this.updateHideDates_(index, index + items.length);
            this.notifySplices("items_", [
            {
                index: index,
                addedCount: items.length,
                object: this.items_,
                type: "splice",
                removed: []
            }])
        }
        if (this.hasAttribute("loading"))
        {
            this.removeAttribute("loading");
            this.loaded_.resolve()
        }
        this.spinnerActive_ = false
    },
    itemsChanged_()
    {
        this.hasDownloads_ = this.items_.length > 0;
        this.$.toolbar.hasClearableDownloads = loadTimeData.getBoolean("allowDeletingHistory") && this.items_.some((
        {
            state: state
        }) => state !== States.DANGEROUS && state !== States.MIXED_CONTENT && state !== States.IN_PROGRESS && state !== States.PAUSED);
        if (this.inSearchMode_)
        {
            this.fire("iron-announce",
            {
                text: this.items_.length === 0 ? this.noDownloadsText_() : this.items_.length === 1 ? loadTimeData.getStringF("searchResultsSingular", this.$.toolbar.getSearchText()) : loadTimeData.getStringF("searchResultsPlural", this.items_.length, this.$.toolbar.getSearchText())
            })
        }
    },
    noDownloadsText_()
    {
        return loadTimeData.getString(this.inSearchMode_ ? "noSearchResults" : "noDownloads")
    },
    onKeyDown_(e)
    {
        let clearAllKey = "c";
        if (e.key === clearAllKey && e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey)
        {
            this.onClearAllCommand_();
            e.preventDefault();
            return
        }
        if (e.key === "z" && !e.altKey && !e.shiftKey)
        {
            let hasTriggerModifier = e.ctrlKey && !e.metaKey;
            if (hasTriggerModifier)
            {
                this.onUndoCommand_();
                e.preventDefault()
            }
        }
    },
    onClearAllCommand_()
    {
        if (!this.$.toolbar.canClearAll())
        {
            return
        }
        this.mojoHandler_.clearAll();
        getToastManager().show(loadTimeData.getString("toastClearedAll"));
        this.fire("iron-announce",
        {
            text: loadTimeData.getString("undoDescription")
        })
    },
    onUndoCommand_()
    {
        if (!this.$.toolbar.canUndo())
        {
            return
        }
        getToastManager().hide();
        this.mojoHandler_.undo()
    },
    onScroll_()
    {
        const container = this.$.downloadsList.scrollTarget;
        const distanceToBottom = container.scrollHeight - container.scrollTop - container.offsetHeight;
        if (distanceToBottom <= 100)
        {
            this.searchService_.loadMore()
        }
        this.hasShadow_ = container.scrollTop > 0
    },
    onSearchChanged_()
    {
        this.inSearchMode_ = this.searchService_.isSearching()
    },
    removeItem_(index)
    {
        const removed = this.items_.splice(index, 1);
        this.updateHideDates_(index, index);
        this.notifySplices("items_", [
        {
            index: index,
            addedCount: 0,
            object: this.items_,
            type: "splice",
            removed: removed
        }]);
        this.onScroll_()
    },
    onUndoClick_()
    {
        getToastManager().hide();
        this.mojoHandler_.undo()
    },
    updateHideDates_(start, end)
    {
        for (let i = start; i <= end; ++i)
        {
            const current = this.items_[i];
            if (!current)
            {
                continue
            }
            const prev = this.items_[i - 1];
            current.hideDate = !!prev && prev.dateString === current.dateString
        }
    },
    updateItem_(index, data)
    {
        this.items_[index] = data;
        this.updateHideDates_(index, index);
        this.notifyPath(`items_.${index}`);
        this.async(() =>
        {
            const list = this.$.downloadsList;
            list.updateSizeForIndex(index)
        })
    },
    handleFindShortcut(modalContextOpen)
    {
        if (modalContextOpen)
        {
            return false
        }
        this.$.toolbar.focusOnSearchInput();
        return true
    },
    searchInputHasFocus()
    {
        return this.$.toolbar.isSearchFocused()
    }
});
export
{
    BrowserProxy,
    DangerType,
    IconLoader,
    SearchService,
    States
};