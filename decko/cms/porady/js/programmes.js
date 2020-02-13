var charactersBox50PageSize = 1;
var charactersBox100PageSize = 1;
var characterThumbnailOuterWidth = 170;

function getBoxCurrentPage(box) {
	return box.data("currentPage");
}

function setBoxCurrentPage(box, value) {
	box.data("currentPage", value);
}

function getBoxNumPages(box) {
	return box.data("numPages");
}

function getCharactersBoxPageSize(box) {
	return box.hasClass("size-50") ? charactersBox50PageSize : charactersBox100PageSize;
}

function getCharactersBoxCap(box) {
	return box.hasClass("size-50") ? 2 : 5;
}

function getCharactersBox(element) {
	return $(element).closest(".characters-box");
}

function showCharacterDetail(characterId) {
	var characterClass = ".character-" + characterId;
	var detailDiv = $(characterClass);
	var box = detailDiv.closest(".characters-box");

	box.find(".character-detail").not(characterClass).hide();
	box.find(characterClass).stop(true, true).hide().fadeIn(300);
//	box.find(".char-inner").css({
//		height: "auto"
//	});
}

function enableOrDisableBoxButtons(box) {
	if (getBoxCurrentPage(box) === 1) {
		box.find("a.prev").hide();
	}
	else {
		box.find("a.prev").show();
	}
	if (getBoxCurrentPage(box) >= getBoxNumPages(box) - getCharactersBoxCap(box)) {
		box.find("a.next").hide();
	}
	else {
		box.find("a.next").show();
	}
}

$(function() {
	$(".characters-box").each(function() {
		var box = $(this);
		var reelContainer = box.find(".reel-container");
		var reel = reelContainer.find(".reel");
		var thumbnails = box.find(".character-thumbnail");
		var prev = box.find("a.prev");
		var next = box.find("a.next");
		var close = box.find("a.close");

		reel.append(thumbnails);
		reel.css({
			width: (thumbnails.length * characterThumbnailOuterWidth) + "px"
		});

		var pageSize = getCharactersBoxPageSize(box);

		var numPages = 0;
		var i = 0;
		while (i < thumbnails.length) {
			i += pageSize;
			numPages += 1;
		}

		box.data({
			currentPage: 1,
			numPages: numPages
		});

		enableOrDisableBoxButtons(box);

		thumbnails.each(function() {
			var id = $(this).find("input[name='id']").val();
			var a = $(this).find("a");
			a.data({
				id: id
			});
			if (!$(this).closest(".characters-box").hasClass("inactive")) {
				a.click(function(event) {
					event.preventDefault();
					showCharacterDetail($(this).data("id"));
				});
			}
		});

		//thumbnails.first().find("a").click();


		next.click(function(event) {
			event.preventDefault();
			var box = getCharactersBox(this);
			var currentPage = getBoxCurrentPage(box);
			var numPages = getBoxNumPages(box);
			var pageSize = getCharactersBoxPageSize(box);

			if (currentPage < numPages) {
				currentPage += 1;
				setBoxCurrentPage(box, currentPage);
				box.find(".reel").animate({
					left: (-1 * pageSize * (characterThumbnailOuterWidth)) * (currentPage - 1)
				});
				enableOrDisableBoxButtons(box);
			}
		});

		prev.click(function(event) {
			event.preventDefault();
			var box = getCharactersBox(this);
			var currentPage = getBoxCurrentPage(box);
			var numPages = getBoxNumPages(box);
			var pageSize = getCharactersBoxPageSize(box);

			if (currentPage > 1) {
				currentPage -= 1;
				setBoxCurrentPage(box, currentPage);
				box.find(".reel").animate({
					left: (-1 * pageSize * (characterThumbnailOuterWidth)) * (currentPage - 1)
				});
				enableOrDisableBoxButtons(box);
			}
		});

		close.click(function(event) {
			event.preventDefault();
			var box = getCharactersBox(this);
			//			box.find(".char-inner").css({
			//				height: "218px"
			//			});
			box.find(".character-detail").slideUp();
		});
	});
});


