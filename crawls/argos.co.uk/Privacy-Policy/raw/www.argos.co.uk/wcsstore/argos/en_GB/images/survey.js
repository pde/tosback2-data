/**
 * Survey object for handling Argos surveys. 
 * 
 * @author Anna Huang & Tom Bermel
 */

// set up namespace
if (!argos) var argos = {};
if (!argos.thirdparty) argos.thirdparty = {};

argos.thirdparty.Survey = function() {
	var survey = argos.thirdparty.Survey;						// namespace and class hierarchy reference
	var page = argos.page;										// page utility class reference
	var cookie = argos.cookie;									// cookie object reference
	
	survey.VISIBILITY = {show: "show", hide: "hide"};				// available visibility status
	survey.TYPE = {disabled: "0", internal: "1", external: "2"};  	// disabled=no popup, internal=popup+focus, external=popunder+blur
	survey.TRIGGER = {category : "CATPAGE", homepage : "HOMEPAGE"};	// available trigger types				
		
	// start instance variables
	this.windowName = "argSurvey";						// default popup target window name
	this.cookieName = "surveyVisibility";				// default cookie name to persiste visibility status
	this.name = "Argos Survey";							// default survey name
	this.popupWindow = null;							// popup window reference
	this.visibility = survey.VISIBILITY.show;			// default visibility if cookie is unavailable
	this.type = survey.TYPE.disabled;					// default type if not set				
	this.triggerList = [];								// trigger (represent a collection of pages) the survey popup
	this.categoryIdList = [];							// the root category ID for the survey, this can be used for subcatory IDs but it is not part of the spec
	this.url = null;									// destination URL whether popup or popunder
	this.pageList = []; 								// non category pages to execute the survey popup
	this.categoryPageList = []; 						// category pages to execute the survey, these pages will do a look up on the matching category
	// end instance variables
		
	/**
	 * Add a non category page
	 * @param selector {String} unique CSS selector for the page
	 */
	this.addPageSelector = function(selector) {
		if (!selector) return;
		this.pageList.push(selector);
	};
	
	/**
	 * Add a category page. 
	 * @param selector {String} unique CSS selector for the page
	 */
	this.addCategoryPageSelector = function(selector) {
		if (!selector) return;
		this.categoryPageList.push(selector);
	};
	
	/**
	 * Add a category ID. Only relevant to category pages
	 * @param id {String} Root category ID
	 */
	this.addCategoryId = function(id) {
		if (!id) return;
		this.categoryIdList.push(id);		
	};
	
	/**
	 * Add a trigger. Valid trigger are in argos.thirdparty.Survey.TRIGGER
	 * @param trigger {String} trigger for triggering the survey popup in certain pages.
	 */
	this.addTrigger = function(trigger) {
		if (!trigger) return;
		this.triggerList.push(trigger);
	};

	/**
	 * Set the URL for the survey. The way it is displayed is determined by the argos.thirdparty.Survey.TYPE.
	 * @ param url (String) the destination URL for the survey
	 */
	this.setUrl = function(url) {
		if (!url) return;
		this.url = url;
	};
	
	/**
	 * Set the type ditates the behaviour of the survey. Valid types are in argos.thirdparty.Survey.TYPE.
	 * @param type {String} the survey type 
	 */
	this.setType = function(type) {
		if (!type) return;
		this.type = type;
	}
	
	/**
	 * Set the name of the survey
	 * @param name {String} the name of the survey
	 */
	this.setName = function(name) {
		this.name = name;
	}
	
	/**
	 * Set the popup target window name reference
	 * @param windowName {String} the name for the target popup window
	 */
	this.setWindowName = function(windowName) {
		this.windowName = windowName;
	}
	// end methods
	
			
	/**
	 * Run the survey according to configuration.
	 */
	this.execute = function() {

		if (survey.TYPE.disabled == this.type) return; 				// disabled, don't execute anything		
		
		this.visibility = cookie.get(this.cookieName) || this.visibility;
		
		if (survey.VISIBILITY.show == this.visibility) {
			for (var i=0; i<this.pageList.length; i++) {
				var elem = $(this.pageList[i]);
				if (elem==null || elem.length==0) continue;
				this.show();
				this.visibility = survey.VISIBILITY.hide;
				cookie.set(this.cookieName, survey.VISIBILITY.hide, 30);
				break;
			}
		}
		
		if (survey.VISIBILITY.show == this.visibility) {
			for (var i=0; i<this.categoryPageList.length; i++) {
				var elem = $(this.categoryPageList[i]);
				if (elem==null || elem.length==0) continue;		
				
				var url = window.location.href;				
				for (var j=0; j<this.categoryIdList.length; j++) {	
					if (url.indexOf(this.categoryIdList[j]) == -1) continue;
					this.show();
					this.visibility = survey.VISIBILITY.hide;
					cookie.set(this.cookieName, survey.VISIBILITY.hide, 30);
					break;
				}
					
				break;
			}
		}		
	};
	
	/**
	 * Display the survey.
	 */
	this.show = function() {
		if (survey.TYPE.internal == this.type) {		// popup
			this.popupWindow = window.open(this.url, this.windowName, 
					"scrollbars=0,resizable=0,toolbar=0,location=0,menubar=0,status=0,directories=0,width=500,height=430");
		} else if(survey.TYPE.external == this.type) {	// pop under
			this.popupWindow = window.open(this.url, this.windowName, 
					"scrollbars=1,resizable=1,toolbar=0,location=0,menubar=0,status=0,directories=0,width=500,height=430");
			
			// The popup window may have been blocked
			if (this.popupWindow != null) {
				this.popupWindow.blur();
				this.popupWindow.opener.focus();
			}
		}
	};	
};

