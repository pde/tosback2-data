function gvpUtils() {
	var W3C = (!document.all && document.getElementById);
	var IE = (document.all);
	var ns4 = (document.layers);
	var v_debug = false;
	var vMainInit = '';
	var vBrowBackButStatus = '#vBrowBackbut';
	var vQueryStr = '';
	var vPathName = '';
	var p_locEnv = '';
	var version = navigator.appVersion;
	var IE6 = (version.indexOf("MSIE 6.0") != -1) ? true : false;
	var isIE = (version.indexOf("MSIE") != -1) ? true : false;
	var isWin = (version.toLowerCase().indexOf("win") != -1) ? true : false;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	var isIphone = (navigator.userAgent.indexOf("iPhone") != -1) ? true : false;
	var isAndroid = (navigator.userAgent.indexOf("android") != -1) ? true : false;
	var isIpad = (navigator.userAgent.indexOf("iPad") != -1) ? true : false;
	var aminCtr = 0;
	var pSku;
	var pVidSrc;
	var pWidth;
	var body;
	var mFooterButton = '';
	var gvpVersion = '';
	
	var metaData = {};
	
	this.popOnLoad = function popOnLoad(p_QArray) {
		if(p_QArray.gvpFile) {	
			if(p_QArray.gvpFile.indexOf('/')==-1) {
				if(this.isNumeric(p_QArray.gvpFile)) {
					p_QArray.gvpFile = p_QArray.gvpFile;
				} else {
					p_QArray.gvpFile = 'video_resources/xml/'+p_QArray.gvpFile+'.xml';
				}
			} 
			if(p_QArray.gvpEnv) {
				if (p_QArray.gvpLgFormat) {
					gvp.showPopUp('', true, true, 'gvp', p_QArray.gvpFile+'&gvpEnv='+p_QArray.gvpEnv+'&gvpLgFormat');
				} else {
					gvp.showPopUp('', true, true, 'gvp', p_QArray.gvpFile+'&gvpEnv='+p_QArray.gvpEnv);
				}
			} else {
				if (p_QArray.gvpFile.indexOf('.xml')==-1 && !this.isNumeric(p_QArray.gvpFile)) {
					if (p_QArray.gvpLgFormat) {
						gvp.showPopUp('', true, true, 'gvp', p_QArray.gvpFile+'.xml'+'&gvpLgFormat');
					} else {
						gvp.showPopUp('', true, true, 'gvp', p_QArray.gvpFile+'.xml');
					}
				} else {
					if (p_QArray.gvpLgFormat) {
						gvp.showPopUp('', true, true, 'gvp', p_QArray.gvpFile+'&gvpLgFormat');
					} else {
						gvp.showPopUp('', true, true, 'gvp', p_QArray.gvpFile);
					}
				}
			}
		}
	};
	
	this.parseQueryString = function parseQueryString(callTrig) {
	    var obj = new Object();
		var cleanArr = new Object();
		var foundFlag = false;
	    var nvpairs = location.search.substring(1).split("&");
	    for (var idx = 0; idx < nvpairs.length; idx++) {
	        var tokens = nvpairs[idx].split("=");
	        obj[unescape(tokens[0])] = tokens.length == 2 ? unescape(tokens[1]) : undefined;
			if (tokens[0].indexOf('gvpFile') != -1 ) {
				foundFlag = true;
				cleanArr[unescape(tokens[0])] = unescape(tokens[1]);
			}
			if (tokens[0].indexOf('gvpEnv') != -1 ) {
				foundFlag = true;
				p_locEnv = unescape(tokens[1]);
				cleanArr[unescape(tokens[0])] = unescape(tokens[1]);
			}
			if (tokens[0].indexOf('gvpLgFormat') != -1 ) {
				foundFlag = true;
				cleanArr[unescape(tokens[0])] = unescape(tokens[1]);
			}
	    }
		if(foundFlag) {
			if(callTrig) {
				this.popOnLoad(cleanArr);
			} else {
				return cleanArr;
			} 
		}
	};
	
	this.parseQstring = function parseQstring(callTrig) {
		var p_Qstring = window.location.search;
		if(p_Qstring.length) {
			if (p_Qstring.indexOf('gvp') != -1) {
				return this.parseQueryString(callTrig);
			}
		} else {
			return false;
		}
	};
	
	if( window.location.search.indexOf('android') != -1) {
		isAndroid = true;
		if ( typeof(console) != 'undefined' && v_debug ) console.log('is android');
	}
	
	this.getFlashVersion = function getFlashVersion() {
		return this.DetectFlashVer(9, 1, 2);
	};
	
	this.incFile = function(filename) {
		var head = document.getElementsByTagName('head')[0];
		if(filename.indexOf('.js') != -1) {
			var filePtr = document.createElement('script');
			filePtr.setAttribute('src',filename);
			filePtr.setAttribute('type', 'text/javascript');
		} else if(filename.indexOf('.css') != -1) {
			var filePtr = document.createElement('link');
			filePtr.setAttribute('href', filename);
			filePtr.setAttribute('rel', 'stylesheet');
			filePtr.setAttribute('type', 'text/css');
		}
		head.appendChild(filePtr);
	};
	
	this.ControlVersion = function ControlVersion() {
		var version;
		var axo;
		var e;
		try {
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				version = "WIN 6,0,21,0";
				axo.AllowScriptAccess = "always";
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0";
			} catch (e) {
			}
		}
		if (!version) {
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11";
			} catch (e) {
				version = -1;
			}
		}
		return version;
	};

	// JavaScript helper required to detect Flash Player PlugIn version information
	this.GetSwfVer = function GetSwfVer(){
		// NS/Opera version >= 3 check for Flash plugin in plugin array
		var flashVer = -1;
		
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
				var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
				var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
				var descArray = flashDescription.split(" ");
				var tempArrayMajor = descArray[2].split(".");			
				var versionMajor = tempArrayMajor[0];
				var versionMinor = tempArrayMajor[1];
				var versionRevision = descArray[3];
				if (versionRevision == "") {
					versionRevision = descArray[4];
				}
				if (versionRevision[0] == "d") {
					versionRevision = versionRevision.substring(1);
				} else if (versionRevision[0] == "r") {
					versionRevision = versionRevision.substring(1);
					if (versionRevision.indexOf("d") > 0) {
						versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
					}
				}
				flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
				//alert("flashVer="+flashVer);
			}
		}
		// MSN/WebTV 2.6 supports Flash 4
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		// WebTV 2.5 supports Flash 3
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		// older WebTV supports Flash 2
		else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		else if ( IE && isWin && !isOpera ) {
			flashVer = this.ControlVersion();
		}	
		return flashVer;
	};

	// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
	this.DetectFlashVer = function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
		versionStr = this.GetSwfVer();
		if (versionStr == -1 ) {
			return false;
		} else if (versionStr != 0) {
			if(IE && isWin && !isOpera) {
				// Given "WIN 2,0,0,11"
				tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
				tempString        = tempArray[1];			// "2,0,0,11"
				versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
			} else {
				versionArray      = versionStr.split(".");
			}
			var versionMajor      = versionArray[0];
			var versionMinor      = versionArray[1];
			var versionRevision   = versionArray[2];

	        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
			if (versionMajor > parseFloat(reqMajorVer)) {
				return true;
			} else if (versionMajor == parseFloat(reqMajorVer)) {
				if (versionMinor > parseFloat(reqMinorVer))
					return true;
				else if (versionMinor == parseFloat(reqMinorVer)) {
					if (versionRevision >= parseFloat(reqRevision))
						return true;
				}
			}
			return false;
		}
	};

	function displayError(str, e) {
		if ( typeof(console) != 'undefined' && v_debug ) {
			if (IE) {
				alert("error occur in " + getFunctionName(str)+" "+e);
			} else {
				console.log("error occur in " + getFunctionName(str)+" "+e);
			}
		}
	}
	
	
	function getFunctionName(str) {
			var ownName = str;
            ownName = ownName.substr('function '.length);        // trim off "function "
            ownName = ownName.substr(0, ownName.indexOf('('));   // trim off everything after the function name
			return ownName;
	}
	
	/**
	* Primary entry point for retrieving the video metadata for GVP. Once this function is
	* called, an AJAX call is made to the default address, which is expected to be a solr
	* instance that hosts the GVP video metatdata.
	* 
	* @param {string or Array} videoId (Required) A video's numeric ID, not it's XML file name.
	* @param {function} callback (Required) Called when retrieval is completed, or when an error 
	*  occurs and the attempt to retrieve is complete.
	* @param {string} lang (Optional) Contains the specific language requested. Allowed values 
	*  are 'en_US'/English or 'es_US'/American Spanish. Default is 'en_US'.
	* @param {string} enviro (Optional) Contains the environment from which to retrieve
	*  the solr data. Default value is not yet established.
	*
	* @see metaData.sourceTarget_preId
	* @return void
	*/
	this.getMetaData = function getMetaData( videoId, callback, lang, enviro ) 
	{
		//set defaults
		var timer;
		var isMulti = false;
		if ( !lang ) lang = "en_US";
		this.getMetaData_setDefaults( lang, enviro );
		
		//Array test
		var isArray = function( value ) 
		{
			return Object.prototype.toString.apply( value ) === '[object Array]';
		}
		
		if ( isArray( videoId ) ) isMulti = true;
		
		//build the target ajax call
		var targUrl = this.getMetaData_buildRequest( videoId, isMulti );
		
		//insert the request into the result storage area
		if ( !isMulti ) 
		{
			this.getMetaData_setRequestData( 0, callback, videoId );
			timer=setTimeout( "gvp.getMetaData_successTest(\"" + videoId + "\");", metaData.ajaxFailTimeout );
		}
		else
		{
			this.getMetaData_setRequestData( 0, callback, videoId.toString() );
			timer=setTimeout( "gvp.getMetaData_successTest(\"" + videoId[0] + "\");", metaData.ajaxFailTimeout );
		}
		
		//initiate the ajax call with required elements
		jQuery.ajax({
		  url: targUrl,
		  dataType: "jsonp",
		  jsonp: "json.wrf"
		 });
	}
	
	/**
	* Each request has a unique set of data around it. If at all possible, when a request comes
	* back from solr this data is used to match the request with the response.
	*
	* @return void
	*/
	this.getMetaData_setRequestData = function getMetaData_setRequestData( pStatus, pCallback, pVideoId )
	{
		metaData.requests[metaData.groupIterator] = { status:pStatus, callBack:pCallback, ids:pVideoId };
		metaData.groupIterator++;
	}
	
	/**
	* Attempt to retrieve request data for data passed back from solr.
	*
	* @return {Object} The request data
	*/
	this.getMetaData_getRequestData = function getMetaData_getRequestData( id )
	{
		var vidIds;
		var targObj;
		
		if ( id == undefined ) return;
		
		for ( var i in metaData.requests )
		{
			vidIds = metaData.requests[i].ids;
			vidIds.toString();
			if (vidIds.indexOf( id ) > -1 )
			{
				targObj = metaData.requests[i];
				break;
			}
		}
		
		return targObj;
	}
	
	/**
	* Creates the solr query to retrieve requested video data.
	*
	* @param {String || Array} videoId The video values passed to the initial metadata request.
	* @param {Boolean} isMulti When true, means videoId is an array. Passed this way since 
	*  we already test for Array-ness in getMetaData.
	*
	* @return The string to call to solr to request data.
	*/
	this.getMetaData_buildRequest = function getMetaData_buildRequest( videoId, isMulti )
	{
		var targUrl = "";
		var idString = "";
		var len = 0;
		
		if ( !isMulti )
		{
			targUrl = metaData.sourceTarget_preId + videoId + metaData.sourceTarget_videoMetaData_postId;
		}
		else
		{
			len = videoId.length;
			
			for ( i=0; i<len; i++ )
			{
				if ( i < (len-1) ) 
				{
					idString += videoId[i] + "+OR+id:";
				}
				else
				{
					idString += videoId[i];
				}
			}
		
			targUrl = metaData.sourceTarget_preId + idString + metaData.sourceTarget_videoMetaData_postId;
		}
		
			jQuery("#contentDiv").append(targUrl);
		return targUrl;
		
	}
	
	this.gvpMetaData_setFailCallback = function gvpMetaData_setFailCallback( callback )
	{
		metaData.failCallBack = callback;
	}
	
	/**
	* Sets up default values in a single place. The sourceTarget_dataFields values are set
	* here, but not used since the value is forced on the server.
	*
	* NOTE: Spanish is currently the same as English until certain solr issues get sorted out.
	* 
	* @param {string} lang (Optional) Contains the specific language requested. Allowed values 
	*  are 'en_US'/English or 'es_US'/American Spanish. Default is 'en_US'.
	* @param {string} enviro (Optional) Contains the environment from which to retrieve
	*  the solr data. Default value is not yet established.
	* 
	* @return void
	*/
	this.getMetaData_setDefaults = function getMetaData_setDefaults( lang, enviro )
	{
		if ( !metaData.requests ) metaData.requests = {};
		
		metaData.ajaxFailTimeout = 4000;
		metaData.language = lang;
		metaData.groupIterator = 1;
		
		//handle the environment default
		if (!enviro)
		{
			metaData.sourceTarget_preId = "//www.att.com/navservice/videoservice/select?q=id:";		
		}
		else
		{
			metaData.sourceTarget_preId = enviro + "?q=id%3A";	
		}
		
		//set the callback - this is hard-wired on the server. Do not change.
		metaData.sourceTarget_callback = "&json.wrf=gvp.getMetaData_success";
		
		//Set language - Spanish is current same as English
		//These vars are currently not used.
		if ( lang == "en_US" )
		{
			metaData.sourceTarget_dataFields = "&fl=id,status,url_configFile_en,language,windowTitle_en,description_en,lengthInSeconds,thumbTitle_en,url_thumbIcon_en,thumbWidth,thumbHeight";
		}
		else
		{
			metaData.sourceTarget_dataFields = "&fl=id,status,url_configFile_en,language,windowTitle_en,description_en,lengthInSeconds,thumbTitle_en,url_thumbIcon_en,thumbWidth,thumbHeight";
		}
		
		//These currently both do the same thing - investigating
		metaData.sourceTarget_allVideoData_postId = "&wt=json&indent=true";
		metaData.sourceTarget_videoMetaData_postId = "&wt=json&indent=true";
		
	}
	
	/**
	* Called by a timer which tests to make sure the call was successful. Not typically
	* needed for ajax, but with jsonp calls it is necessary for minimal error control.
	* 
	* @param {String || Array} videoId The video values passed to the initial metadata request.
	* 
	* @return {Object} error response object if there is a problem. Otherwise do nothing.
	*/
	this.getMetaData_successTest = function getMetaData_successTest( videoId )
	{
		var response = {};
		var requestData = this.getMetaData_getRequestData( videoId );
		
		if ( requestData == undefined || requestData.callBack == undefined )
		{
			if ( typeof(console) != 'undefined') console.log("gvp#getMetaData_success(): invalid request for video id " + videoId );
			return;
		}
		
		this.getMetaData_sendErrResponse( videoId );
		
	}
	
	/**
	* A failed success test will cal this function, which then tests to see if a videoId
	* can be found. If so, an error response is sent. If not, the callback can't be found
	* an no response is received.
	* 
	* @param {String || Array} videoId The video values passed to the initial metadata request.
	*
	* @return void
	*/
	this.getMetaData_sendErrResponse = function getMetaData_sendErrResponse( videoId )
	{
		var response;
		var requestData = this.getMetaData_getRequestData( videoId );
		
		if ( requestData == undefined )
		{
			if ( metaData.failCallBack ) metaData.failCallBack();
			return;
		}
		
		if ( requestData.status == 0 )
		{
			response = { gvpResponse: { itemsFound:0, videoData:[] } };
			requestData.callBack( response );
		}
	}
	
	/**
	* Builds the meta data object requested. At the moment, this is assuming the
	* type of object is always video, but there will be other types forthcoming such
	* as promos, schedules, etc.
	*
	* @param {Object} currObj The video metadata object from solr
	*
	* @return {Object} returns a language-specific version of the metadata.
	*/
	this.getMetaData_buildMDObject = function getMetaData_buildMDObject( currObj ) 
	{
			if ( currObj.id == undefined && currObj.id == "" ) return;
			
			var mediaItem = {};
			//id
			mediaItem.id = currObj.id;
			//status
			mediaItem.status = "ok";
			//language
			( currObj.language == "en" ) ? mediaItem.language = "en_US" : mediaItem.language = "es_US";
			//xmlFileName
			mediaItem.xmlFileName = this.getMetaData_getNodeValue( currObj.url_configFile_en, currObj.url_configFile_es );
			//title
			mediaItem.title = this.getMetaData_getNodeValue( currObj.thumbTitle_en, currObj.thumbTitle_es );
			//description
			mediaItem.description = this.getMetaData_getNodeValue( currObj.description_en, currObj.description_es );
			//video length
			mediaItem.videoLength = currObj.lengthInSeconds;
			//thumb file path
			mediaItem.thumbFilePath = this.getMetaData_getNodeValue( currObj.url_thumbIcon_en, currObj.url_thumbIcon_es );
			//thumb width
			mediaItem.thumbWidth = currObj.thumbWidth;
			//thumb height
			mediaItem.thumbHeight = currObj.thumbHeight;
			//shareable
			mediaItem.shareable = currObj.shareable;
			
			return mediaItem;
	}
	
	this.getMetaData_getNodeValue = function getMetaData_getNodeValue( enVal, esVal )
	{
		var enIsValid = false;
		var esIsValid = false;
		
		if ( enVal !== undefined && enVal !== null && enVal !== "" && enVal !== "null" ) enIsValid = true;
		
		if ( esVal !== undefined && esVal !== null && esVal !== "" && esVal !== "null" ) esIsValid = true;
		
		if ( metaData.language == "en_US" && enIsValid ) return enVal;
		if ( metaData.language == "es_US" && esIsValid ) return esVal;
		if ( metaData.language == "es_US" && !esIsValid ) return enVal;
		return enVal;
	}
	
	/**
	* For complex returned data, this function find the result id
	* that was originally used to set the callback and status.
	*
	* @param {Object} The solr response object to review
	*
	* @return {Number} The id of the video used to set a result object.
	*/
	this.getMetaData_getResultId = function getMetaData_getResultId( data ) 
	{
		var vidItemCount = Number(data.response.numFound);
		
		if ( vidItemCount == 1 ) return data.response.docs[0].id;		
		
		if ( vidItemCount > 1 ) 
		{
			var temp = {};
			var id;
			for ( i=0;i<vidItemCount;i++ )
			{
				id = data.response.docs[i].id;
				
				if ( this.getMetaData_getRequestData( id ) != 'undefined' ) return id;
			}
		}
	}
	
	/*
	* The successful response from the AJAX process. This is a hard-coded
	* response - don't change it.
	*
	* @param {Object} data The JSON data from jsonp request. Once the data is
	*  processed this function retrieves the callback for the given
	*  video ID and calls it.
	*
	* #return void
	*/
	this.getMetaData_success = function getMetaData_success( data ) 
	{
		var response = { gvpResponse: { itemsFound:0, videoData:[] } };
		
		//get item count - if it is 0 then go to general fail.
		var vidItemCount = Number(data.response.numFound);
		if ( vidItemCount == 0 )
		{
			if ( metaData.failCallBack != undefined ) metaData.failCallBack();
			return;
		}
		
		//get video id used to store callback. If that cannot be found
		//then go to general fail
		var vidId = this.getMetaData_getResultId( data );
		if ( vidId == undefined )
		{
			if ( metaData.failCallBack != undefined ) metaData.failCallBack();
			return;
		}
		
		var requestData = this.getMetaData_getRequestData( vidId );
		
		//if the result object can't be found, go to general fail
		if ( requestData == undefined )
		{
			if ( metaData.failCallBack != undefined ) metaData.failCallBack();
			return;
		}
		
		var callBack = requestData.callBack;
		
		//update the status of the request
		requestData.status = 1;
		
		if ( vidItemCount == 1 )
		{
			response.gvpResponse.videoData.push( this.getMetaData_buildMDObject( data.response.docs[0] ) );
			
		}
		else if ( vidItemCount > 1 ) 
		{
			var temp = {};
			for ( i=0;i<vidItemCount;i++ )
			{
				response.gvpResponse.videoData.push( this.getMetaData_buildMDObject( data.response.docs[i] ) );
			}
		}
		
		response.gvpResponse.itemsFound = vidItemCount;
		callBack( response );
		
	}
	
	this.getPageLanguage = function getPageLanguage() {
         	var p_lang = 'en_US';  
         	if(typeof v_locale != 'undefined') {
         		p_lang = v_locale;
         	}
        return p_lang;
     };

     this.abandonPage = function abandonPage() {
          this.closePopup();
     };
	
	
     this.reportWebTrendsEvent = function reportWebTrendsEvent(wtSKU, pageName, locationOfLink, linkName, pageHit, fileName, target) {
          //alert('reportWebTrendsEvent()');
         
         var truncTarget = target.substr(27,target.length);
         var referrer = this.getWindowLocation();  // get's the referring page, which is the lastTarget
         lastTarget = target; // resets lastTarget for next time
         if(fileName != 'null') {
         	    //dcsMultiTrackTop('DCS.dcsuri',truncTarget,'DCS.dcsref',referrer,'DCSext.wtNoHit',pageHit,'DCSext.wtPN',pageName,'WT.pn_sku',wtSKU,'DCSext.wtLinkLoc',locationOfLink,'DCSext.wtLinkName',linkName,'DCSext.wtFileName',fileName);
         } else {
        	    //dcsMultiTrackTop('DCS.dcsuri',truncTarget,'DCS.dcsref',referrer,'DCSext.wtNoHit',pageHit,'DCSext.wtPN',pageName,'WT.pn_sku',wtSKU,'DCSext.wtLinkLoc',locationOfLink,'DCSext.wtLinkName',linkName);
         }
     // do whatever needs to be done to hit the webtrends server
         var s = "wtSKU=" + wtSKU + "\r\n";
         s += "pageName=" + pageName + "\r\n";
         s += "locationOfLink=" + locationOfLink + "\r\n";
         s += "linkName=" + linkName + "\r\n";
         s += "pageHit=" + pageHit + "\r\n";
         s += "fileName=" + fileName + "\r\n";
         s += "target=" + truncTarget + "\r\n";
         s += "referrer=" + referrer + "\r\n";
         //alert(s);
     
     };
	
	//--------------------------------------------
	// Name: centerDiv
	// Desc: Move the div to the center of the browser.
	// param: id of div
	// return: nothing
	// Example how to call it: this.centerDiv("test")
	this.centerDiv = function centerDiv(param) {
		try {
			var dsocLeft=0, dsocTop=0;
			obj = this.getElementObj(param);
			if (IE) {
				var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
				winH = parseInt(iebody.clientHeight / 2);
				winW = parseInt(iebody.clientWidth / 2);
				dsocLeft = iebody.scrollLeft;
				dsocTop = iebody.scrollTop;
			} else {
				winH = parseInt(window.innerHeight / 2);
				winW = parseInt(window.innerWidth / 2);
				dsocLeft = window.pageXOffset;
				dsocTop = window.pageYOffset;
			}
			var top = dsocTop + winH - parseInt(obj.offsetHeight / 2);
			var left = dsocLeft + winW - parseInt(obj.offsetWidth / 2);
			obj.style.top = top + "px";
			obj.style.left = left + "px";
		} catch(e) {
			displayError(arguments.callee.toString(), e);
		}
	}; // end of centerDiv
	
	this.typeOf = function typeOf(value) {
	    var s = typeof value;
	    if (s === 'object') {
	        if (value) {
	            if (value instanceof Array) {
	                s = 'array';
	            }
	        } else {
	            s = 'null';
	        }
	    }
	    return s;
	};
	
	this.setModalTitle = function setModalTitle(titleToSet) {
		//used to help bridge the gap between old and new ways of using gvp  
		if(typeof GVP_UTILS.tempTitle !== "undefined"){
			GVP_UTILS.tempTitle.html(titleToSet);
		}
		//
		if(typeof titleToSet != 'undefined') {
			this.getElementObj("gvp_mainPopUpTitle").innerHTML = titleToSet;
		} else {
			this.getElementObj("gvp_mainPopUpTitle").innerHTML = 'AT&amp;T Video Player';
		}
	};
	
	this.setFlashStageSize = function setFlashStageSize( p_width, p_height ) {
	    if ( typeof(console) != 'undefined' && v_debug ) console.log("setFlashStageSize(): width=" + p_width + ", height=" + p_height + " called: " +  aminCtr + " times");
	    
         //The container for the Flash file
		document.getElementById('gvp_mainPopupDiv').style.width = p_width+22 + "px";
		document.getElementById('gvp_mainPopupDiv').style.height = p_height+62 + "px";
		
          //The object wrapper for the flash file
		document.getElementById('gvp_pop').setAttribute('width',p_width);
		document.getElementById('gvp_pop').setAttribute('height',p_height);
	     
		if(! IE) {
			document.getElementById('gvp_pop_embed').setAttribute('width',p_width);
			document.getElementById('gvp_pop_embed').setAttribute('height',p_height);
		}
	  	//this.centerDiv('mainPopupDiv');
	  	this.divPopUp('gvp_mainPopupDiv',true);
	  	
	  	return true;
	  };
	  
	this.getWindowLocation = function getWindowLocation(){
        return window.location;
    };
	
	this.iphone_vidCallback = function iphone_vidCallback(vidName, trust) {
		var h264PathMarker = 'http://www.wireless.att.com/home/video_progressive/gvp/mp4/';
		var pathToIphoneVid = h264PathMarker+vidName;
		if(trust) {
			gvp.iphoneStatusUpdater(200, pathToIphoneVid);
			return true
		}
		if(isIphone) {
			this.getElementObj('gvp_popCloseButton').style.fontSize = 28 + 'px';
			this.getElementObj('gvp_mainPopUpTitle').style.fontSize = 28 + 'px';
			this.getElementObj('gvp_popCloseButton').style.fontWeight = 200;
			this.getElementObj('gvp_mainPopUpTitle').style.fontWeight = 200;
			this.getElementObj('gvp_pPopDivTitle').style.marginTop = -14 + 'px';
		}
		this.getElementObj('gvp_mainPopupDiv').style.width = 666+'px';
		this.getElementObj("gvp_mainPopupBody").innerHTML = '<img src="'+p_locEnv+'global_resources/defaultMedia/GVP_iPhone_checking.jpg" border="0" onload="gvp.divPopUp(\'mainPopupDiv\',true);" />';
		try {
			if ( typeof(console) != 'undefined' && v_debug ) console.log('in vid_Callback');
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET" ,pathToIphoneVid+'.html');
			xmlhttp.onreadystatechange = function()	{
				if (xmlhttp.readyState == 4) {
					if ( typeof(console) != 'undefined' && v_debug ) console.log(xmlhttp.status);
					if ( typeof(console) != 'undefined' && v_debug ) console.log('SUCCESS');
					gvp.iphoneStatusUpdater(xmlhttp.status, pathToIphoneVid);
				} else {
					if ( typeof(console) != 'undefined' && v_debug ) console.log('ERROR');
					gvp.iphoneStatusUpdater('error', pathToIphoneVid);
				}
			}
			xmlhttp.send(null);
		} catch(e) {
			gvp.iphoneStatusUpdater('error', pathToIphoneVid);
		}
	};
	
	this.iphoneStatusUpdater = function iphoneStatusUpdater(status, vidPath) {
		if ( typeof(console) != 'undefined' && v_debug ) console.log('in iphoneStatusUpdater with status: '+status);
		if(status == 0) {
			this.getElementObj("gvp_mainPopupBody").innerHTML = '<img src="'+p_locEnv+'global_resources/defaultMedia/GVP_iPhone_noVideo.jpg" border="0" onclick="gvp.closePopup();" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />';
		} else if(status == 200) {
			this.getElementObj('gvp_mainPopupDiv').style.width = 535+'px';
			this.centerDiv('gvp_mainPopupDiv');
			// if(isIphone) {
			// 				this.getElementObj("gvp_mainPopupBody").innerHTML = '<center><video id="currEmbStream" src="'+vidPath+'.mp4" poster="'+p_locEnv+'global_resources/defaultMedia/GVP_iPhone.jpg" controls="controls" width="512" height="288" onended="gvp.closePopup();"/></center>';
			// 				gvp.divPopUp('gvp_mainPopupDiv',true);
			// 				
			// 			} else if(isIpad) {
				this.getElementObj("gvp_mainPopupBody").innerHTML = '<center><video id="currEmbStream" src="'+vidPath+'.mp4" poster="'+p_locEnv+'global_resources/defaultMedia/GVP_iPhone.jpg" controls="controls" width="512" height="288" onended="gvp.closePopup();" /></center>';
				this.centerDiv('gvp_mainPopupDiv');
				gvp.divPopUp('gvp_mainPopupDiv',true);
			//}
		} else {
			this.getElementObj("gvp_mainPopupBody").innerHTML = '<img src="'+p_locEnv+'global_resources/defaultMedia/GVP_iPhone_noVideo.jpg" border="0" onclick="gvp.closePopup();" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />';
		}
	};
	
	this.rplFlash = function rplFlash(rplCode) {
		if ( typeof(console) != 'undefined' && v_debug ) console.log("rplFlash() called with error code: "+rplCode);
        if(typeof rplCode != 'undefined') {
        	if(rplCode == 'noFlash') {
				// user has no flash
				this.getElementObj("gvp_mainPopupBody").innerHTML = '<a href="//www.adobe.com/products/flashplayer/" target="_Fp"><img src="'+p_locEnv+'global_resources/defaultMedia/GVP_NoFlash.jpg" border="0" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" border="0" /></a>';
        	} else if(rplCode.indexOf('iPhone')!= -1) {
        		// iphone user
					var trust = false;
        			var p_argSplit = rplCode.split('|');
        			var vidName = p_argSplit[1];
        			if ( typeof(console) != 'undefined' && v_debug ) console.log('vidname= '+vidName);
					if(window.location.href.indexOf('rethinkpossible' != -1)) {
						trust = true;
					}
        			this.iphone_vidCallback(vidName, trust); 
        	} else {
        		// error
				this.getElementObj("gvp_mainPopupBody").innerHTML = '<img src="'+p_locEnv+'global_resources/defaultMedia/GVP_GeneralError.jpg" border="0" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />';
        	}
        } else {
        	// no rplCode provided, replace with generic error
        	this.getElementObj("gvp_mainPopupBody").innerHTML = '<img src="'+p_locEnv+'global_resources/defaultMedia/GVP_GeneralError.jpg" border="0" onload="gvp.divPopUp(\'gvp_mainPopupDiv\',true);" />';
        }
    };
	
	this.debug = function(p) {
		v_debug = p;
	};
	
	this.hideSelectOption = function(p) {
		try {
			// for IE6
			var version=navigator.appVersion;
			if (version.indexOf("MSIE 6.0") != -1){ 
				var select_array = document.getElementsByTagName("select");
				for (i=0; i<select_array.length; i++) {
					if (p) {
						this.visibleElement(select_array[i], false);
					} else {
						this.visibleElement(select_array[i], true);
					}
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString(), e);
		}
	};
	
	
     this.flashMovie = function flashMovie(movieName) {
         if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
         } else {
             return document[movieName];
         }
     };
     
     

     this.updateWtField = function updateWtField( newValue ) {
          var fld;
          
         if (navigator.appName.indexOf("Microsoft") != -1) {
             fld = window.getElementById("wtText");
         } else {
             fld = document.getElementById("wtText");
         }
          
          fld.value = fld.value + newValue;
     };

	
	this.closePopup = function closePopup() {
	if(typeof onCloseGvpWindow != 'undefined') {
		onCloseGvpWindow();
	}	
	try {
		if(this.getElementObj('gvp_pop')) {
			if(isIE) {
				try {
					this.flashMovie( "gvp_pop" ).modalWindowClosing();
				} catch(e) {
					if ( typeof(console) != 'undefined' && v_debug ) {console.log('flash failed to load');}
				}
			} else {
				try {
					this.flashMovie( "gvp_pop_embed" ).modalWindowClosing();
				} catch(e) {
					if ( typeof(console) != 'undefined' && v_debug ) {console.log('flash failed to load');}
				}
			}
		}
		overLayDiv_id = this.overLayDiv(false);
		this.divPopUp('gvp_mainPopupDiv',false);
		this.getElementObj("gvp_mainPopupBody").innerHTML = " ";
		this.visibleElement("gvp_popCloseButton", true);
		this.getElementObj("gvp_mainPopupButton").innerHTML = " ";
		mFooterButton = '';
		body.removeChild(this.getElementObj('gvp_mainPopupDiv'));
		if (IE6) {
			if (this.getElementObj('gvp_mainPopupDiv').style.visibility == 'hidden') {
				//hideSelectOption(false);
			}
		}
		} catch(e) {
	    	//alert("error hiding modal - e =" + e);
			displayError(arguments.callee.toString(), e);
		}
	};
	//--------------------------------------------
	// Name: setBtnContent
	// Desc: pass content into the HTML promo main content area.
	// param: content as String
	// return: nothing
	this.setBtnContent = function setBtnContent(contentStr) {
		var pBtnParams = contentStr.split('|');
		mFooterButton = '<table border="0" width="100%"><tr><td align="right" valign="middle"><a href="'+ pBtnParams[0] +'"><img src="'+ pBtnParams[1] +'" /></a></td></tr></table>';
	};
	//--------------------------------------------
	// Name: showPopUP
	// Desc: take care of injecting the GVP div and player into any page.
	// param: title, modal or not, close button or not (T/F)
	// return: nothing
	this.showPopUp = function showPopUp(title, blockBG, closeButton, playerType, mSkuOrPath) {
		gvpVersion = '_2.2.1';
		body = document.getElementsByTagName('body')[0];
		if(arguments.length >= 4) {
			
			if(arguments.length >= 5) {
				if(playerType == '360') {
					pSku = mSkuOrPath;
					pWidth = 600;
				} else if(playerType == 'details') {
					pSku = mSkuOrPath;
					pWidth = 745;
				} else if(playerType == 'vid') {
					pVidSrc = mSkuOrPath;
					var loc = window.location.href;
					if(loc.indexOf('smartphones')!= -1) {
						pWidth = 505;
					} else {
					pWidth = 540;
					}
				} else if(playerType == 'inline') {
					var pFrameArgs = mSkuOrPath.split('|');
					var pInlineContent = pFrameArgs[0];
					var pFrameWidth = pFrameArgs[1];
					var pFrameHeight = pFrameArgs[2];
					pWidth = parseInt(pFrameWidth) + parseInt('22');
				} else if(playerType == 'div') {
					var pFrameArgs = mSkuOrPath.split('|');
					var pFrameSrc = pFrameArgs[0];
					var pFrameWidth = pFrameArgs[1];
					var pFrameHeight = pFrameArgs[2];
					pWidth = parseInt(pFrameWidth) + parseInt('22');
					//console.log('framewidth: '+pFrameWidth+' frameheight: '+pFrameHeight);
				} else if(playerType == 'gvp') {
					pConfig = mSkuOrPath;
					pWidth = 542;
				} else if(playerType == 'swf') {
					var pFrameArgs = mSkuOrPath.split('|');
					var pInlineContent = pFrameArgs[0];
					var pFrameWidth = pFrameArgs[1];
					var pFrameHeight = pFrameArgs[2];
					pWidth = parseInt(pFrameWidth) + parseInt('22');
				}	
			} else {
				pWidth = 582;
			}
		}
		try {	
			var shouldShow = false;
			var overLayDiv_id, messDivObj, popupDiv, id, buttonDivObj;
			if (blockBG) {
				overLayDiv_id = this.overLayDiv(true);
			}
			if (closeButton == true) {
				//this.visibleElement("popCloseButton", false);
			}
			if (this.getElementObj('gvp_mainPopupDiv')) {
				this.getElementObj('gvp_mainPopupDiv').show();
			} else {
				
				var pPopDiv = document.createElement('div');
				pPopDiv.setAttribute('id', 'gvp_mainPopupDiv');
				pPopDiv.setAttribute('style', 'position:absolute; visibility:hidden; left:100px; top:100px; width:'+pWidth+'px; z-index:500; border:#CCCCCC solid 2px;  background-color:#FFFFFF;');
				if(IE) {
					pPopDiv.style.setAttribute('cssText', 'position:absolute; visibility:hidden; left:100px; top:100px; width:'+pWidth+'px; z-index:500; border:#CCCCCC solid 2px;  background-color:#FFFFFF;');
				}
				var pPopDivTitleBG = document.createElement('div');
				pPopDivTitleBG.setAttribute('id', 'gvp_pPopDivTitleBG');
				pPopDivTitleBG.setAttribute('style', 'height:37px; background-image:url(//www.att.com/media/en_US/images/img/img_uverse-gradient-4x37_AA0009R6.gif); background-repeat:repeat-x; border-top:#FFFFFF solid 1px; border-left:#FFFFFF solid 1px; border-right:#FFFFFF solid 1px;');
				if(IE) {
					pPopDivTitleBG.style.setAttribute('cssText', 'height:37px; background-image:url(//www.att.com/media/en_US/images/img/img_uverse-gradient-4x37_AA0009R6.gif); background-repeat:repeat-x; border-top:#FFFFFF solid 1px; border-left:#FFFFFF solid 1px; border-right:#FFFFFF solid 1px;');
				}
				var pPopDivTitleWrapper = document.createElement('div');
				pPopDivTitleWrapper.setAttribute('id', 'gvp_pPopDivTitleWrapper');
				pPopDivTitleWrapper.setAttribute('style', 'padding:10px;');
				if(IE) {
					pPopDivTitleWrapper.style.setAttribute('cssText', 'padding:10px;');
				}
				var pPopDivTitle = document.createElement('div');
				pPopDivTitle.setAttribute('id', 'gvp_pPopDivTitle');
				pPopDivTitle.setAttribute('style', 'float:left; padding-left:10px;');
				if(IE) {
					pPopDivTitle.style.setAttribute('cssText', 'float:left; padding-left:10px;');
				}
				var pPopDivTitleText = document.createElement('H1');
				pPopDivTitleText.setAttribute('id', 'gvp_mainPopUpTitle');
				pPopDivTitleText.setAttribute('style', 'font-size:14px;');
				if(IE) {
					pPopDivTitleText.style.setAttribute('cssText', 'font-size:14px;');
				}
				var pPopDivCloseButton = document.createElement('div'); 
				pPopDivCloseButton.setAttribute('id', 'gvp_popCloseButton');
				//pPopDivCloseButton.setAttribute('onclick', 'gvp.closePopup()');
				pPopDivCloseButton.setAttribute('style', 'text-align:right; font-size:11px;');
				if(IE) {
					pPopDivCloseButton.style.setAttribute('cssText', 'text-align:right; font-size:11px;');
				}
				
				var pPopDivBody = document.createElement('div'); 
				pPopDivBody.setAttribute('id', 'gvp_mainPopupBody');
				pPopDivBody.setAttribute('style', 'border:#CCCCCC solid 1px; margin:10px;');
				if(IE) {
					pPopDivBody.style.setAttribute('cssText', 'border:#CCCCCC solid 1px; margin:10px;');
				}
				
				var pPopDivButton = document.createElement('div'); 
				pPopDivButton.setAttribute('id', 'gvp_mainPopupButton');
				pPopDivButton.setAttribute('style', 'padding-right:10px;padding-bottom:8px;');
				if(IE) {
					pPopDivButton.style.setAttribute('cssText', 'padding-right:10px;padding-bottom:8px;');
				}
				
				body.appendChild(pPopDiv);
				this.getElementObj('gvp_mainPopupDiv').appendChild(pPopDivTitleBG);
				this.getElementObj('gvp_pPopDivTitleBG').appendChild(pPopDivTitleWrapper);
				this.getElementObj('gvp_pPopDivTitleWrapper').appendChild(pPopDivTitle);
				this.getElementObj('gvp_pPopDivTitle').appendChild(pPopDivTitleText);
				this.getElementObj('gvp_pPopDivTitleWrapper').appendChild(pPopDivCloseButton);
				this.getElementObj('gvp_mainPopupDiv').appendChild(pPopDivBody);
				this.getElementObj('gvp_mainPopupDiv').appendChild(pPopDivButton);
			}
				if(title != '') {
					this.getElementObj("gvp_mainPopUpTitle").innerHTML = title;
				} else {
					this.getElementObj("gvp_mainPopUpTitle").innerHTML = 'AT&amp;T Video Player';
				}
				if(playerType == '360') {
					this.getElementObj("gvp_mainPopupBody").innerHTML = '<div align="center" style="width:600px;height:335px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;"><iframe src="/media/en_US/360s/gvp360Wrapper.html#' + pSku + '" style="margin-left:-170px;width:740px;height:335px;" frameborder="0" align="left" scrolling="no"></iframe></div>';
					if(! IE){this.getElementObj('gvp_mainPopupBody').focus();}
					shouldShow = true;
				} else if(playerType == 'details') {
					this.getElementObj("gvp_mainPopupBody").innerHTML = '<div align="center" style="width:755px;height:440px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;"><iframe src="/media/en_US/360s/gvpDeviceDetailsWrapper.html#' + pSku + '" style="margin-top:-100px;margin-left:-125px;width:800px;height:526px;"frameborder="0" align="center" scrolling="no"></iframe></div>';
					if(! IE){this.getElementObj('gvp_mainPopupBody').focus();}
					shouldShow = true;
				} else if(playerType == 'inline') {
					this.getElementObj("gvp_mainPopupBody").innerHTML = '<div align="center" style="width:'+pFrameWidth+'px;height:'+pFrameHeight+'px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;">'+ pInlineContent +'</div>';
					if(! IE){this.getElementObj('gvp_mainPopupBody').focus();}
					shouldShow = true;
				} else if(playerType == 'vid') { 
					var singleVidPath;
					var loc = window.location.href;
					//alert(loc);
					if(loc.indexOf('smartphones')!= -1) {
						singleVidPath = 'std_vid';
						this.getElementObj("gvp_mainPopupBody").innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="480" height="360" id="gvp_pop" align="TL"><param name="allowScriptAccess" value="always" /><param name="scale" value="noScale" /><param name="allowFullScreen" value="true" /><param name="FlashVars" value="_vidSrc='+ pVidSrc +'"><param name="movie" value="/media/en_US/360s/'+singleVidPath+'.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="/media/en_US/360s/'+singleVidPath+'.swf" FlashVars="_vidSrc='+pVidSrc+'" allowfullscreen="true" id="gvp_pop" quality="high" bgcolor="#ffffff" width="480" height="360" name="gvp_pop" scale="noScale" align="TL" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="//www.adobe.com/go/getflashplayer" /></object>';
						shouldShow = true;
					} else {
						singleVidPath = 'gvp_vid';
						this.getElementObj("gvp_mainPopupBody").innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="516" height="292" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="FlashVars" value="_vidSrc='+ pVidSrc +'"><param name="movie" value="/media/en_US/360s/'+singleVidPath+'.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="/media/en_US/360s/'+singleVidPath+'.swf" FlashVars="_vidSrc='+pVidSrc+'" allowfullscreen="true" style="width:516px;height:292px" id="gvp_pop" quality="high" bgcolor="#ffffff" width="516" height="292" name="gvp_pop" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="//www.adobe.com/go/getflashplayer" /></object>';
						shouldShow = true;
					}
				} else if(playerType == 'div') { 
					this.getElementObj("gvp_mainPopupBody").innerHTML = '<div align="center" style="width:'+pFrameWidth+'px;height:'+pFrameHeight+'px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;"><iframe src="' + pFrameSrc + '"width="100%" height="100%" frameborder="0" align="left" scrolling="auto"></iframe></div>';
					if(! IE){this.getElementObj('gvp_mainPopupBody').focus();}
					shouldShow = true;
				} else if(playerType == 'gvp'){
					var p_start = pConfig.indexOf('gvpEnv=');
					if (p_start != -1) {
						var p_end = pConfig.indexOf('&', p_start);
						if(p_end == -1) {
							p_end = pConfig.length;
						}
						p_locEnv = pConfig.substring((p_start+7),p_end);
					} else {
						p_locEnv = '/media/gvp/';
					}
					if(isIphone || isIpad || isAndroid) {
						var nameStart = pConfig.lastIndexOf('/')+1;
						var nameEnd = pConfig.indexOf('.',nameStart);
						var h264FileName = pConfig.substring(nameStart, nameEnd);
						this.rplFlash('iPhone|'+h264FileName);
					} else if (!this.getFlashVersion()) {
						this.rplFlash('noFlash');
					} else {
						if( pConfig.indexOf('gvpLgFormat') == -1 ) {
                        	this.getElementObj("gvp_mainPopupBody").innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="516" height="415" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+ p_locEnv +'ATT_GlobalVideoPlayer'+ gvpVersion +'.swf?configXml=' + pConfig + '" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="'+ p_locEnv +'ATT_GlobalVideoPlayer'+ gvpVersion +'.swf?configXml=' + pConfig + '" allowfullscreen="true" id="gvp_pop_embed" quality="high" bgcolor="#ffffff" width="516" height="415" name="gvp_pop" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="//www.adobe.com/go/getflashplayer" /></object>';
                        } else {
                        	this.getElementObj("gvp_mainPopupBody").innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="516" height="415" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+ p_locEnv +'ATT_GlobalVideoPlayer_640x480'+ gvpVersion +'.swf?configXml=' + pConfig + '" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="'+ p_locEnv +'ATT_GlobalVideoPlayer_640x480'+ gvpVersion +'.swf?configXml=' + pConfig + '" allowfullscreen="true" id="gvp_pop_embed" quality="high" bgcolor="#ffffff" width="516" height="415" name="gvp_pop" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="//www.adobe.com/go/getflashplayer" /></object>';
                        }
						shouldShow = true;
					}
				}
				this.getElementObj('gvp_popCloseButton').innerHTML = '<a href="javascript: void(0)" onClick="gvp.closePopup();" id="p_CloseButton">Close <img src="//www.att.com/media/en_US/images/btn/btn_close-popup_red_AA0009RA.gif" border="0"/></a>';
				this.getElementObj('gvp_mainPopupButton').innerHTML = mFooterButton;
			if (IE6) {
				//hideSelectOption(true);
			}
			if(shouldShow) {
				this.divPopUp('gvp_mainPopupDiv',true);
				var t=setTimeout("gvp.doTitleFocus();",1000);
			}
			
		} catch(e) {
			// do nothing
			displayError(arguments.callee.toString(), e);
		}
	

	};	
	
	this.setDOMFocus = function setDOMFocus(keyword) {
		if (typeof keyword !== 'undefined') {
			switch(keyword) {
			case 'close button':
				this.getElementObj('p_CloseButton').focus();
				//jQuery('.closeModal').focus();
			break;
			case 'continue':
				this.getElementObj('p_CloseButton').focus();
				//jQuery('.closeModal').focus();
			break;	
			}
		}
	};
	
	this.doTitleFocus = function doTitleFocus() {
		this.getElementObj('gvp_mainPopUpTitle').setAttribute('tabindex',-1);
		this.getElementObj('gvp_mainPopUpTitle').focus();
		this.getElementObj('gvp_pop_embed').setAttribute('tabindex',0);
	};

	//--------------------------------------------
	// Name: overLayDiv
	// Desc: Expand the div to cover the whole document and you can still can see it
	// param: param = true for expand or false for shrink
	// return: nothing
	// Example how to call it: this.overLayDiv(true); or this.overLayDiv(false);
	this.overLayDiv = function overLayDiv(param) {
		try {
			var winW = 1, winH = 1;
			var v_filter = 0; v_opacity = 0;
			var v_name = "gvp_overlayDiv";
			var obj;

			obj = this.getElementObj(v_name);
			if (obj == null) {
				divElement = document.createElement("div");
				divElement.setAttribute('id', v_name);
				divElement.onclick = function() {gvp.closePopup();};
				divElement.setAttribute('style', "z-index:200;");
				
				document.getElementsByTagName('body')[0].appendChild(divElement);
				obj = this.getElementObj(v_name);
			}
			if (param == true) {
				var D = document;
			    var DB = document.body;
			    var DDE = document.documentElement;
				function getDocHeight() {
				    return Math.max(DB.scrollHeight, 
									DDE.scrollHeight, 
									DB.offsetHeight, 
									DDE.offsetHeight, 
									DB.clientHeight, 
									DDE.clientHeight);
				}
				function getDocWidth() {
				    return Math.max(DB.scrollWidth, 
									DDE.scrollWidth,
									DB.offsetWidth, 
									DDE.offsetWidth,
									DB.clientWidth, 
									DDE.clientWidth);
				}
				winW = getDocWidth();
				winH = getDocHeight();
				if (IE) {
					var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
					v_filter ="alpha(opacity=50)";
					v_opacity = "50";
				} else {
					v_filter ="alpha(opacity=.5)";
					v_opacity = ".5";
				}
				obj.style.filter = v_filter;
				obj.style.opacity = v_opacity;
			} else  {
				body.removeChild(document.getElementById('gvp_overlayDiv'));
			}
			obj.style.position = "absolute";
			obj.style.top = "0px";
			obj.style.left = "0px";
			obj.style.height = winH+'px';
			obj.style.width = winW+'px';
			obj.style.backgroundColor = "black";
			obj.style.zIndex = 200;
			return(v_name);
		} catch(e) {
			displayError(arguments.callee.toString());
		}

	}; // end of overLayDiv

	//------------------------------------------
	// Name: visibleElement
	// Desc: Function to hide or show an element with visibility property. Pass in an id or object and it will hide the element.
	// param: p1 = id string or an object; status = true or false
	// return: nothing
	// Example how to call it: this.visibleElement("test", true)
	this.visibleElement = function visibleElement(p1, status) {
		try {
			var obj = this.getElementObj(p1);
			if (obj != undefined) {
				if (status == true) {
					obj.style.visibility = "";
				} else if (status == false) {
					obj.style.visibility = "hidden";
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	};  // end of visibleElement

	
	//--------------------------------------------
	// Name: divPopUp
	// Desc: perform a div popup message
	// param: id = pass id of the div; visible = true for show div or false for hide div
	// return: nothing
	// Example how to call it: this.divPopUP("testDiv",true); or this.divPopUP("testDiv",false);
	this.divPopUp = function divPopUp(id, visible) {
		try {
			this.visibleElement(id, visible);
			if (visible)
				this.centerDiv(id);
				window.document.gvp_pop.focus();
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	}; // end of divPopUp
	
	
	//--------------------------------------------
	// Name: getElementObj
	// Desc: Function to get an obj of element. pass in an id and it return the obj
	// param: string of id
	// return: an object
	// Example how to call it: this.getElementObj("test", true)
	this.getElementObj = function getElementObj(param) {
		try {
			if (typeof param == 'object') {
				return param;
			}
			else {
				if (document.getElementById) { // W3C - Explorer 5+ and Netscape 6+
					return  document.getElementById(param);
				}
				else if (document.all) { // Explorer 4
					return document.all[param];
				}
				else if (document.layers) {  // NS4
					return document.layers[param];
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	};  // end of getElementObj
	
	//--------------------------------------------
	// Name: flipBGFlash
	// Desc: Function to hide and show background flash
	// param: string of id
	// return: nothing
	this.flipBGFlash = function flipBGFlash(idToHide, visibilityOrDisplay) {
		try {
			if (this.getElementObj(idToHide) != null) {
				if(visibilityOrDisplay == 'visibility') {
					if(this.getElementObj(idToHide).style.visibility == 'visible') {
						this.getElementObj(idToHide).setStyle({
						  visibility: 'hidden'
						});
	
					} else {
						this.getElementObj(idToHide).setStyle({
						  visibility: 'visible'
						});
					}
				} else if(visibilityOrDisplay == 'display') {
					if(this.getElementObj(idToHide).style.display == 'block') {
						this.getElementObj(idToHide).hide();
					} else {
						this.getElementObj(idToHide).show();
					}
				}
			}
		} catch(e) {
			displayError(arguments.callee.toString());
		}
	};  // end of flipBGFlash

	// the following 3 methods encapsulate proper determination of existing OLAM customers
	this.isNumeric = function(inputVal) {
		if (isNaN(parseFloat(inputVal))) {
         	return false;
     	}
    	return true;
	};
	
	this.getCookie = function(name) {
		var dc = document.cookie;
	  	var prefix = name + "=";
	 	var begin = dc.indexOf("; " + prefix);
	  	if (begin == -1) {
	    	begin = dc.indexOf(prefix);
	    	if (begin != 0) {
	    		return null;
	    	}
	  	} 
	  	else {
	    	begin += 2;
	    }
	  	var end = document.cookie.indexOf(";", begin);
	  	if (end == -1) {
	    	end = dc.length;
	    }
	  	return unescape(dc.substring(begin + prefix.length, end));
	};
	
	
	this.checkExistingMobilityCustomer = function() {
		var p_isCustomer = false;
		var myCookie = this.getCookie('colam_ctn');
		if(this.isNumeric(myCookie.substr(0, 9))) {
			p_isCustomer = true;
		}
		return p_isCustomer;
	};


}
gvp = new gvpUtils();
//var gvpVerRand = (Math.random() * 6);
//gvp.incFile('/media/gvp/global_resources/gvpver.json?'+gvpVerRand);
//set page event handlers
if (window.attachEvent) {
	window.attachEvent("onload", function(){
		var t=setTimeout("gvp.parseQstring(true);",1000);
	});
} else {
	window.addEventListener('load',function(){
		var t=setTimeout("gvp.parseQstring(true);",1000);
	},false);
}


//
//
//
//****************************
//New GVP Protocol  
//****************************
//

//Global GVP constructor method, creates a new instance of gvp.
var GVP = function(view,params){
		
		//--------------------------------------------
		// Name: gvp.view
		// Type: new function GVPIView(){};
		// Desc: Holds the view interface which allows for interaction with current view implementation
		this.view;
		
		//GVP_UTILS.Load("//www.att.com/styles/global-styles.css");
		
		GVP_UTILS.Load(GVP_UTILS.ENV+"view/SubView.js")(function(){return typeof SubView;},gvpIViewLoaded,this);
			
		function gvpIViewLoaded(scope){
			GVP_UTILS.constructor = undefined;
			GVP_UTILS.Load(GVP_UTILS.ENV+view,true)(function(){return typeof GVP_UTILS.constructor;},viewLoaded,scope);
		}		
		function viewLoaded(scope){
			scope.view = SubView.call(new GVP_UTILS.constructor);
			GVP_UTILS.views.push(scope.view);					
			scope.view.init(params);
			scope.view.show();			
		}		
		return this;
	}


//Global GVP_UTILS namespace, holds and controls gvp utilities
var GVP_UTILS = {};

	//--------------------------------------------
	// Name: tempTitle
	// Reference to the title div id, it is used to help bridge the gap between old and new ways of using gvp  
	GVP_UTILS.tempTitle;
	
	//--------------------------------------------
	// Name: GVP_UTILS.flash
	GVP_UTILS.ENV = "//www.att.com/media/gvp/global_resources/";

	//--------------------------------------------
	// Name: GVP_UTILS.VIEW
	GVP_UTILS.VIEW = {};
	GVP_UTILS.VIEW.embed = "view/Embed.js";
	
	//--------------------------------------------
	// Name: GVP_UTILS.flash
	GVP_UTILS.flash = "GVP.swf";
	
	//--------------------------------------------
	// Name: GVP_UTILS.views
	// Type: new function GVPIView(){};
	// Desc: Holds the view interface which allows for interaction with current view implementation
	GVP_UTILS.views = new Array();
	
	//--------------------------------------------
	// Name: GVP_UTILS.constructor
	// Type: 
	// Desc: temporary function object, mainly used when loaded script files.
	GVP_UTILS.constructor;
	
	//--------------------------------------------
	// Name: GVP_UTILS.loadedBefore
	// Type: String
	// Desc: Saves a list of currently loaded CSS or JS files so they don't have to be reloaded  
	GVP_UTILS.loadedBefore;	
	
	//--------------------------------------------
	// Name: Load
	// Desc: Utility function for loading JS or CSS 
	// param: location string of source JS or CSS
	// return: function loadingTimer(param, callBack), used to check if script is loaded, if param then callBack();
	GVP_UTILS.Load = function (input,forceReload,scope){
		if(typeof  GVP_UTILS.loadedBefore === "undefined")  GVP_UTILS.loadedBefore = "";
		var loadedBefore =  GVP_UTILS.loadedBefore;
		if(!checkLoadedBefore(input) || forceReload === true){
			var script;
			if(input.slice(input.length-2,input.length)==="js"){
				script = document.createElement('script');
				script.src = input;
				script.type = 'text/javascript';
				script.defer = true;
				script.id = 'model';
			}else if(input.slice(input.length-3,input.length)==="css"){
				script = document.createElement('link');
				script.href = input;
				script.type = 'text/css';
				script.rel = "stylesheet";
			}		
			if(typeof script !== "undefined"){
				document.getElementsByTagName('head').item(0).appendChild(script);		
			}
		}
		function checkLoadedBefore(script){
			if (loadedBefore.indexOf("["+script+"]")==-1){
				loadedBefore+="["+script+"]";
				return false;		
			}else{
				return true;	
			}
		}
		var timer;
		return function loadingTimer(param,callBack,scope) {
			if (param() !== "undefined") {	
				clearTimeout(timer);
				callBack(scope);			
			}else {		
				timer = setTimeout(function(){
					loadingTimer(param,callBack,scope);
				},100);
			}			
		}
	};

	//--------------------------------------------
	// Name: flashInterface
	// Desc: Utility function for taking flash ExternalInterface messages and routing to current view if view has a flashInterface method
	// param: input
	GVP_UTILS.flashInterface = function(flashId,input){
		var flash;		
		for ( var i=0; i<GVP_UTILS.views.length; ++i){
			if(GVP_UTILS.views[i].flashId !== "undefined"){
				if(GVP_UTILS.views[i].flashId === flashId){
					if(typeof GVP_UTILS.views[i].flashInterface !== "undefined"){
						flash = new GVP_UTILS.views[i].flashInterface();
						GVP_UTILS.views[i].flashInterface(input);						
					}
				}
			}
		}	
		return flash;
	}