/**
 * Aby se pri scrollovani nevolalo loadRelatedVideos vickrat, uklada se do pole
 * offset, pro ktery uz se videa nacetla.
 * -> btnLoadMoreVideosClicked.push(offset);
 * Pri otevreni jineho poradu je potreba pole vynulovat.
 * -> btnLoadMoreVideosClicked.length = 0;
 *
 * @type Array
 */
var btnLoadMoreVideosClicked = new Array(0);

function hideTopBottom() {
    $("div.top-bottom").slideUp();
}

function hideVideoDetail() {
    removeVideo();
    $("div.video-detail").slideUp();
}

function recordVideoPlayback(videoId) {
    videoId = parseInt(videoId);
    if (videoId > 0 !== true) {
        return;
    }
    $.post("/record-video-playback", {
        videoId: videoId
    });
}


/**
 * Rozbali ve vypisu videi detail spravne umisteny ve strance.
 * @param item div.item z vypisu videi obsahuji data polozku 'video' s JSON objektem z webove sluzby
 * @returns undefined
 */
function showVideoDetail(item) {
    removeVideo();
    btnLoadMoreVideosClicked.length = 0;

    var video = item.data("video");
    //updateVideoInfo(video);

    var id = video.id;
    var IDEC = null;
    var bonusReplId = null;
    var programmeTitle = video.programmeTitle;
    var title = video.title;
    var imageUrl = video.imageUrl560;
    var programmePageUrl = null;


    if ((video.episode) !== null) {
        IDEC = video.episode.IDEC;
    }
    if ((video.bonus) !== null) {
        bonusReplId = video.bonus.replId;
    }
    if (typeof (video.programmePageUrl) !== "undefined") {
        programmePageUrl = video.programmePageUrl;
    }


    $("div.video-detail h2").text("").text(programmeTitle);
    $("div.video-detail .video img").attr({
        src: imageUrl,
        alt: title
    });
    if (video.episode !== null && typeof video.episode.episodeNumber !== "undefined" && video.episode.episodeNumber !== null) {
        title = video.episode.episodeNumber + '. díl: ' + title;
    }
    $("div.video-detail .video a.video-play").text("").text(title);

    // Nastavit detailu videa JSON s informacemi o videu
    $("div.video-detail").data("video", video);
    $("div.video-detail a.icko").data("video", video);

    // Zobrazit odkaz na stranku poradu, pokud je v datech nastavena
    $("div.video-detail a.stranka-poradu").remove();
    if (programmePageUrl !== null) {
        var a = $("<a />").addClass("stranka-poradu").attr({
            href: programmePageUrl,
            onclick: "gaVidea('" + programmePageUrl + "');"
        }).text("Stránka pořadu");
        $("div.video-detail div.video").after(a);
    }

    // Najit pozici v DOMu, kam detail videa vlozit/presunout
    var allItems = $("div.content.videa div.bigger div.item");
    var itemIndex = allItems.index(item);

    if (itemIndex === 0) {
        itemIndex += 1;
    }
    var insertAfterIndex = itemIndex;

    insertAfterIndex += 1;
    while (insertAfterIndex % 4 !== 0) {
        insertAfterIndex += 1;
    }
    insertAfterIndex -= 1;

    if (insertAfterIndex > (allItems.length - 1)) {
        insertAfterIndex = allItems.length - 1;
    }

    $($(allItems)[insertAfterIndex]).after($("div.video-detail"));


    // Zobrazit zobak ukazujici od detailu videa k nahledu ve vypisu
    var arrow = $(".ukazatel");
    var arrowX = item.offset().left;
    var arrowY = $("div.video-detail").offset().top - arrow.outerHeight();
    arrowX = parseInt(arrowX);
    arrowY = parseInt(arrowY);

    arrow.css({
        'left': arrowX + "px",
        'top': arrowY + "px"
    });

    // Spustit video v prehravaci
    playVideo(video);

    // Nacist souvisejici videa v prave casti detailu
    loadRelatedVideos(video);

    // Zobrazit detail
    $("div.video-detail").stop(true, true).hide().slideDown();

    // Animovane sescrollovat na detail
    $("html, body").animate({
        scrollTop: $("div.video-detail").offset().top - 30
    }, 2000);

    // nastavit url
    history.pushState([], '', "/");
    history.pushState([], '', "video/" + IDEC.replace(" ", "%20").replace("/", "_"));
}

