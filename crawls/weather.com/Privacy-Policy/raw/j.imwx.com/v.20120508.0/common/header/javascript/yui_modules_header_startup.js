/*
element-min.js
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;this.configure(B,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,setter:null,getter:null,validator:null,getValue:function(){var A=this.value;if(this.getter){A=this.getter.call(this.owner,this.name,A);}return A;},setValue:function(F,B){var E,A=this.owner,C=this.name;var D={type:C,prevValue:this.getValue(),newValue:F};if(this.readOnly||(this.writeOnce&&this._written)){return false;}if(this.validator&&!this.validator.call(A,F)){return false;}if(!B){E=A.fireBeforeChangeEvent(D);if(E===false){return false;}}if(this.setter){F=this.setter.call(A,F,this.name);if(F===undefined){}}if(this.method){this.method.call(A,F,this.name);}this.value=F;this._written=true;D.type=C;if(!B){this.owner.fireChangeEvent(D);}return true;},configure:function(B,C){B=B||{};if(C){this._written=false;}this._initialConfig=this._initialConfig||{};for(var A in B){if(B.hasOwnProperty(A)){this[A]=B[A];if(C){this._initialConfig[A]=B[A];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig,true);},refresh:function(A){this.setValue(this.value,A);}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){this._configs=this._configs||{};var B=this._configs[C];if(!B||!this._configs.hasOwnProperty(C)){return null;}return B.getValue();},set:function(D,E,B){this._configs=this._configs||{};var C=this._configs[D];if(!C){return false;}return C.setValue(E,B);},getAttributeKeys:function(){this._configs=this._configs;var C=[],B;for(B in this._configs){if(A.hasOwnProperty(this._configs,B)&&!A.isUndefined(this._configs[B])){C[C.length]=B;}}return C;},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B);}}},resetValue:function(C,B){this._configs=this._configs||{};if(this._configs[C]){this.set(C,this._configs[C]._initialConfig.value,B);return true;}return false;},refresh:function(E,C){this._configs=this._configs||{};var F=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(F.hasOwnProperty(E[D])){this._configs[E[D]].refresh(C);}}},register:function(B,C){this.setAttributeConfig(B,C);},getAttributeConfig:function(C){this._configs=this._configs||{};var B=this._configs[C]||{};var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C];}}return D;},setAttributeConfig:function(B,C,D){this._configs=this._configs||{};C=C||{};if(!this._configs[B]){C.name=B;this._configs[B]=this.createAttribute(C);}else{this._configs[B].configure(C,D);}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D);},resetAttributeConfig:function(B){this._configs=this._configs||{};this._configs[B].resetConfig();},subscribe:function(B,C){this._events=this._events||{};if(!(B in this._events)){this._events[B]=this.createEvent(B);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.subscribe.apply(this,arguments);},addListener:function(){this.subscribe.apply(this,arguments);},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C);},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B);},createAttribute:function(B){return new YAHOO.util.Attribute(B,this);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var B=YAHOO.util.Dom,D=YAHOO.util.AttributeProvider,C={mouseenter:true,mouseleave:true};var A=function(E,F){this.init.apply(this,arguments);};A.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"mouseenter":true,"mouseleave":true,"focus":true,"blur":true,"submit":true,"change":true};A.prototype={DOM_EVENTS:null,DEFAULT_HTML_SETTER:function(G,E){var F=this.get("element");if(F){F[E]=G;}return G;},DEFAULT_HTML_GETTER:function(E){var F=this.get("element"),G;if(F){G=F[E];}return G;},appendChild:function(E){E=E.get?E.get("element"):E;return this.get("element").appendChild(E);},getElementsByTagName:function(E){return this.get("element").getElementsByTagName(E);},hasChildNodes:function(){return this.get("element").hasChildNodes();},insertBefore:function(E,F){E=E.get?E.get("element"):E;F=(F&&F.get)?F.get("element"):F;return this.get("element").insertBefore(E,F);},removeChild:function(E){E=E.get?E.get("element"):E;return this.get("element").removeChild(E);},replaceChild:function(E,F){E=E.get?E.get("element"):E;F=F.get?F.get("element"):F;return this.get("element").replaceChild(E,F);},initAttributes:function(E){},addListener:function(J,I,K,H){H=H||this;var E=YAHOO.util.Event,G=this.get("element")||this.get("id"),F=this;if(C[J]&&!E._createMouseDelegate){return false;}if(!this._events[J]){if(G&&this.DOM_EVENTS[J]){E.on(G,J,function(M,L){if(M.srcElement&&!M.target){M.target=M.srcElement;}if((M.toElement&&!M.relatedTarget)||(M.fromElement&&!M.relatedTarget)){M.relatedTarget=E.getRelatedTarget(M);}if(!M.currentTarget){M.currentTarget=G;}F.fireEvent(J,M,L);},K,H);}this.createEvent(J,{scope:this});}return YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){return this.addListener.apply(this,arguments);},subscribe:function(){return this.addListener.apply(this,arguments);},removeListener:function(F,E){return this.unsubscribe.apply(this,arguments);},addClass:function(E){B.addClass(this.get("element"),E);},getElementsByClassName:function(F,E){return B.getElementsByClassName(F,E,this.get("element"));},hasClass:function(E){return B.hasClass(this.get("element"),E);},removeClass:function(E){return B.removeClass(this.get("element"),E);},replaceClass:function(F,E){return B.replaceClass(this.get("element"),F,E);},setStyle:function(F,E){return B.setStyle(this.get("element"),F,E);
},getStyle:function(E){return B.getStyle(this.get("element"),E);},fireQueue:function(){var F=this._queue;for(var G=0,E=F.length;G<E;++G){this[F[G][0]].apply(this,F[G][1]);}},appendTo:function(F,G){F=(F.get)?F.get("element"):B.get(F);this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:F});G=(G&&G.get)?G.get("element"):B.get(G);var E=this.get("element");if(!E){return false;}if(!F){return false;}if(E.parent!=F){if(G){F.insertBefore(E,G);}else{F.appendChild(E);}}this.fireEvent("appendTo",{type:"appendTo",target:F});return E;},get:function(E){var G=this._configs||{},F=G.element;if(F&&!G[E]&&!YAHOO.lang.isUndefined(F.value[E])){this._setHTMLAttrConfig(E);}return D.prototype.get.call(this,E);},setAttributes:function(K,H){var F={},I=this._configOrder;for(var J=0,E=I.length;J<E;++J){if(K[I[J]]!==undefined){F[I[J]]=true;this.set(I[J],K[I[J]],H);}}for(var G in K){if(K.hasOwnProperty(G)&&!F[G]){this.set(G,K[G],H);}}},set:function(F,H,E){var G=this.get("element");if(!G){this._queue[this._queue.length]=["set",arguments];if(this._configs[F]){this._configs[F].value=H;}return;}if(!this._configs[F]&&!YAHOO.lang.isUndefined(G[F])){this._setHTMLAttrConfig(F);}return D.prototype.set.apply(this,arguments);},setAttributeConfig:function(E,F,G){this._configOrder.push(E);D.prototype.setAttributeConfig.apply(this,arguments);},createEvent:function(F,E){this._events[F]=true;return D.prototype.createEvent.apply(this,arguments);},init:function(F,E){this._initElement(F,E);},destroy:function(){var E=this.get("element");YAHOO.util.Event.purgeElement(E,true);this.unsubscribeAll();if(E&&E.parentNode){E.parentNode.removeChild(E);}this._queue=[];this._events={};this._configs={};this._configOrder=[];},_initElement:function(G,F){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];F=F||{};F.element=F.element||G||null;var I=false;var E=A.DOM_EVENTS;this.DOM_EVENTS=this.DOM_EVENTS||{};for(var H in E){if(E.hasOwnProperty(H)){this.DOM_EVENTS[H]=E[H];}}if(typeof F.element==="string"){this._setHTMLAttrConfig("id",{value:F.element});}if(B.get(F.element)){I=true;this._initHTMLElement(F);this._initContent(F);}YAHOO.util.Event.onAvailable(F.element,function(){if(!I){this._initHTMLElement(F);}this.fireEvent("available",{type:"available",target:B.get(F.element)});},this,true);YAHOO.util.Event.onContentReady(F.element,function(){if(!I){this._initContent(F);}this.fireEvent("contentReady",{type:"contentReady",target:B.get(F.element)});},this,true);},_initHTMLElement:function(E){this.setAttributeConfig("element",{value:B.get(E.element),readOnly:true});},_initContent:function(E){this.initAttributes(E);this.setAttributes(E,true);this.fireQueue();},_setHTMLAttrConfig:function(E,G){var F=this.get("element");G=G||{};G.name=E;G.setter=G.setter||this.DEFAULT_HTML_SETTER;G.getter=G.getter||this.DEFAULT_HTML_GETTER;G.value=G.value||F[E];this._configs[E]=new YAHOO.util.Attribute(G,this);}};YAHOO.augment(A,D);YAHOO.util.Element=A;})();YAHOO.register("element",YAHOO.util.Element,{version:"2.8.0r4",build:"2449"});

/******** code from pco-js-modules.jspf *******/
(function(){
	window.TWCI = YAHOO;
    var Y = YAHOO.util,
        Lang = YAHOO.lang,
		Cookie = TWCI.util.Cookie,
        Get = TWCI.util.Get,
        Event = TWCI.util.Event,
        Connect = YAHOO.util.Connect,
        Dom = TWCI.util.Dom,
        RSID = 'twc-weather-recent-search-results',

    // STRING CONSTANTS
        IS_EMPTY = 'isEmpty',
        EMPTY_TEXT = 'emptyText',
		ELEMENT = 'element',

	    TextBox = function(el, attr) {
	        attr = attr || {};
	        TextBox.superclass.constructor.call(this, el, attr);
	    };
	YAHOO.namespace("weather");

    YAHOO.extend(TextBox, YAHOO.util.Element, {
        EMPTY_CLASSNAME: 'empty',
        ERROR_CLASSNAME: 'twc-error-state',

        toString: function() {
            var el = this.get(ELEMENT),
                id = el.id || el.tagName;
            return "TextBox " + id;
        },

        initAttributes: function(attr) {
            attr = attr || {};
            TextBox.superclass.initAttributes.call(this, attr);

            this.setAttributeConfig(IS_EMPTY, {
                value: attr.emptyText || this.get('title'),
                method: function(isEmpty) {
                    if (isEmpty) {
                        Dom.addClass(this, this.EMPTY_CLASSNAME);
                        Dom.removeClass(this, this.ERROR_CLASSNAME);
                        this.set('value', this.get(EMPTY_TEXT));
                    } else {
                        Dom.removeClass(this, this.EMPTY_CLASSNAME);
                    }
                },
                validator: Lang.isBoolean
            });

            this.setAttributeConfig(EMPTY_TEXT, {
                value: attr.emptyText || this.get('title')
            });

            if (this.get(EMPTY_TEXT) === null || this.get(EMPTY_TEXT) === '') {
                return;
            }

            this.on('focus', this._handleFocus);
            this.on('blur', this._checkEmpty);
            this.on('available',function(){
            	this.set(IS_EMPTY, (value == this.get(EMPTY_TEXT)));
            })

            this._checkEmpty();
        },

        _handleFocus: function() {
        	this._checkEmpty();

            if (this.get(IS_EMPTY)) {
                this.set('value', '');
                this.set(IS_EMPTY, false);
            } else {
            	this.get(ELEMENT).select();
            }
        },

        _checkEmpty: function() {
			
            var value = this.get('value');
			if(value.toLowerCase()=='password') {
				this.set('type', 'text');
			}
			this.set(IS_EMPTY, (value === "" || value == this.get(EMPTY_TEXT)));
        }
    });

    YAHOO.weather.TextBox = TextBox;
	YAHOO.register("wx-textbox", YAHOO.weather.TextBox, {version: "1.0", build: "1"});
         
    var fv = YAHOO.util.Cookie.get('fv');
	
	if(fv) {
		if(fv==1 || fv==2) {
			fv++;
			YAHOO.util.Cookie.set('fv', fv, {
				path:'/',
				domain:'weather.com'
			});
		} else if( fv==3) {
			fv = -1;
			YAHOO.util.Cookie.set('fv', fv, {
				path:'/',
				domain:'weather.com'
			});
		}
	} else  {
		fv = 1;
		YAHOO.util.Cookie.set('fv', fv, {
		path:'/',
		domain:'weather.com'
		});
	}
	// wx.config.page should have been created in /WEB-INF/tags/global/pagemetaAdData.tag
	// But, in case it has not generate an empty object tree. This handles weathergold errors
	window.wx = window.wx || {};
	wx.config = wx.config || {};
	wx.config.page = wx.config.page || {};
	wx.config.page.fv = fv; //Update value in PCO
	
	//Local Search
	Event.onAvailable("headerSearchForm", function() {
		// Make search input a TextBox if "placeholder" in input element does not exist
		var dummyInputElement = document.createElement("input");
		if(!("placeholder" in dummyInputElement)){
	    	var _tab = Dom.get("typeaheadBox");
	    	YAHOO.util.Dom.addClass(_tab,"twc-empty-input");
			YAHOO.weather.searchBox = new YAHOO.weather.TextBox(_tab);
		}
		// Setup TypeAhead
		YAHOO.namespace("weather.typeahead");
		var YUE = Event = YAHOO.util.Event,
		YUD = Dom = YAHOO.util.Dom;
		
		var oDS = new YAHOO.util.ScriptNodeDataSource("http://wxdata.weather.com/wxdata/ta/");
		oDS.scriptCallbackParam = "cb";
		//Set number of cached entries
		oDS.maxCacheEntries = 200;
	
		// Set the responseType
		oDS.responseType = YAHOO.util.DataSourceBase.TYPE_JSON;
		oDS.responseSchema = {
			resultsList: "results",
			fields: ["name", "key", "type", "country", "class", "state", "countryName"]
		};
	
		// Instantiate the AutoComplete
		var oAC = new YAHOO.widget.AutoComplete("typeaheadBox","twc-weather-typeahead-results",oDS);
		oAC.minQueryLength = 3;
		//Prevents the autocomplete from flattening the data into an array
		oAC.resultTypeList = false;
	
		//Number of maximum results to show
		oAC.maxResultsDisplayed = 10;
		//Prevent auto highlighting of first result
		oAC.autoHighlight = false;
		oAC.animSpeed = 0;
		oAC.useShadow = true;
		// The webservice needs custom parameters
		oAC.generateRequest = function(sQuery) {
			return sQuery + ".js?max=10&key=e88d1fec-a740-102c-bafd-001321203584&locType=1,9,5,11,13,19,20";
		};
	    
		// Formats results for displaying
		oAC.formatResult = function(oResultData, sQuery, sResultMatch) {
			var url;
			var locationDisplayString;
			if (typeof(oResultData.name) != 'undefined') {
				locationDisplayString = oResultData.name;
			}
			if (typeof(oResultData.state) != 'undefined' && oResultData.state != '*' && (oResultData.country == 'US' || oResultData.country == 'CA')) {
				locationDisplayString = locationDisplayString + ", " + oResultData.state;
			}
			if (typeof(oResultData.countryName) != 'undefined' && oResultData.countryName != '*') {
				locationDisplayString = locationDisplayString + ", " + oResultData.countryName ;
			}
			if(locationDisplayString.length > 40) {
				locationDisplayString = locationDisplayString.substring(0,40)+'...';
			}
			if (oResultData !== null) {
				url = "/weather/right-now/" + oResultData.key + ":" + oResultData.type;
				return locationDisplayString;
			} else {
				return null;
			}
	        
	    	};
	    	    	
	    	oAC._selectItem = function(selectedItem) {
	    		var localSearchForm = document.forms["headerSearchForm"];
				var searchTextBox = localSearchForm.elements["where"];
				//searchTextBox.blur();
			  var oResultData = selectedItem._oResultData;
			  YAHOO.util.Cookie.set("fromStr","searchbox_typeahead",{"path":"/","domain":".weather.com"});
			  if (oResultData.type == 1) {
			    document.location = "/weather/right-now/" + oResultData.key;
			  } else if (oResultData.type == 5) {
			    document.location = "/outlook/recreation/golf/weather/weekend/?clubId=" + oResultData.key;
			  } else if (oResultData.type == 9) {
			    document.location = "/outlook/travel/businesstraveler/airportprofile/" + oResultData.key + ":" + oResultData.type;
			  } else {
			    document.location = "/weather/right-now/" + oResultData.key + ":" + oResultData.type;
			  }
		   };
	
	
	    YAHOO.weather.typeahead = oAC;
		YAHOO.register("wx-typeahead", YAHOO.weather.typeahead, {version: "1.0", build: "1"});

		// Add submit handler for headerSearchForm
		Event.on("headerSearchForm", "submit", function(e) {
			var localSearchForm = YAHOO.util.Dom.get("headerSearchForm");
			var searchTextBox = YAHOO.util.Dom.get("typeaheadBox");
			Event.stopEvent(e);
			if (searchTextBox.value == searchTextBox.getAttribute("title") || searchTextBox.value=="") {
				YAHOO.util.Dom.setAttribute(searchTextBox,"placeholder","Enter Zip, City or Place");
				YAHOO.util.Dom.addClass(searchTextBox,'twc-error-state');
			} else {
			  	YAHOO.util.Cookie.set("fromStr","hdr_localsearch",{"path":"/","domain":".weather.com"});
				localSearchForm.submit();
			}
   		});
   		
		Event.onAvailable("typeaheadBox",function(){
			var RSID = Dom.get("twc-weather-recent-search-results");
			Event.on("typeaheadBox","focus",function(e, matchedEl, container){
				Event.stopEvent(e);
				var user = wx.config.user;
				var recentSearches = user && user.recentSearchLocations || [];
				if (recentSearches && recentSearches.length >0) {
					var rsHtml = '<h3 class="twc-recent-searches-header">Recent Searches</h3><ul>';
					for (i=0;i<recentSearches.length;i++) {
						var rs=recentSearches[i],
							temp = (rs.country === 'US') ? ", " + rs.state : "",
							name = rs.nickname || rs.locname,
							fullId = (rs.locid.indexOf(":") == -1 ? rs.locid+":"+rs.loctype+":"+rs.country : rs.locid),
							locUrl = "/weather/right-now/"+fullId;
						//check for loc type before creating target page URL and names
						if (rs.country === 'US') {
							var type = rs.loctype,
								state = rs.state
								id = rs.locid;
								if(type == 4) {
									presName = name + ", " + state + "("+ rs.locid + ")";
								} else if (type == 5) {
									presName = name + ", " + state;
									locUrl = "/outlook/recreation/golf/weather/weekend/?clubId="+id;
								} else if (type == 9) {
									presName = name + ", " + state;
									locUrl = "/outlook/travel/businesstraveler/airportprofile/"+id;
								} else {
									presName = name + ", " + state;
								}
						} else {
							presName = name+ ", " + rs.countryName;
						}	
						rsHtml += "<li><div from='hdr_recentsearch' class='twc-clickable twc-location' countryname='"+rs.countryName+"' state='"+rs.state+"' city='"+name+"' lng='"+rs.lon+"' lat='"+rs.lat+"' countrycode='"+rs.country+"' id='"+rs.locid+"' type='"+rs.loctype+"' url='"+locUrl+"'>" + presName + "</div></li>";
					}
					rsHtml += "</ul>";
					
					RSID.innerHTML=rsHtml;
					Dom.replaceClass(RSID, "twc-hide", "twc-show");
				}
			},"input[type=text]");
			
			Event.on("typeaheadBox","blur",function(e, matchedEl, container){
			setTimeout(function (){
				Dom.replaceClass(RSID, "twc-show", "twc-hide");
			}, 100);

			},"input[type=text]");
			
			Event.on("typeaheadBox","keydown",function(e, matchedEl, container){
				Dom.replaceClass(RSID, "twc-show", "twc-hide");

			},"input[type=text]");
			
		});
   		// Add click handler for header search button
   		var searchButton = Dom.getElementBy(function(el){
   			return Dom.hasClass(el,"wx-searchButton");
   		},"div","wx-weather-search");
   		Event.on(searchButton,"click",function(e){
   			Event.stopEvent(e);
			var localSearchForm = YAHOO.util.Dom.get("headerSearchForm"),
				searchTextBox = YAHOO.util.Dom.get("typeaheadBox");
			if (searchTextBox.value == searchTextBox.getAttribute("title") || searchTextBox.value=="") {
				YAHOO.util.Dom.setAttribute(searchTextBox,"placeholder","Enter Zip, City or Place");
				YAHOO.util.Dom.addClass(searchTextBox,'twc-error-state');
			} else {
				YAHOO.util.Dom.setAttribute(searchTextBox,"placeholder","Search Zip, City or Place (Disney World)");
			  	YAHOO.util.Cookie.set("fromStr","hdr_localsearch",{"path":"/","domain":".weather.com"});
				localSearchForm.submit();
			}
   		});
   		
	});
	
	// Set fromStr when user selects recentSearch from Dropdown
	Event.onAvailable(RSID,function(){
		Event.delegate(RSID,"mousedown",function(e, matchedEL,container){
			YAHOO.util.Cookie.set("fromStr","hdr_recentsearch",{"path":"/","domain":".weather.com"});
			window.location.href=matchedEL.getAttribute("url");
		},function(el){
			if(Dom.hasClass(el,'twc-clickable')){
				return el;
			}
		});
	});

	// Method to convert locObj to locString
	var locObjToLocString = function(locObj){
		if(locObj == null) return "";
		var nickname = (locObj.nickname) ? locObj.nickname.replace(/ /g,"+") + "|" : "";
		var locid = locObj.locid.indexOf(':') ? locObj.locid.split(":")[0] : locObj.locid;
		return [nickname, locid, ":",locObj.loctype,":",locObj.country].join("");
	};
		
	// Method to convert array of location objects into string of locids separated by "^" character
	var locArrayToLocStr = function(locArray){
		var str = "";
		for(var i=0,l=locArray.length;locArray[i]!=null&&i<l;i++){
			if(i==0 && l != 1){str = locObjToLocString(locArray[i]) + "^";continue};
			if(i!=l-1){
				str += locObjToLocString(locArray[i]) + "^";
			}else{
				str += locObjToLocString(locArray[i]);
			}
		}
		return str;
	};

})();


