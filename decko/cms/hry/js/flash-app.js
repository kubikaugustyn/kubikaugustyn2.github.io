


function insertFlashApp(response) {
	var flashvars = response.flashvars;
	var swfObject = response.swfObject;
	var params = {
		wmode: swfObject.wmode,
		bgcolor: swfObject.bgcolor,
		allowfullscreen: swfObject.allowfullscreen,
		allowFullScreenInteractive: swfObject.allowFullScreenInteractive,
		allowScriptAccess: swfObject.allowScriptAccess
	};
	if (swfObject.base !== undefined) {
		params['base'] = swfObject.base;
	}

	var attributes = {
		name: "flashContent"
	};

	var properties = {
		icUrnPath: response.swfObject.icUrnPath,
		width: response.swfObject.width,
		height: response.swfObject.height,
		playerVersion: response.swfObject.playerVersion
	};

	var swfUrl = response.integrativeContainer.urnServiceUrl + properties.icUrnPath;

	swfobject.embedSWF(swfUrl, "flashContent", "100%", "100%", properties.playerVersion, "/cms/hry/flash/expressInstall.swf", flashvars, params, attributes);
}

function sendFlashAppRequest(flashAppUrn, sessionServiceUrl, params, queryParams, onSuccess) {
	// url pozadavku s propagovanymi parametry do konfiguraku
	url = sessionServiceUrl;
	if (queryParams !== null) {
		url += "?" + queryParams;
	}
	// dodatecne parametry z volani skriptu
	if (params === null) {
		params = {};
	}
	// ident aplikace
	params["app"] = flashAppUrn;
	//
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		data: params,
		error: function() {
			console.log('FlashAppError');
		},
		success: function(response) {
			insertFlashApp(response);
			if (onSuccess !== undefined && onSuccess !== null)
				onSuccess(response);
		}
	});
	//console.log(data)
}

// kontrola flash playeru
function hasFlash() {
	var hasFlash = false;
	if (swfobject.hasFlashPlayerVersion('1')) {
		// flash is installed
		try {
			var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if (fo) {
				hasFlash = true;
			}
		} catch (e) {
			if (navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) {
				hasFlash = navigator.mimeTypes ["application/x-shockwave-flash"].enabledPlugin != null;
			}
		}
	}
	return hasFlash;
}

function showNoFlash() {
	if (!hasFlash()) {
		$(".no-flash img").show();
	}
}

;
