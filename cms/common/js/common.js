if (typeof String.prototype.startsWith !== "function") {
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) === 0;
	};
}

if (typeof(console) === "undefined") {
	console = {
		log: function() {
		}
	};
}

$(function() {
//		zimní vzhled stránek, krome iframe
//	if (window.self == window.top) {
//		$("body").addClass("zima");
//	}

	$("div.top-bottom a.close").click(function(event) {
		event.preventDefault();
		hideTopBottom();
	});

	$("a#moje-d-a").click(function(event) {
		event.preventDefault();

		var toolbar = $(".moje-d-toolbar-container");

		if ($(toolbar).is(":visible")) {
			$(toolbar).stop(true, true).fadeOut(300);
			$(this).removeClass("active");
		}
		else {
			$(toolbar).stop(true, true).fadeIn(300);
			$(this).addClass("active");
		}

	});
});

/**
 *
 * @param {type} kde: div ke scrollovani
 * @param {boolean} doleva
 * @returns {undefined}
 */
function scroll(kde, doleva) {
	//	event.preventDefault(); Pozor scrolluje obracene - doleva = doprava;)
	var currentX = kde.data("jsp").getContentPositionX();
	var X = currentX - currentX % columnWidth;
	if (doleva) {
		kde.data("jsp").scrollToX(X + 3 * columnWidth, true);
	}
	else {
		kde.data("jsp").scrollToX(X - 3 * columnWidth, true);
	}
}

function universalScroll(kde, oKolik, doleva) {
	//	event.preventDefault();
	kde.data("jsp").scrollByX( (doleva) ? -oKolik : oKolik , true);
}

function universalArrowCheck(div, isAtLeft, isAtRight){
	if (isAtLeft) {
		$(div + " a.prev").addClass("disabled");
	}
	else {
		$(div + " a.prev").removeClass("disabled");
	}
	if (isAtRight) {
		$(div + " a.next").addClass("disabled");
	}
	else {
		$(div + " a.next").removeClass("disabled");
	}
}

function universalSafetyTimeout(div, arrowClass, classAdded) {
	$(div + " a." + arrowClass).addClass(classAdded);
	setTimeout(function(){
		$(div + " a." + arrowClass).removeClass(classAdded);
	}, 300);
}

function showInColorbox(href, params) {
	$.colorbox($.extend({
		overlayClose: false,
		innerWidth: 720,
		innerHeight: 405,
		iframe: true,
		scrolling: false,
		href: href,
		closeButton: true,
		open: true
	}, params || {}));
	return false;
}

function removeWhitespace(s) {
	// v html sablone nefunguje v javascriptu zpetne lomitko
	// - neco ho sezere v libovolnem mnozstvi
	return s.replace(/\s/g, "");
}

function resizeIframe(ifrmId) {
	if (typeof(parent) !== "undefined") {
		var height = $("body").outerHeight();
		parent.$("#" + ifrmId).css("height", height + "px");
	}
}

function getEpisodeIndexSrc(idec, index) {
	var width = 512; // pro jine hodnoty je nutne vyzkouset, jestli jsou na serveru
	idec = idec.replace(/ /g, '');
	idec = idec.replace("/", '');

	var url = "//img.ceskatelevize.cz/ivysilani/indexes/photos/w" + width;
	url += "/";
	url += idec.substring(0, 3);
	url += "/";
	url += idec;
	url += "/";
	url += index;
	url += ".jpg";

	return url;

//	var width = 512; // pro jine hodnoty je nutne vyzkouset, jestli jsou na serveru
//	idec = idec.replace(/ /g, '');
//	idec = idec.replace("/", '');
//
//	var url = "//imgct.ceskatelevize.cz/cache/w" + width;
//	url += "/upload/ivysilani/indexes/";
//	url += idec.substring(0, 3);
//	url += "/";
//	url += idec;
//	url += "/";
//	url += index;
//	url += ".jpg";
//
//	return url;
}

function getBonusImageSrc(bonusId, index) {
	var width = 512;

	var url = "/bonus-image?replId=" + bonusId + "&width=" + width;

	return url;
}

function playAudio(audioId, src) {
	_playAudio(audioId, src, false);
}

function _playAudio(audioId, src, load) {
	var audio = document.getElementById(audioId);
	if (!audio.hasChildNodes()) {
		var source = document.createElement("source");
		//		if (typeof(audio.canPlayType) !== 'undefined' && audio.canPlayType("audio/ogg")) {
		if (audio.canPlayType("audio/ogg")) {
			source.type = "audio/ogg";
			source.src = src + ".ogg";
		} else {
			source.type = "audio/mpeg";
			source.src = src + ".mp3";
		}
		try {
			audio.appendChild(source);
			if (load) {
				audio.load();
			}
			audio.play();
		} catch (e) {
		// IE8
		}
	} else {
		audio.pause();
		audio.removeChild(audio.firstChild);
	}
}

function muteAudio(audioId) {
	var audio = document.getElementById(audioId);
	if (audio) {
		audio.pause();
		if (audio.hasChildNodes()) {
			audio.removeChild(audio.firstChild);
		}
	}
}

// volano z flashe Kdyby byly ryby - Pexeso
function programmeBackgroundMusicPause(audioId) {
	muteAudio(audioId);
	$("a.play").removeClass("on").addClass("paused");
}