/**
 * Vytvori informaci o nacitani dalsich videi
 * @param video
 * @param offset
 * @returns div
 */
function createNacitamVidea(video, offset) {
    var div = $("<div />").addClass("nacitamVidea");
    var gif = $("<img />").attr({
        src: "/cms/videa/images/videa/nacitani-videa-preloader.gif"
    });
    var span = $("<i />").text("Načítám videa...");
    div.append(gif);
    div.append(span);

    div.click(function (event) {
        var el;
        if ($(this).closest(".top.porady.det").length > 0) {
            el = $(this).closest(".top.porady.det");
        } else {
            el = $("body");
        }
        event.preventDefault();
        loadRelatedVideos(video, offset + 30, el);
    });
    return div;
}

/**
 * Vytvori jednu polozku do seznamu souvisejicich videi
 * @param video
 * @param rootElement
 * @returns div
 */
function createRelatedVideoHTML(video, rootElement) {
    var div = $("<div />").addClass("video-frame-w155");
    var a = $("<a />").data("video", video);

    var videoTitle = video.title;
    if (video.episode !== null && typeof video.episode.episodeNumber !== "undefined" && video.episode.episodeNumber !== null) {
        videoTitle = video.episode.episodeNumber + '. díl: ' + videoTitle;
    }
    if (videoTitle.length >= 19) {
        videoTitle = videoTitle.substring(0, 18) + "...";
    }
    var innerdiv = $("<div />").text(videoTitle);

    var img = $("<img />").attr({
        src: video.imageUrl160,
        alt: video.title
    });

    div.append(a);
    a.append(innerdiv);
    div.append(img);

    if (typeof (video.episode) !== "undefined" && video.bonus == null) {
        var icko = $("<a />").attr({
            'class': "icko"
        }).data("video", video);

        div.append(icko);
        $(a).click(function (event) {
            var video = $(this).data("video");
            event.preventDefault();
            _playVideo(video, rootElement, 528);
            updateVideoInfo(video);
            // velkemu Icku nastavit data
            $(rootElement).find(".video-detail .video a.icko").data("video", $(this).data("video"));

        });
        $(icko).click(function (event) {
            var video = $(this).data("video");
            event.preventDefault();
            updateVideoInfo(video);
            displayInfo(this.height);
        });
    }
    if (typeof (video.bonus) !== "undefined") {
        $(a).click(function (event) {
            event.preventDefault();
            _playVideo(video, rootElement, 528);

            // vypnout zvuk
            var aud = document.getElementById("audio");
            if (aud !== null && typeof aud !== "undefined") {
                aud.pause();
                $("a.play").removeClass("on");
            }
        });
    }

    return div;
}

/**
 * Vytvori jeden sloupec do seznamu souvisejicich videi
 * @returns div
 */
function createRelatedVideosColumn() {
    return $("<div />").addClass("column");
}

/**
 * Nacte a zobrazi seznam souvisejicich videi v detailu videa
 * @param video
 * @returns undefined
 */
function loadRelatedVideos(video) {
    loadRelatedVideos(video, 0, $("body"));
}

/**
 * Nacte a zobrazi seznam souvisejicich videi v detailu videa
 * @param video
 * @param {int} offset
 * @returns undefined
 */
function loadRelatedVideos(video, offset) {
    loadRelatedVideos(video, offset, $("body"));
}

/**
 * Nacte a zobrazi seznam souvisejicich videi v detailu videa
 * @param video
 * @param {int} offset
 * @param {element} rootElement
 * @returns {undefined}
 */
