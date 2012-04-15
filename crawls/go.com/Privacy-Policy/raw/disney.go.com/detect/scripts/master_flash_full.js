//pop-up window

function DolOpenWin(the_window,win_name,args,what_return){
	this[win_name] = window.open(the_window,win_name,args);
	has_pop = SendCommand(win_name);
	if(!has_pop){
		try{
			eval(win_name).focus();
		}catch(e){
			has_pop = true;
		}
	}
	if(what_return);
	else return has_pop;
}
function SendCommand(wn){
	try{
		return(wn)?false:true;
	}catch(e){
		return true;
	}
}
//Gecko Detection
function IsGekko(){
	return(navigator.appName == "Netscape")?true:false
}

function GetTheVersion(gt){
	var gua = navigator.userAgent;
	if(gt == "Mozilla"){
		temp = gua.split("rv:");
		major_version = parseFloat(temp[1]);

	}
	else{
		var marker = gua.lastIndexOf("/");
		var subMe = gua.substr(marker + 1);
		var major_version = parseFloat(subMe);
	}
	return major_version;	
}
function PassVersion(bt,version,req_version){
	defaultAr = new Array(1.2,1,7,85.8);
	this.strippedAppVersion = version
	if(req_version){
		reqAr = req_version.split(",");
		for(i=0;i<reqAr.length;i++){
			if(reqAr[i] == "" || reqAr[i] == 0) reqAr[i] = defaultAr[i];
			reqAr[i] = parseFloat(reqAr[i]);
		}
	}else{
		reqAr = defaultAr;
	}
	switch(bt){
		case "Mozilla":
			this.browser = "Mozilla";
			return(version >= reqAr[0])?true:false
		case "Firefox":
			this.browser = "Firefox";
			//if(version >= 1 || version == .10) return true;
			return(version >= reqAr[1])?true:false;
		case "Netscape":
			this.browser = "Netscape";
			return(version >= reqAr[2])?true:false;
		case "Safari":
			this.browser = "Safari";
			return(version >= reqAr[3])?true:false;
		case "default":
			return false;
		}
	return true;
}
function WhatGecko(){
	var use_agent = navigator.userAgent;
	if(use_agent.indexOf("Netscape") != -1) nua = "Netscape";
	else if(use_agent.indexOf("Safari") != -1) nua = "Safari";
	else if(use_agent.indexOf("Firefox") != -1) nua = "Firefox";
	else if(use_agent.indexOf("Mozilla/5.0") != -1) nua = "Mozilla";
	else return false;
	return nua;
}
function GeckoInterface(page_transition,req_version){
	var myGecko = WhatGecko();
	var theVersion = GetTheVersion(myGecko);
	var passBrowser = this.PassVersion(myGecko,theVersion,req_version);
	if(page_transition)return passBrowser;
	else{
		if(passBrowser)return true;
		else goURL(defaultLP);
	}
}
//Service Pack Two Detection
function IsServicePack(){
	var ua = navigator.userAgent;
	if(ua.indexOf("SV1") != -1) return true;
	else return false;
}
//end code instert;
//Date For the cookie set
var today = new Date();
var expire = new Date(today.getTime() - 10);
var oneYear = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);
var oneMonth = new Date(today.getTime() + 30 * 24 * 60 *60 * 1000);
var oneWeek = new Date(today.getTime() + 7 * 24 * 60 *60 * 1000);
var twoWeek = new Date(today.getTime() + 14 * 24 * 60 *60 * 1000);
var nonbranded = "http://disney.go.com/detect/nonbranded.html";
//redirect function
function goURL(url){
	winLoc = window.location.toString();
	SetCookieUtil("detect_cookie","FF|" + winLoc);
	top.location.replace(url);
	}
