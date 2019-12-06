function loadMoreGames() {
	$("a.load-more-games").stop(true, true).hide();


	var offset = $("div.content.hry div.bigger div.item").length;
	if ($(".games-offset").length > 0) {
		offset = offset + parseInt($(".games-offset").val());
	}

	var url = "/rest/FlashApp/mostRecent";

	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		data: {
			'offset': offset
		},
		error: function () {
			$("a.load-more-games").stop(true, true).fadeIn(300);
		},
		success: function (response) {
			var newDivs = Array();
			var mostRecentFlashApps = response.mostRecentFlashApps;

			//			if (response !== null) {
			//				mostRecentFlashApps = response.mostRecentFlashApps;
			//				if (!$.isArray(mostRecentFlashApps)) {
			//					// jedna polozka
			//					mostRecentFlashApps = [mostRecentFlashApps];
			//				}
			//			}
			for (var i = 0; i < mostRecentFlashApps.length; i++) {
				var game = mostRecentFlashApps[i];
				var itemDiv = $("<div />").addClass("item").addClass("game-frame-w290");
				var icoBigDiv = $("<div />").addClass("ico-big");
				var aInnerDiv = $("<div />").text(game.appTitle);
				var a = $("<a />").attr({
					href: game.appPageUrl
				}).append(aInnerDiv);
				var img = $("<img />").attr({
					alt: game.appTitle,
					src: game.imageUrl280
				});

				if ((i + 1) % 4 === 0) {
					$(itemDiv).addClass("last");
				}

				$(itemDiv)
						.data("game", game)
						.append(icoBigDiv)
						.append(a)
						.append(img)
						.hide();

				newDivs.push(itemDiv);

				$(a).click(function (event) {
					event.preventDefault();
					showGameDetail($(this).closest(".item"));
				});

				$("div.content.hry div.bigger")
						.append(itemDiv);
			}

			for (var i = 0; i < newDivs.length; i++) {
				var itemDiv = newDivs[i];
				$(itemDiv).stop(true, true).fadeIn(300);
			}

			if (newDivs.length === 40) {
				$("a.load-more-games").stop(true, true).fadeIn(300);
			}


		}
	});
}

function removeGame() {
	$(".hra-detail iframe").remove();
	$("a.sezente-ovecky").remove();
}

function hideGameDetail() {
	if (typeof (removeGameOverlay) === "function") {
		removeGameOverlay();
	}

	removeGame();
	$("div.hra-detail").slideUp();

	if ($(".content.porad .content.hry .item").length === 1) {
		$(".content.porad .content.hry .item").show();
	}

	$.colorbox.close();
}

// Neprejmenovavat, volana z Flashe
function closeFlashApp() {
	if (typeof (window.parent) !== "undefined") {
		window.parent.hideGameDetail();
	} else {
		hideGameDetail();
	}
}

// Fallback pro starsi verzi Flashe
function close() {
	closeFlashApp();
}

function showGameDetail(item) {
	showGameDetailPoster(item, false);
}

function showGameDetailPoster(item, poster) {
	removeGame();

	var game = item.data("game");
	var zobrazitPoster = poster ? "" : "?posterEnabled=false";

	//console.log(data);

	var id = game.id;
	var title = game.appTitle;
	//	var poradUrl

	var iframe;

	if (id === "000000") {
//		sezente ovecky porucha
		iframe = $("<a />").attr({
			href: "/sezente-ovecky",
			target: "_blank",
			 class: "sezente-ovecky"
		});
		var _img = $("<img />").attr({
			src: "/cms/hry/images/poster-ovecky_zmizely_02.jpg"
		});
		iframe.append(_img);
//		var _aClose = $("<a />").attr({
//			id: "cboxClose",
//			onclick: "hideGameDetail();"
//		});
//		setIframe();
//		$(".iframe-container").append(_aClose);
	} else {
		iframe = $("<iframe />").attr({
			frameborder: 0,
			scrolling: "no",
			src: "/flashAppIframe/" + id + zobrazitPoster
		});
	}

	$(".hra-detail .iframe-container").append(iframe);
	$(".hra-detail h2").text(title);

	if (typeof (game.programmePageUrl) !== "undefined" && game.programmePageUrl) {
		$(".hra-detail a.stranka-poradu")
				.attr({
					href: game.programmePageUrl
				})
				.show();
	} else {
		$(".hra-detail a.stranka-poradu").hide();
	}

	if (typeof (game.application) !== "undefined" && game.application) {
		$(".hra-detail a.objevuj-vice")
				.attr({
					href: game.application
				})
				.show();
	}

	// googlePlay, appStore
	var gameGPUrl = game.googlePlayUrl;
	if (typeof (gameGPUrl) !== "undefined" && gameGPUrl !== "") {
		$(".hra-detail a.googlePlay")
				.attr({
					href: gameGPUrl
				})
				.show();
	} else {
		$(".hra-detail a.googlePlay").hide();
	}
	var gameASUrl = game.appStoreUrl;
	if (typeof (gameASUrl) !== "undefined" && gameASUrl !== "") {
		$(".hra-detail a.appStore")
				.attr({
					href: gameASUrl
				})
				.show();
	} else {
		$(".hra-detail a.appStore").hide();
	}

	var allItems = $("div.content.hry div.bigger div.item");
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


	$($(allItems)[insertAfterIndex]).after($("div.hra-detail"));



	if ($(".content.porad .content.hry .item").length === 1) {
		$(".content.porad .content.hry .item").hide();
	}


	$(".hra-detail").stop(true, true).hide().slideDown();

	if ($(".content.porad .content.hry .item").length !== 1) {
		$("html, body").animate({
			scrollTop: $("div.hra-detail").offset().top - 30
		}, 2000);
	}

}

function expandFlashAppListBox(_this) {
	expandFlashAppListBoxPoster(_this, false);
}

function expandFlashAppListBoxPoster(_this, poster) {
	$(_this).closest('.item').data({
		game: {
			id: $(_this).find('.id').val(),
			appTitle: $(_this).find('.title').val(),
			programmePageUrl: $(_this).find('.programmePageUrl').val(),
			appStoreUrl: $(_this).find('.appStoreUrl').val(),
			googlePlayUrl: $(_this).find('.googlePlayUrl').val()
		}
	});
	showGameDetailPoster($(_this).closest('.item'), poster);
	return false;
}

function expandGameListBox(_this) {
	var el = $(_this).closest('.item');
	el.data({
		game: {
			id: el.find('.id').val(),
			appTitle: el.find('.title').val(),
			programmePageUrl: el.find('.programmePageUrl').val(),
			appStoreUrl: el.find('.appStoreUrl').val(),
			googlePlayUrl: el.find('.googlePlayUrl').val()
		}
	});
	showGameDetailPoster(el, true);
	return false;
}

$(function () {
	// Pouze kdyz se uzivatel nachazi na vypisu her
	if ($("a.load-more-games").length > 0) {
		$("a.load-more-games").click(function (event) {
			event.preventDefault();
			loadMoreGames();
		});
		if ($(".load-games-by-js").length > 0) {
			$(".load-games-by-js").remove();
			loadMoreGames();
		}
		removeGame();
	}
});
