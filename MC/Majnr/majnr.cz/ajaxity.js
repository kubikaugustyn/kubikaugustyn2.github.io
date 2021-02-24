/* Ajaxity v1.5.2 */

class Ajaxity {

    constructor(opt={}) {
        this.url_before = false;
        this.options = opt;
        this.pages = {};
        this.pagecounter = 1;
        this.template = false;

        if(opt.debug) this.debug = opt.debug;
        else this.debug = false;
    }

    initApp() {
        this.convertLinks();
    }

    async loadUrl(defurl) {
        var a =  document.createElement('a');
        a.href = defurl;
        var url = a.pathname;
        var furl = url;
        if(furl.slice(-1) === "/") furl = url.slice(0,-1);
        furl = furl.slice(1).split("/");
        if(this.url_before === defurl) return;
        if(await this.beforePageLoad(furl) === false) return;
        this.url_before = defurl;
        if(location.pathname !== defurl) window.history.pushState('ajaxity', 'ajaxity', defurl);
        await this.urlActions(furl);
        this.convertLinks();
    }

    async urlActions(url) {
        console.warn("[Ajaxity] No \"urlActions\" found!");
    }

    async beforePageLoad(url) {
        console.warn("[Ajaxity] No \"beforePageLoad\" found!");
    }

    convertLinks() {
        var links = document.querySelectorAll("a");
        var ajtemp = this;
        links.forEach(link => {
            if(!link.converted) {
                link.addEventListener("click", function(event) {
                    if(this.href.startsWith(location.origin+"/") && this.getAttribute("external") === null && (this.target === "_self" || this.target === "")) {
                        event.preventDefault();
                        ajtemp.loadUrl("/"+this.href.replace(location.origin+"/",""));
                    }
                });
                link.converted = true;
            }
        });
    }

    async createPage(id, opt={}) {
        var page = {id: id, num: this.pagecounter, hidden: true};
        this.pagecounter++;
        if(opt.actions) page.actions = opt.actions;
        else page.actions = {};
        this.pages[id] = page;
        if(opt.html) page.html = opt.html;
        if(document.querySelector(".ajaxityPages")) {
            var pageEl = document.createElement("div");
            pageEl.className = "ajaxityPage page"+page.num;
            pageEl.style.display = "none";
            page.el = pageEl;
            document.querySelector(".ajaxityPages").appendChild(pageEl);
            page.el.style.display = "none";
            if(page.html) await this.setPageContent(id);
        }
        return page;
    }

    getPage(id) {
        var page = this.pages[id];
        if(page) return page;
        else {
            console.error("[Ajaxity] Page", '"'+id+'"', "not found!");
            return false;
        }
    }

    async setPageContent(id) {
        var page = this.getPage(id);
        if(page) {
            if(page.el) page.el.innerHTML = page.html;
        }
        if(page.actions.onload) await page.actions.onload();
    }

    async showPage(id) {
        var page = this.getPage(id);
        if(page) {
            if(!page.hidden) return;
            this.pages[id].hidden = false;
            if(page.el) page.el.style.display = "block";
            if(page.actions.onshow) await page.actions.onshow();
        }
    }
    async hidePage(id) {
        var page = this.getPage(id);
        if(page) {
            if(page.hidden) return;
            this.pages[id].hidden = true;
            if(page.actions.onhide) await page.actions.onhide();
            if(page.el) page.el.style.display = "none";
        }
    }
    async removePage(id) {
        var page = this.getPage(id);
        if(page) {
            if(page.actions.onunload) await page.actions.onunload();
            if(page.el) page.el.outerHTML = "";
            delete this.pages[id];
        }
    }

    async hideAllPages() {
        var pageKeys = Object.keys(this.pages);
        for(var i=0; i<pageKeys.length; i++) await this.hidePage(pageKeys[i]);
    }

    sleep(ms) {
        return new Promise(resolve=>{
            setTimeout(resolve,ms);
        });
    }

}