YAHOO.namespace('weather');
(function(){
	var YUE = Event = YAHOO.util.Event,
		YUD = Dom = YAHOO.util.Dom,
		YUC = Cookie = YAHOO.util.Cookie,
    	isLinkClicked=false;

var intelliTrak = function(HASH){
	var pos = HASH["href"].indexOf('#');
	if(pos >0){
		HASH["anchor"] = HASH["href"].substr(pos+1);
	}

	if(intelliTrak.isLinkClicked === true){
		var URL='';
		var delim='?';
		if(typeof HASH=='undefined'){
			var HASH={};
		}

		if(HASH.href!='undefined'){
			URL=HASH["href"];
		}

		for(var n in HASH){
			if(n!='href' && n!='anchor' && n!='from'){
				if(URL.indexOf('?')>1){
					URL=URL+"&"+n+"="+HASH[n];
				}else{
					URL=URL+delim+n+"="+HASH[n];
				}
				delim='&';
			} else if(n=='from') {
				HASH[n] = HASH[n].replace(/%timeframe%/g,wx.config.page.pif_timeframe);
				var userDeclaration = 'undeclared';
				if (wx.config.user.apps != '') userDeclaration = 'declared';
				HASH[n] = HASH[n].replace(/%undeclared%/g,userDeclaration);
				YUC.set("fromStr",HASH[n],{
					"path":"/",
					"domain":".weather.com"
				});
			}
		}
		
		// favorite location
		var thisUP=YUC.get('UserPreferences',function(str){
			return str.split("|")[11];
		});
		
		// last search resolved location
		var thisLID=YUC.get('LocID');
		
			if(thisUP.length>=5) {
				URL=URL.replace(/%uploc%/g,thisUP);
			} else if(thisLID && thisLID.length>=5) {
				URL=URL.replace(/%uploc%/g,thisLID);
			} else {
				URL=URL.replace(/%uploc%/g,'');
			}
			if(thisLID && thisLID.length>=5) {
				URL=URL.replace(/%locid%/g,thisLID); 
			} else { 
				URL=URL.replace(/%locid%/g,'');
			}

		
			var finalURL=URL;
			var paramList="";
			if(finalURL.indexOf('?')>1){
				var finalOffset=finalURL.indexOf('?');
				paramList=finalURL.substring(finalOffset);
				finalURL=finalURL.substring(0,finalOffset);
			}
	
			var parms=paramList.split('&');
			for(var i=0;i<parms.length;i++){
				var pos=parms[i].indexOf('#');
				if(pos>0){
					var key=parms[i].substring(pos);
					finalURL=finalURL+parms[i].substring(0,pos);
				}else{
					finalURL=finalURL+parms[i];
				}
				if(i<parms.length-1){
					finalURL=finalURL+"&";
				}
			}
	
			URL=finalURL.replace(/%ref%/g,finalURL);
			if(URL.indexOf('http')==-1){
				URL='http://'+window.location.hostname+URL;
			}
		
		unsetClick();
		if(HASH["anchor"]!='undefined'&&HASH["anchor"]!=null&&HASH["anchor"]!=''){
			URL=URL+'#'+HASH["anchor"];
		}

		return URL;
	}else{
		if(HASH["anchor"]!='undefined'&&HASH["anchor"]!=null&&HASH["anchor"]!=''){
			return HASH.href+'#'+HASH["anchor"];
		}else{
			return HASH.href;
		}
	}
};

	YAHOO.weather.intelliTrak = intelliTrak;
	window.intelliTrak = intelliTrak;
	YAHOO.weather.intelliTrak.isLinkClicked=false;

	// Augment intelliTrak with EventProvider functionality
	YAHOO.weather.bodyClickEvent = "WX-BodyClick-Event";
	YAHOO.lang.augmentProto(YAHOO.weather.intelliTrak, YAHOO.util.EventProvider); 
	YAHOO.weather.intelliTrak.prototype.createEvent(YAHOO.weather.bodyClickEvent);

	var setClick = function(){
		YAHOO.weather.intelliTrak.isLinkClicked=true;
	};
	
	var unsetClick = function(){
		YAHOO.weather.intelliTrak.isLinkClicked=false;
	};
	
	var splitLink = function (condition,trueLink,falseLink,TS){
		document.location = [YAHOO.weather.intelliTrak({'href':(condition)?trueLink:falseLink,'from':TS}),"?from=",TS].join('');
	};

	// map to namespace
	window.splitLink = splitLink;
	window.setClick = setClick;
	window.unsetClick = unsetClick;

	YUE.onDOMReady(function() {

		YUE.on(document.body,"mousedown",function(e) {
           	var oTarget=YUE.getTarget(e);
            if(oTarget.nodeName&&(oTarget.nodeName.toUpperCase()=="IMG" ||oTarget.nodeName.toUpperCase()=="DIV" ||oTarget.nodeName.toUpperCase()=="B" ||oTarget.nodeName.toUpperCase()=="STRONG" ||oTarget.nodeName.toUpperCase()=="A" ||oTarget.nodeName.toUpperCase()=="I" ||oTarget.nodeName.toUpperCase()=="SPAN" ||oTarget.nodeName.toUpperCase()=="SUB" ||oTarget.nodeName.toUpperCase()=="EM" ||oTarget.nodeName.toUpperCase()=="SUP" )) {
                var pn=oTarget.parentNode;
                if(pn && pn.nodeName && (pn.nodeName.toUpperCase()=="A" || pn.nodeName.toUpperCase()=="AAA")) {
                    oTarget=pn;
                    //alert("Daniel Debug - Come see me if you need this turned off. =>"+ oTarget.nodeName.toUpperCase() + ", => " + pn.nodeName.toUpperCase());
                }
            }
            var oFrom=YUD.getAttribute(oTarget, "from");
            if((oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="B" || oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="STRONG" ||oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="EM" || oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="IMG" || oTarget.nodeName&&oTarget.nodeName.toUpperCase()=="DIV" || oTarget.nodeName.toUpperCase()=="A")&& oFrom!==null && oTarget.nodeName) {
                setClick();
            }
        });

         YUE.on(document.body,"mouseup",function(e) {
             var oTarget=YUE.getTarget(e);
			YAHOO.weather.intelliTrak.prototype.fireEvent(YAHOO.weather.bodyClickEvent, oTarget);
             if(oTarget.nodeName&&(oTarget.nodeName.toUpperCase()=="IMG" || oTarget.nodeName.toUpperCase()=="DIV" ||oTarget.nodeName.toUpperCase()=="B" ||oTarget.nodeName.toUpperCase()=="STRONG" || oTarget.nodeName.toUpperCase()=="EM" ||oTarget.nodeName.toUpperCase()=="A" ||oTarget.nodeName.toUpperCase()=="I" ||oTarget.nodeName.toUpperCase()=="SPAN" || oTarget.nodeName.toUpperCase()=="SUB" ||oTarget.nodeName.toUpperCase()=="SUP")) {
                 var pn=oTarget.parentNode;
                 if((pn.nodeName.toUpperCase()=="AAA" ||pn.nodeName.toUpperCase()=="A") && pn && pn.nodeName) {
                     oTarget=pn;
                 }
             }
             var oFrom=YUD.getAttribute(oTarget, "from");
             var oHref = YUD.getAttribute(oTarget, "href");

             if( (oTarget.nodeName.toUpperCase()=="DIV" ||oTarget.nodeName.toUpperCase()=="A") && oFrom!==null && oTarget.nodeName) {
                 if(oHref&&oHref.indexOf("from")=="-1") {
                 	var eles={};
             		for(i=0;i<oTarget.attributes.length;i++){
  						if(oTarget.attributes[i].nodeName=="href"||oTarget.attributes[i].nodeName=="onclick"||oTarget.attributes[i].nodeName=="onmousedown"||oTarget.attributes[i].nodeName=="id"||oTarget.attributes[i].nodeName=="class"||oTarget.attributes[i].nodeName=="onmouseup"||oTarget.attributes[i].nodeName=="language"||oTarget.attributes[i].nodeName=="dataFld"||oTarget.attributes[i].nodeName=="oncontextmenu"||oTarget.attributes[i].nodeName=="onrowexit"||oTarget.attributes[i].nodeName=="onbeforepaste"||oTarget.attributes[i].nodeName=="onactivate"||oTarget.attributes[i].nodeName=="lang"||oTarget.attributes[i].nodeName=="onmousemove"||oTarget.attributes[i].nodeName=="onmove"||oTarget.attributes[i].nodeName=="onselectstart"||oTarget.attributes[i].nodeName=="oncontrolselect"||oTarget.attributes[i].nodeName=="oncut"||oTarget.attributes[i].nodeName=="onrowenter"||oTarget.attributes[i].nodeName=="onpaste"||oTarget.attributes[i].nodeName=="onreadystatechange"||oTarget.attributes[i].nodeName=="onbeforedeactivate"||oTarget.attributes[i].nodeName=="hideFocus"||oTarget.attributes[i].nodeName=="dir"||oTarget.attributes[i].nodeName=="onlosecapture"||oTarget.attributes[i].nodeName=="ondrag"||oTarget.attributes[i].nodeName=="ondragstart"||oTarget.attributes[i].nodeName=="oncellchange"||oTarget.attributes[i].nodeName=="onfilterchange"||oTarget.attributes[i].nodeName=="onrowsinserted"||oTarget.attributes[i].nodeName=="ondatasetcomplete"||oTarget.attributes[i].nodeName=="onmousewheel"||oTarget.attributes[i].nodeName=="ondragenter"||oTarget.attributes[i].nodeName=="onblur"||oTarget.attributes[i].nodeName=="onresizeend"||oTarget.attributes[i].nodeName=="onerrorupdate"||oTarget.attributes[i].nodeName=="onbeforecopy"||oTarget.attributes[i].nodeName=="ondblclick"||oTarget.attributes[i].nodeName=="onkeyup"||oTarget.attributes[i].nodeName=="onresizestart"||oTarget.attributes[i].nodeName=="onmouseover"||oTarget.attributes[i].nodeName=="onmouseleave"||oTarget.attributes[i].nodeName=="onmoveend"||oTarget.attributes[i].nodeName=="title"||oTarget.attributes[i].nodeName=="onresize"||oTarget.attributes[i].nodeName=="contentEditable"||oTarget.attributes[i].nodeName=="dataFormatAs"||oTarget.attributes[i].nodeName=="ondrop"||oTarget.attributes[i].nodeName=="onpage"||oTarget.attributes[i].nodeName=="onrowsdelete"||oTarget.attributes[i].nodeName=="style"||oTarget.attributes[i].nodeName=="onfocusout"||oTarget.attributes[i].nodeName=="ondatasetchanged"||oTarget.attributes[i].nodeName=="ondeactivate"||oTarget.attributes[i].nodeName=="onpropertychange"||oTarget.attributes[i].nodeName=="ondragover"||oTarget.attributes[i].nodeName=="onhelp"||oTarget.attributes[i].nodeName=="ondragend"||oTarget.attributes[i].nodeName=="onbeforeeditfocus"||oTarget.attributes[i].nodeName=="disabled"||oTarget.attributes[i].nodeName=="onfocus"||oTarget.attributes[i].nodeName=="accessKey"||oTarget.attributes[i].nodeName=="onscroll"||oTarget.attributes[i].nodeName=="onbeforeactivate"||oTarget.attributes[i].nodeName=="onbeforecut"||oTarget.attributes[i].nodeName=="dataSrc"||oTarget.attributes[i].nodeName=="oncopy"||oTarget.attributes[i].nodeName=="onfocusin"||oTarget.attributes[i].nodeName=="tabIndex"||oTarget.attributes[i].nodeName=="onbeforeupdate"||oTarget.attributes[i].nodeName=="ondataavailable"||oTarget.attributes[i].nodeName=="onmovestart"||oTarget.attributes[i].nodeName=="onmouseout"||oTarget.attributes[i].nodeName=="onmouseenter"||oTarget.attributes[i].nodeName=="onlayoutcomplete"||oTarget.attributes[i].nodeName=="implementation"||oTarget.attributes[i].nodeName=="onafterupdate"||oTarget.attributes[i].nodeName=="ondragleave"||oTarget.attributes[i].nodeName=="target"||oTarget.attributes[i].nodeName=="urn"||oTarget.attributes[i].nodeName=="rev"||oTarget.attributes[i].nodeName=="hreflang"||oTarget.attributes[i].nodeName=="shape"||oTarget.attributes[i].nodeName=="type"||oTarget.attributes[i].nodeName=="coords"||oTarget.attributes[i].nodeName=="methods"||oTarget.attributes[i].nodeName=="rel"||oTarget.attributes[i].nodeName=="charset"||oTarget.attributes[i].nodeName=="name"||oTarget.attributes[i].nodeName=="aria-haspopup"||oTarget.attributes[i].nodeName=="aria-disabled"||oTarget.attributes[i].nodeName=="aria-hidden"||oTarget.attributes[i].nodeName=="aria-level"||oTarget.attributes[i].nodeName=="aria-busy"||oTarget.attributes[i].nodeName=="aria-checked"||oTarget.attributes[i].nodeName=="aria-readonly"||oTarget.attributes[i].nodeName=="aria-secret"||oTarget.attributes[i].nodeName=="aria-posinset"||oTarget.attributes[i].nodeName=="aria-relevant"||oTarget.attributes[i].nodeName=="aria-live"||oTarget.attributes[i].nodeName=="aria-labelledby"||oTarget.attributes[i].nodeName=="aria-pressed"||oTarget.attributes[i].nodeName=="aria-invalid"||oTarget.attributes[i].nodeName=="aria-valuenow"||oTarget.attributes[i].nodeName=="aria-selected"||oTarget.attributes[i].nodeName=="aria-owns"||oTarget.attributes[i].nodeName=="aria-valuemax"||oTarget.attributes[i].nodeName=="aria-valuemin"||oTarget.attributes[i].nodeName=="aria-setsize"||oTarget.attributes[i].nodeName.indexOf("aria")!=-1||oTarget.attributes[i].nodeName=="onsubmit"||oTarget.attributes[i].nodeName=="onkeydown"||oTarget.attributes[i].nodeName=="onkeypress"){
             			}else{
             				var name=oTarget.attributes[i].nodeName;
             				eles[name]=oTarget.attributes[i].nodeValue;
             			}
             		}
            	 }
             }

             if(oTarget.nodeName && oFrom!==null){
                 if(oTarget.nodeName.toUpperCase()=="A") {
                     eles['href'] = YUD.getAttribute(oTarget, "href");
                     YUD.setAttribute(oTarget, "href", YAHOO.weather.intelliTrak(eles));
                 } else if(oTarget.nodeName.toUpperCase()=="DIV") {
				 	YUC.set("fromStr",oFrom,{
						"path":"/",
						"domain":".weather.com"
					});
                 } else {
                     YUD.setAttribute(oTarget, "href",YAHOO.weather.intelliTrak(eles));
                 }
             }
         });
     });
     
    })();