//sets the cookie
function SetCookieUtil (name,value,expires,path,domain,secure) {
	document.cookie = name + "=" + escape (value) +	((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "; domain=.go.com") +	((secure) ? "; secure" : "");
}
//gets the cookie (Currently not being used)
function GetCookieUtil (name) {
	var result = null;
	var myCookie = " " + document.cookie + ";";
	var searchName = " " + name + "=";
	var startOfCookie = myCookie.indexOf(searchName);
	var endOfCookie;
	if (startOfCookie != -1) {
		startOfCookie += searchName.length;
		endOfCookie = myCookie.indexOf(";", startOfCookie);
		result = unescape(myCookie.substring(startOfCookie, endOfCookie));
	}
	return result;
}
//Pulls IE Version Number
function PullVersionNumber(arg){
	var toReturn = arg.split(" ");
	for(var i=0;i<toReturn.length;i++){
		var num = toReturn[i];
		var num = parseFloat(num);
		if(num >= 1){
			return num;
		}
	
	}
	//return arg;
}
// Initial IE version number function
function FindVersionNumber(){
	var ret;
	var version = navigator.userAgent;
	var versionAr = version.split(";");
	for(i=0;i<versionAr.length;i++){
		if(versionAr[i].indexOf("MSIE") != -1){
			ret = PullVersionNumber(versionAr[i]);
		}
	}
	return ret;
}
// Generic Active X function
function GetAx(ax){
	try{
		oMotion=eval("new  ActiveXObject('"+ax+"');");
		return true;
		}
		catch(e){
			return false;
		}
		return true;
}
///FLASH SCRIPT

function getNAxFlash(){na_flash=0;if(navigator.plugins) {for (var i=0; i<navigator.plugins.length; i++) { try{ na_flash=/shockwave flash (\d+)/gi.exec(navigator.plugins[i].description)[1]; break; } catch(notIt){}}}return na_flash;}
function getAxFlash(){iVersion = -1;try{iVersion = parseInt(new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").substr(3));}catch(e){}return iVersion; }
iFlashCm = (navigator.appName.indexOf("Micro") != -1 && (navigator.platform.indexOf("Win") != -1 || navigator.platform.toLowerCase().indexOf("ce") != -1))?getAxFlash():getNAxFlash();
flashVersion = iFlashCm+",";
function GetFlashVersion(){
	try {
		return iFlashCm + ",";
	}catch(e){
		return false;
	}
}
//Updated code October 4th year 2006
function CheckFlashVersion(required){
	var output = false;
	userVersion = iFlashCm
	if(userVersion == false) return false;
	else iUserVersion = parseInt(userVersion)
	if(required != null)iRequiredVersion = parseInt(required);
	return (iUserVersion >= iRequiredVersion)?true:false;
}
function FlashCheck(version){return (CheckFlashVersion(version)) ? true : false;}

function DetectFlash(nversion,redirect,override){
	if(!nversion)nversion = "8";
	if(!redirect)redirect = defaultLP + "?flash=false";
	gotFlash = FlashCheck(nversion);
	if(!gotFlash){
		if(override == true){
			return false;
		}
		else{
			retFull = window.location.toString();
			SetCookieUtil("return_path",retFull);
			goURL(redirect);
		}
	}
	else{
		return true;
	}
}

//END FLASH SCRIPT
//Flash Tag Writer

function FlashObj(swf,width,height,background,version,id,vars,autoplay,base,fit,bToggleScriptAccess,stringReturn){
	//toggle allow ScriptAcceess 11
	//first three required, rest optional
	//builds the Flash Object
	if(background == "" || background == null){
		if(document.bgColor == "")background = "#ffffff";
		else background = document.bgColor;
	}
	try{
		this.hasAutoPlay = autoplay.toString();
		
	}catch(e){
		this.hasAutoPlay = "";
		
	}
	
	if(version == "" || version == null) version = "6";
	if(id == "" || id == null) id = "DOL";
	if(vars == "" || vars == null) vars = "test=true"
	if(stringReturn){
		this.stringReturn=stringReturn;
	} else {
		this.stringReturn=false;
	}
	this.swf = swf;
	this.version = version;
	this.width = width;
	this.height = height;
	this.id = id;
	this.render = WriteFlash;
	this.background = background;
	this.flash_var = vars;
	this.bToggleScriptAccess = (!bToggleScriptAccess)?false:true;
	this.scriptAccessValue = "always";
	if(base)this.base = base;
	else this.base = false;
	if(fit)this.fit = fit;
	else this.fit = "";
	this.AddScriptAccess = AddScriptAccess;
	
	

}
//Add in Script Access Support
//Updated 4/18/2006
function AddScriptAccess(value){
	this.scriptAccessValue = value;
	
}

//AKA Render function
function WriteFlash(ob_override,wmode,wmode_override){
	flashAr = new Array()
	sAllowAccess = (!this.bToggleScriptAccess)?'<param name="allowScriptAccess" value="'+this.scriptAccessValue+'" />':'';
	sNaAllowAccess = (!this.bToggleScriptAccess)?'allowScriptAccess="'+this.scriptAccessValue+'"':'';
	//determines if it is http or https 
	var prot = location.protocol;
	//defaults winmode parameters
	ob_pram = "";
	ob_pram_g = "";
	if(prot == "https:")prot = "https:";
	else prot = "http:"
	if(!ob_override) {
		ob_pram = "";
		ob_pram_g = "";
	}
	else {
		//if no win mode defaults to noting
		if(wmode == "blank" || wmode == ""){
			ob_pram = "";
			ob_pram_g = "";
		}
		else {
			//if winmode is triggered this will be inserted in the array.
			ob_pram = "<param name=\"wmode\" value=\""+wmode+"\" />";
			ob_pram_g = (!wmode_override || wmode!="opaque")?"wmode='"+wmode+"' ":"";
		}
	}
	
	if(hasActiveX == true){
		flashAr[0] = "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\""+prot+"//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+ this.version + ",0,0,0\"";
		flashAr[1] ="width=\"" + this.width + "\" height=\"" + this.height + "\" id=\"" + this.id + "\" align=\"\">";
		flashAr[2] = "<param name=\"movie\" value= \""+this.swf+"\" /> <param name=\"quality\" value=\"high\" /><param name=\"menu\" value=\"false\" /> <param name=\"bgcolor\" value=\"" + this.background + "\" />";
		flashAr[3] = "<param name=\"flashvars\" value=\""+this.flash_var+"\" />";
		flashAr[4] = sAllowAccess;
		flashAr[5] = ob_pram;
		if(this.hasAutoPlay == "true") flashAr[6] = "<param name=\"play\" value=\"true\" />";
		else if(this.hasAutoPlay == "false")flashAr[6] = "<param name=\"play\" value=\"false\" />";
		else flashAr[6] = ""
		flashAr[7] = (this.base)?"<param name=\"base\" value=\""+this.base+"\" />":""; 
		flashAr[8] = (this.fit)?"<param name=\"scale\" value=\""+this.fit+"\" />":"";
		flashAr[9] = "</object>";
	}
	else{
		// netscape
		if(this.hasAutoPlay == "true")embedInsert = " play=\"true\" ";
		else if(this.hasAutoPlay == "false")embedInsert = " play=\"false\"";
		else embedInsert="";
		//base
		base_insert = (this.base)?"base=\"" + this.base + "\" ":"";
		//scale
		scale_insert=(this.fit)?"scale=\""+this.fit+"\"":"";
		flashAr[0] = "<embed src=\""+this.swf+"\" "+sNaAllowAccess+"quality=\"high\" bgcolor=\""+this.background+"\" width=\""+this.width+"\" height=\""+this.height+"\""
		flashAr[1] = embedInsert + " name=\""+this.id+"\" id=\""+this.id+"\""+ob_pram_g+" align=\"middle\" menu=false+"+embedInsert+" FlashVars=\""+this.flash_var+"\" type=\"application/x-shockwave-flash\" pluginspage=\""+prot+"://www.macromedia.com/go/getflashplayer\""
		flashAr[2] = base_insert;
		flashAr[3] = scale_insert + " />";

	}
	if(this.stringReturn){
		var flshString = "";
		for(i=0;i<flashAr.length;i++) flshString += flashAr[i];
		return flshString;
	} else {
		for(i=0;i<flashAr.length;i++) document.write(flashAr[i]);
	}
	
}
//End Flash Tag Writer

//Real Active X Detect
function GetActiveX(){
	hasActiveX=(navigator.userAgent.toLowerCase().indexOf("msie") != -1 && this.d_platForm.indexOf("Win") != -1)?true:false;
	return hasActiveX;

}
//Creates the detection object.
function SuperObj(gecko_val,gecko_require){
	this.d_appName = navigator.appName;
	this.d_appVersion = navigator.appVersion;
	this.d_platForm = navigator.platform;
	// addition
	this.hasServicePack = false
	this.passGecko = false;
	// end addition
	this.GetActiveX = GetActiveX;
	this.GetFlashVersion = GetFlashVersion;
	this.hasActiveX = this.GetActiveX();
	hasActiveX = this.hasActiveX;
	if(navigator.userAgent.toLowerCase().indexOf("msie")!= -1) this.strippedAppVersion = FindVersionNumber();
	//addition 12-01-2004
	this.GeckoInterface = GeckoInterface;
	this.PassVersion = PassVersion
	this.browser = "";
	if(this.d_appName == "Netscape"){
		this.passGecko = this.GeckoInterface(gecko_val,gecko_require);
	}
	else if(this.d_appName.indexOf("Micro") != -1){
		this.hasServicePack = IsServicePack();
		this.browser = "ie";
	}
	//end additon

}
//Creates the detection object named browser_object
function CreateInterface(loc,secure,gecko_val,gecko_require){
	if(secure){
		//overrides detection for https
		isSecure = secure;
	}
	else{
		isSecure = false;
	}
	de_prot = window.location.host;
	//determins if the guest should go to global or disney landing page.
	if(de_prot.indexOf("disney.go.com") != -1 || de_prot.indexOf("family.go.com") != -1)de_host = "disney";
	else de_host = "global"
	if(!loc){
		defaultLP = "http://"+de_host+".go.com/home/html/index.html";
		
	}
	else{
		defaultLP = loc;
		
	}
	browser_object = new SuperObj(gecko_val,gecko_require);
}

//Midi Writer Code


function MidiObject(url,autostart,hidden,loop,id,enablejavascript){
	this.url = url;
	this.autostart = (autostart == null || autostart == "")?"true":autostart;
	this.hidden = (hidden != null || hidden == "")?"true":hidden;
	this.loop = (loop != null || loop == "")?"true":loop;
	this.id = (id == null || id == "")?"DOL":id;
	this.enablejavascript = (enablejavascript == null || enablejavascript == "")?"true":enablejavascript;
	this.addAdditionalMidiValue = addAdditionalMidiValue;
	this.render = renderMidi;
	this.additionalElements = " ";
	
}

function addAdditionalMidiValue(name,value){
	this.additionalElements += " " + name + "=" + value + " ";
}

function renderMidi(){
	var renderedString = "<embed src=\""+this.url+"\" height=\"1\" "+this.additionalElements+" width=\"1\" autostart=\""+this.autostart+"\" hidden=\""+this.hidden+"\" loop=\""+this.loop+"\" id=\""+this.id+"\"enablejavascript=\""+this.enablejavascript+"\" />"
	document.write(renderedString);
}


// End midi writer code