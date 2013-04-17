var connections = [];
function loadNonDashboardFiles()
{
	var filesToLoad = [];
	if (setUpComplete())
		return;
	
	filesToLoad.push({fileName: '/commonspot/javascript/util.js', fileType: 'script', fileID: 'cs_util_js'});
	filesToLoad.push({fileName: '/commonspot/dashboard/css/buttons.css', fileType: 'link', fileID: 'buttons_css'});
	filesToLoad.push({fileName: '/commonspot/javascript/lightbox/lightbox.css', fileType: 'link', fileID: 'cs_lightbox_css'});
	filesToLoad.push({fileName: '/commonspot/javascript/lightbox/lightbox.js', fileType: 'script', fileID: 'cs_lightbox_js'});
	filesToLoad.push({fileName: '/commonspot/javascript/lightbox/overrides.js', fileType: 'script', fileID: 'cs_overrides'});
	filesToLoad.push({fileName: '/commonspot/javascript/lightbox/window_ref.js', fileType: 'script', fileID: 'cs_windowref'});

	loadDashboardFiles(filesToLoad);
	//temp.onload = newWindow(name,workUrl);
}


function IncludeFiles(fileName,fileType,fileSource,fileID) 
{
	//src,fileType,fileID,callback,doc
	// fileName, fileType, oXmlHttp.responseText, fileID
	if ((fileSource != null) && (!document.getElementById(fileID)))
	{
		var oHead = document.getElementsByTagName('HEAD').item(0);
		var oScript = document.createElement(fileType);
		oScript.id = fileID;
		switch (fileType)
		{
			case 'script':
				oScript.language = "javascript";
				oScript.type = "text/javascript";
				oScript.src = fileName;
				oScript.text = fileSource;
				break;
			case 'link':
				oScript.type = 'text/css';
				oScript.href = fileName;
				oScript.rel = 'stylesheet';
				oScript.text = fileSource;
				break;
		}
		oHead.appendChild(oScript);
	}
};

function GetHttpRequest(counter, fileID, fileName, fileType, arrFiles)
{
	var nextCounter;
	if (window.XMLHttpRequest) // Gecko
		connections[counter] = new XMLHttpRequest();
	else if (window.ActiveXObject) // IE
	{
		try
		{ 
			connections[counter] = new ActiveXObject("Msxml2.XMLHTTP"); 
		}
		catch(e)
		{
			try
			{ 
				connections[counter] = new ActiveXObject("Microsoft.XMLHTTP"); 
			}
			catch(e)
			{ 
				connections[counter] = false;
			}
		}
	}
	var stop = true;
	if (connections[counter])
	{
		connections[counter].onreadystatechange = function()
		{
			if (connections[counter].readyState == 4)
			{
				if (connections[counter].status == 200 || connections[counter].status == 304)
				{
					IncludeFiles(fileName, fileType, connections[counter].responseText, fileID);
					nextCounter = counter + 1;
					if (nextCounter < arrFiles.length)
					{
						stop = false;
						GetHttpRequest(nextCounter, arrFiles[nextCounter].fileID, arrFiles[nextCounter].fileName, arrFiles[nextCounter].fileType, arrFiles);
					}
					else
						setCommonspot();
				}
				// alert error unless it's just a request abort
				// there are other cases that look like this (request to a different domain, http request to an https server...), no real way to distinguish them
				else if (connections[counter].status != 0 || connections[counter].statusText != '')
					alert('Ajax request error: ' + connections[counter].statusText + ' (' + connections[counter].status + ')');
				if (stop)
				{
					connections[counter].abort();
					connections = [];
				}
			}
		}
		connections[counter].open('GET', fileName, true);
		connections[counter].send("");		 
	}
};

function loadDashboardFiles(arrFiles)
{
	var callback;
	var req = false;
	var fileID, fileName, fileType;
		//callback = arrFiles[i].callback ? arrFiles[i].callback : null;
		//IncludeJs(arrFiles[i].fileName, arrFiles[i].fileType, arrFiles[i].fileID, callback);
		//loadjscssfile(arrFiles[i].fileName,arrFiles[i].fileType,arrFiles[i].fileID);
		
	fileID = arrFiles[0].fileID;
	fileName = arrFiles[0].fileName;
	fileType = arrFiles[0].fileType;
	temp = GetHttpRequest(0, fileID, fileName, fileType, arrFiles);
}

function setUpComplete()
{
	if ((top.commonspot && top.commonspot.lightbox) || (parent.commonspot && parent.commonspot.lightbox))
		return true;
	else
		return false;	
}
	