function loadRelatedVideos(video, offset, rootElement) {
    if (typeof (rootElement) === "undefined") {
        rootElement = $("body");
    }
    // Parametry pro request na REST sluzbu
    var IDEC = null;
    var bonus = null;

    if (typeof (video.episode) !== "undefined") {
        IDEC = video.episode.IDEC;
    }
    if (typeof (video.bonus) !== "undefined" && video.bonus !== null) {
        bonus = video.bonus.replId;
    }
    if (typeof (offset) !== "undefined" && offset !== null) {
        offset = parseInt(offset);
    } else {
        offset = 0;
    }
    var loadMoreVideosIndex = offset;
    if (typeof (video.programmeSIDP) !== "undefined" && video.programmeSIDP !== null) {
        loadMoreVideosIndex = video.programmeSIDP + "_" + loadMoreVideosIndex;
    }

    var requestUrl = "";
    var requestData = {
        offset: offset
    };

    // pocet radku ve vypisu podle css class div.top.porady.det ( 1 - 3 )
    var rowsNumber = ($("div.top.porady.det").hasClass("row1") ? 1 : ($("div.top.porady.det").hasClass("row2") ? 2 : 3));

    if (IDEC !== null) {
        requestUrl = "/rest/Programme/relatedVideosForEpisode";
        requestData.IDEC = IDEC;
    } else if (bonus !== null) {
        requestUrl = "/rest/Programme/relatedVideosForBonus";
        requestData.bonus = bonus;
    }

    if (offset === 0) {
        $(rootElement).find("div.video-detail div.dily").remove();
    }

    $.ajax({
        type: "GET",
        url: requestUrl,
        dataType: "json",
        data: requestData,
        error: function () {
            //$(rootElement).find("a.load-more-videos").stop(true, true).fadeIn(300);
        },
        success: function (response) {

            $(rootElement).find("a.dily-prev").remove();
            $(rootElement).find("a.dily-next").remove();
            var aLeft = $("<a />").addClass("dily-prev");
            var aRight = $("<a />").addClass("dily-next");

            var dilyDiv;
            var dilyInnerDiv;
            var dilyNewLoaded = null;

            if (offset === 0) {
                $(rootElement).find("div.video-detail div.dily").remove();
                $(rootElement).find("div.video-detail div.text").remove();

                dilyDiv = $("<div />").addClass("dily");
                dilyInnerDiv = $("<div />").addClass("inner");

            } else {
                dilyDiv = $(rootElement).find("div.video-detail div.dily");
                $(rootElement).find("div.video-detail div.dily div.nacitamVidea").parent().after("<div class='newLoadedVideos'></div>");
                dilyNewLoaded = $(rootElement).find("div.video-detail div.dily div.newLoadedVideos");
                dilyInnerDiv = dilyNewLoaded;
            }

            var column = createRelatedVideosColumn();
            //          Nepoznavam tento kod. Neco nedodelaneho?
            //			var nextTimeDiv = null;
            //
            //			if (typeof(response.text) !== "undefined") {
            //				rowsNumber = 2;
            //				dilyDiv.addClass("inner-two-rows");
            //				nextTimeDiv = $("<div />").addClass("text");
            //				$(nextTimeDiv).append('<h3>Příště uvidíte</h3><div class="programmeNextBroadcastDate">Pondělí 18.00</div><p>Donec vitae vehicula mi, accumsan facilisis diam. Donec dictum tristique augue nec consectetur. Aenean lobortis congue suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>');
            //			}

            // Z dat ke vsem souvisejicim dilum vytvorit polozky
            // a rozhazet je do sloupcu
            if (typeof (response.episodes) !== "undefined") {
                var episodes = response.episodes;
                if (typeof (episodes.id) !== "undefined") {
                    episodes = [episodes];
                }
                for (var i = 0; i < episodes.length; i++) {
                    var episode = episodes[i];
                    if (i % rowsNumber === 0) {
                        if (i > 0) {
                            $(dilyInnerDiv).append(column);
                        }
                        column = createRelatedVideosColumn();
                    }
                    column.append(createRelatedVideoHTML(episode, rootElement));
                    if (episode.id === video.episode.id || episode.id === video.id) {
                        $(rootElement).find(".video-detail .video a.icko").data("video", episode);
                    }
                }
                $(dilyInnerDiv).append(column);
                // nacitani dalsich videi
                if (episodes.length === 30) {
                    column = createRelatedVideosColumn();
                    column.append(createNacitamVidea(video, offset));
                    $(dilyInnerDiv).append(column);
                }
            }

            if (offset === 0) {
                // Z dat ke vsem souvisejicim bonusum vytvorit polozky
                // a rozhazet je do sloupcu
                if (typeof (response.bonuses) !== "undefined") {
                    var bonuses = response.bonuses;
                    if (typeof (bonuses.id) !== "undefined") {
                        bonuses = [bonuses];
                    }
                    for (var i = 0; i < bonuses.length; i++) {
                        var bonus = bonuses[i];
                        if (i % rowsNumber === 0) {
                            if (i > 0) {
                                $(dilyInnerDiv).append(column);
                            }
                            column = createRelatedVideosColumn();
                        }
                        column.append(createRelatedVideoHTML(bonus, rootElement));
                    }
                    $(dilyInnerDiv).append(column);
                }
            }

            if (offset === 0) {
                //$(rootElement).find("div.video-detail").append(nextTimeDiv);
                $(rootElement).find("div.video-detail").append(dilyDiv);
                $(dilyDiv).append(dilyInnerDiv);
            } else {
                $(rootElement).find("div.video-detail div.dily .nacitamVidea").first().remove();
                dilyNewLoaded.children().unwrap();
                dilyInnerDiv = $(rootElement).find("div.video-detail div.dily div.inner");
            }

            // Vyhodit pripadne prazdne sloupce
            $(dilyInnerDiv).find(".column").each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
            var columnCount = $(dilyInnerDiv).find(".column").length;

            // Defaultni sirka sloupce pro pripad,
            // ze ji nebudu schopen automaticky vypocitat
            var columnWidth = 180;
            var column = $(dilyInnerDiv).find(".column").first();
            // Nalezen jeden sloupec, ze ktere muzu vypocitat sirku
            if (column.length > 0) {
                columnWidth = column.outerWidth();
            }

            $(dilyInnerDiv).css("width", (columnWidth * (columnCount)) + "px");

            $(dilyDiv)
                    .bind(
                            'jsp-scroll-x',
                            function (event, scrollPositionX, isAtLeft, isAtRight)
                            {
                                if ($(rootElement).find("div.video-detail div.dily .nacitamVidea").length > 0) {
                                    var jspPaneWidth = $(rootElement).find("div.video-detail div.dily .jspPane").outerWidth();
                                    var nacitamVidea = $(rootElement).find("div.video-detail div.dily .nacitamVidea").last();
                                    var nacitamVideaPos = nacitamVidea.position().left + nacitamVidea.outerWidth();

                                    var nacitamIsDisplayed = isAtRight || nacitamVideaPos - scrollPositionX <= jspPaneWidth;
                                    if (nacitamIsDisplayed && btnLoadMoreVideosClicked.indexOf(loadMoreVideosIndex) === -1) {
                                        btnLoadMoreVideosClicked.push(loadMoreVideosIndex);
                                        setTimeout(function () {
                                            nacitamVidea.click();
                                        }, 1000);
                                    }
                                }
                            }
                    )
                    .jScrollPane({
                        verticalDragMinHeight: 104,
                        verticalDragMaxHeight: 104,
                        horizontalDragMinWidth: 104,
                        horizontalDragMaxWidth: 104
                    });


            $(aLeft).click(function (event) {
                event.preventDefault();
                var currentX = $(rootElement).find("div.dily.jspScrollable").data("jsp").getContentPositionX();
                var X = currentX - currentX % columnWidth;
                $(rootElement).find("div.dily.jspScrollable").data("jsp").scrollToX(X - columnWidth, true);
            });

            $(aRight).click(function (event) {
                event.preventDefault();
                var currentX = $(rootElement).find("div.dily.jspScrollable").data("jsp").getContentPositionX();
                var X = currentX - currentX % columnWidth;
                $(rootElement).find("div.dily.jspScrollable").data("jsp").scrollToX(X + columnWidth, true);
            });

            if (columnCount > 3) {
                //				$(rootElement).find("div.video-detail").append(aLeft);
                //				$(rootElement).find("div.video-detail").append(aRight);
                dilyDiv.append(aLeft);
                dilyDiv.append(aRight);
                $("div.video-shadow").show();
            } else {
                $("div.video-shadow").hide();
            }
        }
    });
}

