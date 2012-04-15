function FlashLibrary(){
	var defaultVersion = 8; //SET THIS TO CURRENT VERSION USED BY AT&T
	
	var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	
	var t = this;
	var activeX = false;
	t.ieAutoInstall = true;
	t.isSecure = false;
	
	t.versionStr = defaultVersion+",0,0,0";
	
	t.defaultAlt = '<div align="center"><a href="https://www.macromedia.com/go/getflashplayer/" class="base-link-secondary base-anchor-img-swap" target="_blank"><img src="/images/global/flashplayer_required.gif" width="115" height="90" border="0"><br><img src="/images/global/common/single_arrow_0.gif" border="0" alt="" />click here to install</a><br>or<br>refresh to try again</div>';
	
	t.showPopup = function(verStr){
		if(!verStr) verStr = t.versionStr;
		if(base.winOpen){
			base.winOpen("/global/content/pop_flashinstall.jhtml?version=" + verStr,"installFlash",700,280,0,0,"status=0,resizable=0,scrollbars=0");
		}else{
			window.open("/global/content/pop_flashinstall.jhtml?version=" + verStr,"installFlash",700,280,0,0,"status=0,resizable=0,scrollbars=0");
		}
	}
	
	//checks version for IE
	function ControlVersion()
	{
		var version;
		var axo;
		var e;
	
		// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
	
		try {
			// version will be set for 7.X or greater players
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	
		if (!version)
		{
			try {
				// version will be set for 6.X players only
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				
				// installed player is some revision of 6.0
				// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
				// so we have to be careful. 
				
				// default to the first public version
				version = "WIN 6,0,21,0";
	
				// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
				axo.AllowScriptAccess = "always";
	
				// safe to call for 6.0r47 or greater
				version = axo.GetVariable("$version");
	
			} catch (e) {
			}
		}
	
		if (!version)
		{
			try {
				// version will be set for 4.X or 5.X player
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
	
		if (!version)
		{
			try {
				// version will be set for 3.X player
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0";
			} catch (e) {
			}
		}
	
		if (!version)
		{
			try {
				// version will be set for 2.X player
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11";
			} catch (e) {
				version = -1;
			}
		}
		
		return version;
	}
	
	// JavaScript helper required to detect Flash Player PlugIn version information
	function GetSwfVer(){
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
				var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
			}
		}
		// MSN/WebTV 2.6 supports Flash 4
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		// WebTV 2.5 supports Flash 3
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		// older WebTV supports Flash 2
		else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		else if ( isIE && isWin && !isOpera ) {
			activeX = true;
			flashVer = ControlVersion();
		}	
		return flashVer;
	}
	
	// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
	t.DetectFlashVer = function(reqMajorVer, reqMinorVer, reqRevision)
	{
		versionStr = GetSwfVer();
		if (versionStr == -1 ) {
			return false;
		} else if (versionStr != 0) {
			if(isIE && isWin && !isOpera) {
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
	}
		
	t.hasVersion = function(ver){ //ver can either be single int or full version: eg 6.0.79
		t.swf = false;
		var major = defaultVersion;
		var minor = 0;
		var revision = 0;
		if(ver){
			if(ver.length > 1 && ver.indexOf('.') != -1){
				ver = ver.split(".");
				major = ver[0];		if(!major) major = defaultVersion;
				minor = ver[1];		if(!minor) minor = 0;
				revision = ver[2];		if(!revision) revision = 0;
				
				testFullVersion = true;
			}else{
				major = ver;
			}
		}
		
		t.versionStr = major + "," + minor + "," + revision + ",0";
		
		return t.swf = t.DetectFlashVer(major, minor, revision);
	}
	
	t.getPluginTag = function(swfFile,width,height,bgcolor,ver,altFormat,params){
		//ver is either single int or full version name, eg: 6.0 r79
		var s = '';
		if(t.hasVersion(ver) && swfFile || (isWin && isIE && swfFile && t.ieAutoInstall)){
			var additionalParams = '';
			var id = "";
			if(params && params.length>0){
				var pArray = params.split(",");
				for(var i=0; i<pArray.length; i++){
					var ta = pArray[i].substr(0,pArray[i].indexOf('='));
					var v = pArray[i].substr(pArray[i].indexOf('=')+1,pArray[i].length);
					if(ta == "name" || ta == "id")id = 'id="' + v + '"';
					additionalParams += (activeX)?'\t<param name="' + ta + '" value="' + v + '" />\n': ' '+ ta + '="' + v + '"';
				}
			}
			
			//check is width and height are %, if is int add quotes
			if(width.toString().indexOf("%") == -1) width = '"' + width + '"';
			if(height.toString().indexOf("%") == -1) height = '"' + height + '"';
			
			if(activeX){
				s = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + t.versionStr + '" ' + id + ' width=' + width + ' height=' + height + '>\n';
				s += '\t<param name="movie" value="'+swfFile+'" />\n';
				s += '\t<param name="pluginspage" value="http://www.macromedia.com/go/getflashplayer" />\n';
				s += '\t<param name="quality" value="high" />\n';
				s += '\t<param name="menu" value="false" />\n';
				s += '\t<param name="bgcolor" value="'+bgcolor+'" />\n';
				s += additionalParams;
				s += '</object>\n\n';
				return s;
			}else{
				s = '<embed src="'+swfFile+'" quality="high" type="application/x-shockwave-flash" swLiveConnect=true pluginspage="https://www.macromedia.com/go/getflashplayer" pluginspage="http://www.macromedia.com/go/getflashplayer" width=' + width + ' height=' + height + ' bgcolor="'+bgcolor+'"'+additionalParams+'></embed>\n';
				return s;
			}
		}else{
			if(!altFormat || altFormat == ""){
				t.showPopup();
				altFormat = t.defaultAlt;
			}
			return altFormat;
		}
		
	}
	
	//calls getPluginTag but writes output from external to fix ie future plugin error
	t.embedMovie = function(swfFile,width,height,bgcolor,ver,altFormat,params){
		document.write(flash.getPluginTag(swfFile,width,height,bgcolor,ver,altFormat,params));	
	}
	
	//calls getPluginTag but writes output to a div's innerHTML property, works for ajax
	t.embedMovieAsync = function(divToUpdate,swfFile,width,height,bgcolor,ver,altFormat,params){
		document.getElementById(divToUpdate).innerHTML += flash.getPluginTag(swfFile,width,height,bgcolor,ver,altFormat,params);
	}
	
	
	t.getWindowLocation = function(){
        return window.location;
    }

}
var flash = new FlashLibrary();