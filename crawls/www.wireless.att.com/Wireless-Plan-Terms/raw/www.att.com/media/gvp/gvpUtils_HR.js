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
	var aminCtr = 0;
	var pSku;
	var pVidSrc;
	var pWidth;
	var body;
	var mFooterButton = '';
	var gvpVersion = '';
	var headerStr = '';
	var contentStr = '';
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
		} else if(p_QArray.gvpDiv) {
			gvp.showPopUp(' ', true, true, 'div', p_QArray.gvpDiv+'|800|600');
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
			if (tokens[0].indexOf('gvpDiv') != -1 ) {
				foundFlag = true;
				cleanArr[unescape(tokens[0])] = unescape(tokens[1]);
			}
	    }
		if(foundFlag) {
			if(callTrig) {
				this.popOnLoad(cleanArr);
				return cleanArr;
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
	
	this.getFlashVersion = function getFlashVersion() {
		return this.DetectFlashVer(9, 1, 2);
	};
	
	this.incFile = function(filename) {
		var head = document.getElementsByTagName('head')[0];
		var filePtr = '';
		if(filename.indexOf('.js') != -1) {
			filePtr = document.createElement('script');
			filePtr.setAttribute('src',filename);
			filePtr.setAttribute('type', 'text/javascript');
		} else if(filename.indexOf('.css') != -1) {
			filePtr = document.createElement('link');
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
          jQuery.colorbox.close();
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
	
	this.setDOMFocus = function setDOMFocus(keyword) {
		if (typeof keyword !== 'undefined') {
			switch(keyword) {
			case 'close button':
				jQuery('.closeModal').focus();
			break;
			case 'continue':
				jQuery('.closeModal').focus();
			break;	
			}
		}
	};
	
	this.setModalTitle = function setModalTitle(titleToSet) {
		//used to help bridge the gap between old and new ways of using gvp  
		if(typeof GVP_UTILS.tempTitle !== "undefined"){
			GVP_UTILS.tempTitle.html(titleToSet);
		}
		//
		if(GVP_UTILS.tempTitle !== "")
		if(typeof titleToSet != 'undefined') {
			var t_len = titleToSet.length;
			var f_sz = jQuery('#gvp_mainPopUpTitleHeader').css('font-size');
			if (t_len > 50 && t_len < 60) {
				jQuery('#gvp_mainPopUpTitleHeader').css('font-size', '1.7em').css('line-height', '2.0em');
			} else if (t_len > 60) {
				jQuery('#gvp_mainPopUpTitleHeader').css('font-size', '1.5em').css('line-height', '2.0em');
			}
			jQuery("#gvp_mainPopUpTitle").html(titleToSet.replace('AT&amp;T Video Player', ''));
		} else {
			jQuery("#gvp_mainPopUpTitle").html('AT&amp;T Video Player');
		}
	};
	
	this.setFlashStageSize = function setFlashStageSize( p_width, p_height ) {
	  	jQuery.colorbox.resize({height: parseInt(p_height+136,10), width: parseInt(p_width+52,10)});
		jQuery('#gvp_pop').attr({width: p_width});
		jQuery('#gvp_pop').attr({height: p_height});
	     
		if(! IE) {
			jQuery('#gvp_pop_embed').attr({width: p_width});
			jQuery('#gvp_pop_embed').attr({height: p_height});
		}
	  	return true;
	  };
	  
	this.getWindowLocation = function getWindowLocation(){
        return window.location;
    };
	

	
	this.rplFlash = function rplFlash(rplCode) {
		
		if ( typeof(console) != 'undefined') console.log("rplFlash() called with error code: "+rplCode);
        if(typeof rplCode != 'undefined') {
        	if(rplCode == 'noFlash') {
				// user has no flash
				jQuery("#gvp_modalInjection").html('<a href="//www.adobe.com/products/flashplayer/" target="_Fp"><img src="'+p_locEnv+'global_resources/defaultMedia/GVP_NoFlash.jpg" border="0" border="0" /></a>');
        	} else {
        		// error
				jQuery("#gvp_modalInjection").html('<img width="516px" height="291px" src="'+p_locEnv+'global_resources/defaultMedia/GVP_GeneralError.jpg" border="0"  />using <h2>IEMobile</h2>');
        	}
        } else {
        	// no rplCode provided, replace with generic error
        	jQuery("#gvp_modalInjection").html('<img width="516px" height="291px" src="'+p_locEnv+'global_resources/defaultMedia/GVP_GeneralError.jpg" border="0" />');
        }
		jQuery.colorbox.resize();
    };
	
	this.debug = function(p) {
		v_debug = p;
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
		if(typeof 'gvp_pop' !== 'undefined') {
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
		} catch(e) {
	    	//alert("error hiding modal - e =" + e);
			displayError(arguments.callee.toString(), e);
		}
	};

	//--------------------------------------------
	// Name: showPopUP
	// Desc: take care of injecting the GVP div and player into any page.
	// param: title, modal or not, close button or not (T/F)
	// return: nothing
	this.showPopUp = function showPopUp(title, blockBG, closeButton, playerType, mSkuOrPath, returnEl) {
		gvp.beginLoadTime = new Date();
		gvpVersion = '_2.2.2';
		body = document.getElementsByTagName('body')[0];
		var p_contentHt;
		if(arguments.length >= 4) {
			
			if(arguments.length >= 5) {
				if(playerType == 'div') {
					var pFrameArgs = mSkuOrPath.split('|');
					var pFrameSrc = pFrameArgs[0];
					var pFrameWidth = pFrameArgs[1];
					var pFrameHeight = pFrameArgs[2];
					pWidth = parseInt(pFrameWidth, 10) + parseInt('22', 10);
					//console.log('framewidth: '+pFrameWidth+' frameheight: '+pFrameHeight);
				} else if(playerType == 'gvp') {
					pConfig = mSkuOrPath;
					pWidth = 542;
				} 	
			} else {
				pWidth = 582;
			}
		}
		try {	
			var shouldShow = false;
			var overLayDiv_id, messDivObj, popupDiv, id, buttonDivObj, hasIphoneVid;
				
	
				if(title != '') {
					headerStr = '<div class="modalHeader"><h1 id="gvp_mainPopUpTitleHeader"><span id="gvp_mainPopUpTitle">'+title+'</span></h1><a onclick="gvp.closePopup();parent.jQuery.colorbox.close(); return false" class="closeModal" href="#Close">Close</a></div>';
				} else {
					headerStr = '<div class="modalHeader"><h1 id="gvp_mainPopUpTitleHeader"><span id="gvp_mainPopUpTitle">AT&amp;T Video Player</span></h1><a onclick="gvp.closePopup(); parent.jQuery.colorbox.close(); return false" class="closeModal" href="#Close">Close</a></div>';
				}
				
				
				if(playerType == 'div') { 
					contentStr = '<div align="center" style="width:'+pFrameWidth+'px;height:'+pFrameHeight+'px;overflow:hidden;text-align:center;margin-left:auto;margin-right:auto;padding:10px;"><iframe src="' + pFrameSrc + '"width="100%" height="100%" frameborder="0" align="left" scrolling="auto"></iframe></div>';
					//console.info(contentStr);
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
					if(this.mobile.isMobile) {	
					
						if(this.mobile.isDeviceScreenSmall()) {
							this.mobile.insertVideoElemInPage(pConfig, p_locEnv);
						} else {
							this.mobile.setContentStr(pConfig, p_locEnv);
							shouldShow = true;
						}
					}
					else if (!this.getFlashVersion()) {
						this.rplFlash('noFlash');
					} else {
						if( pConfig.indexOf('gvpLgFormat') == -1 ) {
                        	contentStr='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="516" height="291" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+ p_locEnv +'ATT_GlobalVideoPlayer'+ gvpVersion +'.swf?configXml=' + pConfig + '" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="'+ p_locEnv +'ATT_GlobalVideoPlayer'+ gvpVersion +'.swf?configXml=' + pConfig + '" allowfullscreen="true" id="gvp_pop_embed" quality="high" bgcolor="#ffffff" width="516" height="291" name="gvp_pop" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="//www.adobe.com/go/getflashplayer" /></object>';
                        	p_contentHt = 56+322;
						} else {
							p_contentHt = 56+501;
                        	contentStr='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="644" height="363" id="gvp_pop" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+ p_locEnv +'ATT_GlobalVideoPlayer_640x480'+ gvpVersion +'.swf?configXml=' + pConfig + '" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />	<embed src="'+ p_locEnv +'ATT_GlobalVideoPlayer_640x480'+ gvpVersion +'.swf?configXml=' + pConfig + '" allowfullscreen="true" id="gvp_pop_embed" quality="high" bgcolor="#ffffff" width="644" height="363" name="gvp_pop" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="//www.adobe.com/go/getflashplayer" /></object>';
                        }
						shouldShow = true;
					}
				}

			if(shouldShow) {
				// proxy UI work to colorbox
				if (playerType === 'div') {
					var p_colorBWidth = parseInt(pFrameWidth, 10)+100;
					var p_colorBHeight = parseInt(pFrameHeight, 10)+150;
					jQuery.colorbox({html: headerStr+'<div id="gvp_modalInjection" style="padding-top:10px;"><center>'+contentStr+'</center></div>', 
									close: '', 
									width: p_colorBWidth, 
									height: p_colorBHeight,
									onComplete: function () {
											jQuery('.closeModal').eq(0).focus();
										},
									onClosed: function () {
											if (returnEl)
												jQuery(returnEl).focus();
										}
									});
				} else {
					if (this.mobile.isMobile) {	
					
						if(this.mobile.isDeviceScreenSmall()) {
							this.mobile.insertVideoElemInModal(pConfig, p_locEnv);
						} else {
							this.mobile.openModal(headerStr);
						}
					} 
					else {
						jQuery.colorbox({html: headerStr+'<div id="gvp_modalInjection" style="padding-top:10px;"><center>'+contentStr+'</center></div>', 
										close: '',
										onComplete: function(){
												jQuery('#gvp_mainPopUpTitle').attr('tabindex',-1).focus();
												jQuery('#gvp_pop_embed').attr('tabindex',0);
											},
										onClosed: function () {
												if (returnEl)
													jQuery(returnEl).focus();
											}
										});
					}
				}
			}
			
		} catch(e) {
			// do nothing
			displayError(arguments.callee.toString(), e);
		}
	};	
	/*
	* added 9/12; used by reporting to track load times
		by Chris
	*/
	this.videoReady = function videoReady() {
		//track and return media load time
		if(gvp.beginLoadTime) gvp.loadTime = new Date() - gvp.beginLoadTime;	
		if(gvp.loadTime)return gvp.loadTime; 
	};	
}

/*
The subclass gvpUtils.mobile is defined below.  It encapsulates all mobile functionality of gvpUtils, and is available in the gvpUtils function scope through referencing this.mobile.  Specific devices are detected via their user agents, but this information is private to this class.  A simpler isMobile variable is provided as part of the public interface.

The two main functions of this class are setContentStr and openModal.  setContentStr runs first and creates the appropriate HTML containing a video tag for the detected device and stores it in the contentStr variable.  The contents of this function are exactly the same for gvpUtils and gvpUtils_HR.  openModal opens a modal window and injects the HTML stored in the contentStr into it.  Adding support for a new device entails adding device detection, adding a case to the if/else block in setContentStr for the device, and possibly adding device-specific behavior to openModal.

Currently 3 types of devices are being detected: IOS, Kindle, and Android.  Kindle's can identify themselves as Androids if the browser is in mobile optimization mode.  Therefore, it is critical that Kindle comes before Android in the if/else statement in setContentStr().
*/
gvpUtils.prototype.mobile = new function () {
	
	//device detection
	var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
	var isKindle = /silk/i.test(navigator.userAgent);
	var isAndroid = /android/i.test(navigator.userAgent);
	var isWindows = /iemobile/i.test(navigator.userAgent);
	var isBlackBerry = /blackberry/i.test(navigator.userAgent);
	this.isMobile = isIOS || isKindle || isAndroid || isWindows || isBlackBerry;
	
	//mobile device screen size limit.
	var screenSizeLimit = 900;
	
	//other variables
	var h264PathMarker = 'http://www.wireless.att.com/home/video_progressive/gvp/mp4/';
	var closeModal = 'jQuery.colorbox.close();';
	var firstTime  = true;
	var contentStr;
	var noVideo; 
	var h264FileName;
	
	
	//Store the appropriate video HTML in contentStr
	this.setContentStr = function (pConfig, p_locEnv) {
		//strip off parameters
		var paramStart = pConfig.indexOf('&');
		if (paramStart !== -1)
			pConfig = pConfig.substring(0, paramStart);
		
		//strip off directory prefix and file type
		var nameStart = pConfig.lastIndexOf('/')+1;
		var nameEnd = pConfig.indexOf('.',nameStart);
		
		// MFM 2012 SEP 18 h264FileName has been declared outside this function to make it available in other mobile functions.
		h264FileName = pConfig.substring(nameStart, nameEnd);

		if (h264FileName === '') {
			//no video img
			noVideo = true;
			contentStr = '<img src="' + p_locEnv + 'global_resources/defaultMedia/GVP_iPhone_noVideo.jpg" border="0" onclick="' + closeModal + '" />';
		}
		else if(isIOS) {
			//video tag
			contentStr = '<video id="currEmbStream" style="display:none; position:absolute;" src="' + h264PathMarker + h264FileName + '.mp4" poster="' + p_locEnv + 'global_resources/defaultMedia/GVP_iPhone.jpg" controls="controls" width="512" height="288" onended="' + closeModal + '" onsuspend="gvp.mobile.iosOnSuspend();"></video>';
			//loading image
			contentStr += '<img id="gvp_loadImg" src="/images/global/ajaxLoader.gif" style="display:block; position:absolute; margin:122px 0 0 234px;">';
		}
		else if(isKindle) {
			//Note: Kindles can be identified as Androids if in mobile browser mode
			//video tag			
			contentStr = '';
		}
		else if(isAndroid) {
			contentStr = '';
		}
	}; 		
	//Open a modal and inject the contentStr
	
	this.openModal = function (headerStr) {
	
		//cbox_complete event hook
		if ((firstTime && isAndroid) || (firstTime && isKindle)) {
			firstTime = false;
			jQuery(document).bind('cbox_complete', function () {
				if (gvp.mobile.injectVideo) {
					gvp.mobile.injectVideo();
				}
			});
		}
		//define gvp.mobile.injectVideo
		if (isAndroid || isKindle) {
			this.injectVideo = function () {
				var vidFrag = document.createDocumentFragment();
				var androidVidEl = document.createElement('video');
				var gvpModal = document.getElementById("gvp_modalInjection");
				
				androidVidEl.setAttribute('id', 'currEmbStream');
				androidVidEl.setAttribute('style', 'display:block; position:absolute; height:288px; width:512px;');
				androidVidEl.setAttribute('poster', 'http://www.att.com/media/gvp/global_resources/defaultMedia/GVP_Poster.jpg');
				androidVidEl.setAttribute('controls', 'controls');
				

				// Create and identify the child elements for the video element. Do not insert a "type" attribute. Android does not accept that attribute.
				var androidSourceEl = document.createElement('source');
				androidSourceEl.setAttribute('src',h264PathMarker + h264FileName + '.mp4');

				androidVidEl.appendChild(androidSourceEl);													

				vidFrag.appendChild(androidVidEl);
				
				gvpModal.appendChild(vidFrag);

				androidVidEl.addEventListener('touchstart',function() {androidVidEl.play();},true);
			}
		}
		
		jQuery.colorbox({html: headerStr + '<div id="gvp_modalInjection" style="width:512px; height:288px;">' + (isIOS || noVideo? contentStr: '') + '</div>',
			close: '',
			onClosed: function () {
				if (isAndroid || isKindle)
					gvp.mobile.injectVideo = undefined;
			}
		});
	};	
	
	// IOS only 'ready to play video' event, hides loading image and shows video
	this.iosOnSuspend = function () {
		var jqVideo = jQuery('#currEmbStream');
		var video = jqVideo[0];
		if (video.readyState == 0 && video.networkState == 1) {
			jQuery('#gvp_loadImg').hide();
			jqVideo.show();
		}
	};
	
	// SMALL MOBILE PHONE DEVICES ONLY
	// Return the device screen's diagonal measurement using density independent pixels.
	// Example: 800 X 360, ratio 1.5 yields a diagonal of about 658.
	this.calcScreenDiagonal = function () {
		var dsPixelRatio = window.devicePixelRatio;
		var dsWidth = window.outerWidth;
		var dsHeight = window.outerHeight;
		var screenArea = (dsWidth * dsWidth) + (dsHeight * dsHeight);
		var diagonalDim;
		if (isWindows){
			var diagonalDim = Math.sqrt(screenArea) / 2;
		}
		else{
			var diagonalDim = Math.sqrt(screenArea) / dsPixelRatio;
		}
		
		return (diagonalDim);
	};
	
	// If the device has a small screen, return true.
	this.isDeviceScreenSmall = function () {
		var screenDiagonal = this.calcScreenDiagonal();
		return(screenDiagonal < screenSizeLimit);
	};
	
	// Build the H.264 filename.
	this.buildH264Filename = function (pConfig, p_locEnv) {
		// Remove extraneous parameters.
		var paramStart = pConfig.indexOf('&');
		if (paramStart !== -1) {
			pConfig = pConfig.substring(0, paramStart);
		}

		// Remove directory prefix and file type.
		var nameStart = pConfig.lastIndexOf('/')+1;
		var nameEnd = pConfig.indexOf('.',nameStart);

		return(pConfig.substring(nameStart, nameEnd));
	};
	
	// Build the image element for no video.
	this.buildNoVideoImgEl = function (p_locEnv) {
		var noVideoImgFrag = document.createDocumentFragment();
		var imgEl = document.createElement('img');
		imgEl.setAttribute('src', p_locEnv + 'global_resources/defaultMedia/GVP_iPhone_noVideo.jpg');
		imgEl.setAttribute('border', '0');
		imgEl.setAttribute('onclick', 'closeModal');
		noVideoImgFrag.appendChild(imgEl);
		return noVideoImgFrag;
	}
	
	// Build a video element for a device and particular operating system.
	this.buildVideoElement = function (pConfig, p_locEnv) {
	
		var h264fn = this.buildH264Filename(pConfig, p_locEnv);
		
		// If no filename is available, return with the No Video image element.
		if (h264fn === '') {
			// Set up to show the No Video image.
			noVideo = true;
			return this.buildNoVideoImgEl(p_locEnv);
		}
		
		// Set up elements common to playing video with and without modal dialog.
		var vidFrag = document.createDocumentFragment();		
		var videoEl = document.createElement('video');
		videoEl.setAttribute('id', 'currEmbStream');
		videoEl.setAttribute('style', 'display:block; position:absolute;left:-1px;');
		videoEl.setAttribute('autoplay', 'autoplay');
		
		// Create child elements for the video element. 
		var videoSourceEl = document.createElement('source');
		videoSourceEl.setAttribute('src',h264PathMarker + h264fn + '.mp4');
		if(!isAndroid) {
			// Android does not accept the "type" attribute and fails.
			videoSourceEl.setAttribute('type','video/mp4');
		}
		
		videoEl.setAttribute('poster',p_locEnv + 'global_resources/defaultMedia/GVP_iPhone.jpg');
		videoEl.setAttribute('width','1');
		videoEl.setAttribute('height','1');
		videoEl.setAttribute('onended','closeModal');
		
		if(isIOS) {
			videoSourceEl.setAttribute('onsuspend','gvp.mobile.iosOnSuspend();');
			var videoLoadImgEl = document.createElement('img');
			videoLoadImgEl.setAttribute('id','gvp_loadImg');
			videoLoadImgEl.setAttribute('src','ajaxLoader.gif');
			videoLoadImgEl.setAttribute('style', 'display:block; position:absolute; margin:122px 0 0 234px;');videoEl.appendChild(videoLoadImgEl);	
		} 
			 
		// Append child elements of the video element.
		videoEl.appendChild(videoSourceEl);								
		vidFrag.appendChild(videoEl);
		
		document.getElementsByTagName('body')[0].appendChild(vidFrag);	
		
		// IOS needs the load event to invoke the event listener
		videoEl.addEventListener('load',function() {
				videoEl.play();
			},true);
		if(isIOS) {
			videoEl.addEventListener('load',function() {videoEl.play();},true);
			videoEl.load();
			videoEl.play();
			var elem = document.getElementById("currEmbStream");
			elem.webkitEnterFullScreen();	
		}
		else if(isWindows){ 
			videoEl.addEventListener('load',function() {videoEl.play();},true);
			videoEl.load();
			videoEl.play();
		}
		else{
			function callback () {
				document.querySelector('video').play();
			}
			window.addEventListener("load", callback, false);
			videoEl.load();
			videoEl.play();	
			var elem = document.getElementById("currEmbStream");
			//requres W3C fullscreen API for Android devices 3.0,4.0 and 4.1
			elem.webkitEnterFullScreen();			
		}
	};
	
	// Insert a video element into the modal dialog.
	this.insertVideoElemInModal = function (pConfig, p_locEnv) {
	
		var videoElement = this.buildVideoElement(pConfig, p_locEnv);
		//document.getElementById("gvp_modalInjection").appendChild(videoElement);
		
		var videoElement = document.getElementById("gvp_modalInjection");
		if (videoElement === null){
			this.buildVideoElement(pConfig, p_locEnv);
		}
		else {
			videoElement.parentNode.removeChild(videoElement);
			this.buildVideoElement(pConfig, p_locEnv);
		}
	};
	
	// Insert a video element into the page.
	this.insertVideoElemInPage = function (pConfig, p_locEnv) {

		var voidVid = document.getElementById("currEmbStream");
		if (voidVid === null){
			this.buildVideoElement(pConfig, p_locEnv);
		}
		else {
			voidVid.parentNode.removeChild(voidVid);
			this.buildVideoElement(pConfig, p_locEnv);
		}
	};
};

gvp = new gvpUtils();

if(typeof colorbox === 'undefined') {
	//jQuery.getScript('//www.att.com/scripts/jquery.colorbox.js');
}

if (window.attachEvent) {
	window.attachEvent("onload", function(){
		var t=setTimeout("gvp.parseQstring(true);",500);
	});
} else {
	window.addEventListener('load',function(){
		var t=setTimeout("gvp.parseQstring(true);",500);
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