/**
 *
 * @param video JSON objekt vraceny z webove sluzby
 * @returns undefined
 */

function playVideo(video) {
    _playVideo(video, $("body"), 528);
}

function _playVideo(video, rootElement, playerWidth) {
    // Parametry pro iframe prehravac
    var IDEC = null;
    var bonus = null;
    var index = null;

    // Objekt s informacemi o videu musi byt definovany
    if (typeof (video) === "undefined" || video === "") {
        video = null;
    }
    if (video === null) {
        console.error("video is null, but should not be");
        return;
    }

    // Zjisteni IDECu ( a příp. indexu), resp. ID bonusu videa
    if (typeof (video.episode) !== "undefined" && (video.episode) !== null && typeof (video.episode.IDEC) !== "undefined") {
        IDEC = video.episode.IDEC;
        $("div.video.page a.icko").show();
    }
    if (typeof (video.episode) !== "undefined" && (video.episode) !== null && typeof (video.episode.index) !== "undefined") {
        index = video.episode.index;
    }
    if (typeof (video.bonus) !== "undefined" && (video.bonus) !== null && typeof (video.bonus.replId) !== "undefined") {
        bonus = video.bonus.replId;
        $("div.video.page a.icko").hide();
    }

    // Sestaveni URL prehravace
    var src = "/player?width=" + playerWidth;
    if (IDEC !== null) {
        src = src + "&IDEC=" + IDEC;
    }
    if (bonus !== null) {
        src = src + "&bonus=" + bonus;
    }
    if (index !== null) {
        src = src + "&index=" + index;
    }

    removeVideo();
    var iframe = $("<iframe />").attr({
        src: src,
        border: 0,
        frameborder: 0,
        scrolling: "no",
		allowfullscreen: "allowfullscreen",
		webkitallowfullscreen: "webkitallowfullscreen",
		mozallowfullscreen: "mozallowfullscreen"
    });

    // Nalezeni DOM elementu 'videoContainerDiv', do ktereho se vlozi iframe
    var videoDetailDiv = $("div.video-detail");
    var videoDiv = $(videoDetailDiv).find("div.video");

    if (typeof (rootElement) === "undefined") {
        rootElement = $("body");
    }
    var videoContainerDiv = $(rootElement).find(videoDiv).find("div.video-container");
    //var videoContainerDiv = (div != "") ?  $(videoDiv).find( "." + div + " div.video-container") :  $(videoDiv).find( "div.video-container");

    // Schovani odkazu, ktery je v detailu pri prvnim nacteni (obsahuje staticky obrazek z videa)
    $(videoDiv).find("a.play-video").hide();

    // Vlozeni iframu do kontejneru
    $(videoContainerDiv)
            .append(iframe);

    // Naplneni DOM elementu v detailu videa informacemi o videu
    // (nazev, datum premiery apod.)
    var premiereDateSpan = $(videoDetailDiv).find(".datum");
    var videoTitleSpan = $(videoDiv).find(".episode-title");
    var episodeNumberSpan = $(videoDiv).find(".episode-number");
    var episodeNumberValueSpan = $(videoDiv).find(".episode-number").find(".episode-number-value");

    $(premiereDateSpan).empty();
    $(episodeNumberSpan).hide();

    if (typeof (video.episode) !== "undefined" && video.episode !== null) {
        if (typeof (video.episode.episodeNumber) !== "undefined" && video.episode.episodeNumber !== null) {
            if ($(episodeNumberSpan).length === 0) {
                // musime to vytvorit
                episodeNumberSpan = $("<span />").addClass("episode-number");
                episodeNumberValueSpan = $("<span />").addClass("episode-number-value");
                var episodeNumberTmpSpan_ = $("<span />").text(". díl: ");
                episodeNumberSpan.append(episodeNumberValueSpan);
                episodeNumberSpan.append(episodeNumberTmpSpan_);
                episodeNumberTmpSpan_.contents().unwrap();
                //
                var tmp = $(videoDiv).find(".video-title > div");
                tmp.append(episodeNumberSpan);
                // prehodit do spravneho poradi
                tmp.append(videoTitleSpan);
            }
            $(episodeNumberValueSpan).text(video.episode.episodeNumber);
            $(episodeNumberSpan).show();
        }

        if (typeof (video.episode.lastBroadcastDate) !== "undefined" && video.episode.lastBroadcastDate.length >= 10) {
            var formattedLastBroadcastDate = "";
            formattedLastBroadcastDate = formattedLastBroadcastDate + parseInt(video.episode.lastBroadcastDate.substr(8, 2)) + ". ";
            formattedLastBroadcastDate = formattedLastBroadcastDate + parseInt(video.episode.lastBroadcastDate.substr(5, 2)) + ". ";
            formattedLastBroadcastDate = formattedLastBroadcastDate + parseInt(video.episode.lastBroadcastDate.substr(0, 4));
            $(premiereDateSpan).text(formattedLastBroadcastDate);
        }
    }

    $(videoTitleSpan).empty().text(video.title);

    // Ulozit zaznam o prehrani tohoto videa
    recordVideoPlayback(video.id);

}

