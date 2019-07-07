console.log("JS01.js ...");

function ClickProc1() {
    console.log("Opening Seznam.cz...");
    openLinkInNewTab('https://www.seznam.cz/');
}

function ClickProc2() {
    console.log("Opening YouTube...");
    openLinkInNewTab('https://youtube.com/');
}

function ClickProc3() {
    console.log("Opening YouTube Channel Tech Ideas...");
    openLinkInNewTab('https://youtube.com/channel/UCNtV2t2MX3qGkBSD_uRtCGg');
}

function ClickProc4() {
    console.log("Closing All Opened Tabs...");
    CloseTab('https://youtube.com/channel/UCNtV2t2MX3qGkBSD_uRtCGg'&'https://youtube.com/');
}
