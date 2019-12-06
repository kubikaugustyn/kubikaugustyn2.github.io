
function DpAnalytics () {

	// vars - private
	this._inited = false;	// to prevent multiple init calls

	// vars / params - public - init values from main html
	this.pageSection 	= _dpAnPageSection;
	this.pageName 		= _dpAnPageName;
	this.pageType 		= _dpAnPageType;
	this.projectTags 	= _dpAnProjectTags;

	/**
	 * Init - private, called on load
	 */

	this._init = function() {
		// init data layer mock
		if(typeof dataLayer == 'undefined'){
			dataLayer = [];
		}

		// try init
		if(_dpAnInitialize == null || typeof _dpAnInitialize == 'undefined' || _dpAnInitialize == true || _dpAnInitialize == 'true'){
			// do auto-initialize
			this.init();
		}
	};

	/**
	 * Init - public, called on load or from page (for example in IC)
	 */

	this.init = function () {
		if(!this._inited){
			this._inited = true;
			this._initGoogle();
		} else {
			console.log('Ananlytics can be initialised only once');
		}
	};

	/**
	 * Init Google analytics
	 */

	this._initGoogle = function () {
		// must be set before Tag-Manager initialisation (According to Etnetera)
		dataLayer.push(this._getGoogleParams());

		// init Tag-Manager
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PLJ99G');

		// todo - remove after TagManager transition is complete
		if(typeof _gaq !== 'undefined'){
			if(typeof this.pageName !== 'undefined' && this.pageName.length > 0){
				// try custom pageView
				_gaq.push(['first._trackPageview', this.pageName]);
			} else {
				_gaq.push(['first._trackPageview']);
			}
		}
	}

	this._getGoogleParams = function () {
		var params = {};
		// try set custom params
    if(typeof this.pageSection !== 'undefined' && this.pageSection.length > 0){
      params.pageSection = this.pageSection;
    }
		if(typeof this.pageName !== 'undefined' && this.pageName.length > 0){
			params.pageName = this.pageName;
		}
		if(typeof this.pageType !== 'undefined' && this.pageType.length > 0){
			params.pageType = this.pageType;
		}
		if(typeof this.projectTags !== 'undefined' && this.projectTags.length > 0){
			params.pageProject = this.projectTags;
		} else {
			 try {
				 // todo - simplify parsing
				 if(window.parent && window.parent.dpAnalytics && window.parent.dpAnalytics.projectTags){
					 var parentTags = window.parent.dpAnalytics.projectTags;
					 if(typeof parentTags !== 'undefined' && parentTags.length > 0){
						 params.pageProject = parentTags;
					 }
				 }
			 } catch(err) {
			 	// cannot access window parent - mainly because of crossdomain
			 }
		}
		return params;
	}

	/**
	 * Track event
	 * @param category - povinnĂˇ (jinak spadne pod obecnĂ© 'decko') - kategorie 'SikuloveGalerie'
	 * @param eventName - optional - nazev eventu 'Button'
	 * @param eventvalue - optional - hodnota eventu 'Download'
	 * @param event - optional - pageInteraction(default) / containerInteraction - nyni pro rozliseni eventu na strankach a uvnitr kontejneru
	 */

	this.trackEvent = function( category, eventName, eventvalue, event) {
		if(typeof category == 'undefined'){
			category = 'decko';
		}
		if(typeof eventName == 'undefined'){
			eventName = '';
		}
		if(typeof eventvalue == 'undefined'){
			eventvalue = '';
		}
		if(typeof event == 'undefined'){
			event = 'pageInteraction';
		}

		// todo - disable tracking on test
		if(!_dpAnEnabled){
			console.log('DP Analytics: ' + category + ', ' + eventName + ', ' + eventvalue);	// todo - add color
		}

		// new event tracking
		dataLayer.push({
			'event': 		event,
			'category': 	category,
			'action':		String(eventName),
			'label':		String(eventvalue)
		});

		// todo - remove after TagManager transition is complete
		if(typeof _gaq !== "undefined"){
			_gaq.push(['first._trackEvent', category, String(eventName), String(eventvalue)]);
		}
	};

	// do init
	this._init();
}

// inicializace
var dpAnalytics = new DpAnalytics();