function removeVideo() {
    $("div.video-detail div.video div.video-container").empty();
}

var disableLoadMoreVideosButton = false;

function loadMoreVideos() {
    $("a.load-more-videos").stop(true, true).hide();

    var SIDP = $("a.load-more-videos").data("SIDP");
    if (typeof (SIDP) === "undefined" || SIDP === "") {
        SIDP = null;
    }

    if (false && SIDP !== null) {
        $("div.content.videa div.bigger div.item").remove();
    }

    var offset = $("div.content.videa div.bigger div.item").length;

    var url = "/rest/Programme/mostRecentVideos";
    if (videosMode === "mostViewed") {
        url = "/rest/Programme/mostViewedVideos";
    }


    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: {
            'offset': offset,
            'SIDP': SIDP
        },
        error: function () {
            $("a.load-more-videos").stop(true, true).fadeIn(300);
        },
        success: function (response) {
            var newDivs = Array();

            if (typeof (response.video.id) !== "undefined") {
                video = response.video;
                response.video = Array();
                response.video.push(video);
            }

            for (var i = 0; i < response.video.length; i++) {
                var video = response.video[i];
                var itemDiv = $("<div />").addClass("item").addClass("video-frame-w290").addClass("v2");


//				var bottomDiv = $("<div />").addClass("bottom");
//                var icoDiv = $("<div />").addClass("ico");
                var aInnerDiv1 = $("<div />");
                var aInnerSpan = $("<span />");
                var title = video.programmeTitle + " — ";
                if (video.episode !== null && typeof video.episode.episodeNumber !== "undefined" && video.episode.episodeNumber !== null) {
                    title = title + video.episode.episodeNumber + '. díl: ';
                }
                title = title + video.title;
//                title = (title.length > 48) ? title.substring(0, 46) + '...' : title;
                title = (title.length > 78) ? title.substring(0, 78) + '...' : title;
//				var aInnerDiv2 = $("<div />").text(title);
//				aInnerDiv1.append(aInnerDiv2);
                aInnerSpan.text(title);
                aInnerDiv1.append(aInnerSpan);
                var a = $("<a />");
                var img = $("<img />").attr({
                    alt: video.title,
                    src: video.imageUrl280
                });

                if ((i + 1) % 4 === 0) {
                    $(itemDiv).addClass("last");
                }

                $(itemDiv)
                        .data("video", video)
//				.append(bottomDiv)
//                        .append(icoDiv)
                        .append(aInnerDiv1)
                        .append(a)
                        .append(img)
                        .hide();

                if (typeof (video.episode) !== "undefined" && video.bonus == null) {
                    var icko = $("<a />").attr({
                        'class': "icko"
                    }).data("video", video);

                    itemDiv.append(icko);
                    //					$(a).click(function(event){
                    //						var video = $(this).data("video");
                    //						event.preventDefault();
                    //						_playVideo(video, rootElement, 560);
                    //						updateVideoInfo(video);
                    // velkemu Icku nastavit data
                    //						$(rootElement).find(".video-detail .video a.icko").data("video", $(this).data("video"));

                    //					});
                    $(icko).click(function (event) {
                        var video = $(this).data("video");
                        event.preventDefault();
                        updateVideoInfo(video);
                        displayInfo(this.height);
                    });
                }

                newDivs.push(itemDiv);

                $(a).click(function (event) {
                    event.preventDefault();
                    showVideoDetail($(this).closest(".item"));
                });

                $("div.content.videa div.bigger")
                        .append(itemDiv);
            }

            for (var i = 0; i < newDivs.length; i++) {
                var itemDiv = newDivs[i];
                $(itemDiv).stop(true, true).fadeIn(300);
            }


            if (disableLoadMoreVideosButton !== true) {
                if (newDivs.length === 40) {
                    $("a.load-more-videos").stop(true, true).fadeIn(300);
                }
            }
        }
    });
}

