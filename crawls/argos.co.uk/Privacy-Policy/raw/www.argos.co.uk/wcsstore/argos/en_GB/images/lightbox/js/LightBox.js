argos.require("utils");

var LightBox = {};
$(document).ready(function(){
	LightBox = new (function(){

		// private members
		var me = this;
		var loadingHTML = '<div class="loading"><img src="/wcsstore/argos/en_GB/images/lightbox/img/loading.gif" alt="loading"/></div>';
		var config = {hideSelects: true,
					  tooltipText: "To close the stock availability tool box click on the 'Close X' link", 
					  closeOnOverlayClick: true, 
					  closeClass: "closeLightBox", 
					  opacity: "0.45"};
		var IE6 = ($.browser.msie && parseInt($.browser.version) == 6);
		var IE7 = ($.browser.msie && parseInt($.browser.version) == 7);
		var FF = ($.browser.mozilla); //needs work to not do it for FF3 etc
		var state = {showingOverlay: false,	showingDialogue: false,	yScrollPos: 0}
		var overlay = (function(){
			var o;
			o = document.createElement("div");
			o.id = "overlay";
			$(o).css({opacity: config.opacity});// for cross browser lovelyness
			if(IE6 || FF) {
				$(o).css({position: "absolute"});
			}			
			if (config.closeOnOverlayClick) {
				$(o).bind("click", function(){
					LightBox.extended.close(o);
				});
			}
			document.body.appendChild(o);		
			return o;
		}());
		var dialogue = (function(){
			var o;
			o = document.createElement("div");
			o.id = "lightBox";
			document.body.appendChild(o);
			return o;
		}());	

		if(IE6 || FF) {
			$(window).resize(window_onResize);
			$(window).scroll(window_onScroll);
		}

		function window_onResize() {
			setIE6Style();
		}

		function window_onScroll() {
			setIE6Style();		
		}		

		function setOverlayTooltip(value) {
			$(overlay).attr("title", value);
		}

		/*
		 * 
		 */
		function showOverlay() {
			if(state.showingOverlay) return;
			if (IE6) {
				setSelectsVisibilityStyle(false);
				setIE6Style();
			}
			if (IE7 || IE6) {
				setFlashVisibilityStyle(false);
			}
			$(overlay).css({display: "block"});
			$(overlay).attr("title", config.tooltipText);
			state.showingOverlay = true;
		}

		/*
		 * hide the overlay
		 * IE6 has extra function calls
		 * @param void
		 * @return void
		 */
		function hideOverlay(){
			if (!state.showingOverlay) return;
			if (IE6) {
				setSelectsVisibilityStyle(true);
			}
			if (IE7 || IE6) {
				setFlashVisibilityStyle(true);
			}			
			$(overlay).css({display: "none"});
			state.showingOverlay = false;
		}
		
		/*
		 * show light box - restyles and shows
		 * @param void
		 * @return void
		 */
		function showLightBox() {
			styleLightBox();
			
			if(IE6)	$("#lightBox").bgiframe();
		}
		
		/*
		 * hide light box
		 * @param void
		 * @return void
		 */
		function hideLightBox() {
			$(dialogue).css({left: "-99999em"});
			if (IE6) {
				setSelectsVisibilityStyle(true);
			}
			if (IE7 || IE6) {
				setFlashVisibilityStyle(true);
			}				
		}

		/*
		 * style and position the light box
		 * @param void
		 * @return void
		 */
		function styleLightBox() {		
			var position = getPosition();			
			
			$(dialogue).css({left:position.left,top:position.top});
						
			if (IE6) {
				setSelectsVisibilityStyle(false);
				setIE6Style();
			}
			if (IE7 || IE6) {
				setFlashVisibilityStyle(false);
			}			
		}

		function getPosition() {
			var position = {};
			position.left = (function(){
				var x = (($(window).width() - $(dialogue).width()) / 2) + $(window).scrollLeft();
				if(x < 0) x = 0;
				return x+"px";
			}());
			
			position.top = (function(){
				var x = (($(window).height() - $(dialogue).height()) / 2) + $(window).scrollTop();
				if(x < 0) x = 0;
				return x+"px";
			}());

			return position;
		}

		/*
		 * set the html for the lightbox
		 * @param html as string of html
		 * @return void
		 */
		function setHTML(html) {
			dialogue.innerHTML = html;
			setCloseEvent();
		}
		
		/*
		 * apply close event to close buttons
		 * @param void
		 * @return void
		 */
		function setCloseEvent() {
			$(dialogue).find("a."+config.closeClass).bind("click",function(){
				hideLightBox();
				hideOverlay();
				return false;
			});
		}
		
		/*
		 * toggle <select> visibility to fix IE6 select zIndex issue
		 * @param toVisible as boolean
		 * @return void
		 */
		function setSelectsVisibilityStyle(toVisible) {
			if(!config.hideSelects) return;
			var visibility = toVisible ? "visible" : "hidden";
			$("select").css({visibility: visibility});		
		}
		
		/*
		 * toggle <embed> or <object> visiiblity to fix IE6/IE7 zIndex issue
		 * @param toVisible as boolean
		 * @return void
		 */
		function setFlashVisibilityStyle(toVisible) {
			var visibility = toVisible ? "visible" : "hidden";
			$("embed, object").css({visibility: visibility});
		}		
		
		/*
		 * fixes overlay issue in IE6
		 * possible fix would be to calculate on resize/scroll new height and offset
		 * @param reset as boolean
		 * @return void
		 */
		function setIE6Style() {
			$(overlay).css({
				height: $(document).height()+"px",
				width: $(document).width()+"px"
			});
			
			
		}
		
		function setHideSelects(newVal) {
			config.hideSelects = newVal;
		}
		
		// public members
		this.showOverlay = showOverlay;
		this.hideOverlay = hideOverlay;
		this.showLightBox = showLightBox;
		this.hideLightBox = hideLightBox;
		this.setHTML = setHTML;
		this.setOverlayTooltip = setOverlayTooltip;
		this.setHideSelects = setHideSelects;
		this.loadingHTML = loadingHTML;
		this.element = dialogue;
		this.overlay = overlay;
		this.coordinates = getPosition;
	});


	// Added to help prevent having to repeat the same code over and over when creating lightboxes.
	// This should really be a part of the LightBox object, but trying to keep changes in that to a minimum.
	LightBox.extended = new function() {
		var _lbExtended = this;
		var _helpers = {
			getType : argos.utils.getType
		}

		function _showErrorMessage(XMLHttpRequest, textStatus, errorThrown, msg) {
			var message = (msg) ? msg : "We are currently unable to retrieve the requested information. Please <a href=\"#\" class=\"closeLightBox\">close this area</a> if you want to continue shopping or try again."; 
			var html  =		"<p class=\"message\">" + message + "</p>";
				html += 	"<h3>Technical details:</h3>";
			    html +=		"<p>Request: " + XMLHttpRequest + "</p>";
			    html +=		"<p>Status: " + textStatus + "</p>";
		    	html +=		"<p>Code: " + XMLHttpRequest.status + "</p>";
			    html +=		"<p>Error: " + errorThrown + "</p>";
	    	return html;
		}

		function _contentFrame(content, values) {
			var id = (arguments.length > 1 && values.id) ? values.id : "";
			var cls = (arguments.length > 1 && values.cls) ? values.cls : "";
			var header = (arguments.length > 1 && values.header) ? values.header : "";
			var contentAsString = _helpers.getType(content) == "String";
			var $node;

			var html  = "<div class=\"" + cls + "\" id=\"" + id + "\">";
				html +=     "	<div class=\"header\">";
				html += 	"		<h2>" + header + "</h2>";
				html +=     "		<a class=\"closeLightBox\" href=\"#\">Close</a>";
				html +=     "	</div>";
				html +=     "	<div class=\"content\">";
				html += 	contentAsString ? content : "";
				html +=     "	</div>";
				html +=     "	<div class=\"footer\">";
				html +=     "	</div>";
				html +=     "</div>";

			$node = $(html);
			if(!contentAsString) {
				$node.find(".content").append(content); 
			}

			return $node;
		}

		this.request = function(conf) {
			// Create a standard onError function if one is not passed.
			var msg = (conf.errorMessage && conf.errorMessage != undefined) ? conf.errorMessage : "";
			if(!conf.error) {
				conf.error = function(XMLHttpRequest, textStatus, errorThrown) {
					$(LightBox.element).addClass("error");
					_lbExtended.populate(_showErrorMessage(XMLHttpRequest, textStatus, errorThrown, msg), true, {
						"header" : "Sorry, an error occured."
					});
				}
			}

			// Call and load the required content.
			LightBox.extended.xhr = $.ajax(conf); // Note: some dataTypes (such as jsonp) do not use an XHR so this will be 'undefined'.
		}

		this.loading = function(name, doNotDeleteNodes) {
			if(!$(LightBox.element).hasClass("loading")) {
				LightBox.showOverlay();
		    	LightBox.setOverlayTooltip("To close the " + name + "box click on the 'Close X' link");
				LightBox.extended.setContent(LightBox.loadingHTML, doNotDeleteNodes); 
				LightBox.showLightBox();
				$(LightBox.element).addClass("loading");
			}
		}


		/* example use:
			LightBox.extended.populate(json.html, true, {
				"header" : "Thank you"
			});
		or
			LightBox.extended.populate(html); */	
		this.populate = function(htmlOrNode, frame, values) {
			// frame = true, surrounds HTML content with standard LightBox inner framework.
			// values allows custom values to be inserted into framework (id, class, header).
			var values = (arguments.length > 2) ? values : {};

			LightBox.showOverlay();
			LightBox.hideLightBox();
			$(LightBox.element).removeClass("loading");
			$(LightBox.element).addClass("standard");

			if(arguments.length > 1) {
				// Insert HTML or node into lightBox, wrapped in standard markup.
				LightBox.extended.setContent(_contentFrame(htmlOrNode, values), values["doNotDeleteNodes"]);					
			}
			else {
				// Just insert the HTML or node into lightBox frame.
				LightBox.extended.setContent(htmlOrNode, values["doNotDeleteNodes"]);
			}

	     	LightBox.showLightBox();
			$(".closeLightBox", LightBox.element).each(function() {
				var t = $(this);
				t.unbind("click"); // clear the old event because we want the new one.
				t.click(function(){ 
					LightBox.extended.close();
					return false;
				}); 
			});
		}

		this.setContent = function(content, doNotDeleteNodes) {
			// Content can be HTML string node object.
			var type = _helpers.getType(content);
			var lb = LightBox.element;

			// Incomplete: Intended to stop IE issues with removing Events on elements we no longer
			// want to show in the LB but want to hold on to in memory (e.g. set of Product Carousel
			// that may be open again, but we don't want to make another request and rebuild etc.)
			if(doNotDeleteNodes) {
				for(var i=0, children=lb.childNodes; i<children.length; ++i) {
					try {
						lb.removeChild(children[i]);
					} 
					catch(e) {
						//alert("error: " + e);
					}
				}
			}
			else {
				$(lb).empty();
			}

			if(type == "String") {
				lb.innerHTML = content;
			}
			else {
				$(lb).append(content);
			}
		}

		this.close = function(a) {
			// Login links use jsonp, which doesn't use XHR. That means we cannot 
			// .abort() the request, so we ignore Overlay click event. 
			var activatedBy = arguments.length > 0 ? a : {"id":""};

			if(LightBox.extended.xhr) {
				LightBox.extended.xhr.abort();
			}

			LightBox.hideLightBox();
			LightBox.hideOverlay();
			$(LightBox.element).removeClass();
			return false;
		}

	}

	// Added to cope with opening a lightbox from a lightbox and returning to previous.
	LightBox.extended.history = new function() {
		var	_history = new Array();

		this.update = function(record) {
			_history.push(record);
		}

		this.reset = function(){
			_history = new Array();
		}

		this.length = function() { 
			return _history.length; 
		}

		this.previous = function() {
			var record = null;
			var current = _history.length - 1; // length counts from 1 but index from zero.
			switch(_history.length) {
				case 0 : record = {};
					break;
				case 1 : record = _history[0];
					break;
				default : record = _history[current - 1];
			}
			return record;			
		}

		this.recordAt = function(i) {
			return _history[i];
		}

	}

});