function newCenteredWindow(name, url, width, height, windowFeatures)
{
	var left = (screen.availWidth - width) / 2;
	var top = ((screen.availHeight - height) / 2) - 20; // a bit above center
	if(!windowFeatures)
		var windowFeatures = 'toolbar=no,menubar=no,location=no,scrollbars,resizable';
	windowFeatures += ',top=' + top + ',left=' + left + ',width=' + width + ',height=' + height;
	newWindow(name, url, windowFeatures);
}
function submitFormToNewWindow(windowName, loader, csModule, args)
{
	var form, fldName;
	form = document.createElement('form');
	form.target = windowName;
	form.action = loader;
	form.method = 'post';
	//form.enctype = 'multipart/form-data'; // NEEDSWORK: we may need to do this for UTF8???
	form.style.display = 'none';
	createField(form, 'csModule', csModule);
	for(fldName in args)
		createField(form, fldName, args[fldName]);
	document.body.appendChild(form);
	var win = openEmptyLightBox(null, null, windowName);
	form.target = win;
	form.submit();
	document.body.removeChild(form);
	
	function createField(form, name, value)
	{
		var fld = document.createElement('input');
		fld.type = 'hidden';
		fld.name = name;
		fld.value = value;
		form.appendChild(fld);
	}
}
function AskClearCache (workUrl)
{
	newWindow('clearcache', workUrl);
}
function setSelectedAudience(id)
{
	newWindow('SetAudience',jsDlgLoader + '?csModule=utilities/set-audience&amp;target='+id);
}
function doDisplayOptionsMenu(dlgloader,pageid,event)
{
	var thisMenu = document.getElementById("DisplayOptionsMenu");
	calcMenuPos ("DisplayOptionsMenu",event);
	stopEvent(event);
}
function doRolesMenu(dlgloader,pageid,event)
{
	var thisMenu = document.getElementById("RolesMenu");
	calcMenuPos ("RolesMenu",event);
	stopEvent(event);
}
function doPageManagementMenu(dlgloader,pageid,event)
{
	var thisMenu = document.getElementById("PageManagementMenu");
	calcMenuPos ("PageManagementMenu",event);
	stopEvent(event);
}
function toggleState (value, name)
{
	document.styleSheets[0].addRule(".cls" + name, (value) ? "display:block;" : "display:none;");
	document.cookie = name + "=" + value;
}
function toggleDesc (value, name)
{
	document.getElementById("id" + name).style.display =  (value) ? "block" : "none";
	document.getElementById("id" + name + "img").src =  (value) ? "/commonspot/images/arrow-right.gif" : "/commonspot/images/arrow.gif";
	document.cookie = name + "=" + value;
}
function stopEvent(event)
{
	if(event.preventDefault)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	else
	{
		event.returnValue = false;
		event.cancelBubble = true;
	}
}
function canRollover(browserVersion)
{
	var agent = navigator.userAgent.toLowerCase();
	var isMoz = agent.match('mozilla') && agent.match('gecko');
	var minVers = isMoz ? 3 : 4;
	return (browserVersion >= minVers) ? 1 : 0;
}

var bVer = parseInt(navigator.appVersion);
var bCanRollover = canRollover(bVer);

function ImageSet(imgID,newTarget)
{
	if (bCanRollover)
		document[imgID].src=newTarget;
}

function gotoDiffLang(workUrl)
{
	window.location=workUrl+'&amp;pageid='+js_gvPageID;
}
var doRefresh = true;
function refreshParent()
{
	if ( self.opener && doRefresh )
	{
		self.opener.location.reload();
	}
	self.close;
}

function getFrameWindow(frameID,frameName)
{
	if (frameID)
		return window.document.getElementById(frameID).contentWindow;
	
	var frames = window.frames;
	for (var i=0; i<frames.length; i++)
	{
		if (frames[i].name == frameName)
			return frames[i];
	}
	return null;
}

function getContentFromChildFrame(frameName,fieldname,formname)
{
   if (formname == null)
		formname = "dlgform";
	var RTEFrame = getFrameWindow(frameName);
	if (RTEFrame && RTEFrame.saveKTML)
		RTEFrame.saveKTML(fieldname); // first call the save function of the KTML
	if (document.getElementById(frameName).contentDocument) { // moz
		var innertbVal = eval("document.getElementById('"+frameName+"').contentDocument."+fieldname+formname+"."+fieldname).value;
	} else { // IE
		var innertbVal = eval("document.frames['"+frameName+"'].document."+fieldname+formname+"."+fieldname).value;
	}
	var tb = eval ('document.' + formname + "." + fieldname);
	
	tb.value = innertbVal;
}
function glblLinkHandler(lobj, attr, val)
{
	lobj.style[attr]=val;
}
// we should replace tons of diff. instances of form validation codes with this one to make 
// sure we do not have diff. implementations for the same task.	
function stringTrim(_this,str) 
{
   if(!str) str = _this;
   return str.replace(/^\s*/,"").replace(/\s*$/,"");
}

function substringReplace(source,pattern,replacement)
{
	var pos = 0;
	var target="";
	while ((pos = source.indexOf(pattern)) != (-1))
	{
		target = target + source.substring(0,pos) + replacement;
		source = source.substring(pos+pattern.length);
		pos = source.indexOf(pattern);
	}
	return (target + source);
}
function cs_decodeURI(res) 
{
	try
	{
		return decodeURI(res);
	}
	catch(e){
		return res;
	}
}
function cs_encodeURI(res) {
	try
	{
		var res = cs_decodeURI(res);
	}
	catch(e){}
	return encodeURI(res);
}
function unescapeHTML(msg)
{
	var msg = msg.replace(/<\/?[^>]+>/gi, '');
	return msg.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}

function setCommonspot()
{
	if (commonspot && !top.commonspot)
		top.commonspot = commonspot;
}

var last = function last() {
	return this[this.length - 1];
}

var each = function each(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
}
if (!Array.last)
{
	Array.prototype.last = last;
	Array.prototype.each = each;
}
if (typeof document.getElementsByClassName == 'undefined') 
	document.getElementsByClassName = function(searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
			        classElements[j] = els[i];
			        j++;
			}
		}
		return classElements;
	}