/* ICKO k videu */

function displayInfo(h) {
    $.colorbox({
        innerWidth: 664,
        innerHeight: h,
        scrolling: false,
        inline: true,
        href: '#icko',
        open: true,
        closeButton: true,
        className: 'icko',
        onOpen: function () {
            $(".video-container iframe").css("visibility", "hidden");
            if ($("p#ip-desc").text() !== "") {
                $("p#ip-notic").addClass("bold");
            } else {
                $("p#ip-notic").removeClass("bold");
            }
        },
        onClosed: function () {
            $(".video-container iframe").css("visibility", "visible");
        }
    });
    return false;
}

function updateVideoInfo(video) {

    if (typeof (video) !== "undefined" && video !== null && typeof (video.episode.episodeInfo) !== "undefined") {
        if (video.programmeTitle !== null) {
            var programmeTitle = video.programmeTitle;
            if (typeof video.episode.episodeNumber !== "undefined" && video.episode.episodeNumber !== null) {
                programmeTitle = programmeTitle + ' <span>(' + video.episode.episodeNumber + '. díl)</span>';
            } else if (typeof video.episode.episodeInfo.episodeNumber !== "undefined" && video.episode.episodeInfo.episodeNumber !== null) {
                programmeTitle = programmeTitle + ' <span>(' + video.episode.episodeInfo.episodeNumber + ')</span>';
            }
            document.getElementById("ih3").innerHTML = programmeTitle;
        } else {
            document.getElementById("ih3").innerHTML = "";
        }
        if (video.title !== null) {
            document.getElementById("ih2").innerHTML = video.title;
        } else {
            document.getElementById("ih2").innerHTML = "";
        }
        if (video.episode.episodeInfo.noticka !== null) {
            document.getElementById("ip-notic").innerHTML = video.episode.episodeInfo.noticka;
        } else {
            document.getElementById("ip-notic").innerHTML = "";
        }
        if (video.episode.episodeInfo.description !== null) {
            document.getElementById("ip-desc").innerHTML = video.episode.episodeInfo.description;
        } else {
            document.getElementById("ip-desc").innerHTML = "";
        }

        // video.episode.episodeNumber
        if (video.episode.episodeInfo.footageString !== null) {
            document.getElementById("ip-footage").innerHTML = video.episode.episodeInfo.footageString;
        } else {
            document.getElementById("ip-footage").innerHTML = "";
        }
        if (video.episode.episodeInfo.episodeCreatedYear !== null && video.episode.episodeInfo.episodeCreatedYear > 0) {
            $("#ip-cy-label").show();
            document.getElementById("ip-cy").innerHTML = video.episode.episodeInfo.episodeCreatedYear;
        } else {
            $("#ip-cy-label").hide();
            document.getElementById("ip-cy").innerHTML = "";
        }

        var elBroadcast = $("#icko .broadcast");
        $(elBroadcast).children().remove();
        var reprises = video.episode.reprises;
        if (reprises != undefined) {
            for (var i = 0; i < reprises.length; i++) {
                var reprise = reprises[i];
                var wrap = $('<div />');
                var elWd = $('<p class="ip-wd" />').html(reprise.onWeekday);
                var repDate = new Date(reprise.date);
                var repriseDateStr = "" + repDate.getDate() + ". " + (repDate.getMonth() + 1) + ". " + repDate.getFullYear();
                var elRep = $('<p class="ip-rep" />').addClass("bold").html(repriseDateStr);
                var elTime = $('<p class="ip-time" />').addClass("bold").html(reprise.timeString);
                var elPrep = $('<p />').text("na");
                var elChan = $('<p class="ip-chan" />').addClass("bold").html(reprise.channelTitle);
                $(wrap).append(elWd).append(elRep).append(elTime).append(elPrep).append(elChan);
                $(elBroadcast).append(wrap);
            }
        }
    }
}

