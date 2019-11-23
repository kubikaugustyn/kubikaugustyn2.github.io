
var DP = {};

/*
 * LOG
 */

DP.log = function() {
	if (window.console && window.console.log) {
		window.console.log(arguments);
	}
}

/*
 * AJAX
 */

DP.sendAjaxRequest = function(params) {
	// callback helpery
	var callbacks = {onSuccess: undefined, onError: undefined, onTimeout: undefined, onAbort: undefined, onParseError: undefined, onBefore: undefined, onComplete: undefined};
	for (var key in callbacks) {
		if (params[key]) {
			callbacks[key] = params[key];
			delete(params[key]);
		}
	}
	// rozsireni parametru
	params = $.extend({
		type: (params["method"] || "POST"),
		cache: false,
		timeout: 10000,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			if (callbacks.onBefore) {
				callbacks.onBefore(xhr);
			}
		},
		complete: function(xhr, textStatus) {
			if (callbacks.onComplete) {
				callbacks.onComplete(xhr, textStatus);
			}
		},
		success: function(data, textStatus, xhr) {
			if (callbacks.onSuccess) {
				callbacks.onSuccess(data, xhr, textStatus);
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			switch (textStatus) {
				case "timeout":
					// pozadavek nebylo mozne odeslat - server neodpovedel v pozadovanem case
					if (callbacks.onTimeout) {
						callbacks.onTimeout();
					} else {
						alert("Server neodpovídá, zkuste požadavek odeslat znovu.");
					}
					break;
				case "error":
					// nastala chyba pri zpracovani pozadavku
					if (callbacks.onError) {
						callbacks.onError(xhr.status, xhr.responseJSON);
					} else {
						alert("Při zpracování požadavku nastala chyba.");
					}
					break;
				case "abort":
					// odeslani pozadavku bylo zruseno
					if (callbacks.onAbort) {
						callbacks.onAbort();
					}
					break;
				case "parsererror":
					// odpovede serveru neobsahuje validni odpoved a nelze zpracovat
					if (callbacks.onParseError) {
						callbacks.onParseError();
					} else {
						alert("Při zpracování příchozího požaqdavku nastala chyba.");
					}
					break;
			}
		},
		statusCode: $.extend({
			// 200: function(xhr) {},
			// 405: function(xhr) {}
			// 500: function(xhr) {}
		}, params.statusCode || {})
	}, params);
	//
	$.ajax(params);
	//
	return false;
};
