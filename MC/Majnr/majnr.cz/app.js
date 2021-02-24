var app;
var memberlist = false;
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

window.onscroll = function(){
    checktopbar();
};
window.onload = async function(){
    checktopbar();
    app = new Ajaxity();
    app.urlActions = async (url) => {
        if(url[0] === "") url[0] = "index";
        await setPage(url);
    };
    app.beforePageLoad = async () => {
        addClass(document.body, "hidden");
        await app.hideAllPages();
    };
    app.initApp();
    app.loadUrl(location.pathname);
    checktopbar();
};
window.onresize = function(){
    checktopbar();
};
window.addEventListener('popstate', () => {
    app.loadUrl(location.pathname);
});


var getjson = async (url, data = {}) => {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: "post",
            data: data,
            success: resolve,
            error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            reject(textStatus, errorThrown);
            }
        });
    });
};

setPage = async (url) => {
    var pageName = url.join("-");
    if(!app.pages[pageName]) {
        console.log(url.join("-"))
        var apipage = await getjson("majnr.cz/api", {"action": "page", "url": url.join("/")});
        Object.keys(apipage.actions).forEach(key => {
            apipage.actions[key] = new AsyncFunction("", apipage.actions.onload ? apipage.actions.onload : "");
        });
        var page = await app.createPage(pageName, {
            actions: apipage.actions,
            html: apipage.content
        });
        page.title = apipage.title;
    } else {
        var page = app.pages[pageName];
    }
    document.title = page.title;
    await app.showPage(pageName);
    await sleep(100);
    removeClass(document.body, "hidden");
};

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addClass(el, className) {
    var classes = el.className.split(" ");
    if(classes.indexOf(className) === -1) classes.push(className);
    el.className = classes.join(" ");
}
function removeClass(el, className) {
    var classes = el.className.split(" ");
    for(var i=0; i<classes.length; i++) {
        if(className === classes[i]) classes.splice(i, 1);
    }
    el.className = classes.join(" ");
}
function checkClass(el, className) {
    var classes = el.className.split(" ");
    for(var i=0; i<classes.length; i++) {
        if(className === classes[i]) return true;
    }
    return false;
}

var checktopbar = () => {
    if(!document.querySelector("nav")) return;
    var topbar = document.querySelector("nav");
    var topoffset = topbar.offsetTop+1;
    if(window.pageYOffset > topoffset) {
        addClass(topbar, "floating");
    } else {
        removeClass(topbar, "floating");
    }
};

var load_particles = () => {
    setTimeout(() => particlesJS("particles-js", {"particles":{"number":{"value":160,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":250,"size":0,"duration":2,"opacity":0,"speed":3},"repulse":{"distance":400,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}), 100);
};

var load_members = async () => {
    memberlist = await getjson("/api", {"action": "members"});
    var el = document.querySelector(".members");
    memberlist.forEach(m => {
        var name = m.displayname !== "" ? m.displayname : m.username;
        var bin = '<img src="/api?action=head&user='+m.username+'">';
        var social = "";
        m.social.forEach(socialitem => {
            if(socialitem.youtube) social += '<a target="_blank" href="https://youtube.com/'+socialitem.youtube+'"><span class="mdi mdi-youtube"></span></a>';
            if(socialitem.twitch) social += '<a target="_blank" href="https://twitch.tv/'+socialitem.twitch+'"><span class="mdi mdi-twitch"></span></a>';
            if(socialitem.instagram) social += '<a target="_blank" href="https://instagr.am/'+socialitem.instagram+'"><span class="mdi mdi-instagram"></span></a>';
            if(social.facebook) social += '<a target="_blank" href="https://facebook.com/'+socialitem.facebook+'"><span class="mdi mdi-facebook"></span></a>';
            if(socialitem.twitter) social += '<a target="_blank" href="https://twitter.com/'+socialitem.twitter+'"><span class="mdi mdi-twitter"></span></a>';
            if(socialitem.web) social += '<a target="_blank" href="'+socialitem.web+'"><span class="mdi mdi-web"></span></a>';
        });
        if(social !== "") social = '<div class="social">'+social+'</div>';
        var bio = m.bio;
        if(bio !== "") bio = '<div class="bio">'+bio+'</div>';
        bin += '<a target="_blank" class="live hidden"></a><div class="name">'+name+'</div><div class="name mc">'+m.username+'</div><div class="sub">'+m.desc+'</div>'+bio+''+social;
        el.innerHTML += '<div class="member">'+bin+'</div>';
    });
    document.querySelector(".membersdesc").innerHTML = "Na serveru je "+memberlist.length+" členů";
    await check_livestream();
};

var check_livestream = async () => {
    var streams = await getjson("/api", {"action": "twitch-live"});
    var keys = Object.keys(streams);
    var streaming = false;
    var member_els = document.querySelectorAll(".members .member");
    member_els.forEach(mel => {
        mel.querySelector(".live").className = "live hidden";
    });
    keys.forEach(key => {
        if(streams[key] !== false) {
            if(streams[key].title.toLowerCase().indexOf("majnr") !== -1) {
                streaming = true;
                if(memberlist) {
                    for(var i=0; i<memberlist.length; i++) {
                        memberlist[i].social.forEach(socialitem => {
                            if(socialitem.twitch === key) {
                                if(member_els[i]) {
                                    member_els[i].querySelector(".live").href = "https://twitch.tv/"+key;
                                    member_els[i].querySelector(".live").className = "live";
                                }
                            }
                        });
                    }
                }
            }
        }
    });
    if(document.querySelector(".liveindicator") === undefined) return;
    if(streaming) {
        document.querySelector(".liveindicator").className = "liveindicator";
    } else {
        document.querySelector(".liveindicator").className = "liveindicator hidden";
    }
};

var now = () => {
    return new Date().getTime();
};

setInterval(check_livestream, 2*60*1000);