// video.episode.reprises
//
//									<div class="broadcast">
//										<div th:each="reprise : ${videoDetail.reprises}">
//											<p id="ip-wd" th:text="${reprise.onWeekday}"></p>
//											<p id="ip-rep" th:text="${#dates.format(reprise.date,'d. M. yyyy')}" class="bold"></p>
//											<p id="ip-time" th:text="${reprise.timeString}" class="bold"></p>
//											<p>na</p><p id="ip-chan" th:text="${reprise.channel.title}" class="bold"></p><br />
//										</div>
//									</div>

function loadFirstVideoForSIDP(SIDP, callback) {

    if (typeof (SIDP) === "undefined" || SIDP === "") {
        SIDP = null;
    }

    var video = null;

    var offset = 0;
//	var url = "/rest/Programme/mostRecentVideos";
    var url = "/rest/Programme/relatedVideosForProgramme";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: {
            'offset': offset,
            'SIDP': SIDP
        },
        error: function () {
            // $("a.load-more-videos").stop(true, true).fadeIn(300);
        },
        success: function (response) {

            if (typeof (response.video.id) !== "undefined") {
//				video = response.video;
//			} else if (response.video.length > 0) {
                video = response.video[0];
            }
            callback(video);
        }
    });
}

function loadVideosForSIDP(SIDP, callback) {

    if (typeof (SIDP) === "undefined" || SIDP === "") {
        SIDP = null;
    }

    var video = null;

    var offset = 0;
    var url = "/rest/Programme/relatedVideosForProgramme";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: {
            'offset': offset,
            'SIDP': SIDP
        },
        error: function () {
            // $("a.load-more-videos").stop(true, true).fadeIn(300);
        },
        success: function (response) {

//			if (typeof (response.video.id) !== "undefined") {
            if (typeof (response.video) !== "undefined") {
                video = response.video;
//			} else if (response.video.length > 0) {
//				video = response.video[0];
            }
            callback(video);
        }
    });
}