//Adding Back to functionality for legacy pages

'TWC' in window || (window.TWC = {});
(function($){
	TWC.SetUserBackTo = function() {
		//  added for Mini Header  - start
		if (TWC.pco.get('user.backTo')==null || typeof (TWC.pco.get('user.backTo'))=="undefined")
		{ 
			TWC.pco.setUser('backTo', {});
		}
		var backURL = document.location.href;
		var label,location,pageType,backTo;
		backTo = TWC.pco.get('user.backTo');
		backTo.url = backURL;
		label = $.trim($("h1").html());
		var city = TWC.pco.get("currloc.city");
		var state = TWC.pco.get("currloc.state");
		var locname = TWC.pco.get("currloc.locname");
		var country = TWC.pco.get("currloc.country");
		if((TWC.pco.get("currloc.locid")) && ((TWC.pco.get("currloc.country"))=="US")) {
			if(locname != "undefined" && state != "undefined"){
				location = locname + ", " + state;
			} else if(city != "undefined" && state != "undefined"){
				location = city + ", " + state;
			} else {
				location ="";
			}			
		} else {
			if(locname != "undefined" && country != "undefined"){
				location = locname + ", " + country;
			} else if(city != "undefined" && country != "undefined"){
				location = city + ", " + country;
			} else {
				location ="";
			}
		}
		pagetype = (TWC.pco.get("metrics") && TWC.pco.get("metrics").level2) ? TWC.pco.get("metrics").level2 : "";
		backTo.label = label;
		backTo.location = location;
		backTo.pagetype = pagetype;
		TWC.pco.setUser('user.backTo', backTo); 
		//  Mini Header Code - end

	};
	$(document).ready(function(){
		$("body").on({click:function(){
				TWC.SetUserBackTo();
			},
			keydown:function(){
				TWC.SetUserBackTo();
			}
		},"a[from],span[from]");
	});
	

})(jQuery);


    // Setup Click Handlers for Social Icons in Footer
  	(function() {
  		var Event = YAHOO.util.Event,
  			Dom = YAHOO.util.Dom;
  		Event.onAvailable("wx-footer",function(){
  		
  			// Setup click handler for social links
			Event.delegate("wx-footer-links", "click", function(e,matchedEl){
				var theId = (matchedEl.nodeName == "A") ? matchedEl.id : matchedEl.parentNode.id,
					popwidth="1000",
					popheight="835",
					trackURLs = {
						facebook:"http://www.facebook.com/TheWeatherChannel",
						twitter:"http://www.twitter.com/weatherchannel/",
						googleplus:"https://plus.google.com/102191030161937606640/posts",
						youtube:"http://www.youtube.com/user/TheWeatherChannel/",
						mobile:"http://www.weather.com/services/mobilesplash.html",
						desktop:"http://www.weather.com/services/desktop.html"
					},
					trackType = theId.substr(theId.lastIndexOf("-") + 1),
					trackStr = "";
				switch(trackType){
					case "mobile":
						trackStr = "socialftr_weatheronmobile";
						popwidth="450";
						popheight="475";
						break;
					case "desktop":
						trackStr = "socialftr_downloaddesktop";
						break;
					default:
						trackStr = 'socialftr_' + trackType
				
				}
				sc_trackAction(matchedEl,trackStr,wx.config.metrics.acct);
				if(trackType=="desktop" || trackType=="mobile")
				{
				window.open (trackURLs[trackType],"_self", trackType + "Popup", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + popwidth + ", height=" + popheight);
				}else{
				window.open (trackURLs[trackType], trackType + "Popup", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + popwidth + ", height=" + popheight);
				}
			},function(el){
				if((el.nodeName == "SPAN" && YAHOO.util.Dom.hasClass(el,"twc-footer-icon"))||(el.nodeName == "A" && YAHOO.util.Dom.hasClass(el,"twc-footer-icon"))){
					return el;
				}
			});
		});
	})();
	