new argos.thirdparty.Survey(); // We create a new Survey so that the static fields can be referenced externally.

/**
 * Sets up and displays a Category Survey
 *
 * @param popupType		(String)	- The type of popup to show (defined in argos.thirdparty.Survey.TYPE) 
 * @param url			(String)	- The URL of the popup
 * @param categoryId	(String)	- The Level 2 category id for the popup to be triggered by
 */
argos.thirdparty.Survey.showCategorySurvey = function(popupType, url, categoryId) {

	if (!popupType || !url || !categoryId) return;
	
	var mainSurvey = new argos.thirdparty.Survey();
	var survey = argos.thirdparty.Survey;				// namespace reference
	
	// initialise homepage survey data
	mainSurvey.setWindowName("argSurvey");
	mainSurvey.addTrigger(survey.TRIGGER.category);

	mainSurvey.setType(popupType);
	mainSurvey.setUrl(url);
	mainSurvey.addCategoryId(categoryId);

	mainSurvey.addCategoryPageSelector(".browsel2");		// browse level 2 page selector
	mainSurvey.addCategoryPageSelector(".browsel3");		// browse level 3 page selector
	mainSurvey.addCategoryPageSelector(".proddetails");		// product detail page selector	
	mainSurvey.addCategoryPageSelector(".browselister");	// browse lister page selector
	
	mainSurvey.execute();
};

/**
 * Sets up and displays a Homepage Survey
 *
 * @param popupType		(String)	- The type of popup to show (defined in argos.thirdparty.Survey.TYPE) 
 * @param url			(String)	- The URL of the popup
 */
argos.thirdparty.Survey.showHomepageSurvey = function(popupType, url) {

	if (!popupType || !url) return;
	
	var mainSurvey = new argos.thirdparty.Survey();
	var survey = argos.thirdparty.Survey;				// namespace reference
	
	// initialise homepage survey data
	mainSurvey.setWindowName("argSurvey");
	mainSurvey.addTrigger(survey.TRIGGER.homepage);

	mainSurvey.setType(popupType);
	mainSurvey.setUrl(url);
	
	mainSurvey.addPageSelector("#argoshome");		// for homepage

	mainSurvey.execute();
};