function playOtherVideo(idec, elem) {
    $.ajax({
        type: "GET",
        url: "/rest/Programme/episodeInfo",
        dataType: "json",
        data: {
            IDEC: idec
        },
        error: function () {
            //
        },
        success: function (response) {
            var video;
            if (typeof (response.video.id) !== "undefined") {
                video = response.video;
            } else if (response.video.length > 0) {
                video = response.video[0];
            }

            $(elem).removeAttr("target");
            $(elem).data({
                video: video
            }).click(function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: 200
                }, 800);
//				$("div#ico").hide();
                var video = $(this).data("video");
                playVideo(video);
                updateVideoInfo(video);
                // velkemu Icku nastavit data
                $(".video-detail .video a.icko").data("video", $(this).data("video"));
            });
        }
    });
}

function playOtherVideoBonus(bonusId, title, elem) {
    var video = {
        title: title,
        bonus: {
            replId: bonusId
        }
    };
    $(elem).removeAttr("target");
    $(elem).data({
        video: video
    }).click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 200
        }, 800);
        $("div#ico").hide();
        var video = $(this).data("video");
        playVideo(video);
    });
}



$(function () {
    // Pouze kdyz se uzivatel nachazi na vypisu videi,
    // ne na strance poradu nebo strance videa
    if ($("a.load-more-videos").length > 0) {
        $("div.video-detail").hide();
        $("a.load-more-videos").click(function (event) {
            event.preventDefault();
            loadMoreVideos();
        });
        loadMoreVideos();
    }

    $("div.video-detail a.close").click(function (event) {
        event.preventDefault();
        hideVideoDetail();
    });
});