/* 
Foresee survey code include for /foresee/foresee-alive.js - Begin
*/

var FSR = {
    'version': '6.1.0',
    'date': '07/22/2010',
    'enabled': true,
	'auto' : true,
	'encode' : true,
    'files': '/foresee/',
    'id': 'KQSramEereeZ8BQS8jPwzw==',
    'sites': [{
        path: /\w+-?\w+\.(com|org|edu|gov|net)/
    }, {
        path: '.',
        domain: 'default'
    }]
};
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function fsr$setAlive(){var A=new Date().getTime();document.cookie="fsr.a="+A+";path=/"+((FSR.site.domain)?";domain="+FSR.site.domain+";":";")
}(function(){if(window!=window.top){return }function G(K){if(typeof K=="object"){var J=K.constructor.toString().match(/array/i);
return(J!=null)}return false}var I=FSR.sites;for(var F=0,D=I.length;F<D;F++){var B;if(!G(I[F].path)){I[F].path=[I[F].path]
}for(var E=0,C=I[F].path.length;E<C;E++){if(B=document.location.href.match(I[F].path[E])){FSR.siteid=F;
FSR.site=FSR.sites[FSR.siteid];if(!FSR.site.domain){FSR.site.domain=B[0]}else{if(FSR.site.domain=="default"){FSR.site.domain=false
}}if(!FSR.site.name){FSR.site.name=B[0]}var A=["files","js_files","image_files","html_files"];for(var F=0,H=A.length;
F<H;F++){if(FSR.site[A[F]]){FSR[A[F]]=FSR.site[A[F]]}}break}}if(B){break}}if(!window["fsr$timer"]){fsr$setAlive();
window["fsr$timer"]=setInterval(fsr$setAlive,1000)}})();

/* 
Foresee survey code include for /foresee/foresee-alive.js - End
*/

